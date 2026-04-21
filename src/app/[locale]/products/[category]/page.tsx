// app/[locale]/products/[category]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

interface Product {
  slug: string;
  title: string;
  desc: string;
  image?: string;
}

interface Category {
  title: string;
  description: string;
  image?: string;
  products: Product[];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const t = useTranslations('Products');
  const categories: Record<string, Category> = t.raw('categories');
  const category = categories[params.category];

  if (!category) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 py-12 text-center"
      >
        <h1 className="text-2xl font-bold text-[#2C5E1A] mb-4">Category not found</h1>
        <Link 
          href="/products" 
          className="text-[#E8A75D] hover:underline inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to categories
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link 
          href="/products" 
          className="inline-flex items-center text-[#E8A75D] hover:text-[#F7DC6F] transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToProducts')}
        </Link>
      </motion.div>

      {/* Category Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 w-full">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={`/${category.image || params.category}.jpg`}
                alt={category.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C5E1A]/80 to-transparent" />
            </div>
          </div>
          
          <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#2C5E1A] mb-4"
            >
              {category.title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-[#5E8D44] mb-6 leading-relaxed"
            >
              {category.description}
            </motion.p>
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <div className="w-12 h-1 bg-[#E8A75D] rounded-full" />
              <span className="text-sm font-medium text-[#5E8D44]">
                {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-8"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-semibold text-[#2C5E1A] mb-8 text-center"
        >
          Our {category.title} Collection
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {category.products.map((product) => (
            <motion.div
              key={product.slug}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col h-full" // Added flex and h-full here
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-hidden rounded-xl shadow-lg border border-[#E8E8E8] bg-white flex flex-col">
                  {/* Image with fixed aspect ratio */}
                  <div className="relative pt-[70%] w-full overflow-hidden">
                    <Image
                      src={`/${product.image || product.slug}.jpg`}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C5E1A]/30 to-transparent" />
                  </div>
                  
                  {/* Content with flex-grow */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#2C5E1A] mb-2 group-hover:text-[#E8A75D] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#5E8D44] text-sm mb-4 line-clamp-2 flex-grow">
                      {product.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#F7F6E8] rounded-2xl p-8 md:p-12 text-center mt-16"
      >
        <h3 className="text-2xl font-bold text-[#2C5E1A] mb-4">{t('cta.title', { categoryTitle: category.title })}</h3>
        <p className="text-[#5E8D44] mb-6 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-[#E8A75D] hover:bg-[#F7DC6F] text-[#2C5E1A] font-medium rounded-lg transition-colors"
        >
          {t('cta.button')}
        </Link>
      </motion.div>
    </div>
  );
}