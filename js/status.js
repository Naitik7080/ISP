const plan = JSON.parse(sessionStorage.getItem("selectedPlan") || "null");
const customer = JSON.parse(sessionStorage.getItem("customerDetails") || "null");
const orderId = sessionStorage.getItem("orderId");

if (!plan || !customer || !orderId) {
  window.location.href = "index.html";
}

// Phase 2 placeholder: shown as "PENDING" until the backend webhook
// (Phase 8) marks it SUCCESS/FAILED. Replace this with a real call to
// GET /api/orders/:orderId and re-render based on the response.
const paymentStatus = "PENDING";

const card = document.getElementById("resultCard");

const orderRows = `
  <div class="order-box">
    <div><span class="k">Order ID</span><span class="v">${orderId}</span></div>
    <div><span class="k">Customer</span><span class="v">${customer.name}</span></div>
    <div><span class="k">Plan</span><span class="v">${plan.name}</span></div>
    <div><span class="k">Amount</span><span class="v">&#8377;${plan.price}</span></div>
  </div>
`;

if (paymentStatus === "SUCCESS") {
  card.innerHTML = `
    <div class="status-icon success">&#10003;</div>
    <div class="result-title">Payment received</div>
    <p class="result-sub">Your Wi-Fi service will be activated within approximately 15 minutes.</p>
    ${orderRows}
  `;
} else if (paymentStatus === "FAILED") {
  card.innerHTML = `
    <div class="status-icon failed">&times;</div>
    <div class="result-title">Payment not received</div>
    <p class="result-sub">Please don't make another payment. If money was deducted, it will be refunded automatically.</p>
    ${orderRows}
  `;
} else {
  card.innerHTML = `
    <div class="status-icon pending">&#8987;</div>
    <div class="result-title">Payment verification pending</div>
    <p class="result-sub">Please don't make another payment. We'll update your status shortly — you can refresh this page to check again.</p>
    ${orderRows}
  `;
}
