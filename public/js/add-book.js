// when a plus button is pressed, get the data of that book and add it to the user
const addBtn = document.querySelector('#add-btn');
const bookId = document.querySelector('#details').dataset.id;

const handleAddBook = async () => {
  console.log('click!');
  const response = await fetch('/api/user/add', {
    method: 'POST',
    body: JSON.stringify({book_id: bookId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log('Your book has been added!');
  } else {
    alert('Failed to add book');
  }
};

addBtn.addEventListener('click', handleAddBook);
