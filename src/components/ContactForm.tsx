'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim())                              { toast.error(t('errors.nameRequired'));    return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { toast.error(t('errors.invalidEmail'));    return false; }
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))          { toast.error(t('errors.invalidPhone'));    return false; }
    if (formData.message.length < 10)                       { toast.error(t('errors.messageTooShort')); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(t('successMessage'));
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else throw new Error();
    } catch {
      toast.error(t('errors.submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E5D0B8] bg-[#FDF6ED] text-[#2D1206] placeholder-[#8B6347]/60 focus:outline-none focus:ring-2 focus:ring-[#C9820C]/50 focus:border-[#C9820C] transition-all duration-200';

  return (
    <div className="min-h-screen bg-[#FDF6ED] py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#C9820C]/15 text-[#7C3109] text-xs font-semibold tracking-widest uppercase">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2D1206] mb-4">{t('title')}</h1>
          <div className="w-12 h-0.5 bg-[#C9820C] rounded-full mx-auto mb-5" />
          <p className="text-[#8B6347] leading-relaxed">{t('description')}</p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl ring-1 ring-[#E5D0B8] p-8 sm:p-10"
        >
          {/* Gold top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#C9820C] via-[#F0C060] to-[#C9820C] rounded-full mb-8" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#2D1206]">
                  <FaUser className="inline mr-2 text-[#C9820C]" />
                  {t('form.name')} <span className="text-[#C9820C]">*</span>
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  placeholder={t('form.namePlaceholder')}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#2D1206]">
                  <FaEnvelope className="inline mr-2 text-[#C9820C]" />
                  {t('form.email')} <span className="text-[#C9820C]">*</span>
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="example@domain.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-[#2D1206]">
                <FaPhone className="inline mr-2 text-[#C9820C]" />
                {t('form.phone')} <span className="text-[#C9820C]">*</span>
              </label>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                placeholder="+216 XX XXX XXX"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-semibold text-[#2D1206]">
                {t('form.message')} <span className="text-[#C9820C]">*</span>
              </label>
              <textarea
                id="message" name="message" rows={5}
                value={formData.message} onChange={handleChange}
                placeholder={t('form.messagePlaceholder')}
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold bg-[#C9820C] text-[#2D1206] hover:bg-[#F0C060] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {isSubmitting ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <FaPaperPlane />
              )}
              {isSubmitting ? 'Sending…' : t('form.submit')}
            </button>
          </form>

          <p className="mt-5 text-xs text-[#8B6347] text-center">* {t('form.requiredFields')}</p>
          <p className="mt-3 text-sm text-[#7C3109] font-medium text-center">{t('closingNote')}</p>
        </motion.div>
      </div>
    </div>
  );
}
