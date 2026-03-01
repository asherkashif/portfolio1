// 1. Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// 2. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});

// 3. AJAX Form Submission (No Redirect)
const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const data = new FormData(e.target);
    
    try {
        const response = await fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.style.display = "block";
            status.style.color = "var(--accent-green)";
            status.innerText = "✓ Message sent successfully!";
            contactForm.reset();
            submitBtn.innerText = "Submitted";
        } else {
            throw new Error();
        }
    } catch (error) {
        status.style.display = "block";
        status.style.color = "#ff7b72";
        status.innerText = "Oops! There was a problem. Try again.";
        submitBtn.disabled = false;
        submitBtn.innerText = "Retry";
    }
});