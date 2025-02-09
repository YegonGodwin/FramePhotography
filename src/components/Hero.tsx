import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";

const heroTexts = [
  "Professional photography services for your special occasions",
  "Capturing life's precious moments with artistic excellence",
  "Creating timeless memories through our lens",
  "Your story, our vision, one frame at a time",
];

const heroImages = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1554941829-202a0b2403b8?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
];

export const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Handle text typing animation
  useEffect(() => {
    const text = heroTexts[currentTextIndex];
    if (isTyping && typedText.length < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isTyping && typedText.length === text.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (!isTyping && typedText.length > 0) {
      const timeout = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length - 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (!isTyping && typedText.length === 0) {
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isTyping, currentTextIndex]);

  // Handle image transition
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setFadeIn(true);
      }, 50);
    }, 6000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="relative h-screen">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex
              ? fadeIn
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Photography background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <Camera className="w-16 h-16 mb-6" />
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
          Capture Your Perfect Moments
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 h-8">
          {typedText}
          <span className="animate-blink">|</span>
        </p>
        <a
          href="#packages"
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          View Packages
        </a>
      </div>
    </div>
  );
};
