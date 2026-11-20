const bot = document.querySelector("[data-freshbot]");

if (bot) {
  const panel = bot.querySelector(".freshbot-panel");
  const launch = bot.querySelector(".freshbot-launch");
  const close = bot.querySelector(".freshbot-close");
  const form = bot.querySelector(".freshbot-form");
  const input = bot.querySelector("#freshbot-input");
  const messages = bot.querySelector(".freshbot-messages");

  const addMessage = (text, sender, link) => {
    const message = document.createElement("p");
    message.className = `${sender}-message`;
    message.textContent = text;

    if (link) {
      const action = document.createElement("a");
      action.href = link.href;
      action.textContent = link.label;
      action.target = "_blank";
      action.rel = "noreferrer";
      message.append(document.createElement("br"), action);
    }

    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const replyTo = (question) => {
    const text = question.toLowerCase();

    if (/(area|where|deliver|pickup|pick up|entebbe|namasuba|zana|seguku|makindye|stella|najjanankumbi)/.test(text)) {
      return {
        text: "We serve Entebbe, Namasuba, Najjanankumbi, Zana, Seguku, Makindye, Stella and more. Message us with your exact location and we’ll confirm availability.",
        link: {
          href: "https://wa.me/256755217588?text=Hello%20FreshStep%2C%20please%20confirm%20pickup%20availability%20in%20my%20area.",
          label: "Check my area on WhatsApp",
        },
      };
    }

    if (/(open|hour|24|time|today|daily)/.test(text)) {
      return {
        text: "FreshStep is open 24 hours daily. Message us any time to ask about services and arrange a pickup.",
        link: { href: "https://wa.me/256755217588", label: "Message FreshStep" },
      };
    }

    if (/(express|urgent|fast|6.hour)/.test(text)) {
      return {
        text: "Our express service is a 6-hour option for an additional UGX 10,000. Please message us to confirm availability for your items.",
        link: { href: "services.html#extras", label: "See express service details" },
      };
    }

    if (/(bulk|bulky|duvet|blanket|hotel|hospital|clinic|business|school|student|family|kid|child|quote|quotation)/.test(text)) {
      return {
        text: "We care for family and student laundry, hotel linens, clinic and hospital non-infectious washable items, and bulky household loads. Business plans are quoted to fit your needs.",
        link: { href: "customers.html", label: "See who we serve" },
      };
    }

    if (/(price|cost|service|menu|laundry|shoe|garment)/.test(text)) {
      return {
        text: "Our menu includes wash, dry & fold packages, individual garment care, shoe cleaning, bulky household laundry, express service and memberships. Choose items and send your request from the full service menu.",
        link: { href: "services.html", label: "Browse services & prices" },
      };
    }

    if (/(book|order|whatsapp|human|team|contact|help)/.test(text)) {
      return {
        text: "Our team is ready to help. Send us the service you need, your area and a preferred pickup time.",
        link: {
          href: "https://wa.me/256755217588?text=Hello%20FreshStep%2C%20I%27d%20like%20help%20with%20a%20booking.",
          label: "Continue on WhatsApp",
        },
      };
    }

    return {
      text: "I can help with services and prices, service areas, express laundry, business care or our opening hours. What would you like to know?",
    };
  };

  const sendQuestion = (question) => {
    const cleaned = question.trim();
    if (!cleaned) return;
    addMessage(cleaned, "user");
    const answer = replyTo(cleaned);
    addMessage(answer.text, "bot", answer.link);
  };

  const setOpen = (isOpen) => {
    panel.hidden = !isOpen;
    launch.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) input.focus();
  };

  launch.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendQuestion(input.value);
    input.value = "";
    input.focus();
  });

  bot.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => sendQuestion(button.dataset.prompt));
  });
}
