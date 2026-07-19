const pages = [
  ["about", "about.html", "사무소 소개"],
  ["services", "services.html", "주요 서비스"],
  ["strengths", "strengths.html", "강점"],
  ["process", "process.html", "상담 절차"],
  ["location", "location.html", "오시는 길"],
];

const sectionMenus = {
  about: [
    ["expert", "전문가 소개"],
    ["greeting", "인사말"],
    ["philosophy", "운영 철학"],
    ["promise", "고객과의 약속"],
  ],
  services: [
    ["service-overview", "서비스 안내"],
    ["tax-services", "세무회계 서비스"],
  ],
  strengths: [
    ["strength-overview", "핵심 메시지"],
    ["core-strengths", "핵심 강점"],
    ["management-comparison", "관리 방식 비교"],
    ["management-principles", "업무 관리 원칙"],
  ],
  process: [
    ["consultation-overview", "상담 안내"],
    ["consultation-process", "전체 상담 프로세스"],
    ["consultation-preparation", "상담 전 준비사항"],
    ["consultation-faq", "자주 묻는 질문"],
  ],
  location: [
    ["office-info", "사무소 기본 정보"],
    ["office-map", "지도 안내"],
  ],
};

const current = document.body.dataset.page || "home";
const active = (key) =>
  key === current ? ' class="is-active" aria-current="page"' : "";
const desktopNav = () =>
  pages
    .map(
      ([key, href, label]) => `
        <div class="nav-item">
          <a href="${href}"${active(key)}>
            ${label}
            <i class="ph-light ph-caret-down nav-chevron" aria-hidden="true"></i>
          </a>
          <div class="nav-dropdown" aria-label="${label} 세부 메뉴">
            ${sectionMenus[key]
              .map(
                ([id, sectionLabel]) =>
                  `<a href="${href}#${id}">${sectionLabel}</a>`,
              )
              .join("")}
          </div>
        </div>`,
    )
    .join("");

const mobileNav = () =>
  pages
    .map(
      ([key, href, label]) => `
        <div class="mobile-nav-group">
          <a href="${href}"${active(key)}>${label}</a>
          <div class="mobile-subnav">
            ${sectionMenus[key]
              .map(
                ([id, sectionLabel]) =>
                  `<a href="${href}#${id}">${sectionLabel}</a>`,
              )
              .join("")}
          </div>
        </div>`,
    )
    .join("");

document.querySelector("#site-header").innerHTML = `
  <header class="site-header">
    <div class="header-inner shell">
      <a class="wordmark" href="index.html" aria-label="박영인 세무회계사무소 홈">
        <span>박영인</span>
        <span>세무회계사무소</span>
      </a>
      <nav class="desktop-nav" aria-label="주요 메뉴">
        ${desktopNav()}
      </nav>
      <a class="button button-outline header-cta${current === "contact" ? " is-active" : ""}" href="contact.html">
        상담 문의
        <i class="ph-light ph-arrow-up-right" aria-hidden="true"></i>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="메뉴 열기">
        <span class="menu-bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="모바일 메뉴" hidden>
      <div class="shell">
        ${mobileNav()}
        <a class="mobile-contact" href="contact.html">
          상담 문의
          <i class="ph-light ph-arrow-up-right" aria-hidden="true"></i>
        </a>
      </div>
    </nav>
  </header>`;

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
  menuButton.classList.toggle("is-open", !open);
  mobileMenu.hidden = open;
  document.body.classList.toggle("menu-open", !open);
});

document.querySelector("#site-footer").innerHTML = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="wordmark wordmark-light" href="index.html">
          <span>박영인</span>
          <span>세무회계사무소</span>
        </a>
        <p>고객의 사업을 이해하고 정확하게 관리하는 <span class="no-break">세무 파트너</span></p>
      </div>
      <div class="footer-info" aria-label="사무소 정보">
        <dl>
          <div>
            <dt>주소</dt>
            <dd>경기도 안산시 단원구 광덕서로 62, 2층 203호<br>(고잔동, 고잔법조빌딩)</dd>
          </div>
          <div>
            <dt>Tel</dt>
            <dd><a href="tel:0314141500">031-414-1500</a></dd>
          </div>
          <div>
            <dt>Mobile</dt>
            <dd><a href="tel:01087588624">010-8758-8624</a></dd>
          </div>
          <div>
            <dt>Fax</dt>
            <dd>031-414-1400</dd>
          </div>
        </dl>
      </div>
      <div class="footer-links">
        <p>메뉴</p>
        ${pages.map(([, href, label]) => `<a href="${href}">${label}</a>`).join("")}
        <a href="contact.html">상담 문의</a>
      </div>
    </div>
    <div class="shell footer-bottom">
      <p>박영인 세무회계사무소</p>
      <p>개인정보처리방침은 실제 운영 정책에 맞게 입력해 주세요</p>
    </div>
  </footer>`;

const form = document.querySelector("#consultation-form");
if (form) {
  const status = document.querySelector("#form-status");
  const submit = form.querySelector("button[type='submit']");
  const successDialog = document.querySelector("#success-dialog");
  const dialogClose = document.querySelector("#success-dialog-close");
  const defaultSubmitContent = submit.innerHTML;
  const validationFields = [
    form.querySelector("#name"),
    form.querySelector("#phone"),
    form.querySelector("#email"),
    form.querySelector("#business-type"),
    form.querySelector("#consulting-area"),
    form.querySelector("#message"),
    form.querySelector("#contact-phone"),
    form.querySelector("[name='privacy_consent']"),
  ].filter(Boolean);

  const validationMessages = {
    name: "이름 또는 업체명을 입력해 주세요.",
    phone: "연락처를 입력해 주세요.",
    "business-type": "사업자 유형을 선택해 주세요.",
    "consulting-area": "상담 분야를 선택해 주세요.",
    message: "문의 내용을 입력해 주세요.",
    "contact-phone": "상담 희망 방식을 선택해 주세요.",
    privacy_consent: "개인정보 수집 및 이용에 동의해 주세요.",
  };

  const errorIdFor = (field) =>
    `${field.id || field.name.replace(/[^a-z0-9_-]/gi, "-")}-error`;

  const isBlank = (field) =>
    field.required &&
    typeof field.value === "string" &&
    field.value.trim() === "" &&
    !["radio", "checkbox"].includes(field.type);

  const getValidationMessage = (field) => {
    if (field.validity.typeMismatch && field.type === "email") {
      return "이메일 주소 형식을 확인해 주세요.";
    }

    return (
      validationMessages[field.id] ||
      validationMessages[field.name] ||
      "입력 내용을 확인해 주세요."
    );
  };

  const setValidationState = (field, isValid) => {
    const isRadio = field.type === "radio";
    const isCheckbox = field.type === "checkbox";
    const container = isRadio
      ? field.closest(".choice-group")
      : isCheckbox
        ? field.closest(".consent")
        : field.closest(".field");
    const groupedFields = isRadio
      ? [...form.querySelectorAll(`[name="${field.name}"]`)]
      : [field];
    const errorId = errorIdFor(field);
    let error = document.querySelector(`#${errorId}`);

    groupedFields.forEach((groupedField) => {
      groupedField.classList.toggle("is-invalid", !isValid);
      if (isValid) {
        groupedField.removeAttribute("aria-invalid");
        groupedField.removeAttribute("aria-describedby");
      } else {
        groupedField.setAttribute("aria-invalid", "true");
        groupedField.setAttribute("aria-describedby", errorId);
      }
    });
    container?.classList.toggle("is-invalid", !isValid);

    if (isValid) {
      error?.remove();
      return;
    }

    if (!error) {
      error = document.createElement("p");
      error.id = errorId;
      error.className = isCheckbox ? "field-error field-full" : "field-error";
      if (isCheckbox) {
        container?.insertAdjacentElement("afterend", error);
      } else {
        container?.append(error);
      }
    }
    error.textContent = getValidationMessage(field);
  };

  const validateField = (field) => {
    field.setCustomValidity("");
    if (isBlank(field)) {
      field.setCustomValidity("required");
    }
    const isValid = field.checkValidity();
    setValidationState(field, isValid);
    return isValid;
  };

  const validateForm = () => {
    const invalidFields = validationFields.filter(
      (field) => !validateField(field),
    );
    invalidFields[0]?.focus();
    return invalidFields.length === 0;
  };

  const clearValidation = () => {
    validationFields.forEach((field) => {
      field.setCustomValidity("");
      setValidationState(field, true);
    });
  };

  const showSuccessDialog = () => {
    if (typeof successDialog?.showModal === "function") {
      successDialog.showModal();
      return;
    }
    window.alert("상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.");
  };

  form
    .querySelectorAll("input:not([type='hidden']), select, textarea")
    .forEach((field) => {
      const validationTarget =
        field.type === "radio" ? form.querySelector("#contact-phone") : field;
      const eventName = ["radio", "checkbox"].includes(field.type)
        ? "change"
        : field.tagName === "SELECT"
          ? "change"
          : "input";
      field.addEventListener(eventName, () => {
        if (validationTarget.getAttribute("aria-invalid") === "true") {
          validateField(validationTarget);
        }
      });
      field.addEventListener("blur", () => {
        if (validationTarget.value || validationTarget.required) {
          validateField(validationTarget);
        }
      });
    });

  dialogClose?.addEventListener("click", () => successDialog.close());
  successDialog?.addEventListener("click", (event) => {
    if (event.target === successDialog) {
      successDialog.close();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      status.textContent = "필수 항목과 개인정보 수집 동의를 확인해 주세요.";
      status.className = "form-status is-error";
      return;
    }

    submit.disabled = true;
    submit.innerHTML =
      '접수 중입니다 <i class="ph-light ph-circle-notch" aria-hidden="true"></i>';
    status.textContent = "상담 문의를 접수하고 있습니다.";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.status === 429) {
        status.textContent =
          "문의가 일시적으로 많습니다. 잠시 후 다시 시도해 주세요.";
        status.className = "form-status is-error";
        return;
      }

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      form.reset();
      clearValidation();
      status.textContent =
        "상담 문의가 접수되었습니다. 확인 후 연락드리겠습니다.";
      status.className = "form-status is-success";
      showSuccessDialog();
    } catch (error) {
      console.error(error);
      status.textContent =
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.";
      status.className = "form-status is-error";
    } finally {
      submit.innerHTML = defaultSubmitContent;
      submit.disabled = false;
    }
  });
}
