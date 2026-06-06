'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye } from 'react-icons/fa';

export default function AboutUs() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <div className="bg-[#FDF6ED]">

      {/* Hero banner */}
      <section className="bg-[#2D1206] text-[#FDF6ED] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A1E0A] via-[#2D1206] to-[#1a0a03] opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-3 py-1 rounded-full bg-[#C9820C]/20 text-[#F0C060] text-xs font-semibold tracking-widest uppercase"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            {t('title')}
          </motion.h1>
          <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mx-auto mb-5" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#FDF6ED]/75 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E5D0B8]"
        >
          <Image
            src="/about-image.webp"
            alt="About HOMA FRUITS"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/40 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#C9820C]/15 text-[#7C3109] text-xs font-semibold tracking-widest uppercase">
            Who We Are
          </span>
          <h2 className="text-3xl font-bold text-[#2D1206] mb-4">{t('whoWeAre.title')}</h2>
          <div className="w-10 h-0.5 bg-[#C9820C] rounded-full mb-5" />
          <p className="text-[#8B6347] leading-relaxed mb-8">{t('whoWeAre.description')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9820C] text-[#2D1206] font-bold rounded-xl hover:bg-[#F0C060] transition-all duration-200 shadow-md"
          >
            {t('contactUs')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F5E8D0] py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <FaBullseye className="text-2xl text-[#C9820C]" />, title: t('mission.title'), desc: t('mission.description') },
            { icon: <FaEye className="text-2xl text-[#C9820C]" />,      title: t('vision.title'),  desc: t('vision.description')  },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-md ring-1 ring-[#E5D0B8] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9820C]/10 flex items-center justify-center mb-5">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2D1206] mb-3">{card.title}</h3>
              <div className="w-8 h-0.5 bg-[#C9820C] rounded-full mb-4" />
              <p className="text-[#8B6347] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-4 bg-[#FDF6ED]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2D1206] mb-2">{t('location.title')}</h2>
            <div className="w-10 h-0.5 bg-[#C9820C] rounded-full mx-auto" />
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E5D0B8]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d622.2079115454582!2d9.014734858880226!3d33.487026387869605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12567d003b399375%3A0x5dcd43a9f36e823f!2z2KfZhNmF2K_Ysdiz2Kkg2KfZhNmC2LHYotmG2YrYqSDYp9mE2LrZgdix2KfZhiDYqNin2YTZgtmE2LnYqQ!5e0!3m2!1sfr!2stn!4v1751130532633!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
