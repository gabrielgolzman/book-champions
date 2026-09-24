import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'

import BookItem from '../bookItem/BookItem'
import BookForm from '../bookForm/BookForm'
import BookDetails from '../bookDetails/BookDetails'
import PageNotFound from '../pageNotFound/PageNotFound'
import Button from '../shared/button/Button'
import { successToast, errorToast } from '../../shared/notifications'
import { getBooks, createBook, updateBook, deleteBook } from './Dashboard.server'
import './Dashboard.scss'

const Dashboard = ({ onSignOut }) => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getBooks({
      onSuccess: (data) => setBooks(data.map(d => ({ ...d, author: d.authors[0] }))),
      onError: (err) => console.log(err),
    })
  }, [])

  const handleAddBook = (book) => {
    createBook(book, {
      onSuccess: (data) => {
        setBooks(prev => [{ ...data, author: data.authors[0] }, ...prev])
        successToast(`¡Libro ${data.title} agregado correctamente!`)
        navigate('/library', { replace: true })
      },
      onError: (err) => {
        console.log(err)
        errorToast('No se pudo agregar el libro.')
      },
    })
  }

  const handleUpdateBook = (book) => {
    updateBook(book, {
      onSuccess: (data) => {
        setBooks(prev => prev.map(b => (b.id === data.id ? { ...data, author: data.authors[0] } : b)))
        successToast(`¡Libro ${data.title} actualizado correctamente!`)
        navigate('/library', { replace: true })
      },
      onError: (err) => {
        console.log(err)
        errorToast('No se pudo actualizar el libro.')
      },
    })
  }

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId, {
      onSuccess: (id) => {
        setBooks(prev => prev.filter(b => b.id !== id))
        successToast('¡Libro eliminado correctamente!')
      },
      onError: (err) => {
        console.log(err)
        errorToast('No se pudo eliminar el libro.')
      },
    })
  }

  const handleEditBook = (bookToEdit) => {
    navigate(`/library/edit/${bookToEdit.id}`, { state: bookToEdit })
  }

  const handleSignOut = () => {
    onSignOut()
    navigate('/login', { replace: true })
  }

  const booksMapped = books.map(book => (
    <BookItem key={book.id} {...book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
  ))

  return (
    <div className="dashboard">
      <header className="dashboard__topbar">
        <div>
          <p className="dashboard__eyebrow">Tu biblioteca personal</p>
          <h1 className="dashboard__title">Book Champions</h1>
        </div>
        <div className="dashboard__actions">
          <Button variant="primary" size="md" onClick={() => navigate('/library/add-book')}>
            Agregar libro
          </Button>
          <Button variant="secondary" size="md" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <Routes>
        <Route
          index
          element={
            <main className="book-grid">
              {booksMapped.length > 0 ? booksMapped : <h2>No se encontraron libros</h2>}
            </main>
          }
        />
        <Route
          path="add-book"
          element={<BookForm onAdd={handleAddBook} onEdit={handleUpdateBook} />}
        />
        <Route
          path="edit/:id"
          element={<BookForm onAdd={handleAddBook} onEdit={handleUpdateBook} />}
        />
        <Route path=":id" element={<BookDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default Dashboard
