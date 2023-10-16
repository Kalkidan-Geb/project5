

// Define constants and variables
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal-container');


// Fetch data from the Random User Generator API
async function fetchRandomUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=12');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching random users', error);
  }
}

// Display user cards in the gallery using insertAdjacentHTML
function displayUsers(users) {
  users.forEach((user, index) => {
    const cardHTML = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${user.picture.large}" alt="${user.name.first} ${user.name.last} profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>
    `;

    gallery.insertAdjacentHTML('beforeend', cardHTML); // Add the card HTML to the end of the gallery

    // Attach a click event to the newly added card
    const card = gallery.lastElementChild;
    card.addEventListener('click', () => displayUserModal(user, index));
  });
}

// Create and display the user modal
function displayUserModal(user, index) {
  const modalHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${user.picture.large}" alt="${user.name.first} ${user.name.last} profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${formatPhoneNumber(user.cell)}</p>
        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
        <p class="modal-text">Birthday: ${formatBirthday(user.dob.date)}</p>
      </div>
    </div>
  `;

  modal.innerHTML = modalHTML;
  modal.style.display = 'block';

  const closeButton = document.getElementById('modal-close-btn');
  closeButton.addEventListener('click', () => closeModal());

  if (index > 0) {
    const prevButton = `
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    `;

    modal.insertAdjacentHTML('beforeend', prevButton); // Add the previous button

    const prevButtonElement = document.getElementById('modal-prev');
    prevButtonElement.addEventListener('click', () => displayUserModal(users[index - 1], index - 1));
  }

  if (index < users.length - 1) {
    const nextButton = `
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `;

    modal.insertAdjacentHTML('beforeend', nextButton); // Add the next button

    const nextButtonElement = document.getElementById('modal-next');
    nextButtonElement.addEventListener('click', () => displayUserModal(users[index + 1], index + 1));
  }
}

// Need to format the phone number
function formatPhoneNumber(phone) {
  // Use regular expressions to format the phone number
  const formatPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  return formathone;
}

// And format the birthday
function formatBirthday(date) {
  const bday = date.split('T')[0].split('-'); // Split the ISO date into parts
  const year = bday[0];
  const month = bday[1];
  const day = bday[2];
  return `${month}/${day}/${year}`;
}

// Close the modal
function closeModal() {
  modalContainer.innerHTML = '';
  modalContainer.style.display = 'none';
}

// Add event listener for clicking on user cards
gallery.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (card) {
    const index = Array.from(card.parentNode.children).indexOf(card);
    displayUserModal(users[index], index);
  }
});

// Fetch random users and display them
fetchRandomUsers().then((users) => displayUsers(users));

