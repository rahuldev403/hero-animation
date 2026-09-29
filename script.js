const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const carWrap = document.querySelector(".car-wrap");
const drive = document.querySelector(".drive");

if (!reduceMotion && window.gsap) {
  gsap.to(".reveal", {
    opacity: 1,
    y: 0,
    duration: 0.85,
    stagger: 0.09,
    ease: "power3.out",
    delay: 0.15,
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}

let target = 0;
let current = 0;
function updateCar() {
  const bounds = drive.getBoundingClientRect();
  const progress = Math.max(
    0,
    Math.min(
      1,
      (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height),
    ),
  );
  target = progress * 100;
  current += (target - current) * 0.08;
  carWrap.style.transform = `translate3d(${current * 1.9 - 8}vw, ${current * 1.12}vh, 0) rotate(${current * 0.035}deg)`;
  requestAnimationFrame(updateCar);
}
requestAnimationFrame(updateCar);
