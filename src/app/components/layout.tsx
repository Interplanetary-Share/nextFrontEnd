import Header from './layout/header/header';
import './globals.css';
import Footer from './layout/footer/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
