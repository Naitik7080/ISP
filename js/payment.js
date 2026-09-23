const plan = JSON.parse(sessionStorage.getItem("selectedPlan") || "null");
const customer = JSON.parse(sessionStorage.getItem("customerDetails") || "null");

if (!plan || !customer) {
  window.location.href = "index.html";
}

document.getElementById("payPlan").textContent = `${plan.name} Plan`;
document.getElementById("payAmount").innerHTML = `&#8377;${plan.price}`;

// Phase 2 placeholder only: a real order is created on the backend
// (POST /api/orders) the moment the user reaches this page, and the
// button below should call GET /api/orders/:orderId instead of
// generating an ID locally like this.
function makeOrderId() {
  const existing = sessionStorage.getItem("orderId");
  if (existing) return existing;
  const id = "WIFI-" + Math.floor(10000 + Math.random() * 90000);
  sessionStorage.setItem("orderId", id);
  return id;
}

document.getElementById("paidBtn").addEventListener("click", () => {
  makeOrderId();
  window.location.href = "status.html";
});
