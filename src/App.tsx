import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImageSlider } from './components/ImageSlider';
import { Packages } from './components/Packages';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <Hero />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Featured Work</h2>
            <ImageSlider />
          </div>
        </section>
        <Packages />
        <Gallery />
        <section id="book" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Book Your Session</h2>
            <BookingForm />
          </div>
        </section>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;