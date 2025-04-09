import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"];
export const defaultLocale = "en";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});

const getPathnameRegex = (pages: string[]) =>
  RegExp(
    `^(/(${locales.join("|")}))?(${pages
      .flatMap((p) => {
        if (typeof p === "string" && p.endsWith("/**")) {
          return p.substring(0, p.length - 2) + ".+";
        }
        return p === "/" ? ["", "/"] : p;
      })
      .join("|")})/?$`,
    "i"
  );

export const publicRoutes = getPathnameRegex([
  "/",
  "/terms/",
  "/products/",
  "/products/**",
  "/checkout/cart/",
]);
export const authRoutes = getPathnameRegex([
  "/login",
  "/register",
  "/rest-password",
]);

export const defaultRoute = "/";

export function isRTL(locale: string) {
  return locale === "ar";
}
export function getDirection(locale: string) {
  return isRTL(locale) ? "rtl" : "ltr";
}
export function getTextAlign(locale: string) {
  return isRTL(locale) ? "right" : "left";
}
