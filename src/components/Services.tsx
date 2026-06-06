'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaBoxOpen, FaGlobeAfrica } from 'react-icons/fa';

const servicesImages = [
  { src: '/Deglet-Nour-2.jpg',  alt: 'Deglet Nour Dates'  },
  { src: '/PittedDates5.jpg',   alt: 'Pitted Dates'       },
  { src: '/Pressed-Dates.jpg',  alt: 'Pressed Dates'      },
];

const features = [
  { icon: <FaLeaf />,        label: 'Premium Sorting & Processing'  },
  { icon: <FaBoxOpen />,     label: 'Custom Packaging Solutions'    },
  { icon: <FaGlobeAfrica />, label: 'International Certifications'  },
];

export default function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => { setDir(-1); setCurrent(i => (i === 0 ? servicesImages.length - 1 : i - 1)); };
  const next = () => { setDir(1);  setCurrent(i => (i === servicesImages.length - 1 ? 0 : i + 1)); };

  return (
    <section className="bg-[#4A1E0A] text-[#FDF6ED] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: editorial text panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center px-8 sm:px-14 py-20 lg:py-28"
        >
          {/* Label */}
          <p className="text-[10px] font-semibold text-[#C9820C] tracking-[0.4em] uppercase mb-6">
            What We Offer
          </p>

          {/* Heading — serif */}
          <h2 className="font-serif font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}>
            {t('title')}
          </h2>

          {/* Gold rule */}
          <div className="w-12 h-px bg-[#C9820C] mb-7" />

          <p className="text-[#FDF6ED]/65 text-base leading-relaxed mb-10 max-w-md">
            {t('description')}
          </p>

          {/* Feature list */}
          <ul className="space-y-4 mb-12">
            {features.map(f => (
              <li key={f.label} className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-lg bg-[#C9820C]/15 flex items-center justify-center text-[#C9820C] text-sm shrink-0">
                  {f.icon}
                </span>
                <span className="text-sm font-medium text-[#FDF6ED]/80">{f.label}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/${locale}/products`}
            className="self-start inline-flex items-center gap-3 px-7 py-3.5 bg-[#C9820C] text-[#2D1206] font-bold rounded-lg hover:bg-[#F0C060] transition-all duration-200 shadow-lg shadow-[#C9820C]/20 text-sm tracking-wide"
          >
            {t('viewDetails')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* ── Right: full-height carousel ── */}
        <div className="relative h-72 sm:h-[500px] lg:h-auto lg:min-h-[600px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -80 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={servicesImages[current].src}
                alt={servicesImages[current].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A1E0A]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Caption + controls */}
          <div className="absolute bottom-0 left-0 right-0 p-7 z-10 flex items-end justify-between">
            <div>
              <p className="text-[#F0C060] text-xs font-semibold tracking-widest uppercase mb-1">
                {String(current + 1).padStart(2, '0')} / {String(servicesImages.length).padStart(2, '0')}
              </p>
              <p className="text-[#FDF6ED] text-sm font-medium">{servicesImages[current].alt}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous"
                className="w-10 h-10 rounded-lg bg-[#2D1206]/50 hover:bg-[#C9820C] backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={next} aria-label="Next"
                className="w-10 h-10 rounded-lg bg-[#2D1206]/50 hover:bg-[#C9820C] backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dot strip */}
          <div className="absolute top-6 right-6 flex flex-col gap-1.5 z-10">
            {servicesImages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-1.5 h-5 bg-[#C9820C]' : 'w-1.5 h-1.5 bg-[#FDF6ED]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
