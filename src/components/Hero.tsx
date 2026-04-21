'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
      const t = useTranslations();
    
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videoplayback.mp4" // replace with your video path inside public/videos
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {t('Navbar.logo')} Premium Tunisian Dates Exporter
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mb-8">
          Delivering the finest quality dates worldwide with passion and integrity.
        </p>

        <Link
          href="/about"
          className="inline-block px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition text-lg"
        >
          Learn More About Us
        </Link>
      </div>

      {/* Bottom Decorative Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#166534"
          fillOpacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,122.7C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
