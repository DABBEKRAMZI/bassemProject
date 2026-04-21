'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const servicesImages = [
  { src: '/Deglet-Nour-2.jpg', alt: 'Deglet Nour Dates' },
  { src: '/PittedDates5.jpg', alt: 'Pitted Dates' },
  { src: '/Pressed-Dates.jpg', alt: 'Pressed Dates' },
];


export default function Services() {
  const t = useTranslations('Services');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? servicesImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === servicesImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-green-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left - Text */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg sm:text-xl opacity-90 mb-6">{t('description')}</p>

          {/* View Details Button */}
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            {t('viewDetails')}
          </Link>
        </div>

        {/* Right - Slider */}
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={servicesImages[currentIndex].src}
            alt={servicesImages[currentIndex].alt}
            fill
            className="object-cover"
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-700 bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-700 bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full"
          >
            ▶
          </button>

          {/* Caption */}
          <p className="absolute bottom-2 left-0 right-0 text-center text-sm sm:text-base bg-green-800 bg-opacity-70 py-1">
            {servicesImages[currentIndex].alt}
          </p>
        </div>
      </div>
    </div>
  );
}
