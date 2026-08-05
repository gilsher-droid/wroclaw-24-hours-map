const statusLabel = document.querySelector("#access-status");
const logoutButton = document.querySelector("#logout-button");
const API_ORIGIN = "https://api.wroc-love.com";

fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" })
  .then((response) => response.json())
  .then((result) => {
    if (!result.active) return window.location.replace("/access.html");
    if (result.expiresAt) {
      statusLabel.textContent = `גישה פעילה עד ${new Intl.DateTimeFormat("he-IL", { dateStyle: "medium" }).format(new Date(result.expiresAt))}`;
    }
  })
  .catch(() => window.location.replace("/access.html"));

logoutButton.addEventListener("click", async () => {
  await fetch(`${API_ORIGIN}/api/access/logout`, { method: "POST", credentials: "include" });
  window.location.replace("/access.html");
});
