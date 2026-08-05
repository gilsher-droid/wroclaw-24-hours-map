const form = document.querySelector("#admin-form");
const secretInput = document.querySelector("#admin-secret");
const labelInput = document.querySelector("#customer-label");
const resultBox = document.querySelector("#generated-code");
const codeValue = document.querySelector("#code-value");
const message = document.querySelector("#admin-message");
const API_ORIGIN = "https://api.wroc-love.com";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultBox.hidden = true;
  message.textContent = "";
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    const response = await fetch(`${API_ORIGIN}/api/admin/codes`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json", authorization: `Bearer ${secretInput.value}` },
      body: JSON.stringify({ label: labelInput.value, validDays: 30 }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "לא ניתן להפיק קוד.");
    codeValue.textContent = result.code;
    resultBox.hidden = false;
    labelInput.value = "";
  } catch (error) {
    message.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

document.querySelector("#copy-code").addEventListener("click", async () => {
  await navigator.clipboard.writeText(codeValue.textContent);
  message.textContent = "הקוד הועתק.";
});
