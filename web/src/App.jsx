import { useState } from 'react';
import { BOOKS } from './data/books'
import BookItem from './components/bookItem/BookItem'
import BookForm from './components/bookForm/BookForm';
import Button from './components/shared/button/Button';
import './App.scss'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState(BOOKS)

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  const handleAddBook = (book) => {
    setBooks((prevBooks) => {
      const latestId = Math.max(...BOOKS.map(book => book.id));
      return [{ ...book, id: latestId + 1 }, ...prevBooks]
    })
  }

  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
  }

  const booksMapped = books.map(book => (
    <BookItem key={book.id} {...book} onDelete={handleDeleteBook} />
  ));

  return (
    <div className="app">
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
