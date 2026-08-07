const message = document.querySelector("#checkout-message");
const container = document.querySelector("#paypal-button-container");
const API_ORIGIN = "https://api.wroc-love.com";
const tr = (text) => window.WROC_I18N?.t(text) || text;

function premiumUrl() {
  return `/products/interactive-maps/premium.html?lang=${window.WROC_I18N?.language || "he"}`;
}

function showError(text) {
  message.textContent = text;
  message.classList.add("error");
}

async function requestJson(url, options) {
  const response = await fetch(`${API_ORIGIN}${url}`, { credentials: "include", ...options });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(tr(result.error || "אירעה שגיאה. נסו שוב."));
  return result;
}

async function startCheckout() {
  const config = await requestJson("/api/paypal/config");
  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.clientId)}&currency=ILS&intent=capture&components=buttons`;
  script.onload = () => {
    message.textContent = tr("בחרו אמצעי תשלום להמשך:");
    window.paypal.Buttons({
      style: { layout: "vertical", shape: "rect", label: "paypal" },
      createOrder: async () => {
        const order = await requestJson("/api/paypal/orders", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
        return order.id;
      },
      onApprove: async (data) => {
        message.textContent = tr("מאשרים את התשלום ופותחים את המסלול…");
        const result = await requestJson(`/api/paypal/orders/${encodeURIComponent(data.orderID)}/capture`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
        if (result.active) window.location.replace(premiumUrl());
      },
      onCancel: () => { message.textContent = tr("התשלום בוטל ולא בוצע חיוב."); },
      onError: () => showError(tr("לא הצלחנו להשלים את התשלום. נסו שוב בעוד רגע.")),
    }).render(container);
  };
  script.onerror = () => showError(tr("לא ניתן לטעון את PayPal כרגע. נסו שוב מאוחר יותר."));
  document.head.appendChild(script);
}

startCheckout().catch((error) => showError(error.message));
