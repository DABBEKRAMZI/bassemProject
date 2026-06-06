'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const locale = useLocale();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="/videoplayback.mp4"
        autoPlay loop muted playsInline
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-[#2D1206]/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206] via-[#2D1206]/10 to-[#2D1206]/30" />

      {/* Decorative vertical line */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9820C]/60" />
        <span className="text-[#C9820C]/60 text-[10px] tracking-[0.4em] uppercase rotate-90 my-6">Scroll</span>
        <div className="w-px h-24 bg-gradient-to-b from-[#C9820C]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-10 bg-[#C9820C]/60" />
          <span className="text-[#C9820C] text-xs font-semibold tracking-[0.4em] uppercase">
            Since 1985 · Tozeur, Tunisia
          </span>
          <div className="h-px w-10 bg-[#C9820C]/60" />
        </motion.div>

        {/* Main heading — serif, massive */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="font-serif font-bold leading-none tracking-tight text-white mb-1"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          HOMA
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="font-serif font-bold leading-none tracking-tight text-[#C9820C] italic mb-8"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Fruits
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-20 h-px bg-[#C9820C] mb-7"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-[#FDF6ED]/70 text-base sm:text-lg max-w-md mb-10 leading-relaxed tracking-wide"
        >
          Premium Tunisian Deglet Nour dates — harvested with care, delivered to the world.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={`/${locale}/products`}
            className="px-8 py-4 bg-[#C9820C] text-[#2D1206] font-bold rounded-lg hover:bg-[#F0C060] transition-all duration-200 shadow-lg shadow-[#C9820C]/20 hover:shadow-[#C9820C]/40 text-sm tracking-widest uppercase"
          >
            Explore Products
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="px-8 py-4 border border-[#FDF6ED]/30 text-[#FDF6ED]/80 font-medium rounded-lg hover:border-[#C9820C] hover:text-[#F0C060] transition-all duration-200 text-sm tracking-widest uppercase backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#FDF6ED]/40 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[#FDF6ED]/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-[#C9820C]"
          />
        </div>
      </motion.div>
    </section>
  );
}
