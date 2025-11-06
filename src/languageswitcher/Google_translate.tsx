import React, { useEffect, useState } from "react";
import "./Google_translate.css";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scriptId = "google-translate-script";

    // Define callback function (must be on window for Google API)
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        setLoading(false);
      }
    };

    // Load Google Translate script if not already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element"></div>
      {loading && (
        <span className="google-translate-loading">Loading translator...</span>
      )}
    </div>
  );
};

export default GoogleTranslate;
