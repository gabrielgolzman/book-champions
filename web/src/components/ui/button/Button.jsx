import './Button.scss'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) => (
  <button
    className={`btn btn--${variant} btn--${size}`}
    type={type}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
)

export default Button
