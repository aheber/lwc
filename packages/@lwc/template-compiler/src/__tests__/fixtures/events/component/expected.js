import _nsFoo from "ns/foo";
import _implicitStylesheets from "./component.css";
import _implicitScopedStylesheets from "./component.scoped.css?scoped=true";
import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { b: api_bind, c: api_custom_element, h: api_element } = $api;
  const { _m0 } = $ctx;
  return [
    api_element("section", stc0, [
      api_custom_element("ns-foo", _nsFoo, {
        key: 1,
        on: {
          foo: _m0 || ($ctx._m0 = api_bind($cmp.handleFoo)),
        },
      }),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(
  tmpl,
  1,
  undefined,
  "myToken",
  _implicitStylesheets,
  _implicitScopedStylesheets
);
