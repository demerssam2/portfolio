// --- 1. Animate elements when they enter the viewport ---
const animatedEls = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // Stop observing once visible
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));


// --- 2. Rotating word animation ---
const words = ["small businesses", "entrepreneurs", "local shops", "anyone"];
const rotatingWord = document.getElementById("rotating-word");

let wordIndex = 0;

// Pre-calculate the widest word once to prevent layout shift
const maxWidth = Math.max(
  ...words.map(word => {
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.font = getComputedStyle(rotatingWord).font;
    temp.textContent = word;
    document.body.appendChild(temp);
    const width = temp.offsetWidth;
    temp.remove();
    return width;
  })
);
rotatingWord.style.minWidth = `${maxWidth}px`;

// Change the word every 2 seconds
setInterval(() => {
  // Fade out
  rotatingWord.style.opacity = 0;

  setTimeout(() => {
    // Update word index
    wordIndex = (wordIndex + 1) % words.length;
    rotatingWord.textContent = words[wordIndex];

    // Fade back in
    rotatingWord.style.opacity = 1;
  }, 300); // Match your CSS transition time
}, 2000);


// --- 3. Smooth scroll to #contact ---
document.querySelectorAll("a[href^='#contact']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
