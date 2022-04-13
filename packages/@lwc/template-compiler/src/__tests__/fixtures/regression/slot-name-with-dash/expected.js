import _implicitStylesheets from "./component.css";
import _implicitScopedStylesheets from "./component.scoped.css?scoped=true";
import { registerTemplate } from "lwc";
const stc0 = {
  attrs: {
    name: "secret-slot",
  },
  key: 0,
};
const stc1 = {
  key: "@secret-slot:1",
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, h: api_element, s: api_slot } = $api;
  return [
    api_slot(
      "secret-slot",
      stc0,
      [api_element("p", stc1, [api_text("Test slot content")])],
      $slotset
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(
  tmpl,
  1,
  ["secret-slot"],
  "myToken",
  _implicitStylesheets,
  _implicitScopedStylesheets
);
