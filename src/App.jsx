import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import FAQs from './Pages/FAQs';
import TermsOfService from './Pages/TermsOfService';
import OrderForm from './Pages/OrderForm';
import OrderConfirmation from './Pages/OrderConfirmation';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);

  return null;
};

// Route wrapper that forces re-render
const RouteWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname + location.key}>
      {children}
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      
      <main className="grow">
        <Routes>
          <Route path="/" element={
            <RouteWrapper>
              <Home />
            </RouteWrapper>
          } />
          <Route path="/about" element={
            <RouteWrapper>
              <AboutUs />
            </RouteWrapper>
          } />
          <Route path="/faq" element={
            <RouteWrapper>
              <FAQs />
            </RouteWrapper>
          } />
          <Route path="/terms" element={
            <RouteWrapper>
              <TermsOfService />
            </RouteWrapper>
          } />
          <Route path="/orders" element={
            <RouteWrapper>
              <OrderForm />
            </RouteWrapper>
          } />
          <Route path="/confirmation" element={
            <RouteWrapper>
              <OrderConfirmation />
            </RouteWrapper>
          } />
          <Route path="/track" element={
            <RouteWrapper>
              <Home />
            </RouteWrapper>
          } />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;