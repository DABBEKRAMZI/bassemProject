'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = {
    primary: 'bg-gradient-to-br from-green-800 to-green-700',
    secondary: 'bg-[#E8A75D]',
    accent: 'text-yellow-300',
    textLight: 'text-white',
    textDark: 'text-gray-900',
    border: 'border-gray-300'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t('errors.nameRequired'));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t('errors.invalidEmail'));
      return false;
    }
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      toast.error(t('errors.invalidPhone'));
      return false;
    }
    if (formData.message.length < 10) {
      toast.error(t('errors.messageTooShort'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(t('successMessage'));
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      toast.error(t('errors.submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full mx-auto p-4 sm:p-6 md:p-10 rounded-lg shadow-2xl overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-green-600 rounded-t-lg" />

      <div className={`relative z-10 rounded-lg ${colors.primary} bg-opacity-95 p-6 sm:p-10`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 flex justify-center items-center gap-2 text-white">
            <FaEnvelope className={colors.accent} />
            {t('title')}
          </h2>

          {/* Description */}
          <p className="mb-8 text-sm sm:text-base text-gray-200">
            {t('description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                <FaUser className="inline mr-2" />
                {t('form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-300"
                placeholder={t('form.namePlaceholder')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                <FaEnvelope className="inline mr-2" />
                {t('form.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-300"
                placeholder="example@domain.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
              <FaPhone className="inline mr-2" />
              {t('form.phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-300"
              placeholder="+1234567890"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
              {t('form.message')} *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-300"
              placeholder={t('form.messagePlaceholder')}
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-semibold bg-yellow-400 text-green-900 hover:bg-yellow-300 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="animate-spin">↻</span>
            ) : (
              <>
                <FaPaperPlane />
                {t('form.submit')}
              </>
            )}
          </button>
        </form>

        {/* Required fields note */}
        <p className="mt-4 text-xs sm:text-sm text-gray-200 opacity-80">
          * {t('form.requiredFields')}
        </p>

        {/* Closing note */}
        <p className="mt-6 text-center text-sm sm:text-base text-yellow-200 font-medium">
          {t('closingNote')}
        </p>
      </div>
    </div>
  );
}
