import { createElement, setFeatureFlagForTest } from 'lwc';
import { LOWERCASE_SCOPE_TOKENS } from 'test-utils';
import Light from 'x/light';
import Shadow from 'x/shadow';

describe('legacy scope tokens', () => {
    [false, true].forEach((enableLegacyScopeTokens) => {
        describe(`enableLegacyScopeTokens=${enableLegacyScopeTokens}`, () => {
            beforeEach(() => {
                setFeatureFlagForTest('ENABLE_LEGACY_SCOPE_TOKENS', enableLegacyScopeTokens);
            });

            afterEach(() => {
                setFeatureFlagForTest('ENABLE_LEGACY_SCOPE_TOKENS', false);
                // We keep a cache of parsed static fragments; these need to be reset
                // since they can vary based on whether we use the legacy scope token or not.
                window.__lwcResetFragmentCache();
            });

            function getAttributes(elm) {
                return [...elm.attributes]
                    .map((_) => _.name)
                    .filter((_) => _ !== 'class')
                    .sort();
            }

            function getClasses(elm) {
                return (
                    [...elm.classList]
                        // these are classes we add ourselves for the test
                        .filter((_) => !['static', 'dynamic', 'manual', 'expression'].includes(_))
                        .sort()
                );
            }

            function expectTokens(modern, legacy) {
                return [
                    ...new Set(
                        [
                            LOWERCASE_SCOPE_TOKENS ? modern : legacy,
                            enableLegacyScopeTokens && legacy,
                        ].filter(Boolean)
                    ),
                ].sort();
            }

            function expectShadowAttrTokens(modern, legacy) {
                if (process.env.NATIVE_SHADOW) {
                    return []; // no scope attributes added in native shadow
                }
                return expectTokens(modern, legacy);
            }

            it('light dom', async () => {
                const elm = createElement('x-light', { is: Light });
                document.body.appendChild(elm);

                const verify = () => {
                    const staticDiv = elm.querySelector('.static');
                    const dynamicDiv = elm.querySelector('.dynamic');
                    const expressionDiv = elm.querySelector('.expression');

                    expect(getClasses(elm)).toEqual(
                        expectTokens('lwc-1kadf5igpar-host', 'x-light_light-host')
                    );
                    expect(getClasses(staticDiv)).toEqual(
                        expectTokens('lwc-1kadf5igpar', 'x-light_light')
                    );
                    expect(getClasses(dynamicDiv)).toEqual(
                        expectTokens('lwc-1kadf5igpar', 'x-light_light')
                    );

                    expect(getClasses(expressionDiv)).toEqual(
                        expectTokens('lwc-1kadf5igpar', 'x-light_light')
                    );

                    expect(getAttributes(elm)).toEqual([]);
                    expect(getAttributes(staticDiv)).toEqual([]);
                    expect(getAttributes(dynamicDiv)).toEqual([]);
                    expect(getAttributes(expressionDiv)).toEqual([]);
                };

                await Promise.resolve();

                verify();

                // force re-render
                elm.rerender = 1;
                await Promise.resolve();

                verify();
            });

            it.skipIf(process.env.NATIVE_SHADOW)('shadow dom', async () => {
                const elm = createElement('x-shadow', { is: Shadow });
                document.body.appendChild(elm);

                const verify = () => {
                    const staticDiv = elm.shadowRoot.querySelector('.static');
                    const dynamicDiv = elm.shadowRoot.querySelector('.dynamic');
                    const manualDiv = elm.shadowRoot.querySelector('.manual');
                    const span = elm.shadowRoot.querySelector('span'); // inserted inside dom:manual
                    const expressionDiv = elm.shadowRoot.querySelector('.expression');

                    expect(getClasses(elm)).toEqual(
                        expectTokens('lwc-2idtulmc17f-host', 'x-shadow_shadow-host')
                    );
                    expect(getClasses(staticDiv)).toEqual(
                        expectTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getClasses(dynamicDiv)).toEqual(
                        expectTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getClasses(manualDiv)).toEqual(
                        expectTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getClasses(span)).toEqual([]);
                    expect(getClasses(expressionDiv)).toEqual(
                        expectTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );

                    expect(getAttributes(elm)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f-host', 'x-shadow_shadow-host')
                    );
                    expect(getAttributes(staticDiv)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getAttributes(dynamicDiv)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getClasses(manualDiv)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getAttributes(span)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                    expect(getAttributes(expressionDiv)).toEqual(
                        expectShadowAttrTokens('lwc-2idtulmc17f', 'x-shadow_shadow')
                    );
                };

                await Promise.resolve();

                verify();

                // force re-render
                elm.rerender = 1;
                await Promise.resolve();
                await Promise.resolve(); // second microtask is for MutationObserver callbacks (portal)

                verify();
            });
        });
    });
});
