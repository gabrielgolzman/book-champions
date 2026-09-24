import Button from '../shared/button/Button'
import './ConfirmModal.scss'

const ConfirmModal = ({
    open,
    title = 'Confirmar acción',
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    onConfirm,
    onCancel,
}) => {
    if (!open) return null

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) onCancel()
    }

    return (
        <div className="confirm-modal__overlay" onClick={handleOverlayClick}>
            <div className="confirm-modal" role="dialog" aria-modal="true">
                <h2 className="confirm-modal__title">{title}</h2>
                <p className="confirm-modal__message">{message}</p>
                <div className="confirm-modal__actions">
                    <Button type="button" variant="secondary" size="md" onClick={onCancel}>{cancelLabel}</Button>
                    <Button type="button" variant="danger" size="md" onClick={onConfirm}>{confirmLabel}</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
