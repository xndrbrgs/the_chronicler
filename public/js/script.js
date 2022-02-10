const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  showcase.classList.toggle('active');
})

ScrollReveal().reveal('.logo', {
    reset: true,
    distance: '60px',
    duration: 2000,
    delay: 400
});

ScrollReveal().reveal('.text', {
    reset: true,
    distance: '50px',
    duration: 2500,
    delay: 400,
    origin: 'left'
});

ScrollReveal().reveal('.social', {
    reset: true,
    distance: '50px',
    duration: 2500,
    delay: 500
});

ScrollReveal().reveal('.social', {
    reset: true,
    distance: '50px',
    duration: 2500,
    delay: 500
});
