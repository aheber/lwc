/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import * as path from 'path';

import {
    CompilerError,
    normalizeToCompilerError,
    DiagnosticLevel,
    TransformerErrors,
} from '@lwc/errors';
import compile from '@lwc/template-compiler';

import { NormalizedTransformOptions } from '../options';
import { TransformResult } from './transformer';

type CreateStylesheetTokenOptions = {
    name: string | undefined;
    namespace: string | undefined;
    filename: string;
};

function createStylesheetToken({ name, namespace, filename }: CreateStylesheetTokenOptions) {
    return (
        `${namespace}-${name}_${path.basename(filename, path.extname(filename))}`
            // Minimal escape for strings containing the "@" character, which is disallowed in CSS selectors
            // and at the beginning of attribute names
            .replace(/@/g, '___at___')
    );
}

/**
 * Transforms a HTML template into module exporting a template function.
 * The transform also add a style import for the default stylesheet associated with
 * the template regardless if there is an actual style or not.
 */
export default function templateTransform(
    src: string,
    filename: string,
    options: NormalizedTransformOptions
): TransformResult {
    const { experimentalDynamicComponent, preserveHtmlComments } = options;
    const experimentalDynamicDirective = Boolean(experimentalDynamicComponent);
    const stylesheetToken = createStylesheetToken({
        filename,
        name: options.name,
        namespace: options.namespace,
    });

    let result;
    try {
        result = compile(src, {
            experimentalDynamicDirective,
            preserveHtmlComments,
            stylesheetToken,
            filename,
        });
    } catch (e) {
        throw normalizeToCompilerError(TransformerErrors.HTML_TRANSFORMER_ERROR, e, { filename });
    }

    const fatalError = result.warnings.find((warning) => warning.level === DiagnosticLevel.Error);
    if (fatalError) {
        throw CompilerError.from(fatalError, { filename });
    }

    // Rollup only cares about the mappings property on the map. Since producing a source map for
    // the template doesn't make sense, the transform returns an empty mappings.
    return {
        code: result.code,
        map: { mappings: '' },
    };
}
