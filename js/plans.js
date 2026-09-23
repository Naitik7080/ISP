// Placeholder plan data — Phase 2 (frontend only).
// In Phase 5 this will come from GET /api/plans instead of being hardcoded.
const PLANS = [
  { id: "daily", name: "Daily", days: "1 Day", price: 20 },
  { id: "weekly", name: "Weekly", days: "7 Days", price: 99, popular: true },
  { id: "monthly", name: "Monthly", days: "30 Days", price: 299 },
];

function renderPlans() {
  const list = document.getElementById("plansList");
  list.innerHTML = PLANS.map(
    (p) => `
    <div class="plan-card ${p.popular ? "popular" : ""}">
      <div class="plan-left">
        <div class="plan-name">${p.name}</div>
        <div class="plan-days">${p.days}</div>
      </div>
      <div class="plan-right">
        <div class="plan-price"><sup>&#8377;</sup>${p.price}</div>
        <button data-plan="${p.id}">Choose Plan</button>
      </div>
    </div>`
  ).join("");

  list.querySelectorAll("button[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = PLANS.find((p) => p.id === btn.dataset.plan);
      sessionStorage.setItem("selectedPlan", JSON.stringify(plan));
      window.location.href = "customer.html";
    });
  });
}

renderPlans();
