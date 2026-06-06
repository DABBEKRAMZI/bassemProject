'use client';

import { use } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface Product  { slug: string; title: string; desc: string; image?: string; }
interface Category { title: string; description: string; image?: string; products: Product[]; }

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params);
  const t = useTranslations('Products');
  const locale = useLocale();
  const categories: Record<string, Category> = t.raw('categories');
  const category = categories[categorySlug];

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FDF6ED] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2D1206] mb-4">Category not found</h1>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-[#C9820C] hover:text-[#F0C060] font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6ED]">

      {/* Back + Hero header */}
      <div className="bg-[#2D1206] text-[#FDF6ED] pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 text-[#FDF6ED]/60 hover:text-[#F0C060] text-sm font-medium transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToProducts')}
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Category image */}
            <motion.div variants={itemVariants} className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={`/${category.image || categorySlug}.jpg`}
                alt={category.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/70 to-transparent" />
            </motion.div>

            {/* Category info */}
            <motion.div variants={itemVariants}>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#C9820C]/20 text-[#F0C060] text-xs font-semibold tracking-widest uppercase">
                {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{category.title}</h1>
              <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mb-5" />
              <p className="text-[#FDF6ED]/75 text-lg leading-relaxed">{category.description}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden" animate="visible" variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {category.products.map((product) => (
            <motion.div
              key={product.slug}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-[#E5D0B8] hover:shadow-xl hover:ring-[#C9820C]/30 transition-all duration-300"
            >
              <div className="relative pt-[65%] overflow-hidden bg-[#F5E8D0]">
                <Image
                  src={`/${product.image || product.slug}.jpg`}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1206]/25 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#2D1206] mb-2">{product.title}</h3>
                <div className="w-7 h-0.5 bg-[#C9820C] rounded-full mb-3" />
                <p className="text-[#8B6347] text-sm leading-relaxed line-clamp-2">{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2D1206] rounded-2xl p-10 md:p-14 text-center text-[#FDF6ED]"
        >
          <h3 className="text-2xl font-bold mb-3">{t('cta.title', { categoryTitle: category.title })}</h3>
          <p className="text-[#FDF6ED]/70 mb-8 max-w-xl mx-auto leading-relaxed">{t('cta.description')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9820C] text-[#2D1206] font-bold rounded-xl hover:bg-[#F0C060] transition-all duration-200 shadow-lg"
          >
            {t('cta.button')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
