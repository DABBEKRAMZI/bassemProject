'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import ReactCountryFlag from 'react-country-flag';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  const languages = [
    { code: 'en', country: 'GB' },
    { code: 'de', country: 'DE' },
    { code: 'ar', country: 'SA' },
    { code: 'fr', country: 'FR' },
    { code: 'pt', country: 'PT' },
    { code: 'it', country: 'IT' },
    { code: 'es', country: 'ES' },
  ];

  const footerLinks = [
    { label: t('about'),    href: `/${locale}/about`    },
    { label: t('products'), href: `/${locale}/products` },
    { label: t('contact'),  href: `/${locale}/contact`  },
  ];

  const contactInfo = [
    { icon: <FaPhone />,         text: '+216 XX XXX XXX'            },
    { icon: <FaEnvelope />,      text: 'homaindustrie1@gmail.com'   },
    { icon: <FaMapMarkerAlt />,  text: 'Tunisia'                    },
  ];

  const socialMedia = [
    { icon: <FaFacebook />,  href: '#', label: 'Facebook'  },
    { icon: <FaTwitter />,   href: '#', label: 'Twitter'   },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedin />,  href: '#', label: 'LinkedIn'  },
  ];

  return (
    <footer className="bg-[#2D1206] text-[#FDF6ED] border-t border-[#4A1E0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <GiPalmTree className="text-3xl text-[#C9820C]" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold text-[#FDF6ED] tracking-wide">HOMA</span>
                <span className="text-xs font-semibold text-[#C9820C] tracking-[0.2em] uppercase">Fruits</span>
              </div>
            </div>
            <p className="text-sm text-[#FDF6ED]/65 mb-6 leading-relaxed">{t('description')}</p>

            {/* Language flags */}
            <div>
              <h4 className="text-xs font-semibold text-[#C9820C] uppercase tracking-widest mb-3">{t('language')}</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}/home`}
                    title={lang.code.toUpperCase()}
                    className="hover:opacity-80 transition-opacity rounded-sm overflow-hidden"
                  >
                    <ReactCountryFlag countryCode={lang.country} svg style={{ width: '26px', height: '20px' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#C9820C] uppercase tracking-widest mb-5">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#FDF6ED]/65 hover:text-[#F0C060] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-[#C9820C] uppercase tracking-widest mb-5">{t('contact')}</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#C9820C] shrink-0">{item.icon}</span>
                  <span className="text-sm text-[#FDF6ED]/65">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold text-[#C9820C] uppercase tracking-widest mb-5">{t('followUs')}</h3>
            <div className="flex gap-3">
              {socialMedia.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#4A1E0A] text-[#FDF6ED]/70 hover:bg-[#C9820C] hover:text-[#2D1206] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#4A1E0A] py-5">
        <p className="text-center text-xs text-[#FDF6ED]/40">
          © {new Date().getFullYear()} HOMA FRUITS. {t('rightsReserved')}
        </p>
      </div>
    </footer>
  );
}
