interface BadgeProps {
  name: string
  onClick?: () => void
  className: string
}

const Badge = ({ name, onClick, className }: BadgeProps) => {
  return (
    <div onClick={onClick} className={className}>
      {name}
    </div>
  )
}

export default Badge
