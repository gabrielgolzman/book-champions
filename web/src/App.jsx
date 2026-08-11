import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import BookItem from './components/bookItem/BookItem'
import BookForm from './components/bookForm/BookForm';
import Button from './components/shared/button/Button';
import './App.scss'
import { successToast } from './shared/notifications';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookSelected, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then(res => res.json())
      .then(data => setBooks([...data.map(d => ({ ...d, author: d.authors[0] }))]))
      .catch(err => console.log(err));
  }, [])

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleHideForm = () => {
    setShowForm(false)
    setSelectedBook(null)

  }

  const handleAddBook = (book) => {
    const bookToCreate = { ...book, authors: [book.author] }
    fetch("http://localhost:3000/api/books", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(bookToCreate)
    })
      .then(res => res.json())
      .then(({ data }) => {
        setBooks(prevBookList => [data, ...prevBookList])
        successToast(`¡Libro ${data.title} agregado correctamente!`)
      })
      .catch(err => console.log(err))
  }

  const handleEditBook = (bookToEdit) => {
    setShowForm(true)
    setSelectedBook(bookToEdit)
  }

  const handleUpdateBook = (book) => {
    const bookToEdit = { ...book, authors: [book.author] }

    fetch(`http://localhost:3000/api/books/${book._id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(bookToEdit)
    })
      .then(() => {
        setBooks((prevBooks) => prevBooks.map((book) => {
          if (book._id === bookToEdit._id)
            return bookToEdit

          return book
        }))
        successToast(`¡Libro ${book.title} actualizado correctamente!`)

      })
  }

  const handleDeleteBook = (bookId) => {
    fetch(`http://localhost:3000/api/books/${bookId}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId))
        successToast(`¡Libro eliminado correctamente!`)

      })
  }

  const booksMapped = books.map(book => (
    <BookItem key={book._id}  {...book} id={book._id} onEdit={handleEditBook} onDelete={handleDeleteBook} />
  ));

  return (
    <div className="app">
      <ToastContainer />
      <header className="app-header">
        <p className="app-header__eyebrow">Tu biblioteca personal</p>
        <h1 className="app-header__title">Book Champions</h1>
        <p className="app-header__subtitle">Los libros que valen la pena leer</p>

      </header>

      <div className="book-toolbar">
        <Button variant="primary" size="md" onClick={handleShowForm}>
          Agregar libro
        </Button>
      </div>

      <main className="book-grid">
        {showForm && <BookForm selectedBook={bookSelected} onClose={handleHideForm} onAdd={handleAddBook} onEdit={handleUpdateBook} />}
        {booksMapped.length > 0 ? booksMapped : <h2>No se encontraron libros</h2>}
      </main>
    </div>
  )
}

export default App
