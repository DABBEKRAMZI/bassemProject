'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaLeaf, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';

export default function Quality() {
  const t = useTranslations('Quality');

  return (
    <div className="bg-green-800 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text content */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center gap-3">
            <FaLeaf className="text-yellow-400" />
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-6">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
            >
              <FaPhoneAlt className="mr-2" /> {t('contactUs')}
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-green-900 transition"
            >
              {t('discoverProducts')} <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-64 sm:h-96 relative rounded-lg overflow-hidden shadow-lg">
          <img
            src="/quality/quality.jpg"
            alt={t('title')}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
