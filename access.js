const form = document.querySelector("#access-form");
const codeInput = document.querySelector("#access-code");
const message = document.querySelector("#form-message");
const API_ORIGIN = "https://api.wroc-love.com";

const params = new URLSearchParams(window.location.search);
if (params.get("purchase") === "not-ready") {
  message.textContent = "הרכישה עדיין אינה פעילה. בקרוב נחבר תשלום מאובטח.";
}

fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" })
  .then((response) => response.json())
  .then((result) => {
    if (result.active) window.location.replace("/premium.html");
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
  button.textContent = "בודקים את הקוד…";
  message.textContent = "";

  try {
    const response = await fetch(`${API_ORIGIN}/api/access/verify`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: codeInput.value }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "לא הצלחנו לאמת את הקוד.");
    message.textContent = "הקוד אושר. מעבירים אתכם למסלול…";
    window.location.replace("/premium.html");
  } catch (error) {
    message.textContent = error.message;
    button.disabled = false;
    button.textContent = "כניסה למסלול";
  }
});
