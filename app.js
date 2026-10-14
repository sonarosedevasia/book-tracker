// Storage key for saving books
const STORAGE_KEY = 'book_tracker_books';

// Safely load books from localStorage
function loadBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }
    const parsed = JSON.parse(saved);
    // Ensure the parsed data is an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    // Fall back to an empty list if data is corrupted
    return [];
  }
}

// Save the current books array to localStorage
function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// State: In-memory array of books loaded from storage
const books = loadBooks();

// DOM Elements
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const statusSelect = document.getElementById('status-select');
const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const bookList = document.getElementById('book-list');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const statusCounts = document.getElementById('status-counts');

// Return matching CSS class for the status ribbon
function getStatusClass(status) {
  if (status === 'To read') return 'status-to-read';
  if (status === 'Reading') return 'status-reading';
  if (status === 'Finished') return 'status-finished';
  return '';
}

// Return matching CSS class for the colored book spine
function getSpineClass(status) {
  if (status === 'To read') return 'spine-to-read';
  if (status === 'Reading') return 'spine-reading';
  if (status === 'Finished') return 'spine-finished';
  return '';
}

// Update counts above the book list into 4 cozy stat tiles
function updateCounts() {
  const totalCount = books.length;
  const finishedCount = books.filter(b => b.status === 'Finished').length;
  const readingCount = books.filter(b => b.status === 'Reading').length;
  const toReadCount = books.filter(b => b.status === 'To read').length;

  statusCounts.innerHTML = `
    <div class="stat-tile stat-total">
      <span class="stat-num">${totalCount}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-tile stat-finished">
      <span class="stat-num">${finishedCount}</span>
      <span class="stat-label">Finished</span>
    </div>
    <div class="stat-tile stat-reading">
      <span class="stat-num">${readingCount}</span>
      <span class="stat-label">Reading</span>
    </div>
    <div class="stat-tile stat-to-read">
      <span class="stat-num">${toReadCount}</span>
      <span class="stat-label">To read</span>
    </div>
  `;
}

// Render the book list to the DOM (filtering by search input)
function renderBooks() {
  // Clear the existing list
  bookList.innerHTML = '';

  // If there are no books saved at all
  if (books.length === 0) {
    emptyState.innerHTML = `
      <div class="empty-icon" aria-hidden="true">📖</div>
      <p class="empty-message">Your shelf is empty. Add your first book!</p>
    `;
    emptyState.style.display = 'block';
    return;
  }

  // Get trimmed and lowercased search query
  const query = searchInput.value.trim().toLowerCase();

  // Filter books matching title or author (ignoring case)
  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(query);
    const authorMatch = book.author.toLowerCase().includes(query);
    return titleMatch || authorMatch;
  });

  // If no books match the search query
  if (filteredBooks.length === 0) {
    emptyState.innerHTML = `
      <div class="empty-icon" aria-hidden="true">🔍</div>
      <p class="empty-message">No books found. Try a different word.</p>
    `;
    emptyState.style.display = 'block';
    return;
  }

  // Hide empty state message when matching books are found
  emptyState.style.display = 'none';

  // Build and display each book item
  filteredBooks.forEach(book => {
    const li = document.createElement('li');
    // Gives each card a book spine style and status coloring
    li.className = `book-card ${getSpineClass(book.status)}`;

    // Spine groove line decoration
    const spineGroove = document.createElement('div');
    spineGroove.className = 'spine-groove';
    spineGroove.setAttribute('aria-hidden', 'true');
    li.appendChild(spineGroove);

    // Book title and author wrapper
    const infoDiv = document.createElement('div');
    infoDiv.className = 'book-info';

    const titleEl = document.createElement('h3');
    titleEl.className = 'book-title';
    titleEl.textContent = book.title;

    const authorEl = document.createElement('p');
    authorEl.className = 'book-author';
    authorEl.textContent = `by ${book.author}`;

    infoDiv.appendChild(titleEl);
    infoDiv.appendChild(authorEl);

    // Status actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'book-actions';

    // Ribbon-style bookmark badge
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-ribbon ${getStatusClass(book.status)}`;
    statusBadge.textContent = book.status;

    // Controls wrapper (dropdown + delete button)
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'card-controls';

    // Status selection dropdown
    const statusDropdown = document.createElement('select');
    statusDropdown.className = 'card-status-select';
    statusDropdown.setAttribute('aria-label', `Change status for ${book.title}`);

    const statuses = ['To read', 'Reading', 'Finished'];
    statuses.forEach(statusOption => {
      const option = document.createElement('option');
      option.value = statusOption;
      option.textContent = statusOption;
      if (statusOption === book.status) {
        option.selected = true;
      }
      statusDropdown.appendChild(option);
    });

    // Update status when dropdown value changes
    statusDropdown.addEventListener('change', (e) => {
      updateBookStatus(book.id, e.target.value, statusBadge, li);
    });

    // Delete button with confirmation
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete ${book.title}`);

    // Confirm before removing the book
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this book?')) {
        deleteBook(book.id);
      }
    });

    controlsDiv.appendChild(statusDropdown);
    controlsDiv.appendChild(deleteBtn);

    actionsDiv.appendChild(statusBadge);
    actionsDiv.appendChild(controlsDiv);

    // Assemble the card
    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);

    bookList.appendChild(li);
  });
}

// Find book by id, update status, save to localStorage, update ribbon & spine, and update counts
function updateBookStatus(id, newStatus, statusBadge, cardElement) {
  const book = books.find(b => b.id === id);
  if (!book) {
    return;
  }

  // Update status in data
  book.status = newStatus;

  // Persist updated list to localStorage
  saveBooks();

  // Update ribbon label immediately
  statusBadge.textContent = newStatus;
  statusBadge.className = `status-ribbon ${getStatusClass(newStatus)}`;

  // Update book spine color immediately
  if (cardElement) {
    cardElement.className = `book-card ${getSpineClass(newStatus)}`;
  }

  // Refresh status counts
  updateCounts();
}

// Find book by id, remove it, update localStorage, re-render, and refresh counts
function deleteBook(id) {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return;
  }

  // Remove the book from the array
  books.splice(index, 1);

  // Persist updated list to localStorage
  saveBooks();

  // Re-render book list (preserves active search query)
  renderBooks();

  // Refresh status counts
  updateCounts();
}

// Clear error message and red border for title
function clearTitleError() {
  titleError.textContent = '';
  titleInput.classList.remove('input-error');
}

// Clear error message and red border for author
function clearAuthorError() {
  authorError.textContent = '';
  authorInput.classList.remove('input-error');
}

// Create a new book object and insert it at the top
function addBook(title, author, status) {
  const newBook = {
    id: crypto.randomUUID(),
    title: title,
    author: author,
    status: status,
    createdAt: Date.now()
  };

  // unshift puts the newest book at index 0
  books.unshift(newBook);

  // Save updated books list to localStorage
  saveBooks();

  // Refresh the UI
  renderBooks();

  // Refresh status counts
  updateCounts();
}

// Handle form submission
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Trim spaces before checking
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const status = statusSelect.value;

  let hasError = false;

  // Validate title
  if (!title) {
    titleError.textContent = 'Please enter a title';
    titleInput.classList.add('input-error');
    hasError = true;
  }

  // Validate author
  if (!author) {
    authorError.textContent = 'Please enter an author';
    authorInput.classList.add('input-error');
    hasError = true;
  }

  // Stop if any required field is missing
  if (hasError) {
    return;
  }

  // Add the valid book to the list
  addBook(title, author, status);

  // Reset input fields
  titleInput.value = '';
  authorInput.value = '';
  statusSelect.value = 'To read';
  titleInput.focus();
});

// Clear errors when the user starts typing
titleInput.addEventListener('input', clearTitleError);
authorInput.addEventListener('input', clearAuthorError);

// Filter the book list as the user types in the search box
searchInput.addEventListener('input', renderBooks);

// Initial render on page load
renderBooks();
updateCounts();
