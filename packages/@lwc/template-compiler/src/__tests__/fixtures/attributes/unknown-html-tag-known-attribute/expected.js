import { registerTemplate, renderApi } from "lwc";
const { h: api_element, so: api_set_owner } = renderApi;
const $hoisted1 = api_element(
  "somefancytag",
  {
    attrs: {
      min: "4",
    },
    key: 0,
  },
  [],
  true
);
function tmpl($api, $cmp, $slotset, $ctx) {
  return [api_set_owner($hoisted1)];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
