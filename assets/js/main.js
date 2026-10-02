(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  function waLink(text) {
    return "https://wa.me/" + cfg.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function openExternal(url) {
    window.open(url, "_blank", "noopener");
  }

  // WhatsApp links with a prefilled message
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-whatsapp"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Community: direct invite link if configured, otherwise request an invite on WhatsApp
  document.querySelectorAll("[data-community-link]").forEach(function (el) {
    el.href = cfg.communityLink || waLink("Hello Media Giants Academy, please add me to the free WhatsApp community.");
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Enroll buttons: payment page if configured, otherwise enrol on WhatsApp
  var planNames = { live: "Live Masterclass (₦15,000)", recorded: "Recorded Course (₦10,000)" };
  document.querySelectorAll("[data-enroll]").forEach(function (el) {
    var plan = el.getAttribute("data-enroll");
    var payUrl = cfg.paymentLinks && cfg.paymentLinks[plan];
    el.href = payUrl || waLink("Hello Media Giants Academy, I'd like to enroll in the " + planNames[plan] + ". How do I pay?");
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Mobile navigation
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function setNav(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    document.body.classList.toggle("no-scroll", open);
  }

  toggle.addEventListener("click", function () {
    setNav(!header.classList.contains("nav-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("nav-open")) {
      setNav(false);
      toggle.focus();
    }
  });

  // Header shadow once scrolled
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section in view
  if ("IntersectionObserver" in window) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]:not(.nav-cta)').forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (link && entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // Countdown to the next cohort
  var cd = document.querySelector("[data-countdown]");
  var start = cfg.nextCohort ? new Date(cfg.nextCohort) : null;
  if (cd && start && !isNaN(start)) {
    var parts = {};
    ["d", "h", "m", "s"].forEach(function (k) { parts[k] = cd.querySelector('[data-cd="' + k + '"]'); });
    cd.querySelector("[data-cohort-date]").textContent = start.toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "long", timeZone: "Africa/Lagos"
    });

    var pad = function (n) { return String(n).padStart(2, "0"); };
    var timer;
    var tick = function () {
      var diff = start - Date.now();
      if (diff <= 0) {
        cd.hidden = true;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      parts.d.textContent = pad(Math.floor(s / 86400));
      parts.h.textContent = pad(Math.floor((s % 86400) / 3600));
      parts.m.textContent = pad(Math.floor((s % 3600) / 60));
      parts.s.textContent = pad(s % 60);
    };
    if (start - Date.now() > 0) {
      cd.hidden = false;
      tick();
      timer = setInterval(tick, 1000);
    }
  }

  // Contact form: hands the message to WhatsApp or the visitor's email app
  var form = document.getElementById("contact-form");
  if (form) {
    var errorBox = form.querySelector(".form-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.value) || "whatsapp";
      var data = new FormData(form);
      var name = (data.get("name") || "").trim();
      var email = (data.get("email") || "").trim();

      var error = "";
      if (!name) error = "Please enter your name.";
      else if (email && !/^\S+@\S+\.\S+$/.test(email)) error = "Please enter a valid email address.";
      errorBox.textContent = error;
      errorBox.hidden = !error;
      if (error) {
        form.querySelector(!name ? '[name="name"]' : '[name="email"]').focus();
        return;
      }

      var phone = (data.get("phone") || "").trim();
      var message = (data.get("message") || "").trim();
      var details = ["Name: " + name];
      if (phone) details.push("Phone: " + phone);
      if (email) details.push("Email: " + email);
      details.push("Interested in: " + data.get("plan"));
      var body = "Hello Media Giants Academy,\n\n" + details.join("\n") + (message ? "\n\n" + message : "");

      if (via === "email") {
        window.location.href = "mailto:" + cfg.email +
          "?subject=" + encodeURIComponent("Masterclass enquiry from " + name) +
          "&body=" + encodeURIComponent(body);
      } else {
        openExternal(waLink(body));
      }
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
