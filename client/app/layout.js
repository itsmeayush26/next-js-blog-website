import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: "Giakaa - Digital Innovation",
  description: "We build digital products that scale.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
