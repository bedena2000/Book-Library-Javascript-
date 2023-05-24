// Elements
const openModalButton = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('.modal-close-button');
const submitButton = document.querySelector('.add-book-button');

const modalElement = document.querySelector('.modal-for-books');
const modalElementBackground = document.querySelector('.background-for-modal');

const inputAuthor = document.querySelector('.book-author');
const inputTitle = document.querySelector('.book-title');
const inputPage = document.querySelector('.book-pages');
const inputRead = document.querySelector('.book-isread');  

const booksWrapper = document.querySelector('.books-wrapper');
const booksWrapperBox = document.querySelector('.books-centered-wrapper');



// Books Data
let myBookLibrary = [];

// Book Constructor
function Book(bookId, bookAuthor, bookTitle, bookPages, isRead) {
	this.bookId = bookId;
	this.bookAuthor = bookAuthor;
	this.bookTitle = bookTitle;
	this.bookPages = bookPages;
	this.isRead = isRead;
};

function modifyBookById(bookId) {
	myBookLibrary.map(item => {
		if(item.bookId === bookId) {
			item.isRead = !item.isRead;
			return item;
		} else {
			return item;
		};
	});
	displayBooks();
};

function checkIfStoreIsEmpty() {
	if(myBookLibrary.length === 0) {
		const storeEmptyText = document.createElement('h2');
		storeEmptyText.classList.add('store-empty');
		storeEmptyText.textContent = 'The Store is empty, please add some books';
		booksWrapper.appendChild(storeEmptyText);	
	} else {
		if(document.querySelector('.store-empty')) {
			document.querySelector('.store-empty').remove();
		};
	};
};

function deleteBookFromDatabase(bookId) {
	const newArray = myBookLibrary.filter(bookItem => bookItem.bookId !== bookId);
	myBookLibrary = newArray;
	displayBooks();
};	


Book.prototype.renderHTML = function() {
		const bookItem = document.createElement('div');
		bookItem.classList.add('book-item');

		const bookAuthorName = document.createElement('p');
		bookAuthorName.classList.add('author-name');
		bookAuthorName.textContent = this.bookAuthor;

		const bookTitleName = document.createElement('p');
		bookTitleName.classList.add('books-name');
		bookTitleName.textContent = this.bookTitle;

		const bookPagesNumber = document.createElement('p');
		bookPagesNumber.textContent = 'pages: ' + this.bookPages;

		const readButton = document.createElement('button');
		readButton.classList.add('btn');
		readButton.classList.add('btn-warning');
		readButton.classList.add('read-button');
		readButton.textContent = this.isRead ? 'read' : 'not read';
		const bookId = this.bookId;
		readButton.onclick = function() {
			modifyBookById(bookId);
		};

		const removeButton = document.createElement('button');
		removeButton.classList.add('btn');
		removeButton.classList.add('btn-danger');
		removeButton.classList.add('remove-button');
		removeButton.textContent = 'remove';
		removeButton.onclick = function() {
			deleteBookFromDatabase(bookId);
		};

		bookItem.appendChild(bookAuthorName);
		bookItem.appendChild(bookTitleName);
		bookItem.appendChild(bookPagesNumber);
		bookItem.appendChild(readButton);
		bookItem.appendChild(removeButton);

		booksWrapperBox.appendChild(bookItem);
};	

function addBookToLibrary(bookObject) {
	myBookLibrary.push(bookObject);
};

function modifyModal() {
	const modalClasses = Array.from(modalElement.classList);
	const modalBackgroundClasses = Array.from(modalElementBackground.classList);
	if(modalClasses.includes('hidden') && modalBackgroundClasses.includes('hidden')) {
		modalElement.classList.remove('hidden');
		modalElementBackground.classList.remove('hidden');
	} else {
		modalElement.classList.add('hidden');
		modalElementBackground.classList.add('hidden');
	};
};

function declareButtonEvent(ourButtonElement) {
	ourButtonElement.addEventListener('click', function() {
		modifyModal();
	});
};

function displayBooks() {
	// Clear Books Wrapper
	booksWrapperBox.textContent = '';
	const arraySize = myBookLibrary.length;
	for(let i = 0; i < arraySize; i++) {
		myBookLibrary[i].renderHTML();
	};
	checkIfStoreIsEmpty();
};	

checkIfStoreIsEmpty();

// Add Book Logic
submitButton.addEventListener('click', function(event) {
	event.preventDefault();
	const bookId = Math.random();
	const bookAuthor = inputAuthor.value;
	const bookTitle = inputTitle.value;
	const bookPages = inputPage.value;
	const bookIsRead = inputRead.checked;
	if(bookAuthor && bookTitle && bookPages && bookPages > 0) {
		const bookObject = new Book(bookId, bookAuthor, bookTitle, bookPages, bookIsRead);
		addBookToLibrary(bookObject);	
		displayBooks();
	};
});



// Activate events on button
declareButtonEvent(openModalButton);
declareButtonEvent(closeModalButton);
declareButtonEvent(modalElementBackground);