'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const processSteps = [
  {
    key: 'harvesting',
    images: [
      { src: '/harvesting1.jpg', alt: 'Harvesting Date Palms' },
      { src: '/harvesting2.jpeg', alt: 'Careful Date Harvest' },
      { src: '/harvesting3.jpg', alt: 'Careful Date Harvest' }
    ]
  },
  {
    key: 'sorting',
    images: [
      { src: '/sorting1.jpg', alt: 'Sorting Dates' },
      { src: '/cleaning.jpg', alt: 'Cleaning Process' }

    ]
  },
  {
    key: 'processing',
    images: [
      { src: '/processing1.jpg', alt: 'Processing Line' },
      { src: '/processing2.jpg', alt: 'Quality Control' }
    ]
  },
  {
    key: 'packaging',
    images: [
      { src: '/packaging1.jpg', alt: 'Packaging Dates' },
      { src: '/packaging2.jpg', alt: 'Sealed Packages' },

    ]
  },
  {
    key: 'export',
    images: [
              { src: '/export.png', alt: 'Loading for Export' },

      { src: '/export2.jpg', alt: 'Loading for Export' },
      { src: '/export3.jpg', alt: 'Export Logistics' }
    ]
  }
];

export default function Process() {
  const t = useTranslations('Process');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const step = processSteps[currentStepIndex];

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === step.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [step]);

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) =>
      prev === 0 ? processSteps.length - 1 : prev - 1
    );
    setCurrentImageIndex(0); // Reset image index on step change
  };

  const handleNextStep = () => {
    setCurrentStepIndex((prev) =>
      prev === processSteps.length - 1 ? 0 : prev + 1
    );
    setCurrentImageIndex(0); // Reset image index on step change
  };

  return (
    <div className="bg-green-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h2>
        <p className="text-lg sm:text-xl opacity-90">{t('description')}</p>
      </div>

      <div className="max-w-4xl mx-auto bg-green-900 rounded-lg overflow-hidden shadow-lg">
        {/* Image Slider */}
        <div className="relative w-full h-64 sm:h-96">
          <Image
            src={step.images[currentImageIndex].src}
            alt={step.images[currentImageIndex].alt}
            fill
            className="object-cover"
          />
        </div>

        {/* Step Info */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2">{t(`${step.key}`)}</h3>
          <p className="text-sm sm:text-base opacity-90">
            {t(`${step.key}Desc`)}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center px-6 pb-6">
          <button
            onClick={handlePrevStep}
            className="px-4 py-2 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            ◀ {t('prev')}
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            {t('next')} ▶
          </button>
        </div>
      </div>
    </div>
  );
}
