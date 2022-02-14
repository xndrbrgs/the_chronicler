const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

// make fetch request and render page
// const handleSearch = async (e) => {
//   e.preventDefault();

//   const userSearch = searchInput.value;

//   if (userSearch) {
//     fetchBooks(userSearch).then((books) => {
//       console.log(books);
//       // TODO: redirect to search page
//       document.location.replace(`/search/${userSearch}`);
//     });
//   }
// };

// make GET request to db
// const fetchBooks = async (userSearch) => {
//   const response = await fetch(`/search/${userSearch}`);
//   const books = await response.json();
//   return books;
// };

const fetchBooks = async (e) => {
  e.preventDefault();
  const userSearch = searchInput.value;

  document.location.replace(`/search/${userSearch}`);

  //   const response = await fetch(`/search/${userSearch}`);
  //   const books = await response.json();
  //   return books;
};

searchButton.addEventListener('click', fetchBooks);
