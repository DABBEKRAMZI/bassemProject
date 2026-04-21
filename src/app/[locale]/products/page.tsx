// app/[locale]/products/page.tsx
'use client';

import { useTranslations } from 'next-intl';
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
  const categoriesData: Record<string, Omit<Category, 'slug'>> = t.raw('categories');
  
  // Convert to array with slugs
  const categories = Object.entries(categoriesData).map(([slug, category]) => ({
    slug,
    ...category
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#2C5E1A] mb-4">{t('title')}</h1>
        <p className="text-lg text-[#5E8D44] max-w-3xl mx-auto">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/products/${category.slug}`}
              className="group block h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#E8E8E8]"
            >
              <div className="relative w-full h-60">
                <Image
                  src={`/${category.image || category.slug}.jpg`}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2C5E1A] mb-2 group-hover:text-[#E8A75D] transition-colors">
                  {category.title}
                </h3>
                <p className="text-[#5E8D44] text-sm mb-4 line-clamp-2">{category.description}</p>
                <span className="inline-flex items-center text-[#E8A75D] font-medium group-hover:text-[#F7DC6F] transition-colors">
                  View Products
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}