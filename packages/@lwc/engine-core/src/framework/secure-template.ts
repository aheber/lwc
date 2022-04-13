/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { ArrayPush, defineProperty, isUndefined } from '@lwc/shared';
import { Template } from './template';
import { checkVersionMismatch } from './check-version-mismatch';
import { TemplateStylesheetFactories } from './stylesheet';
import { flattenStylesheets } from './utils';
import { RenderMode } from './vm';

const signedTemplateSet: Set<Template> = new Set();

export function defaultEmptyTemplate() {
    return [];
}
signedTemplateSet.add(defaultEmptyTemplate);

export function isTemplateRegistered(tpl: Template): boolean {
    return signedTemplateSet.has(tpl);
}

function attachStylesheets(
    tmpl: Template,
    stylesheetToken: string,
    stylesheetLists: Array<TemplateStylesheetFactories | undefined>
) {
    tmpl.stylesheetToken = stylesheetToken;
    tmpl.stylesheets = [];
    for (const stylesheets of stylesheetLists) {
        if (!isUndefined(stylesheets)) {
            ArrayPush.apply(tmpl.stylesheets, stylesheets);
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        for (const stylesheet of flattenStylesheets(tmpl.stylesheets)) {
            checkVersionMismatch(stylesheet, 'stylesheet');
        }
        // TODO [#2782]: freeze the template function so that dynamically changing these is not possible
        for (const prop of ['stylesheetToken', 'stylesheets'] as const) {
            let value = tmpl[prop];
            defineProperty(tmpl, prop, {
                get() {
                    return value;
                },
                set(newValue) {
                    // eslint-disable-next-line no-console
                    console.error(
                        `Dynamically setting the "${prop}" property on a template function ` +
                            `is deprecated and may be removed in a future version of LWC.`
                    );
                    value = newValue;
                },
            });
        }
    }
}

/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */
export function registerTemplate(
    tmpl: Template,
    renderMode: RenderMode,
    slots: string[] | undefined,
    stylesheetToken: string,
    ...stylesheetLists: Array<TemplateStylesheetFactories | undefined>
): Template {
    if (process.env.NODE_ENV !== 'production') {
        checkVersionMismatch(tmpl, 'template');
    }
    signedTemplateSet.add(tmpl);

    if (renderMode === RenderMode.Light) {
        tmpl.renderMode = 'light';
    }

    if (!isUndefined(slots) && slots.length > 0) {
        tmpl.slots = slots;
    }

    attachStylesheets(tmpl, stylesheetToken, stylesheetLists);

    // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation
    return tmpl;
}

/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize vulnerable attributes.
 */
export function sanitizeAttribute(
    tagName: string,
    namespaceUri: string,
    attrName: string,
    attrValue: any
): string {
    // locker-service patches this function during runtime to sanitize vulnerable attributes. When
    // ran off-core this function becomes a noop and returns the user authored value.
    return attrValue;
}
