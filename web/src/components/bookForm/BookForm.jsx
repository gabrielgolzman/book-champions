import { useState } from 'react';
import Button from '../shared/button/Button'
import { formInitialState } from './BookForm.data';
import './BookForm.scss'

const BookForm = ({ onClose, onAdd }) => {
    const [form, setForm] = useState(formInitialState);


    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setForm(formInitialState);
        onAdd(form);
        onClose();
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
        <div className="book-form-overlay" onClick={handleOverlayClick}>
            <form className="book-form" onSubmit={handleSubmit}>
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
                        value={form.imageUrl}
                        onChange={(event) => handleInputChange(event, "imageUrl")} />
                </div>

                <div className="book-form__field book-form__field--checkbox">
                    <input
                        className="book-form__checkbox"
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={form.available}
                        onChange={(event) => handleCheckboxChange(event, "isAvailable")}
                    />
                    <label className="book-form__label" htmlFor="isAvailable">Disponible</label>
                </div>

                <div className="book-form__actions">
                    <Button type="button" variant="secondary" size="md" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="primary" size="md">Agregar libro</Button>
                </div>
            </form>
        </div>
    )
}

export default BookForm
