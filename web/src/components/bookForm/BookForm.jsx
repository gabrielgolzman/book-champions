import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import Button from '../shared/button/Button'
import { formInitialState } from './BookForm.data';
import { getBook } from './BookForm.server';
import './BookForm.scss'

const BookForm = ({ onAdd, onEdit }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { state } = useLocation()
    const isEditing = !!id

    const [form, setForm] = useState(state ?? formInitialState);

    useEffect(() => {
        if (!isEditing || state) return

        getBook(id, {
            onSuccess: (book) => setForm({ ...book, author: book.authors?.[0] ?? '' }),
            onError: (err) => console.log(err),
        })
    }, [id, isEditing, state])

    const handleCancel = () => {
        navigate('/library')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing)
            onEdit(form);
        else
            onAdd(form)
    };

    const handleInputChange = (event, attr) => {
        setForm((prevForm) => (
            {
                ...prevForm,
                [attr]: event.target.value
            }))
    }

    const handleCheckboxChange = (event, attr) => {
        setForm((prevForm) => (
            {
                ...prevForm,
                [attr]: event.target.checked
            }))
    }

    return (
        <div className="book-form-page">
            <form className="book-form" onSubmit={handleSubmit}>
                <h1 className="book-form__heading">{isEditing ? 'Editar libro' : 'Agregar libro'}</h1>

                <div className="book-form__field">
                    <label className="book-form__label" htmlFor="title">Título</label>
                    <input
                        className="book-form__input"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Cien años de soledad"
                        value={form.title}
                        onChange={(event) => handleInputChange(event, "title")} />
                </div>

                <div className="book-form__field">
                    <label className="book-form__label" htmlFor="author">Autor</label>
                    <input
                        className="book-form__input"
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Gabriel García Márquez"
                        value={form.author}
                        onChange={(event) => handleInputChange(event, "author")} />
                </div>

                <div className="book-form__field">
                    <label className="book-form__label" htmlFor="publisher">Editorial</label>
                    <input
                        className="book-form__input"
                        type="text"
                        id="publisher"
                        name="publisher"
                        placeholder="Editorial Sudamericana"
                        value={form.publisher}
                        onChange={(event) => handleInputChange(event, "publisher")} />
                </div>

                <div className="book-form__row">
                    <div className="book-form__field">
                        <label className="book-form__label" htmlFor="rating">Calificación</label>
                        <input
                            className="book-form__input"
                            type="number"
                            id="rating"
                            name="rating"
                            min={0}
                            max={5}
                            step={1}
                            placeholder="5"
                            value={form.rating}
                            onChange={(event) => handleInputChange(event, "rating")} />
                    </div>

                    <div className="book-form__field">
                        <label className="book-form__label" htmlFor="pageCount">Páginas</label>
                        <input
                            className="book-form__input"
                            type="number"
                            id="pageCount"
                            name="pageCount"
                            min={1}
                            placeholder="496"
                            value={form.pageCount}
                            onChange={(event) => handleInputChange(event, "pageCount")} />
                    </div>
                </div>

                <div className="book-form__field">
                    <label className="book-form__label" htmlFor="cover">URL de portada</label>
                    <input
                        className="book-form__input"
                        type="text"
                        id="cover"
                        name="cover"
                        placeholder="https://..."
                        value={form.cover ?? ''}
                        onChange={(event) => handleInputChange(event, "cover")} />
                </div>

                <div className="book-form__field book-form__field--checkbox">
                    <input
                        className="book-form__checkbox"
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={!!form.isAvailable}
                        onChange={(event) => handleCheckboxChange(event, "isAvailable")}
                    />
                    <label className="book-form__label" htmlFor="isAvailable">Disponible</label>
                </div>

                <div className="book-form__actions">
                    <Button type="button" variant="secondary" size="md" onClick={handleCancel}>Cancelar</Button>
                    <Button type="submit" variant="primary" size="md">{isEditing ? "Editar" : "Agregar"} libro</Button>
                </div>
            </form>
        </div>
    )
}

export default BookForm
