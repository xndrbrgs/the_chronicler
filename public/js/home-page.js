const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const expand = (e) => {
  e.preventDefault();
  searchBtn.classList.toggle('close');
  input.classList.toggle('square');
};

// make fetch request and render page
// const handleSearch = async () => {
//   const userSearch = input.value;
//   if (userSearch) {
//     fetchBooks(userSearch).then((books) => {
//       console.log(books);
//       // TODO: redirect to search page
//       if (userSearch.ok) {
//         document.location.replace('/search');
//       }
//     });
//   }
// };

// make GET request to db
// const fetchBooks = async (userSearch) => {
//   const response = await fetch(`/api/book/search/${userSearch}`);
//   const books = await response.json();
//   return books;
// };

searchBtn.addEventListener('click', expand);
// searchBtn.addEventListener('click', handleSearch);

// Swipers
var swiper = new Swiper('.books-slider', {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper('#category-slider', {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 6500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.categories-button-next',
    prevEl: '.categories-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 9,
    },
  },
});

var swiper = new Swiper('.recommended-slider', {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper('.reviews-slider', {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

ScrollReveal().reveal('.nav_links', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 400,
});

ScrollReveal().reveal('#content', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 400,
});

ScrollReveal().reveal('.logout', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 400,
});

ScrollReveal().reveal('.home', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 500,
  origin: 'left',
});

ScrollReveal().reveal('.categories', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 600,
  origin: 'right',
});

ScrollReveal().reveal('.recommended', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 500,
  origin: 'left',
});

ScrollReveal().reveal('.reviews', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 500,
  origin: 'right',
});

ScrollReveal().reveal('.footer', {
  reset: false,
  distance: '60px',
  duration: 2000,
  delay: 700,
  origin: 'bottom',
});
