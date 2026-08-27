const BASE_URL = 'http://localhost:3000/api/books'

const JSON_HEADERS = { 'Content-type': 'application/json' }

export const getBooks = ({ onSuccess, onError }) => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => onSuccess(data))
        .catch(err => onError(err))
}

export const createBook = (book, { onSuccess, onError }) => {
    fetch(BASE_URL, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({ ...book, authors: [book.author] }),
    })
        .then(res => res.json())
        .then(({ data }) => onSuccess(data))
        .catch(err => onError(err))
}

export const updateBook = (book, { onSuccess, onError }) => {
    fetch(`${BASE_URL}/${book.id}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        body: JSON.stringify({ ...book, authors: [book.author] }),
    })
        .then(res => res.json())
        .then(({ data }) => onSuccess(data))
        .catch(err => onError(err))
}

export const deleteBook = (bookId, { onSuccess, onError }) => {
    fetch(`${BASE_URL}/${bookId}`, {
        method: 'DELETE',
        headers: JSON_HEADERS,
    })
        .then(() => onSuccess(bookId))
        .catch(err => onError(err))
}
