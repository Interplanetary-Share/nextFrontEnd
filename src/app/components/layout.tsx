import './globals.css'

import BackgroundThree from './three/BackgroundThree'
import Footer from './layout/footer/footer'
import Header from './layout/header/header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          background:
            'linear-gradient(0deg, black,black, #000000d1,#000000ab,#000000d1,  black, black)',
          minHeight: '100vh',
        }}
      >
        <Header />
        {children}
        <Footer />
      </div>
      <BackgroundThree />
    </>
  )
}
