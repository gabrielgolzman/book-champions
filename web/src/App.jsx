import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { BOOKS } from './data/books'
import BookItem from './components/bookItem/BookItem'
import BookForm from './components/bookForm/BookForm';
import Button from './components/shared/button/Button';
import './App.scss'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState(BOOKS);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then(res => res.json())
      .then(data => setBooks([...data]))
      .catch(err => console.log(err));
  }, [])

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  const handleAddBook = (book) => {
    fetch("http://localhost:3000/api/books", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(({ data }) => {
        setBooks(prevBookList => [data, ...prevBookList])
      })
      .catch(err => console.log(err))
  }

  const handleDeleteBook = (bookId) => {
    fetch(`http://localhost:3000/api/books/${bookId}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
      })
  }

  const booksMapped = books.map(book => (
    <BookItem key={book.id} {...book} onDelete={handleDeleteBook} />
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
        {showForm && <BookForm onClose={handleHideForm} onAdd={handleAddBook} />}
        {booksMapped.length > 0 ? booksMapped : <h2>No se encontraron libros</h2>}
      </main>
    </div>
  )
}

export default App
