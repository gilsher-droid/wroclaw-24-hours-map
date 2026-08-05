const statusLabel = document.querySelector("#access-status");
const logoutButton = document.querySelector("#logout-button");
const API_ORIGIN = "https://api.wroc-love.com";
const tr = (text) => window.WROC_I18N?.t(text) || text;

function accessUrl() {
  return `/access.html?lang=${window.WROC_I18N?.language || "he"}`;
}

fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" })
  .then((response) => response.json())
  .then((result) => {
    if (!result.active) return window.location.replace(accessUrl());
    if (result.expiresAt) {
      const locale = window.WROC_I18N?.language === "pl" ? "pl-PL" : window.WROC_I18N?.language === "en" ? "en-GB" : "he-IL";
      statusLabel.textContent = `${tr("גישה פעילה עד")} ${new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(result.expiresAt))}`;
    }
  })
  .catch(() => window.location.replace(accessUrl()));

logoutButton.addEventListener("click", async () => {
  await fetch(`${API_ORIGIN}/api/access/logout`, { method: "POST", credentials: "include" });
  window.location.replace(accessUrl());
});

document.addEventListener("wroc-language-change", () => {
  fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" })
    .then((response) => response.json())
    .then((result) => {
      if (!result.expiresAt) return;
      const locale = window.WROC_I18N.language === "pl" ? "pl-PL" : window.WROC_I18N.language === "en" ? "en-GB" : "he-IL";
      statusLabel.textContent = `${tr("גישה פעילה עד")} ${new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(result.expiresAt))}`;
    })
    .catch(() => {});
});
