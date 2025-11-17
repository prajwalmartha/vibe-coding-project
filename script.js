document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      if (navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Theme toggle (dark/light)
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("cm-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    body.classList.add("dark-theme"); // dark by default
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("cm-theme", isDark ? "dark" : "light");
    });
  }

  // Live scores match card expand / collapse
  document.querySelectorAll(".match-card").forEach((card) => {
    const toggleBtn = card.querySelector(".match-toggle");
    const details = card.querySelector(".match-details");
    const icon = card.querySelector(".match-toggle-icon");

    if (!toggleBtn || !details) return;

    toggleBtn.addEventListener("click", () => {
      const isHidden = details.hasAttribute("hidden");
      if (isHidden) {
        details.removeAttribute("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        if (icon) icon.textContent = "▲";
      } else {
        details.setAttribute("hidden", "");
        toggleBtn.setAttribute("aria-expanded", "false");
        if (icon) icon.textContent = "▼";
      }
    });
  });

  // Player stats comparison data
  const playerData = {
    kohli: { name: "Virat Kohli", runs: 12898, avg: 57.7, sr: 93.3, hundreds: 46 },
    smith: { name: "Steve Smith", runs: 7540, avg: 59.8, sr: 54.0, hundreds: 28 },
    babar: { name: "Babar Azam", runs: 5353, avg: 59.4, sr: 89.0, hundreds: 19 },
    root: { name: "Joe Root", runs: 10948, avg: 50.6, sr: 55.1, hundreds: 30 },
    rohit: { name: "Rohit Sharma", runs: 9782, avg: 48.9, sr: 90.0, hundreds: 29 },
    warner: { name: "David Warner", runs: 6397, avg: 45.4, sr: 74.5, hundreds: 24 },
    williamson: {
      name: "Kane Williamson",
      runs: 8124,
      avg: 53.0,
      sr: 51.2,
      hundreds: 24,
    },
  };

  const playerASelect = document.getElementById("player-a");
  const playerBSelect = document.getElementById("player-b");
  const compareBtn = document.getElementById("compare-btn");
  const compareResults = document.getElementById("compare-results");

  if (compareBtn && playerASelect && playerBSelect && compareResults) {
    compareBtn.addEventListener("click", () => {
      const aKey = playerASelect.value;
      const bKey = playerBSelect.value;

      if (!aKey || !bKey || !playerData[aKey] || !playerData[bKey]) {
        compareResults.innerHTML =
          '<p class="placeholder-text">Please select two valid players to compare.</p>';
        return;
      }

      const a = playerData[aKey];
      const b = playerData[bKey];

      compareResults.innerHTML = `
        <p><strong>Head-to-head comparison:</strong></p>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>${a.name}</th>
              <th>${b.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Runs</td>
              <td>${a.runs}</td>
              <td>${b.runs}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>${a.avg}</td>
              <td>${b.avg}</td>
            </tr>
            <tr>
              <td>Strike Rate</td>
              <td>${a.sr}</td>
              <td>${b.sr}</td>
            </tr>
            <tr>
              <td>Hundreds</td>
              <td>${a.hundreds}</td>
              <td>${b.hundreds}</td>
            </tr>
          </tbody>
        </table>
      `;
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isHidden = answer.hasAttribute("hidden");

      // close others
      document.querySelectorAll(".faq-item").forEach((other) => {
        const otherAns = other.querySelector(".faq-answer");
        const otherBtn = other.querySelector(".faq-question");
        const otherIcon = other.querySelector(".faq-icon");
        if (otherAns && otherBtn && otherAns !== answer) {
          otherAns.setAttribute("hidden", "");
          otherBtn.setAttribute("aria-expanded", "false");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      if (isHidden) {
        answer.removeAttribute("hidden");
        questionBtn.setAttribute("aria-expanded", "true");
        if (icon) icon.textContent = "−";
      } else {
        answer.setAttribute("hidden", "");
        questionBtn.setAttribute("aria-expanded", "false");
        if (icon) icon.textContent = "+";
      }
    });
  });

  // Testimonials slider
  const testimonials = Array.from(
    document.querySelectorAll(".testimonial-slider .testimonial")
  );
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }

  if (testimonials.length > 0) {
    showTestimonial(currentIndex);
  }

  if (prevBtn && nextBtn && testimonials.length > 0) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();

      if (!name || !email) {
        formMessage.textContent = "Please fill in both your name and email.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        return;
      }

      formMessage.textContent = "Thanks for joining the CricketMaster waitlist!";
      formMessage.classList.remove("error");
      formMessage.classList.add("success");
      contactForm.reset();
    });
  }
});
