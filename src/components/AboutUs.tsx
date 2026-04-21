'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AboutUs() {
  const t = useTranslations('About');

  return (
    <div className="bg-gradient-to-b from-green-800 to-green-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">{t('subtitle')}</p>
      </section>

      {/* About Image + Text */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 py-12">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/about-image.webp" // replace with your real image path
            alt="About Our Dates Company"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">{t('whoWeAre.title')}</h2>
          <p className="text-base sm:text-lg opacity-90">{t('whoWeAre.description')}</p>

          <Link
            href="/contact"
            className="inline-block mt-6 px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            {t('contactUs')}
          </Link>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-green-700 bg-opacity-30 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="p-6 rounded-lg bg-green-800 bg-opacity-80 shadow-lg">
            <h3 className="text-2xl font-bold mb-3">{t('mission.title')}</h3>
            <p className="text-base opacity-90">{t('mission.description')}</p>
          </div>

          {/* Vision */}
          <div className="p-6 rounded-lg bg-green-800 bg-opacity-80 shadow-lg">
            <h3 className="text-2xl font-bold mb-3">{t('vision.title')}</h3>
            <p className="text-base opacity-90">{t('vision.description')}</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">{t('location.title')}</h2>

          <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d622.2079115454582!2d9.014734858880226!3d33.487026387869605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12567d003b399375%3A0x5dcd43a9f36e823f!2z2KfZhNmF2K_Ysdiz2Kkg2KfZhNmC2LHYotmG2YrYqSDYp9mE2LrZgdix2KfZhiDYqNin2YTZgtmE2LnYqQ!5e0!3m2!1sfr!2stn!4v1751130532633!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
