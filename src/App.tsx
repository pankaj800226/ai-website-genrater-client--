import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import "./styles/app.css";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Configurations (Lazy Loading)
const Home = React.lazy(() => import('./pages/Home'));
const Ai = React.lazy(() => import('./pages/AI/Ai'));


const AppLayout = () => {
  const location = useLocation()


  const hideHeaderRoute = [
    '/ai',
  ]

  const hideHeader = hideHeaderRoute.some(route => location.pathname.startsWith(route))


  return (
    <>
      {!hideHeader && <Header />}
      <div className="min-h-screen bg-[#05070A]">
        <Toaster position="top-center" reverseOrder={false} />

        <Suspense fallback={
          // 
          <Loading />
        }>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/ai" element={<Ai />} />


            {/* 404 Page (Optional) */}
            <Route path="*" element={
              <div className="h-screen flex items-center justify-center text-white">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            } />
          </Routes>
        </Suspense>
        {!hideHeader && <Footer />}
      </div>
    </>
  )
}



const App = () => {

  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;