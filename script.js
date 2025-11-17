// 1. Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// 2. Scroll to features
document.getElementById("learnMoreBtn").onclick = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
};

// 3. Signup validation
document.getElementById("signupBtn").onclick = () => {
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("signupMessage");

    if (email.includes("@")) {
        message.textContent = "🎉 Thanks for signing up!";
        message.style.color = "green";
    } else {
        message.textContent = "❌ Please enter a valid email.";
        message.style.color = "red";
    }
};
