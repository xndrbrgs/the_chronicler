const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

const fetchBooks = async (e) => {
  e.preventDefault();
  const userSearch = searchInput.value;

  if (userSearch) {
    document.location.replace(`/search/${userSearch}`);
  }
};

searchButton.addEventListener('click', fetchBooks);
