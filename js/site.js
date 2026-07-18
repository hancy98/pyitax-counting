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
    ["transportation", "교통편 안내"],
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
  const defaultSubmitContent = submit.innerHTML;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
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
      status.textContent =
        "상담 문의가 접수되었습니다. 확인 후 연락드리겠습니다.";
      status.className = "form-status is-success";
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
