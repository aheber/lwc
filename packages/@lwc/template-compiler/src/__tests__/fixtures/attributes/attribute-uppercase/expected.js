import _xButton from "x/button";
import _implicitStylesheets from "./component.css";
import _implicitScopedStylesheets from "./component.scoped.css?scoped=true";
import { registerTemplate } from "lwc";
const stc0 = {
  props: {
    Class: "r",
    DataXx: "foo",
    AriaHidden: "hidden",
    Role: "xx",
    FooBar: "x",
    FooZaz: "z",
    Foo_bar_baz: "baz",
  },
  key: 0,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { c: api_custom_element } = $api;
  return [api_custom_element("x-button", _xButton, stc0)];
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
