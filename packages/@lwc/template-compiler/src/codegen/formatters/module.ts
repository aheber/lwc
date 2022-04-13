/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import path from 'path';
import * as t from '../../shared/estree';
import { kebabcaseToCamelcase } from '../../shared/naming';
import {
    SECURE_REGISTER_TEMPLATE_METHOD_NAME,
    LWC_MODULE_NAME,
    SCOPED_STYLESHEETS_NAME,
    STYLESHEETS_NAME,
} from '../../shared/constants';

import CodeGen from '../codegen';
import { identifierFromComponentName, generateRegisterTemplateDeclaration } from '../helpers';
import { optimizeStaticExpressions } from '../optimize';

function generateComponentImports(codeGen: CodeGen): t.ImportDeclaration[] {
    return Array.from(codeGen.referencedComponents).map((name) => {
        const localIdentifier = identifierFromComponentName(name);

        return t.importDeclaration(
            [t.importDefaultSpecifier(localIdentifier)],
            t.literal(kebabcaseToCamelcase(name))
        );
    });
}

function generateStylesheetImports(codeGen: CodeGen): t.ImportDeclaration[] {
    const { filename } = codeGen;
    return [false, true].map((scoped) => {
        const localIdentifier = t.identifier(scoped ? SCOPED_STYLESHEETS_NAME : STYLESHEETS_NAME);
        const cssRelativePath = `./${path.basename(filename, path.extname(filename))}${
            scoped ? '.scoped.css?scoped=true' : '.css'
        }`;

        return t.importDeclaration(
            [t.importDefaultSpecifier(localIdentifier)],
            t.literal(cssRelativePath)
        );
    });
}

function generateLwcApisImport(codeGen: CodeGen): t.ImportDeclaration {
    const imports = Array.from(codeGen.usedLwcApis)
        .sort()
        .map((name) => {
            return t.importSpecifier(t.identifier(name), t.identifier(name));
        });

    return t.importDeclaration(imports, t.literal(LWC_MODULE_NAME));
}

/**
 * Generate an ES module AST from a template ESTree AST. The generated module imports the dependent
 * LWC components via import statements and expose the template function via a default export
 * statement.
 *
 * @example
 * ```js
 * import { registerTemplate } from 'lwc';
 * // Components imports
 *
 * function tmpl() {
 *   // Template generated code
 * }
 * // Template metadata
 *
 * export default tmpl;
 * registerTemplate(tmpl);
 * ```
 */
export function format(templateFn: t.FunctionDeclaration, codeGen: CodeGen): t.Program {
    codeGen.usedLwcApis.add(SECURE_REGISTER_TEMPLATE_METHOD_NAME);

    const imports = [
        ...generateComponentImports(codeGen),
        ...generateStylesheetImports(codeGen),
        generateLwcApisImport(codeGen),
    ];

    const optimizedTemplateDeclarations = optimizeStaticExpressions(templateFn);

    const templateBody = [
        ...optimizedTemplateDeclarations,
        generateRegisterTemplateDeclaration(codeGen),
    ];

    return t.program([...imports, ...templateBody]);
}
