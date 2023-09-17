import 'react-toastify/dist/ReactToastify.css'

import HooksContainer from '@/app/hooks/hooksContainer'
import { Provider } from 'react-redux'
import RootLayout from '@/app/components/layout'
import { ToastContainer } from 'react-toastify'
import firebaseInitialization from '@/app/firebase'
import store from '@/app/store/store'

function MyApp({ Component, pageProps }: any) {
  firebaseInitialization()

  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <ToastContainer position="top-center" rtl={false} newestOnTop={false} />
      <HooksContainer />
    </Provider>
  )
}
export default MyApp
