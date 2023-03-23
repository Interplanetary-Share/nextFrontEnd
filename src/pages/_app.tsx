import firebaseInitialization from '@/app/firebase';
import HooksContainer from '@/app/hooks/hooksContainer';
import RootLayout from '@/app/components/layout';
import store from '@/app/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagManager from 'react-gtm-module'

function MyApp({ Component, pageProps }: any) {
  firebaseInitialization();
TagManager.initialize({
  gtmId: 'G-WV41H07YJR'
})


  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <ToastContainer position="top-center" rtl={false} newestOnTop={false} />
      <HooksContainer />
    </Provider>
  );
}
export default MyApp;
