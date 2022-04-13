/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { TemplateErrors, invariant, generateCompilerError } from '@lwc/errors';
import { hasOwnProperty } from '@lwc/shared';

export interface Config {
    /**
     * Enable computed member expression in the template. eg:
     *    <template>
     *        {list[0].name}
     *    </template>
     */
    experimentalComputedMemberExpression?: boolean;
    /**
     * Enable <x-foo lwc:directive={expr}>
     */
    experimentalDynamicDirective?: boolean;

    /**
     * When true, HTML comments in the template will be preserved.
     */
    preserveHtmlComments?: boolean;
    /**
     * Unique string to use for style scoping.
     */
    stylesheetToken: string;
    /**
     * Filename of the template file to transform.
     */
    filename: string;
}

export type NormalizedConfig = Required<Config>;

const AVAILABLE_OPTION_NAMES = new Set([
    'experimentalComputedMemberExpression',
    'experimentalDynamicDirective',
    'preserveHtmlComments',
    'stylesheetToken',
    'filename',
]);

const REQUIRED_OPTION_NAMES = ['stylesheetToken', 'filename'] as const;

export function normalizeConfig(config: Config): NormalizedConfig {
    invariant(
        config !== undefined && typeof config === 'object',
        TemplateErrors.OPTIONS_MUST_BE_OBJECT
    );

    for (const property in config) {
        if (!AVAILABLE_OPTION_NAMES.has(property) && hasOwnProperty.call(config, property)) {
            throw generateCompilerError(TemplateErrors.UNKNOWN_OPTION_PROPERTY, {
                messageArgs: [property],
            });
        }
    }

    for (const property of REQUIRED_OPTION_NAMES) {
        if (!config[property]) {
            throw generateCompilerError(TemplateErrors.MISSING_REQUIRED_OPTION, {
                messageArgs: [property],
            });
        }
    }

    return {
        preserveHtmlComments: false,
        experimentalComputedMemberExpression: false,
        experimentalDynamicDirective: false,
        ...config,
    };
}
