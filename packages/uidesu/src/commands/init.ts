import * as ERRORS from "@/src/utils/errors";
import { Command } from 'commander';
import fsExtra from 'fs-extra';
import path from 'path';
import prompts from "prompts";
import z from 'zod';
import { preFlightInit } from '../preflights/preflight-init';
import { getRegistryBaseColors, getRegistryItems, getRegistryStyles } from '../registry/api';
import { buildUrlAndHeadersForRegistryItem } from '../registry/builder';
import { configWithDefaults } from '../registry/config';
import { clearRegistryContext } from '../registry/context';
import { rawConfigSchema } from "../schema";
import { createProject } from "../utils/create-project";
import { loadEnvFiles } from '../utils/env-loader';
import { createFileBackup, deleteFileBackup, restoreFileBackup } from '../utils/file-helper';
import { Config, getConfig } from "../utils/get-config";
import { getProjectConfig, getProjectInfo, getProjectTailwindVersionFromConfig } from "../utils/get-project-info";
import { handleError } from '../utils/handle-error';
import { highlighter } from '../utils/highlighter';
import { logger } from '../utils/logger';
import { ensureRegistriesInConfig } from '../utils/registries';
process.on("exit", (code) => {
  const filePath = path.resolve(process.cwd(), "components.json")

  if (code === 0) {
    return deleteFileBackup(filePath);
  }

  return restoreFileBackup(filePath);
});

export const initOptionsSchema = z.object({
  cwd: z.string(),
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  isNewProject: z.boolean(),
  srcDir: z.boolean().optional(),
  cssVariables: z.boolean(),
  template: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return "TEMPLATES"
        }
        return true
      },
      {
        message: "Invalid template. Please use 'next', 'next-16' or 'next-monorepo'.",
      }
    ),
  baseColor: z
    .string()
    .optional(),
  baseStyle: z.boolean(),
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .argument("[components...]", "names, url or local path to component")
  .option(
    "-t, --template <template>",
    "the template to use. (next, next-16, next-monorepo)"
  )
  .option("-b, --base-color <base-color>", "The base color to use. (neutral)", undefined)
  .option("-y, --yes", "Skip de confirmation prompt", true)
  .option("-d, --defaults", "Use default configuration.", false)
  .option("-f, --force", "Force overwrite of existing configuration", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-s, --silent", "Mute output", false)
  .option("--src-dir", "Use the src directory when creating a new project.", false)
  .option("--no-src-dir", "Do not use the src directory when creating a new project.")
  .option("--css-variables", "Use css variables for theming.", true)
  .option("--no-base-style", "Do not install the base aodesu style.")
  .action(async (components, opts) => {
    try {
      if (opts.defaults) {
        opts.template = opts.template || "next"
        opts.baseColor = opts.baseColor || "neutral"
      }

      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        isNewProject: false,
        components,
        ...opts
      });

      await loadEnvFiles(options.cwd);

      // We need check if we're initializing with a new style
      // This will allow us to determine if we need to install the base style.
      // And if we should prompt the user for a base color.
      if (components.length > 0) {
        // We don't know the full config at this point.
        // So we'll use a shadow config to fetch the first item,
        let shadowConfig = configWithDefaults({});

        // Check if there's a components.json file.
        // If so, we'll merge with our shadow config.
        const componentsJsonPath = path.resolve(options.cwd, "components.json");
        if (fsExtra.existsSync(componentsJsonPath)) {
          const existingConfig = await fsExtra.readJson(componentsJsonPath);
          const config = rawConfigSchema.partial().parse(existingConfig);
          shadowConfig = configWithDefaults(config);

          // Since components.json might not be valid at this point.
          // Temporaly rename components.json to allow preflight to run.
          // We'll rename it back after preflight.
          createFileBackup(componentsJsonPath);
        }

        // Ensure all registries used in componentes are configured.
        const { config: updatedConfig } = await ensureRegistriesInConfig(
          components,
          shadowConfig,
          {
            silent: true,
          }
        )
        shadowConfig = updatedConfig;


        // This forces a shadowConfig validation early in the process.
        buildUrlAndHeadersForRegistryItem(components[0], shadowConfig);


        const [item] = await getRegistryItems([components[0]], {
          config: shadowConfig
        });

        console.log("TEST - LLEGO AKI")

        if (item?.type == "registry:style") {
          // Set a default base color so we're not prompted.
          // The style will extend or override it.
          options.baseColor = "neutral";

          // If the style extends none, we don't want to install the base style.
          options.baseStyle =
            item.extends === "none" ? false : options.baseStyle;
        }
      }

      // If --no-base-style, we don't want to prompt for a base color either
      if (!options.baseStyle) {
        options.baseColor = "neutral";
      }

      await runInit(options);

      logger.log(
        `${highlighter.success(
          "Success!"
        )} Project initialization completed. \nYou may now add components.`
      )

    } catch (error) {
      logger.break();
      handleError(error);
    } finally {
      clearRegistryContext();
    }
  })


export async function runInit(
  options: z.infer<typeof initOptionsSchema> & {
    skipPreflight?: boolean
  }
) {
  let projectInfo;
  let newProjectTemplate;
  if (!options.skipPreflight) {
    const preflight = await preFlightInit(options);
    if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
      const { projectPath, template } = await createProject(options);
      if (!projectPath) {
        process.exit(1);
      }
      options.cwd = projectPath;
      options.isNewProject = true;
      newProjectTemplate = template;
    }
    projectInfo = preflight.projectInfo;
  } else {
    projectInfo = await getProjectInfo(options.cwd);
  }

  if (newProjectTemplate === "next-monorepo") {
    options.cwd = path.resolve(options.cwd, "apps/web");
    return await getConfig(options.cwd);
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo);

  let config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : console.log("xd")
}

async function promptForMinimalConfig(
  defaultConfig: Config,
  opts: z.infer<typeof initOptionsSchema>
) {
  let style = defaultConfig.style;
  let baseColor = opts.baseColor;
  let cssVariables = defaultConfig.tailwind.cssVariables;

  if (!opts.defaults) {
    const [styles, baseColors, tailwindVersion] = await Promise.all([
      getRegistryStyles(),
      getRegistryBaseColors(),
      getProjectTailwindVersionFromConfig(defaultConfig),
    ]);

    const options = await prompts([
      {
        type: tailwindVersion === "v4" ? null : "select",
        name: "style",
        message: `Which ${highlighter.info("style")} would you like to use?`,
        choices: styles.map((style) => ({
          title:
            style.name === "aodesu" ? "aodesu (Recommended)" : style.label,
          value: style.name,
        })),
        initial: 0,
      },
      {
        type: opts.baseColor ? null : "select",
        name: "tailwindBaseColor",
        message: `Which color would you like to use as the ${highlighter.info("base color")}?`,
        choices: baseColors.map((color) => ({
          title: color.label,
          value: color.name,
        })),
      },
    ]);

    style = options.style ?? "aodesu";
    baseColor = options.tailwindBaseColor ?? baseColor;
    cssVariables = opts.cssVariables;
  }

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style,
    tailwind: {
      ...defaultConfig?.tailwind,
      baseColor,
      cssVariables,
    },
    rsc: defaultConfig?.rsc,
    tsx: defaultConfig?.tsx,
    iconLibrary: defaultConfig?.iconLibrary,
    aliases: defaultConfig?.aliases,
  });
}
