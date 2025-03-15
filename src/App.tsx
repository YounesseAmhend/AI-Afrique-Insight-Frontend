import { useTranslation } from "react-i18next";

function App() {
    // The `t()` function gives us
    // access to the active locale's
    // translations.
    const { t } = useTranslation();

    return (
        <div className='...'>
            {/* We pass the key we provided under
          `resources.translation` in 
          src/i18n/config.ts */}
            <h2>{t("hello_world")}</h2>
        </div>
    );
}

export default App;
