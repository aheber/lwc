import _xFoo from "x/foo";
import { registerTemplate, renderApi } from "lwc";
const { h: api_element, t: api_text, c: api_custom_element } = renderApi;
const $hoisted1 = api_element(
  "input",
  {
    attrs: {
      required: "",
    },
    props: {
      value: "boolean present",
    },
    key: 0,
  },
  [],
  true
);
const $hoisted2 = api_element(
  "input",
  {
    attrs: {
      required: "",
    },
    props: {
      value: "empty string",
    },
    key: 1,
  },
  [],
  true
);
const $hoisted3 = api_element(
  "input",
  {
    attrs: {
      required: "other than true",
    },
    props: {
      value: "string value",
    },
    key: 2,
  },
  [],
  true
);
const $hoisted4 = api_element(
  "input",
  {
    attrs: {
      required: "3",
    },
    props: {
      value: "integer value",
    },
    key: 4,
  },
  [],
  true
);
const stc0 = {
  value: "computed value",
};
const stc1 = {
  props: {
    required: true,
  },
  key: 5,
};
const stc2 = {
  props: {
    required: "",
  },
  key: 6,
};
const stc3 = {
  props: {
    required: "other than true",
  },
  key: 7,
};
const stc4 = {
  props: {
    required: "3",
  },
  key: 9,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  return [
    $hoisted1,
    $hoisted2,
    $hoisted3,
    api_element("input", {
      attrs: {
        required: $cmp.computed ? "" : null,
      },
      props: stc0,
      key: 3,
    }),
    $hoisted4,
    api_custom_element("x-foo", _xFoo, stc1, [api_text("boolean present")]),
    api_custom_element("x-foo", _xFoo, stc2, [api_text("empty string")]),
    api_custom_element("x-foo", _xFoo, stc3, [api_text("string value")]),
    api_custom_element(
      "x-foo",
      _xFoo,
      {
        props: {
          required: $cmp.computed,
        },
        key: 8,
      },
      [api_text("computed value, should be resolved in component")]
    ),
    api_custom_element("x-foo", _xFoo, stc4, [api_text("integer value")]),
  ];
  /*LWC compiler vX.X.X*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
