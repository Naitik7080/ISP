const plan = JSON.parse(sessionStorage.getItem("selectedPlan") || "null");

if (!plan) {
  // No plan chosen yet — send back to plans page.
  window.location.href = "index.html";
}

document.getElementById("summaryStrip").innerHTML = `
  <span class="s-plan">${plan.name} Plan · ${plan.days}</span>
  <span class="s-amount">&#8377;${plan.price}</span>
`;

const form = document.getElementById("customerForm");
const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const custIdInput = document.getElementById("custId");

mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);
});

function setValid(fieldId, isValid) {
  document.getElementById(fieldId).classList.toggle("invalid", !isValid);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const custId = custIdInput.value.trim();

  const nameValid = name.length >= 2;
  const mobileValid = /^[6-9]\d{9}$/.test(mobile);

  setValid("nameField", nameValid);
  setValid("mobileField", mobileValid);

  if (!nameValid || !mobileValid) return;

  sessionStorage.setItem(
    "customerDetails",
    JSON.stringify({ name, mobile, custId })
  );
  window.location.href = "payment.html";
});
