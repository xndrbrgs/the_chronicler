// signup logic
async function signupFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // POST request to /api/user
  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    // good signup sends user to homepage
    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
}

const signupBtn = document.querySelector('#signup-btn');
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormHandler();
});
