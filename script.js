  // Navbar
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
  
  // Animate elements on scroll
const animatedElements = document.querySelectorAll('.animate-fade-slide');

function animateOnScroll() {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

// Trigger on scroll and on load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Target the skills section
const skillsSection = document.querySelector("#skills");

// Function to animate bars and circles
function animateSkills() {
  // Animate horizontal progress bars
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const percent = bar.style.getPropertyValue('--progress');
    const fill = bar.querySelector('.fill') || document.createElement('div');
    fill.classList.add('fill');
    fill.style.background = '#00bfff';
    fill.style.height = '100%';
    fill.style.width = '0%';
    fill.style.transition = 'width 2s ease-in-out';
    if (!bar.contains(fill)) bar.appendChild(fill);

    setTimeout(() => {
      fill.style.width = percent;
    }, 100);
  });

  // Animate radial (circular) progress bars
  document.querySelectorAll('.radial-bar').forEach(bar => {
    const percent = bar.querySelector('.percentage').innerText.replace('%', '');
    const circle = bar.querySelector('circle:nth-child(2)');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    setTimeout(() => {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }, 200);
  });
}

// Function to reset bars and circles to 0
function resetSkills() {
  document.querySelectorAll('.progress-bar .fill').forEach(fill => {
    fill.style.width = '0%';
  });
  document.querySelectorAll('.radial-bar circle:nth-child(2)').forEach(circle => {
    circle.style.strokeDashoffset = circle.style.strokeDasharray;
  });
}

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
    } else {
      resetSkills();
    }
  });
}, { threshold: 0.5 });

// Observe the skills section
observer.observe(skillsSection);



 