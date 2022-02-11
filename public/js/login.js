// login logic
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // POST request to /api/user/login
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    // good response sends user to homepage
    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to log in');
    }
  }
};

document

  .querySelector('.sign-in-htm')
  .addEventListener('submit', loginFormHandler);

// signup logic
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

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
};

document

  .querySelector('.sign-up-htm')
  .addEventListener('submit', signupFormHandler);

