import StarIcon from '../ui/icons/starIcon/StarIcon'
import './BookItem.scss'

const MAX_RATING = 5

const BookItem = ({ title, author, publisher, rating, pageCount, cover, isAvailable }) => {
    const stars = Array.from({ length: MAX_RATING }, (_, i) => i < rating)

    return (
        <article className="book-card">
            <div className="book-card__cover-wrap">
                <img
                    className="book-card__cover"
                    src={cover}
                    alt={`Portada de ${title}`}
                    loading="lazy"
                    onError={e => { e.currentTarget.src = 'https://images.pexels.com/photos/15575753/pexels-photo-15575753.jpeg' }}
                />
                <div className="book-card__cover-overlay" />
            </div>

            <div className="book-card__body">
                <h2 className="book-card__title">{title}</h2>
                <p className="book-card__author">{author}</p>
                <p className="book-card__publisher">{publisher}</p>

                <div className="book-card__stars" aria-label={`Calificación: ${rating} de ${MAX_RATING}`}>
                    {stars.map((filled, i) => (
                        <span key={i} className={`book-card__star ${filled ? 'book-card__star--filled' : 'book-card__star--empty'}`}>
                            <StarIcon filled={filled} size={15} />
                        </span>
                    ))}
                </div>

                <div className="book-card__footer">
                    <span className="book-card__pages">{pageCount} pág.</span>
                    <span className={`book-card__badge ${isAvailable ? 'book-card__badge--available' : 'book-card__badge--reserved'}`}>
                        {isAvailable ? 'Disponible' : 'Reservado'}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default BookItem
