/* =========================================================
   Chef Jay LeSoul Catering — site script
   Vanilla JS, no external dependencies beyond Bootstrap (unused
   for JS behaviour here — everything below is hand-rolled so it
   stays lightweight and framework-agnostic).
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initHeroSlider();
    initReveal();
    initTestimonialAutoScroll();
    initOrderTabs();
    initFaq();
    initFormValidation();
    initQuantityBoxes();
    initBackToTop();
    initFooterYear();
  });

  /* ---------------- Sticky header ---------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var isHome = document.body.classList.contains("page-home");

    function update() {
      var scrolled = window.scrollY > 40;
      header.classList.toggle("is-solid", scrolled || !isHome);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------- Hero slider ---------------- */
  function initHeroSlider() {
    var hero = document.querySelector("[data-hero-slider]");
    if (!hero) return;

    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    var dotsWrap = hero.querySelector(".hero-dots");
    if (!slides.length) return;

    var current = 0;
    var timer = null;
    var interval = 6500;

    slides.forEach(function (slide, i) {
      if (dotsWrap) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show slide " + (i + 1));
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", function () {
          goTo(i);
          restart();
        });
        dotsWrap.appendChild(dot);
      }
    });

    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function goTo(index) {
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      // restart Ken Burns animation cleanly
      slides[current].style.animation = "none";
      void slides[current].offsetWidth;
      slides[current].style.animation = "";
      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    function next() {
      goTo(current + 1);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, interval);
    }

    slides[0].classList.add("is-active");
    restart();

    hero.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    hero.addEventListener("mouseleave", restart);
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Testimonials gentle auto-scroll (mobile only track) ---------------- */
  function initTestimonialAutoScroll() {
    // Track uses CSS grid on desktop; on small screens it becomes a horizontal
    // scroller. No JS required beyond native scroll-snap, kept here as a hook
    // for future enhancement.
  }

  /* ---------------- Order page tabs ---------------- */
  function initOrderTabs() {
    var tabs = document.querySelectorAll("[data-order-tab]");
    var panels = document.querySelectorAll("[data-order-panel]");
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-order-tab");

        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");

        panels.forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-order-panel") === target);
        });
      });
    });

    // Allow deep-linking: order.html#catering or order.html#seasoning
    var hash = window.location.hash.replace("#", "");
    if (hash) {
      var match = document.querySelector('[data-order-tab="' + hash + '"]');
      if (match) match.click();
    }
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var answer = item.querySelector(".faq-a");
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");

        items.forEach(function (other) {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------- Quantity steppers (shop page) ---------------- */
  function initQuantityBoxes() {
    document.querySelectorAll("[data-qty-box]").forEach(function (box) {
      var input = box.querySelector("input");
      var min = parseInt(input.getAttribute("min") || "1", 10);
      var max = parseInt(input.getAttribute("max") || "99", 10);

      box.querySelector("[data-qty-minus]").addEventListener("click", function () {
        var val = Math.max(min, (parseInt(input.value, 10) || min) - 1);
        input.value = val;
      });
      box.querySelector("[data-qty-plus]").addEventListener("click", function () {
        var val = Math.min(max, (parseInt(input.value, 10) || min) + 1);
        input.value = val;
      });
    });
  }

  /* ---------------- Lightweight client-side form validation ---------------- */
  function initFormValidation() {
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;

        form.querySelectorAll("[required]").forEach(function (input) {
          var field = input.closest(".field");
          var value = input.value.trim();
          var fieldValid = value.length > 0;

          if (input.type === "email" && value) {
            fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          }
          if (input.type === "tel" && value) {
            fieldValid = value.replace(/\D/g, "").length >= 10;
          }

          if (field) field.classList.toggle("invalid", !fieldValid);
          if (!fieldValid) valid = false;
        });

        if (!valid) return;

        var successBox = form.parentElement.querySelector(".form-success");
        if (successBox) {
          successBox.classList.add("show");
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();

        // NOTE for integration: this demo intercepts submission client-side only.
        // Connect to your email service / backend (e.g. Formspree, Netlify Forms,
        // or a custom endpoint) by posting `new FormData(form)` here.
      });

      form.querySelectorAll("[required]").forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field) field.classList.remove("invalid");
        });
      });
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("show", window.scrollY > 700);
      },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Footer year ---------------- */
  function initFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
