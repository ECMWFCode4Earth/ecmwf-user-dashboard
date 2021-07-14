/**
 * All constants start with letter k.
 * E.g. kSize, kColor, etc.
 * */


export const kFontFamily = {
  HEADING: "\"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif",
  BODY: "\"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif"
};


export const kFont = {

  HEADING_2XL: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "1.5rem", // 24px
    lineHeight: 1.25,
    letterSpacing: "0em",
  },

  HEADING_XL: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25,
    letterSpacing: "0.01em",
  },

  HEADING_LG: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.25
  },

  HEADING_MD: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "1rem", // 16px
    lineHeight: 1.25
  },

  HEADING_SM: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.5
  },

  HEADING_XS: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "0.75rem", // 12px
    lineHeight: 1.5
  },

  HEADING_XXS: {
    fontFamily: kFontFamily.HEADING,
    fontWeight: 700,
    fontSize: "0.625rem", // 10px
    lineHeight: 1.5
  },

  BODY_2XL: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "1.5rem", // 24px
    lineHeight: 1.25
  },

  BODY_XL: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25
  },

  BODY_LG: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.25
  },

  BODY_MD: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "1rem", // 16px
    lineHeight: 1.25
  },

  BODY_SM: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.5
  },

  BODY_XS: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "0.75rem", // 12px
    lineHeight: 1.5
  },

  BODY_XXS: {
    fontFamily: kFontFamily.BODY,
    fontWeight: 400,
    fontSize: "0.625rem", // 10px
    lineHeight: 1.5
  },

};


export const kColor = {

  GREY: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B"
  },

  BLACK: "#333333",

  WHITE: "#FFFFFF"

};


export const kSize = {

  WIDGET_TITLE_BAR: "32px",
  WIDGET_TITLE_BAR_HIDDEN: "8px",
  TEMPLATE_HEADER_HEIGHT: "48px",
  TEMPLATE_FOOTER_HEIGHT: "50px",

};


export const kBorder = {

  WIDGET_BORDER: "2px solid black",

};


export const kName = {

  CLASS_NO_DRAG: "noDrag", // noDrag is special className - can't click and drag element across grid.

};


export const kStore = {

  BASE_URL: "http://127.0.0.1:8000", // TODO Refactor base to env variable

};
