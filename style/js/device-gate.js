(function () {
  const PHONE_MAX_WIDTH = 767;
  const TABLET_MAX_WIDTH = 1180;

  function ensureGate() {
    let gate = document.querySelector(".device-gate");

    if (gate) {
      return gate;
    }

    gate = document.createElement("div");
    gate.className = "device-gate";
    gate.setAttribute("aria-live", "polite");
    gate.innerHTML = `
      <div class="device-gate__card">
        <div class="device-gate__badge">Notice</div>
        <h1 class="device-gate__title"></h1>
        <p class="device-gate__text"></p>
        <div class="device-gate__hint"></div>
      </div>
    `;

    document.body.appendChild(gate);
    return gate;
  }

  function setGateContent(mode) {
    const gate = ensureGate();
    const title = gate.querySelector(".device-gate__title");
    const text = gate.querySelector(".device-gate__text");
    const hint = gate.querySelector(".device-gate__hint");
    const badge = gate.querySelector(".device-gate__badge");

    if (mode === "phone") {
      badge.textContent = "Mobile";
      title.textContent = "Извините, этот сайт недоступен для телефона";
      text.textContent =
        "Эта версия сайта рассчитана на ноутбук и планшет. Пожалуйста, откройте сайт на устройстве с более широким экраном.";
      hint.textContent = "Рекомендуем использовать планшет в горизонтальном режиме или ноутбук.";
      return;
    }

    badge.textContent = "Tablet";
    title.textContent = "Извините, переверните устройство";
    text.textContent =
      "Сайт открывается на планшете только тогда, когда экран вмещает полную ширину макета. Сейчас ширины недостаточно для комфортного просмотра.";
    hint.textContent = "Переключите планшет в горизонтальную ориентацию или откройте сайт на ноутбуке.";
  }

  function updateGate() {
    const width = window.innerWidth;
    const isPhone = width <= PHONE_MAX_WIDTH;
    const isTablet = width > PHONE_MAX_WIDTH && width <= TABLET_MAX_WIDTH;

    if (isPhone) {
      document.body.classList.add("device-blocked");
      document.body.dataset.deviceGate = "phone";
      setGateContent("phone");
      return;
    }

    if (isTablet) {
      document.body.classList.add("device-blocked");
      document.body.dataset.deviceGate = "tablet";
      setGateContent("tablet");
      return;
    }

    document.body.classList.remove("device-blocked");
    delete document.body.dataset.deviceGate;
  }

  window.addEventListener("resize", updateGate);
  window.addEventListener("orientationchange", updateGate);
  window.addEventListener("DOMContentLoaded", updateGate);
  updateGate();
})();
