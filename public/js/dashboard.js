const yourbooks = document.querySelector('#yourbooks');

// ScrollReveal().reveal('.nav_links', {
//   reset: false,
//   distance: '60px',
//   duration: 2000,
//   delay: 400,
// });

// ScrollReveal().reveal('#content', {
//   reset: false,
//   distance: '60px',
//   duration: 2000,
//   delay: 400,
// });

// ScrollReveal().reveal('.logout', {
//   reset: false,
//   distance: '60px',
//   duration: 2000,
//   delay: 400,
// });

// ScrollReveal().reveal('.list-group', {
//   reset: false,
//   distance: '60px',
//   duration: 2000,
//   delay: 400,
//   origin: 'left',
// });

// ScrollReveal().reveal('.books-list', {
//   reset: false,
//   distance: '60px',
//   duration: 3000,
//   delay: 400,
//   origin: 'right',
// });

yourbooks.addEventListener('click', async () => {
  // get user info
  const userData = await User.findByPk(req.session.user_id, {
    attributes: {exclude: ['password']},
  });
  const user = userData.get({plain: true});
});

// TODO: make books recommended by books the user has in list not by one book id
foryou.addEventListener('click', () => {
  const recommendedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const recommendedBooks = [];

  recommendedIds.forEach(async (id) => {
    const bookData = await Book.findByPk(id);
    recommendedBooks.push(bookData.dataValues);
  });
});

function booksread() {
  console.log(data);
}

function currentbooks() {
  console.log(data);
}
