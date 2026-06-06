'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const processSteps = [
  {
    key: 'harvesting',
    images: [
      { src: '/harvesting1.jpg', alt: 'Harvesting Date Palms' },
      { src: '/harvesting2.jpeg', alt: 'Careful Date Harvest' },
      { src: '/harvesting3.jpg', alt: 'Careful Date Harvest' },
    ],
  },
  {
    key: 'sorting',
    images: [
      { src: '/sorting1.jpg', alt: 'Sorting Dates' },
      { src: '/cleaning.jpg', alt: 'Cleaning Process' },
    ],
  },
  {
    key: 'processing',
    images: [
      { src: '/processing1.jpg', alt: 'Processing Line' },
      { src: '/processing2.jpg', alt: 'Quality Control' },
    ],
  },
  {
    key: 'packaging',
    images: [
      { src: '/packaging1.jpg', alt: 'Packaging Dates' },
      { src: '/packaging2.jpg', alt: 'Sealed Packages' },
    ],
  },
  {
    key: 'export',
    images: [
      { src: '/export.png', alt: 'Loading for Export' },
      { src: '/export2.jpg', alt: 'Loading for Export' },
      { src: '/export3.jpg', alt: 'Export Logistics' },
    ],
  },
];

export default function Process() {
  const t = useTranslations('Process');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stepDirection, setStepDirection] = useState(1);

  const step = processSteps[currentStepIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === step.images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [step]);

  const handlePrevStep = () => {
    setStepDirection(-1);
    setCurrentStepIndex((prev) => (prev === 0 ? processSteps.length - 1 : prev - 1));
    setCurrentImageIndex(0);
  };

  const handleNextStep = () => {
    setStepDirection(1);
    setCurrentStepIndex((prev) => (prev === processSteps.length - 1 ? 0 : prev + 1));
    setCurrentImageIndex(0);
  };

  return (
    <section className="bg-[#FDF6ED] py-24 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-14"
      >
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#C9820C]/15 text-[#7C3109] text-xs font-semibold tracking-widest uppercase">
          From Farm to World
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#2D1206] mb-4">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mx-auto mb-5" />
        <p className="text-lg text-[#8B6347] leading-relaxed">{t('description')}</p>
      </motion.div>

      {/* Step indicators */}
      <div className="max-w-4xl mx-auto mb-10 px-4">
        <div className="flex items-start justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-px bg-[#E5D0B8]" />
          <div
            className="absolute top-4 left-0 h-px bg-[#C9820C] transition-all duration-500"
            style={{ width: `${(currentStepIndex / (processSteps.length - 1)) * 100}%` }}
          />
          {processSteps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                setStepDirection(i > currentStepIndex ? 1 : -1);
                setCurrentStepIndex(i);
                setCurrentImageIndex(0);
              }}
              aria-label={t(s.key)}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                i === currentStepIndex
                  ? 'bg-[#C9820C] border-[#C9820C] text-white scale-110 shadow-md'
                  : i < currentStepIndex
                  ? 'bg-[#7C3109] border-[#7C3109] text-white'
                  : 'bg-white border-[#E5D0B8] text-[#8B6347]'
              }`}>
                {i < currentStepIndex ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`hidden sm:block text-xs font-medium transition-colors duration-200 max-w-[72px] text-center leading-tight ${
                i === currentStepIndex ? 'text-[#7C3109] font-bold' : 'text-[#8B6347]'
              }`}>
                {t(s.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E5D0B8]">
        {/* Image */}
        <div className="relative w-full h-64 sm:h-96 overflow-hidden bg-[#F5E8D0]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentStepIndex}-${currentImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={step.images[currentImageIndex].src}
                alt={step.images[currentImageIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {step.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {step.images.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIndex ? 'w-5 bg-[#C9820C]' : 'w-1.5 bg-white/60'
                }`} />
              ))}
            </div>
          )}
        </div>

        {/* Step info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: stepDirection * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: stepDirection * -30 }}
            transition={{ duration: 0.3 }}
            className="px-8 py-7 text-center"
          >
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#C9820C]/15 text-[#C9820C] font-bold text-sm mb-3">
              {currentStepIndex + 1}
            </div>
            <h3 className="text-2xl font-bold text-[#2D1206] mb-2">{t(step.key)}</h3>
            <p className="text-[#8B6347] max-w-lg mx-auto leading-relaxed">{t(`${step.key}Desc`)}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center px-8 pb-8">
          <button
            onClick={handlePrevStep}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5E8D0] text-[#7C3109] font-semibold rounded-xl hover:bg-[#C9820C] hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {t('prev')}
          </button>
          <span className="text-sm text-[#8B6347] font-medium">
            {currentStepIndex + 1} / {processSteps.length}
          </span>
          <button
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9820C] text-white font-semibold rounded-xl hover:bg-[#F0C060] hover:text-[#2D1206] transition-all duration-200"
          >
            {t('next')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
