import { Command } from "commander";
import { promises as fs } from "fs";
import path from "path";
import z from "zod";
import { registrySchema } from "../registry/schema";
import { logger } from "../utils/logger";

export const buildOptionsSchema = z.object({
  cwd: z.string(),
  registryFile: z.string(),
  outputDir: z.string(),
});

export const build = new Command()
  .name("build")
  .description("build components for a aodesu registry")
  .argument("[registry]", "path to registry.json file", "./registry.json")
  .option(
    "-o, --output <path>",
    "destination directory for json files",
    "./public/r"
  )
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (registryFile: string, opts) => {
    try {
      const cwd = path.resolve(opts.cwd);
      const outputDir = path.resolve(cwd, opts.output);
      const registryPath = path.resolve(cwd, registryFile);

      // Read and parse registry
      const registryContent = await fs.readFile(registryPath, "utf-8");
      const registry = registrySchema.parse(JSON.parse(registryContent));

      // Create output directory
      await fs.mkdir(outputDir, { recursive: true });

      // Generate index file with all items
      const index = registry.items.map((item) => ({
        name: item.name,
        type: item.type,
      }));

      await fs.writeFile(
        path.join(outputDir, "index.json"),
        JSON.stringify(index, null, 2)
      );

      logger.info(`✓ Generated ${index.length} items`);
      logger.info(`✓ Output directory: ${outputDir}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Invalid registry.json format");
        error.errors.forEach((err) => {
          logger.error(`  ${err.path.join(".")}: ${err.message}`);
        });
      } else if (error instanceof Error) {
        logger.error(error.message);
      } else {
        logger.error("Unknown error occurred");
      }
      process.exit(1);
    }
  });
