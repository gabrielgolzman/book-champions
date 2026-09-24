import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import Button from '../shared/button/Button'
import { getBook } from './BookDetails.server'
import './BookDetails.scss'

const BookDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()

  const [book, setBook] = useState(state ?? null)
  const [loading, setLoading] = useState(!state)

  useEffect(() => {
    if (state) return

    getBook(id, {
      onSuccess: (data) => {
        setBook({ ...data, author: data.authors?.[0] })
        setLoading(false)
      },
      onError: (err) => {
        console.log(err)
        setLoading(false)
      },
    })
  }, [id, state])

  if (loading)
    return <p className="book-details__status">Cargando libro…</p>

  if (!book)
    return (
      <div className="book-details">
        <p className="book-details__status">No se encontró información para el libro {id}.</p>
        <Button variant="secondary" onClick={() => navigate('/library')}>Volver a la biblioteca</Button>
      </div>
    )

  const { title, author, cover, rating } = book

  return (
    <div className="book-details">
      <img className="book-details__cover" src={cover} alt={`Portada de ${title}`} />
      <div className="book-details__info">
        <h2 className="book-details__title">{title}</h2>
        <p className="book-details__author">{author}</p>
        <p className="book-details__rating">Calificación: {rating} / 5</p>
        <Button variant="secondary" onClick={() => navigate('/library')}>Volver</Button>
      </div>
    </div>
  )
}

export default BookDetails
