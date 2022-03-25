import { registerTemplate, renderApi } from "lwc";
const { t: api_text, h: api_element, so: api_set_owner } = renderApi;
const $hoisted1 = api_element(
  "section",
  {
    key: 0,
  },
  [
    api_element(
      "p",
      {
        attrs: {
          title: "x",
          "aria-hidden": "x",
        },
        key: 1,
      },
      [api_text("x")]
    ),
  ],
  true
);
function tmpl($api, $cmp, $slotset, $ctx) {
  return [api_set_owner($hoisted1)];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
