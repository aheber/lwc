import _nsBaz1 from "ns/baz1";
import _nsBaz2 from "ns/baz2";
import _implicitStylesheets from "./component.css";
import _implicitScopedStylesheets from "./component.scoped.css?scoped=true";
import { registerTemplate } from "lwc";
const stc0 = {
  props: {
    accessKey: "with-hyphen",
  },
  key: 0,
};
const stc1 = {
  props: {
    accessKey: "without-hyphen",
  },
  key: 1,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { c: api_custom_element } = $api;
  return [
    api_custom_element("ns-baz-1", _nsBaz1, stc0),
    api_custom_element("ns-baz-2", _nsBaz2, stc1),
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
