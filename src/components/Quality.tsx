'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { FaArrowRight, FaPhoneAlt, FaMedal, FaLeaf, FaGlobeAfrica } from 'react-icons/fa';
import { motion } from 'framer-motion';

const badges = [
  { icon: <FaMedal />, label: 'Certified Quality' },
  { icon: <FaLeaf />,  label: '100% Natural'     },
  { icon: <FaGlobeAfrica />, label: 'Global Export' },
];

export default function Quality() {
  const t = useTranslations('Quality');
  const locale = useLocale();

  return (
    <section className="bg-[#2D1206] text-[#FDF6ED] py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
        >
          <Image
            src="/quality/quality.jpg"
            alt={t('title')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/60 to-transparent" />

          {/* Floating badge */}
          <div className="absolute bottom-5 left-5 right-5 flex gap-2 flex-wrap z-10">
            {badges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D1206]/70 backdrop-blur-sm text-[#F0C060] text-xs font-semibold border border-[#C9820C]/30">
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2"
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#C9820C]/20 text-[#F0C060] text-xs font-semibold tracking-widest uppercase">
            Our Standards
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{t('title')}</h2>
          <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mb-6" />
          <p className="text-lg text-[#FDF6ED]/80 mb-10 leading-relaxed">{t('description')}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C9820C] text-[#2D1206] font-bold rounded-xl hover:bg-[#F0C060] transition-all duration-200 shadow-lg"
            >
              <FaPhoneAlt /> {t('contactUs')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-[#C9820C]/60 text-[#F0C060] font-semibold rounded-xl hover:border-[#C9820C] hover:bg-[#C9820C]/10 transition-all duration-200"
            >
              {t('discoverProducts')} <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
