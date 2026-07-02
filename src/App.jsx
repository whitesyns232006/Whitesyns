import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import FAQs from './Pages/FAQs';
import TermsOfService from './Pages/TermsOfService'; // ✅ Yeh import hona chahiye
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
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        {/* Default Helmet for all pages */}
        <Helmet>
          <title>Whitesyns Pakistan</title>
          <meta name="description" content="Whitesyns - Pakistan's first edible teeth-whitening solution" />
        </Helmet>
        
        <ScrollToTop />
        <Header />
        
        <main className="grow">
          <Routes>
            <Route path="/" element={
              <RouteWrapper>
                <Helmet>
                  <title>Whitesyns Pakistan</title>
                </Helmet>
                <Home />
              </RouteWrapper>
            } />
            <Route path="/about" element={
              <RouteWrapper>
                <Helmet>
                  <title>About Us - Whitesyns Pakistan</title>
                </Helmet>
                <AboutUs />
              </RouteWrapper>
            } />
            <Route path="/faq" element={
              <RouteWrapper>
                <Helmet>
                  <title>FAQs - Whitesyns Pakistan</title>
                </Helmet>
                <FAQs />
              </RouteWrapper>
            } />
            <Route path="/terms" element={
              <RouteWrapper>
                <Helmet>
                  <title>Terms of Service - Whitesyns Pakistan</title>
                </Helmet>
                <TermsOfService /> {/* ✅ Yeh component render hona chahiye */}
              </RouteWrapper>
            } />
            <Route path="/orders" element={
              <RouteWrapper>
                <Helmet>
                  <title>Place Order - Whitesyns Pakistan</title>
                </Helmet>
                <OrderForm />
              </RouteWrapper>
            } />
            <Route path="/confirmation" element={
              <RouteWrapper>
                <Helmet>
                  <title>Order Confirmation - Whitesyns Pakistan</title>
                </Helmet>
                <OrderConfirmation />
              </RouteWrapper>
            } />
            <Route path="/track" element={
              <RouteWrapper>
                <Helmet>
                  <title>Track Shipment - Whitesyns Pakistan</title>
                </Helmet>
                <Home />
              </RouteWrapper>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;