import { z } from 'zod';

declare const registryItemTypeSchema: z.ZodEnum<["registry:lib", "registry:ui", "registry:style", "registry:example", "registry:internal"]>;
declare const registryItemTailwindSchema: z.ZodObject<{
    config: z.ZodOptional<z.ZodObject<{
        content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        plugins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        content?: string[] | undefined;
        theme?: Record<string, any> | undefined;
        plugins?: string[] | undefined;
    }, {
        content?: string[] | undefined;
        theme?: Record<string, any> | undefined;
        plugins?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    config?: {
        content?: string[] | undefined;
        theme?: Record<string, any> | undefined;
        plugins?: string[] | undefined;
    } | undefined;
}, {
    config?: {
        content?: string[] | undefined;
        theme?: Record<string, any> | undefined;
        plugins?: string[] | undefined;
    } | undefined;
}>;
declare const registryItemCssVarsSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    light: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    dark: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    theme?: Record<string, string> | undefined;
    light?: Record<string, string> | undefined;
    dark?: Record<string, string> | undefined;
}, {
    theme?: Record<string, string> | undefined;
    light?: Record<string, string> | undefined;
    dark?: Record<string, string> | undefined;
}>;
declare const registryItemCssSchema: z.ZodRecord<z.ZodString, z.ZodType<any, z.ZodTypeDef, any>>;
declare const registryItemEnvVarsSchema: z.ZodRecord<z.ZodString, z.ZodString>;
declare const registryItemSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["registry:lib", "registry:ui", "registry:style", "registry:example", "registry:internal"]>;
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    devDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    registryDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tailwind: z.ZodOptional<z.ZodObject<{
        config: z.ZodOptional<z.ZodObject<{
            content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }>>;
    cssVars: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        light: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        dark: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }>>;
    css: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<any, z.ZodTypeDef, any>>>;
}, "strip", z.ZodTypeAny, {
    type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
    name: string;
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    registryDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}, {
    type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
    name: string;
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    registryDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}>;
type RegistryItem = z.infer<typeof registryItemSchema>;
declare const registrySchema: z.ZodObject<{
    name: z.ZodString;
    homepage: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["registry:lib", "registry:ui", "registry:style", "registry:example", "registry:internal"]>;
        title: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        devDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        registryDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tailwind: z.ZodOptional<z.ZodObject<{
            config: z.ZodOptional<z.ZodObject<{
                content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                plugins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            }, {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        }, {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        }>>;
        cssVars: z.ZodOptional<z.ZodObject<{
            theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            light: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            dark: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        }, {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        }>>;
        css: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<any, z.ZodTypeDef, any>>>;
    }, "strip", z.ZodTypeAny, {
        type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
        name: string;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
        dependencies?: string[] | undefined;
        devDependencies?: string[] | undefined;
        registryDependencies?: string[] | undefined;
        tailwind?: {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        } | undefined;
        cssVars?: {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        } | undefined;
        css?: Record<string, any> | undefined;
    }, {
        type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
        name: string;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
        dependencies?: string[] | undefined;
        devDependencies?: string[] | undefined;
        registryDependencies?: string[] | undefined;
        tailwind?: {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        } | undefined;
        cssVars?: {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        } | undefined;
        css?: Record<string, any> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    homepage: string;
    items: {
        type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
        name: string;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
        dependencies?: string[] | undefined;
        devDependencies?: string[] | undefined;
        registryDependencies?: string[] | undefined;
        tailwind?: {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        } | undefined;
        cssVars?: {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        } | undefined;
        css?: Record<string, any> | undefined;
    }[];
}, {
    name: string;
    homepage: string;
    items: {
        type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
        name: string;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
        dependencies?: string[] | undefined;
        devDependencies?: string[] | undefined;
        registryDependencies?: string[] | undefined;
        tailwind?: {
            config?: {
                content?: string[] | undefined;
                theme?: Record<string, any> | undefined;
                plugins?: string[] | undefined;
            } | undefined;
        } | undefined;
        cssVars?: {
            theme?: Record<string, string> | undefined;
            light?: Record<string, string> | undefined;
            dark?: Record<string, string> | undefined;
        } | undefined;
        css?: Record<string, any> | undefined;
    }[];
}>;
type Registry = z.infer<typeof registrySchema>;
declare const registryIndexSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["registry:lib", "registry:ui", "registry:style", "registry:example", "registry:internal"]>;
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    devDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    registryDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tailwind: z.ZodOptional<z.ZodObject<{
        config: z.ZodOptional<z.ZodObject<{
            content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }>>;
    cssVars: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        light: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        dark: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }>>;
    css: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<any, z.ZodTypeDef, any>>>;
}, "strip", z.ZodTypeAny, {
    type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
    name: string;
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    registryDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}, {
    type: "registry:lib" | "registry:ui" | "registry:style" | "registry:example" | "registry:internal";
    name: string;
    title?: string | undefined;
    author?: string | undefined;
    description?: string | undefined;
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    registryDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}>, "many">;
declare const stylesSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    label: string;
}, {
    name: string;
    label: string;
}>, "many">;
declare const registryResolvedItemsTreeSchema: z.ZodObject<Pick<{
    name: z.ZodString;
    type: z.ZodEnum<["registry:lib", "registry:ui", "registry:style", "registry:example", "registry:internal"]>;
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    devDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    registryDependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tailwind: z.ZodOptional<z.ZodObject<{
        config: z.ZodOptional<z.ZodObject<{
            content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            plugins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }, {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }, {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    }>>;
    cssVars: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        light: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        dark: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }, {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    }>>;
    css: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<any, z.ZodTypeDef, any>>>;
}, "dependencies" | "devDependencies" | "tailwind" | "cssVars" | "css">, "strip", z.ZodTypeAny, {
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}, {
    dependencies?: string[] | undefined;
    devDependencies?: string[] | undefined;
    tailwind?: {
        config?: {
            content?: string[] | undefined;
            theme?: Record<string, any> | undefined;
            plugins?: string[] | undefined;
        } | undefined;
    } | undefined;
    cssVars?: {
        theme?: Record<string, string> | undefined;
        light?: Record<string, string> | undefined;
        dark?: Record<string, string> | undefined;
    } | undefined;
    css?: Record<string, any> | undefined;
}>;
declare const registryConfigItemSchema: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
    url: z.ZodEffects<z.ZodString, string, string>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    params?: Record<string, string> | undefined;
    headers?: Record<string, string> | undefined;
}, {
    url: string;
    params?: Record<string, string> | undefined;
    headers?: Record<string, string> | undefined;
}>]>;
declare const registryConfigSchema: z.ZodRecord<z.ZodEffects<z.ZodString, string, string>, z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
    url: z.ZodEffects<z.ZodString, string, string>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    params?: Record<string, string> | undefined;
    headers?: Record<string, string> | undefined;
}, {
    url: string;
    params?: Record<string, string> | undefined;
    headers?: Record<string, string> | undefined;
}>]>>;
declare const rawConfigSchema: z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    style: z.ZodString;
    tsx: z.ZodDefault<z.ZodBoolean>;
    tailwind: z.ZodObject<{
        config: z.ZodOptional<z.ZodString>;
        css: z.ZodString;
        theme: z.ZodString;
        cssVariables: z.ZodDefault<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    }, {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    }>;
    aliases: z.ZodObject<{
        components: z.ZodString;
        utils: z.ZodString;
        ui: z.ZodOptional<z.ZodString>;
        lib: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }>;
    registries: z.ZodOptional<z.ZodRecord<z.ZodEffects<z.ZodString, string, string>, z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
        url: z.ZodEffects<z.ZodString, string, string>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }>]>>>;
}, "strict", z.ZodTypeAny, {
    tailwind: {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    };
    style: string;
    tsx: boolean;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    $schema?: string | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}, {
    tailwind: {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    };
    style: string;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    $schema?: string | undefined;
    tsx?: boolean | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}>;
declare const configSchema: z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    style: z.ZodString;
    tsx: z.ZodDefault<z.ZodBoolean>;
    tailwind: z.ZodObject<{
        config: z.ZodOptional<z.ZodString>;
        css: z.ZodString;
        theme: z.ZodString;
        cssVariables: z.ZodDefault<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    }, {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    }>;
    aliases: z.ZodObject<{
        components: z.ZodString;
        utils: z.ZodString;
        ui: z.ZodOptional<z.ZodString>;
        lib: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }>;
    registries: z.ZodOptional<z.ZodRecord<z.ZodEffects<z.ZodString, string, string>, z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
        url: z.ZodEffects<z.ZodString, string, string>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }>]>>>;
} & {
    resolvedPaths: z.ZodObject<{
        cwd: z.ZodString;
        tailwindConfig: z.ZodString;
        tailwindCss: z.ZodString;
        utils: z.ZodString;
        components: z.ZodString;
        lib: z.ZodString;
        ui: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    }, {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    }>;
}, "strict", z.ZodTypeAny, {
    tailwind: {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    };
    style: string;
    tsx: boolean;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    resolvedPaths: {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    };
    $schema?: string | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}, {
    tailwind: {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    };
    style: string;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    resolvedPaths: {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    };
    $schema?: string | undefined;
    tsx?: boolean | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}>;
declare const workspaceConfigSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    style: z.ZodString;
    tsx: z.ZodDefault<z.ZodBoolean>;
    tailwind: z.ZodObject<{
        config: z.ZodOptional<z.ZodString>;
        css: z.ZodString;
        theme: z.ZodString;
        cssVariables: z.ZodDefault<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    }, {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    }>;
    aliases: z.ZodObject<{
        components: z.ZodString;
        utils: z.ZodString;
        ui: z.ZodOptional<z.ZodString>;
        lib: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }, {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    }>;
    registries: z.ZodOptional<z.ZodRecord<z.ZodEffects<z.ZodString, string, string>, z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
        url: z.ZodEffects<z.ZodString, string, string>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }>]>>>;
} & {
    resolvedPaths: z.ZodObject<{
        cwd: z.ZodString;
        tailwindConfig: z.ZodString;
        tailwindCss: z.ZodString;
        utils: z.ZodString;
        components: z.ZodString;
        lib: z.ZodString;
        ui: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    }, {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    }>;
}, "strict", z.ZodTypeAny, {
    tailwind: {
        theme: string;
        css: string;
        cssVariables: boolean;
        config?: string | undefined;
        prefix?: string | undefined;
    };
    style: string;
    tsx: boolean;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    resolvedPaths: {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    };
    $schema?: string | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}, {
    tailwind: {
        theme: string;
        css: string;
        config?: string | undefined;
        cssVariables?: boolean | undefined;
        prefix?: string | undefined;
    };
    style: string;
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
    };
    resolvedPaths: {
        components: string;
        utils: string;
        ui: string;
        lib: string;
        cwd: string;
        tailwindConfig: string;
        tailwindCss: string;
    };
    $schema?: string | undefined;
    tsx?: boolean | undefined;
    registries?: Record<string, string | {
        url: string;
        params?: Record<string, string> | undefined;
        headers?: Record<string, string> | undefined;
    }> | undefined;
}>>;

export { type Registry, type RegistryItem, configSchema, rawConfigSchema, registryConfigItemSchema, registryConfigSchema, registryIndexSchema, registryItemCssSchema, registryItemCssVarsSchema, registryItemEnvVarsSchema, registryItemSchema, registryItemTailwindSchema, registryItemTypeSchema, registryResolvedItemsTreeSchema, registrySchema, stylesSchema, workspaceConfigSchema };
