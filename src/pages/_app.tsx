import RootLayout from '@/app/components/layout';
import firebaseInitialization from '@/app/firebase';
import HooksContainer from '@/app/hooks/hooksContainer';
import store from '@/app/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  firebaseInitialization();

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
