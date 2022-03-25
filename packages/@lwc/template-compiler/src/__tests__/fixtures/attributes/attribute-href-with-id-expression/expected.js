import { registerTemplate, renderApi } from "lwc";
const {
  fid: api_scoped_frag_id,
  t: api_text,
  so: api_set_owner,
  h: api_element,
  gid: api_scoped_id,
} = renderApi;
const $hoisted1 = api_text("KIX", true);
const $hoisted2 = api_text("Time to travel!", true);
const stc0 = {
  key: 1,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  return [
    api_element(
      "a",
      {
        attrs: {
          href: api_scoped_frag_id($cmp.narita),
        },
        key: 0,
      },
      [api_set_owner($hoisted1)]
    ),
    api_element("map", stc0, [
      api_element("area", {
        attrs: {
          href: api_scoped_frag_id("#haneda"),
        },
        key: 2,
      }),
      api_element("area", {
        attrs: {
          href: api_scoped_frag_id("#chubu"),
        },
        key: 3,
      }),
    ]),
    api_element(
      "h1",
      {
        attrs: {
          id: api_scoped_id("#narita"),
        },
        key: 4,
      },
      [api_set_owner($hoisted2)]
    ),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
