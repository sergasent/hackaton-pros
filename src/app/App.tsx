import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProductPage } from 'pages/ProductPage/ProductPage';
import { Header } from 'ui/Header/Header';
import { Footer } from 'ui/Footer/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  );
};
