const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const bookId = document.querySelector('#details').dataset.id;

const handleAddBook = async () => {
  const response = await fetch('/api/user/add', {
    method: 'POST',
    body: JSON.stringify({book_id: bookId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
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
    addBtn.classList.remove('disabled');
    addBtn.textContent = 'Add to Your Collection';
    deleteBtn.style.display = 'none';
  } else {
    alert('Failed to delete book');
  }
};

addBtn.addEventListener('click', handleAddBook);
deleteBtn.addEventListener('click', handleDeleteBook);
