'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FaBoxOpen, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import ReactCountryFlag from 'react-country-flag';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages = [
    { code: 'en', name: t('languages.english'),    country: 'GB' },
    { code: 'de', name: t('languages.german'),     country: 'DE' },
    { code: 'ar', name: t('languages.arabic'),     country: 'SA', rtl: true },
    { code: 'fr', name: t('languages.french'),     country: 'FR' },
    { code: 'pt', name: t('languages.portuguese'), country: 'PT' },
    { code: 'it', name: t('languages.italian'),    country: 'IT' },
    { code: 'es', name: t('languages.spanish'),    country: 'ES' },
  ];

  const navItems = [
    { href: '/home',     label: t('links.home')     },
    { href: '/about',    label: t('links.about')    },
    { href: '/products', label: t('links.products'), icon: <FaBoxOpen className="mr-1.5 text-xs opacity-70" /> },
    { href: '/contact',  label: t('links.contact'),  icon: <FaEnvelope className="mr-1.5 text-xs opacity-70" /> },
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#2D1206]/95 backdrop-blur-md shadow-2xl border-b border-[#4A1E0A]'
          : 'bg-[#2D1206] border-b border-[#4A1E0A]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link href={`/${locale}/home`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#C9820C]/15 flex items-center justify-center group-hover:bg-[#C9820C]/25 transition-colors">
              <GiPalmTree className="text-xl text-[#C9820C]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold text-[#FDF6ED] tracking-widest font-serif">HOMA</span>
              <span className="text-[10px] font-semibold text-[#C9820C] tracking-[0.3em] uppercase">FRUITS</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`relative flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.href)
                    ? 'text-[#F0C060]'
                    : 'text-[#FDF6ED]/65 hover:text-[#FDF6ED]'
                }`}
              >
                {(item as { href: string; label: string; icon?: React.ReactNode }).icon}
                {item.label}
                {/* Active underline */}
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#C9820C] rounded-full" />
                )}
              </Link>
            ))}

            {/* Language */}
            <div className="relative ml-3">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-[#FDF6ED]/65 hover:text-[#FDF6ED] px-3 py-2 rounded-lg transition-colors"
                aria-label={t('languageSelector')}
              >
                <FaGlobe className="text-[#C9820C] text-sm" />
                <HiChevronDown className={`text-sm transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-[#2D1206]/98 backdrop-blur-sm border border-[#4A1E0A] py-1.5 z-50">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      dir={lng.rtl ? 'rtl' : 'ltr'}
                      className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${
                        locale === lng.code
                          ? 'text-[#F0C060] bg-[#C9820C]/10 font-semibold'
                          : 'text-[#FDF6ED]/65 hover:text-[#FDF6ED] hover:bg-[#4A1E0A]'
                      }`}
                    >
                      <ReactCountryFlag countryCode={lng.country} svg style={{ width: '20px', height: '15px', marginRight: '10px' }} />
                      {lng.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#FDF6ED]/70 hover:bg-[#4A1E0A] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2D1206]/98 backdrop-blur-sm border-t border-[#4A1E0A] pb-5">
          <div className="px-4 pt-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-[#C9820C]/15 text-[#F0C060] border-l-2 border-[#C9820C]'
                    : 'text-[#FDF6ED]/65 hover:text-[#FDF6ED] hover:bg-[#4A1E0A]'
                }`}
              >
                {(item as { href: string; label: string; icon?: React.ReactNode }).icon}
                {item.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-[#4A1E0A]">
              <p className="text-[10px] font-semibold text-[#C9820C] uppercase tracking-widest mb-3 px-4">{t('language')}</p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    dir={lng.rtl ? 'rtl' : 'ltr'}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-sm transition-all ${
                      locale === lng.code
                        ? 'bg-[#C9820C] text-[#2D1206] font-bold'
                        : 'text-[#FDF6ED]/65 hover:bg-[#4A1E0A] hover:text-[#FDF6ED]'
                    }`}
                  >
                    <ReactCountryFlag countryCode={lng.country} svg style={{ width: '18px', height: '14px', marginRight: '8px' }} />
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
