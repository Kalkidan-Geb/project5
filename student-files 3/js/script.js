// Define constants and variables
const gallery = document.getElementById('gallery');
const modalContainer = document.querySelector('.modal-container');
let users = [];

// Function to display the overlay with user information
function displayOverlay(user) {
  if (user) {
    const formattedPhone = formatPhoneNumber(user.cell);
    const formattedBirthday = formatBirthday(user.dob.date);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    overlay.innerHTML = `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.large}" alt="${user.name.first} ${user.name.last} profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class "modal-text">${formattedPhone}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${formattedBirthday}</p>
        </div>
      </div>
    `;

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    const closeButton = overlay.querySelector('#modal-close-btn');
    closeButton.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    document.body.appendChild(overlay);
  }
}

// Function to close the modal
function closeModal() {
  modalContainer.style.display = 'none';
}

// Function to display an error message
function displayError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  gallery.appendChild(errorDiv);
}

// Fetch data from the Random User Generator API
async function fetchRandomUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=12');
    const data = await response.json();
    users = data.results; // Update the outer 'users' variable
    if (users.length > 0) {
      displayUsers(users);
    } else {
      displayError('No user profiles found.');
    }
  } catch (error) {
    displayError('Failed to load user profiles.');
  }
}

// Function to format the phone number
function formatPhoneNumber(phone) {
  const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  return formattedPhone;
}

// Function to format the birthday
function formatBirthday(date) {
  const parts = date.split('T')[0].split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${month}/${day}/${year}`;
}

// Function to display user profiles
function displayUsers(users) {
  gallery.innerHTML = '';
  users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="${user.name.first} ${user.name.last} profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}</p>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Add event listener for clicking on user cards
gallery.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (card) {
    const index = Array.from(card.parentNode.children).indexOf(card);
    displayOverlay(users[index]);
  }
});

// Fetch random users and display them
fetchRandomUsers();
