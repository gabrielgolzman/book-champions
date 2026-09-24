const BASE_URL = 'http://localhost:3000/api/books'

export const getBook = (id, { onSuccess, onError }) => {
    fetch(`${BASE_URL}/${id}`)
        .then(res => res.json())
        .then(book => onSuccess(book))
        .catch(err => onError(err))
}
