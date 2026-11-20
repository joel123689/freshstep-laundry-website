const form = document.querySelector("#booking-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const request = [
      "Hello FreshStep! I’d like to request a pickup.",
      `Service: ${formData.get("service")}`,
      `Preferred date: ${formData.get("date")}`,
      `Preferred time: ${formData.get("time")}`,
      `Pickup area: ${formData.get("area")}`,
      `My WhatsApp number: ${formData.get("phone")}`,
      "Please confirm availability and pricing.",
    ].join("\n");
    window.location.href = `https://wa.me/256755217588?text=${encodeURIComponent(request)}`;
  });
}
