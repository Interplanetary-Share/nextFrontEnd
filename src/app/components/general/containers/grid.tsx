import { ReactNode } from 'react'

const Grid = (props: { children: ReactNode }) => {
  const { children } = props
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
      {children}
    </div>
  )
}

export default Grid
