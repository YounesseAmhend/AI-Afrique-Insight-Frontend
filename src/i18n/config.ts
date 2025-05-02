import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";


export const supportedLangs = {
    en: "English",
    fr: "French",
    ar: "Arabic (العربية)",
};
i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: "en", // Default language

        fallbackLng: "en", // Default to English for missing translations

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn
        // it off in i18next.
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
