const servicePicker = document.querySelector("#service-picker");

if (servicePicker) {
  const checkboxes = [...servicePicker.querySelectorAll('input[type="checkbox"][data-service]')];
  const selectionCount = servicePicker.querySelector("#selection-count");
  const orderCount = servicePicker.querySelector("#order-count");
  const orderTotal = servicePicker.querySelector("#order-total");
  const sendOrder = servicePicker.querySelector("#send-order");
  const formatPrice = (amount) =>
    `UGX ${new Intl.NumberFormat("en-UG").format(amount)}`;

  const updateSelection = () => {
    const selected = checkboxes.filter((checkbox) => checkbox.checked);
    const listedTotal = selected.reduce(
      (total, checkbox) => total + Number(checkbox.dataset.price || 0),
      0,
    );
    const delivery = selected.find((checkbox) =>
      checkbox.dataset.service.toLowerCase().includes("pickup and delivery"),
    );
    const orderSubtotal = listedTotal - (delivery ? Number(delivery.dataset.price || 0) : 0);
    const eligibleForFreeDelivery = delivery && orderSubtotal > 50000;
    const estimate = listedTotal;

    selectionCount.textContent = `${selected.length} selected`;
    orderCount.textContent = selected.length
      ? `${selected.length} ${selected.length === 1 ? "service" : "services"} selected`
      : "No services selected yet";
    orderTotal.textContent = selected.length
      ? `Listed-price estimate: ${formatPrice(estimate)}${eligibleForFreeDelivery ? " · free delivery may apply within 5km" : ""}`
      : "Choose services to see your listed-price estimate.";
    sendOrder.disabled = selected.length === 0;
  };

  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateSelection));
  sendOrder.addEventListener("click", () => {
    const selected = checkboxes.filter((checkbox) => checkbox.checked);
    if (!selected.length) return;

    const listedTotal = selected.reduce(
      (total, checkbox) => total + Number(checkbox.dataset.price || 0),
      0,
    );
    const delivery = selected.find((checkbox) =>
      checkbox.dataset.service.toLowerCase().includes("pickup and delivery"),
    );
    const orderSubtotal = listedTotal - (delivery ? Number(delivery.dataset.price || 0) : 0);
    const mayQualifyForFreeDelivery = delivery && orderSubtotal > 50000;
    const estimate = listedTotal;
    const lines = selected.map((checkbox) => {
      const price = Number(checkbox.dataset.price || 0);
      const listedPrice = checkbox.closest(".price-row").querySelector("strong").textContent;
      return `• ${checkbox.dataset.service} — ${listedPrice}${price === 0 ? " (quote requested)" : ""}`;
    });
    const message = [
      "Hello FreshStep! I’d like to request these services:",
      ...lines,
      `Estimated listed total: ${formatPrice(estimate)}${mayQualifyForFreeDelivery ? " (free delivery may apply for orders above UGX 50,000 within 5km)" : ""}.`,
      "Please confirm availability and final price. My area and preferred pickup time are: ",
    ].join("\n");
    window.open(
      `https://wa.me/256755217588?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  });

  updateSelection();
}
