import { ReactNode } from 'react'

const Container = (props: { children: ReactNode }) => {
  const { children } = props
  return (
    <div
      className="container mx-auto w-full px-4"
      style={{
        minHeight: 'calc(60vh)',
      }}
    >
      {children}
    </div>
  )
}

export default Container
