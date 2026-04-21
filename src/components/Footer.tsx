'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaLeaf, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';

export default function Footer() {
  const t = useTranslations('Footer');

  // Footer color scheme matching the navbar
  const colors = {
    primary: 'bg-[#2C5E1A]',         // Deep palm green
    secondary: 'bg-[#1E4A12]',        // Darker green
    accent: 'text-[#E8A75D]',         // Golden date color
    textLight: 'text-[#F8F5E4]',      // Cream
    textDark: 'text-[#2C5E1A]',       // Dark green
  };

  // Languages with country codes
  const languages = [
    { code: 'en', country: 'GB' }, // Great Britain
    { code: 'de', country: 'DE' }, // Germany
    { code: 'ar', country: 'SA' }, // Saudi Arabia
    { code: 'fr', country: 'FR' }, // France
    { code: 'pt', country: 'PT' }, // Portugal
    { code: 'it', country: 'IT' }, // Italy
    { code: 'es', country: 'ES' }  // Spain
  ];

  const footerLinks = [
    {
      title: t('company'),
      links: [
        { label: t('about'), href: '/about' },
        { label: t('products'), href: '/products' },
        { label: t('certifications'), href: '/certifications' },
        { label: t('sustainability'), href: '/sustainability' },
      ]
    },
    // {
    //   title: t('resources'),
    //   links: [
    //     { label: t('blog'), href: '/blog' },
    //     { label: t('recipes'), href: '/recipes' },
    //     { label: t('healthBenefits'), href: '/health-benefits' },
    //     { label: t('faq'), href: '/faq' },
    //   ]
    // },
    // {
    //   title: t('legal'),
    //   links: [
    //     { label: t('privacy'), href: '/privacy' },
    //     { label: t('terms'), href: '/terms' },
    //     { label: t('shipping'), href: '/shipping' },
    //     { label: t('returns'), href: '/returns' },
    //   ]
    // }
  ];

  const contactInfo = [
    { icon: <FaPhone className={colors.accent} />, text: '+1 (555) 123-4567' },
    { icon: <FaEnvelope className={colors.accent} />, text: 'info@HOMA FRUITS.com' },
    { icon: <FaMapMarkerAlt className={colors.accent} />, text: '123 Palm Grove, Date Valley, CA 90210' }
  ];

  const socialMedia = [
    { icon: <FaFacebook />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedin />, href: '#' }
  ];

  return (
    <footer className={`${colors.primary} ${colors.textLight} border-t border-[#387D1F]`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <FaLeaf className={`text-3xl ${colors.accent} mr-2`} />
              <span className="text-2xl font-bold font-montserrat">
                HOMA <span className={colors.accent}>FRUITS</span>
              </span>
            </div>
            <p className="text-sm mb-4 opacity-90">
              {t('description')}
            </p>
            
            {/* Language Selector */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">{t('language')}</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Link 
                    key={lang.code} 
                    href={`/${lang.code}`}
                    className="hover:opacity-80 transition-opacity"
                    title={lang.code.toUpperCase()}
                  >
                    <ReactCountryFlag 
                      countryCode={lang.country}
                      svg
                      style={{ width: '28px', height: '21px' }}
                      className="rounded-sm"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaLeaf className={`${colors.accent} mr-2 text-sm`} />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`text-sm hover:${colors.accent} transition-colors flex items-center`}
                    >
                      <span className="hover:underline">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaLeaf className={`${colors.accent} mr-2 text-sm`} />
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-0.5">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">{t('followUs')}</h4>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className={`text-xl hover:${colors.accent} transition-colors`}
                    aria-label={social.href.replace('#', '')}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={`${colors.secondary} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} HOMA FRUITS. {t('rightsReserved')}</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:underline">{t('privacy')}</Link>
              <Link href="/terms" className="hover:underline">{t('terms')}</Link>
              <Link href="/sitemap" className="hover:underline">{t('sitemap')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}