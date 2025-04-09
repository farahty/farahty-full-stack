import { DevTools, Tolgee, FormatSimple } from "@tolgee/react";

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export function TolgeeBase() {
  return Tolgee().use(FormatSimple()).use(DevTools()).updateDefaults({
    apiKey,
    apiUrl,
  });
}
