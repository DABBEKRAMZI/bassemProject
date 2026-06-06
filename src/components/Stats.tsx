'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '38',  suffix: '+',  label: 'Years of Excellence', sub: 'Est. 1985'         },
  { number: '25',  suffix: '+',  label: 'Countries Served',    sub: 'Worldwide export'  },
  { number: '6',   suffix: '',   label: 'Product Lines',       sub: 'Premium range'     },
  { number: '100', suffix: '%',  label: 'Natural & Certified', sub: 'No additives'      },
];

export default function Stats() {
  return (
    <section className="bg-[#2D1206] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-semibold text-[#C9820C] tracking-[0.4em] uppercase">
            By the numbers
          </span>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#4A1E0A]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-6 py-4 first:border-t-0"
            >
              {/* Number */}
              <div className="font-serif font-bold text-[#C9820C] leading-none mb-2"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                {stat.number}
                <span className="text-[#F0C060]">{stat.suffix}</span>
              </div>
              <div className="h-px w-8 bg-[#C9820C]/40 mb-3" />
              <p className="text-[#FDF6ED] text-sm font-semibold mb-1 tracking-wide">{stat.label}</p>
              <p className="text-[#8B6347] text-xs tracking-widest uppercase">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
