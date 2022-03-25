import _xCustomComponent from "x/customComponent";
import { registerTemplate, renderApi } from "lwc";
const {
  h: api_element,
  so: api_set_owner,
  c: api_custom_element,
  t: api_text,
} = renderApi;
const $hoisted1 = api_element(
  "unknonwtag",
  {
    key: 0,
  },
  [],
  true
);
const $hoisted2 = api_element(
  "span",
  {
    key: 2,
  },
  [api_text("valid tags should not warn")],
  true
);
const $hoisted3 = api_element(
  "spam",
  {
    key: 3,
  },
  [api_text("this tag has a typo")],
  true
);
const stc0 = {
  props: {
    someTruthyValue: true,
  },
  key: 1,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  return [
    api_set_owner($hoisted1),
    api_custom_element("x-custom-component", _xCustomComponent, stc0),
    api_set_owner($hoisted2),
    api_set_owner($hoisted3),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
