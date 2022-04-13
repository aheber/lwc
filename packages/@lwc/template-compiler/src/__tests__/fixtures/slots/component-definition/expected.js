import _xFoo from "x/foo";
import _implicitStylesheets from "./component.css";
import _implicitScopedStylesheets from "./component.scoped.css?scoped=true";
import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
const stc1 = {
  key: 1,
};
const stc2 = [];
function tmpl($api, $cmp, $slotset, $ctx) {
  const { s: api_slot, c: api_custom_element } = $api;
  return [
    api_custom_element("x-foo", _xFoo, stc0, [
      api_slot("", stc1, stc2, $slotset),
    ]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(
  tmpl,
  1,
  [""],
  "myToken",
  _implicitStylesheets,
  _implicitScopedStylesheets
);
