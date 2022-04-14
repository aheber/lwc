/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { isUndefined } from '@lwc/shared';
import { getCustomElement, defineLightningElement } from '../renderer';
import { LightningElementConstructor } from './base-lightning-element';

export function getUpgradableConstructor(
    tagName: string,
    ctor: LightningElementConstructor | CustomElementConstructor
): CustomElementConstructor {
    // Should never get a tag with upper case letter at this point, the compiler should
    // produce only tags with lowercase letters
    // But, for backwards compatibility, we will lower case the tagName
    tagName = tagName.toLowerCase();
    const CE = getCustomElement(tagName);
    if (!isUndefined(CE)) {
        return CE;
    }
    // since it is not defined, we assume it is a lightning element constructor to be defined
    return defineLightningElement(tagName, ctor as LightningElementConstructor);
}
