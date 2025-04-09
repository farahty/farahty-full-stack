import { DevTools, Tolgee, FormatSimple } from "@tolgee/react";
import { defaultLocale } from "../routing";

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export function TolgeeBase() {
  return Tolgee()
    .use(FormatSimple())
    .use(DevTools())
    .updateDefaults({
      apiKey,
      apiUrl,
      fallbackLanguage: defaultLocale,
      staticData: {
        en: () => import("../../messages/en.json"),
        ar: () => import("../../messages/ar.json"),
      },
    });
}
