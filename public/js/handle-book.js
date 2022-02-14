// when a plus button is pressed, get the data of that book and add it to the user
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const bookId = document.querySelector('#details').dataset.id;

const handleAddBook = async () => {
  // check to see if the book already exists

  // if not:
  const response = await fetch('/api/user/add', {
    method: 'POST',
    body: JSON.stringify({book_id: bookId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log('Your book has been added!');
    addBtn.classList.add('disabled');
    addBtn.textContent = 'Added';
  } else {
    alert('Failed to add book');
  }
};

const handleDeleteBook = async () => {
  const response = await fetch(`/api/user/delete/${bookId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    console.log('Your book has been deleted!');
    addBtn.classList.remove('disabled');
    addBtn.textContent = 'Remove from Your Collection';
    deleteBtn.style.display = 'none';
  } else {
    alert('Failed to delete book');
    console.log(response);
  }
};

addBtn.addEventListener('click', handleAddBook);
deleteBtn.addEventListener('click', handleDeleteBook);
