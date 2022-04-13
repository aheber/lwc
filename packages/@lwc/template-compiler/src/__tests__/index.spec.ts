/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import compiler from '../index';

describe('option validation', () => {
    it('validated presence of options', () => {
        expect(() => {
            // @ts-ignore
            compiler(`<template></template>`);
        }).toThrow(/Compiler options must be an object/);
    });

    it('throws for unknown compiler option', () => {
        expect(() => {
            compiler(`<template></template>`, {
                foo: true,
                filename: 'file.html',
                stylesheetToken: 'myToken',
            } as any);
        }).toThrow(/Unknown option property foo/);
    });

    it('throws for missing required option stylesheetToken', () => {
        expect(() => {
            compiler(`<template></template>`, { filename: 'file.html' } as any);
        }).toThrow(/Missing required option stylesheetToken/);
    });

    it('throws for missing required option filename', () => {
        expect(() => {
            compiler(`<template></template>`, { stylesheetToken: 'myToken' } as any);
        }).toThrow(/Missing required option filename/);
    });
});
