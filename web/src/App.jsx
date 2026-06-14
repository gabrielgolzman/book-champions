import BookItem from './components/bookItem/BookItem'
import { BOOKS } from './data/books'
import './App.scss'

const App = () => {
  const availableCount = BOOKS.filter(b => b.isAvailable).length;
  const booksMapped = BOOKS.map(book => (
    <BookItem key={book.id} {...book} />
  ));

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-header__eyebrow">Tu biblioteca personal</p>
        <h1 className="app-header__title">Book Champions</h1>
        <p className="app-header__subtitle">Los libros que valen la pena leer</p>
        <p className="app-header__meta">
          {BOOKS.length} títulos
          <span className="app-header__divider">·</span>
          {availableCount} disponibles
        </p>
      </header>

      <main className="book-grid">
        {booksMapped}
      </main>
    </div>
  )
}

export default App
