// navbar

const checkbox = document.querySelector(".menu-toggle input[type=checkbox]");
const navUl = document.querySelector("header nav ul");

checkbox.addEventListener("click", () => {
  navUl.classList.toggle("side");
});

document.addEventListener("click", (e) => {
  if (!navUl.contains(e.target) && !checkbox.contains(e.target)) navUl.classList.remove("side");
});

// navbar end

// typing text

const dynamicText = document.querySelector("main section.container .content p span");
const words = ["be better", "be stronger", "greatfuly", "keep moving"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.classList.add("stop-blink");
  dynamicText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typingText, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typingText, 90);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    dynamicText.classList.remove("stop-blink");
    setTimeout(typingText, 1200);
  }
};

typingText();

// typing end

// animation scroll
const getAnimationScroll = () => {
  const getAnimation = document.querySelector("main .motivation blockquote");
  const windowHeigth = window.innerHeight;
  const elementTop = getAnimation.getBoundingClientRect().top;
  const elementVisible = 150;

  if (elementTop < windowHeigth - elementVisible) {
    getAnimation.classList.add("fade");
  } else {
    getAnimation.classList.remove("fade");
  }
};

// animation scroll end
window.addEventListener("scroll", getAnimationScroll);
getAnimationScroll();

// galery
const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// galery end
