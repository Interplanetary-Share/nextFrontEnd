import { Provider } from 'react-redux';
import RootLayout from '@/app/layout';
import store from '@/app/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import firebase from '../src/app/firebase';
// import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }: any) {
  //   firebase();
  //   useEffect(() => {
  //     TagManager.initialize({ gtmId: 'G-X9780PKFXK' });
  //   }, []);

  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <ToastContainer position="top-center" rtl={false} newestOnTop={false} />
    </Provider>
  );
}
export default MyApp;
