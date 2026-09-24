import { useNavigate } from 'react-router'
import Button from '../shared/button/Button'
import './PageNotFound.scss'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">¡Oops! La página solicitada no fue encontrada</h2>
      <Button variant="primary" size="md" onClick={() => navigate('/login')}>
        Volver a Iniciar sesión
      </Button>
    </div>
  )
}

export default PageNotFound
