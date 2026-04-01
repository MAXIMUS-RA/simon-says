import CookieConsent from "react-cookie-consent";

/**
 * GDPR Cookie Consent Banner
 * Відображається при першому відвідуванні.
 * Зберігає вибір користувача в cookie на 365 днів.
 */
function CookieBanner() {
   return (
      <CookieConsent
         location="bottom"
         buttonText="✅ Прийняти"
         declineButtonText="❌ Відхилити"
         enableDeclineButton
         cookieName="simon_says_gdpr_consent"
         style={{
            background: "#1a1a2e",
            color: "#eaeaea",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            zIndex: 9999,
            borderTop: "2px solid #4f46e5",
         }}
         buttonStyle={{
            background: "#4f46e5",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "13px",
            border: "none",
            cursor: "pointer",
         }}
         declineButtonStyle={{
            background: "transparent",
            color: "#f87171",
            border: "1px solid #f87171",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "13px",
            cursor: "pointer",
         }}
         expires={365}
         onAccept={() => {
            console.log("[GDPR] User accepted cookies");
         }}
         onDecline={() => {
            console.log("[GDPR] User declined optional cookies");
         }}
      >
         🍪 Цей сайт використовує <strong>cookies</strong> для збереження налаштувань гри та результатів. Це необхідно
         для роботи застосунку згідно з вимогами <strong>GDPR</strong>.{" "}
         <a href="https://github.com/MAXIMUS-RA/simon-says/blob/master/PRIVACY_POLICY.md" style={{ color: "#818cf8", textDecoration: "underline" }}>
            Дізнатись більше
         </a>
      </CookieConsent>
   );
}

export default CookieBanner;
