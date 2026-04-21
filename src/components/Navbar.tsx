'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FaLeaf, FaCalendarAlt, FaBoxOpen, FaEnvelope, FaGlobe } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';

export default function Navbar() {
  const t = useTranslations('Navbar'); // Changed to 'Navbar' namespace
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Color palette
  const colors = {
    primary: 'bg-[#2C5E1A]',
    primaryHover: 'hover:bg-[#387D1F]',
    secondary: 'bg-[#E8A75D]',
    accent: 'text-[#F7DC6F]',
    textLight: 'text-[#F8F5E4]',
    textDark: 'text-[#2C5E1A]'
  };

  // Languages with country codes
  const languages = [
    { code: 'en', name: t('languages.english'), country: 'GB' },
    { code: 'de', name: t('languages.german'), country: 'DE' },
    { code: 'ar', name: t('languages.arabic'), country: 'SA', rtl: true },
    { code: 'fr', name: t('languages.french'), country: 'FR' },
    { code: 'pt', name: t('languages.portuguese'), country: 'PT' },
    { code: 'it', name: t('languages.italian'), country: 'IT' },
    { code: 'es', name: t('languages.spanish'), country: 'ES' }
  ];

  // Mandatory i18n navigation items
  const navItems = [
    { 
      href: '/home', 
      label: t('links.home'), 
      icon: <FaLeaf className="mr-1" />,
      i18nKey: 'links.home' 
    },
    { 
      href: '/about', 
      label: t('links.about'), 
      icon: <FaCalendarAlt className="mr-1" />,
      i18nKey: 'links.about' 
    },
    { 
      href: '/products', 
      label: t('links.products'), 
      icon: <FaBoxOpen className="mr-1" />,
      i18nKey: 'links.products' 
    },
    { 
      href: '/contact', 
      label: t('links.contact'), 
      icon: <FaEnvelope className="mr-1" />,
      i18nKey: 'links.contact' 
    }
  ];

  const changeLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
    setLangOpen(false);
  };

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    return pathWithoutLocale === href || (href !== '/' && pathWithoutLocale.startsWith(href));
  };

  return (
    <nav className={`${colors.primary} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href={`/${locale}/home`} className="flex items-center gap-2 group">
            <FaLeaf className={`text-3xl ${colors.accent} transition-transform group-hover:rotate-12`} />
            <span className={`text-2xl font-bold ${colors.textLight} font-montserrat`}>
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${colors.textLight}
                  ${
                    isActive(item.href)
                      ? `${colors.secondary} ${colors.textDark} font-bold shadow-md`
                      : `${colors.primaryHover} hover:shadow-sm`
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative ml-3">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center ${colors.textLight} ${colors.primaryHover} px-3 py-2 rounded-md min-w-[70px]`}
                aria-label={t('languageSelector')}
              >
                <FaGlobe className="mr-1" />
                <HiChevronDown className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${colors.primary} py-1 z-50 border ${colors.textDark}`}>
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`flex items-center w-full px-4 py-2 text-sm ${colors.textLight} hover:${colors.secondary} hover:${colors.textDark}
                        ${locale === lng.code ? 'font-bold bg-amber-700' : ''}`}
                      dir={lng.rtl ? 'rtl' : 'ltr'}
                    >
                      <ReactCountryFlag 
                        countryCode={lng.country}
                        svg
                        style={{ width: '20px', height: '15px', marginRight: '8px' }}
                      />
                      {lng.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${colors.textLight} hover:${colors.secondary} hover:${colors.textDark}`}
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden ${colors.primary} pb-4 shadow-inner`}>
          <div className="px-4 pt-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${colors.textLight}
                  ${
                    isActive(item.href)
                      ? `${colors.secondary} ${colors.textDark} font-bold`
                      : `hover:${colors.primaryHover}`
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            <div className="px-4 pt-4 border-t border-opacity-20 border-white">
              <h4 className={`text-sm font-semibold ${colors.textLight} mb-3`}>
                {t('language')}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm ${colors.textLight} hover:${colors.secondary} hover:${colors.textDark}
                      ${locale === lng.code ? 'font-bold bg-amber-700' : ''}`}
                    dir={lng.rtl ? 'rtl' : 'ltr'}
                  >
                    <ReactCountryFlag 
                      countryCode={lng.country}
                      svg
                      style={{ width: '20px', height: '15px', marginRight: '6px' }}
                    />
                    {lng.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}