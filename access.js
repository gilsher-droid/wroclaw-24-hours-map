const form = document.querySelector("#access-form");
const codeInput = document.querySelector("#access-code");
const message = document.querySelector("#form-message");
const API_ORIGIN = "https://api.wroc-love.com";
const tr = (text) => window.WROC_I18N?.t(text) || text;

function premiumUrl() {
  return `/premium.html?lang=${window.WROC_I18N?.language || "he"}`;
}

const params = new URLSearchParams(window.location.search);
if (params.get("purchase") === "not-ready") {
  message.textContent = tr("הרכישה עדיין אינה פעילה. בקרוב נחבר תשלום מאובטח.");
}

fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" })
  .then((response) => response.json())
  .then((result) => {
    if (result.active) window.location.replace(premiumUrl());
  })
  .catch(() => {});

codeInput.addEventListener("input", () => {
  const compact = codeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^WROC/, "");
  const parts = compact.match(/.{1,4}/g) || [];
  codeInput.value = ["WROC", ...parts.slice(0, 3)].join("-");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = tr("בודקים את הקוד…");
  message.textContent = "";

  try {
    const response = await fetch(`${API_ORIGIN}/api/access/verify`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: codeInput.value }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(tr(result.error || "לא הצלחנו לאמת את הקוד."));
    message.textContent = tr("הקוד אושר. מעבירים אתכם למסלול…");
    window.location.replace(premiumUrl());
  } catch (error) {
    message.textContent = error.message;
    button.disabled = false;
    button.textContent = tr("כניסה למסלול");
  }
});
