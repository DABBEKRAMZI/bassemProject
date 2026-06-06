'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function ProductsPage() {
  const t = useTranslations('Products');
  const locale = useLocale();
  const categoriesData: Record<string, Omit<Category, 'slug'>> = t.raw('categories');

  const categories = Object.entries(categoriesData).map(([slug, category]) => ({
    slug,
    ...category,
  }));

  return (
    <div className="min-h-screen bg-[#FDF6ED]">

      {/* Page header */}
      <div className="bg-[#2D1206] text-[#FDF6ED] py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#C9820C]/20 text-[#F0C060] text-xs font-semibold tracking-widest uppercase">
            Our Collection
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t('title')}</h1>
          <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mx-auto mb-5" />
          <p className="text-lg text-[#FDF6ED]/75 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/${locale}/products/${category.slug}`}
                className="group block h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ring-1 ring-[#E5D0B8] hover:ring-[#C9820C]/40"
              >
                <div className="relative w-full h-56 overflow-hidden bg-[#F5E8D0]">
                  <Image
                    src={`/${category.image || category.slug}.jpg`}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2D1206] mb-2 group-hover:text-[#C9820C] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-[#8B6347] text-sm mb-5 line-clamp-2 leading-relaxed">{category.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9820C] group-hover:gap-3 transition-all duration-200">
                    {t('viewDetails')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
