import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SERVICES, STUDIO_CONTACT } from '../data/studioData';
import {
  buildWhatsAppEnquiryUrl,
  validateContactForm,
  type ContactFormValues,
  type ContactValidationErrors,
} from '../utils/studioLogic';
import { StudioMap } from './StudioMap';

interface ContactSectionProps {
  preselectedService?: string;
}

const INITIAL_FORM: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  projectType: 'Residential Interior Design',
  message: '',
};

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormValues | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setValues((prev) => ({
        ...prev,
        projectType: preselectedService,
      }));
      setSubmittedRecord(null);
    }
  }, [preselectedService]);

  const whatsappUrl = buildWhatsAppEnquiryUrl({
    phoneDigits: STUDIO_CONTACT.whatsappDigits,
    studioName: STUDIO_CONTACT.brandName,
    projectType: values.projectType,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm(values);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setSubmittedRecord(values);
      setValues({
        ...INITIAL_FORM,
        projectType: values.projectType,
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FFF8E6] text-[#1C1C1C]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-10 border-b border-[#1C1C1C]/15">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1.5px] bg-[#F5B700]" aria-hidden="true" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#1C1C1C] font-semibold">
                Begin A Conversation
              </p>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.9rem)] leading-[1.06] font-medium text-[#1C1C1C]">
              Let&apos;s Create Something Beautiful.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1C1C1C] text-[#FFF8E6] text-xs tracking-[0.08em] font-semibold hover:bg-[#F5B700] hover:text-[#1C1C1C] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#F5B700]" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>

        {/* Tier 1: Enquiry Form + Studio Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left: Architectural Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {submittedRecord ? (
              <div
                role="status"
                aria-live="polite"
                className="p-8 md:p-10 bg-[#1C1C1C] text-[#FFF8E6] border border-[#1C1C1C] space-y-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5B700] text-[#1C1C1C] flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl font-medium text-[#FFF8E6]">
                  Thank You, {submittedRecord.name}.
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#FFF8E6]/85 max-w-lg">
                  Your consultation request for{' '}
                  <span className="text-[#F5B700] font-semibold">
                    {submittedRecord.projectType}
                  </span>{' '}
                  has been recorded. A principal designer will respond to{' '}
                  <span className="text-[#FFF8E6] font-semibold">{submittedRecord.email}</span> within one
                  business day.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="px-6 py-3 border border-[#FFF8E6]/35 text-xs tracking-[0.08em] font-semibold text-[#FFF8E6] hover:bg-[#FFF8E6] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5B700] text-[#1C1C1C] text-xs tracking-[0.08em] font-semibold hover:bg-[#FFF8E6] hover:text-[#1C1C1C] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs tracking-[0.08em] font-semibold text-[#1C1C1C] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Claire Lindqvist"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/30 text-[#1C1C1C] placeholder:text-[#555555]/70 text-sm focus:border-[#F5B700] focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-[#1C1C1C] font-semibold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs tracking-[0.08em] font-semibold text-[#1C1C1C] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="claire@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/30 text-[#1C1C1C] placeholder:text-[#555555]/70 text-sm focus:border-[#F5B700] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-[#1C1C1C] font-semibold">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs tracking-[0.08em] font-semibold text-[#1C1C1C] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="+1 (000) 000-0000"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/30 text-[#1C1C1C] placeholder:text-[#555555]/70 text-sm focus:border-[#F5B700] focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" className="mt-1.5 text-xs text-[#1C1C1C] font-semibold">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs tracking-[0.08em] font-semibold text-[#1C1C1C] mb-2"
                    >
                      Project Discipline
                    </label>
                    <select
                      id="contact-service"
                      name="projectType"
                      value={values.projectType}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, projectType: e.target.value }))
                      }
                      className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/30 text-[#1C1C1C] text-sm focus:border-[#F5B700] focus:outline-none transition-colors cursor-pointer"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs tracking-[0.08em] font-semibold text-[#1C1C1C] mb-2"
                  >
                    Tell Us About Your Space *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Share your property location, approximate square footage, desired timeline, or architectural inspiration..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="w-full px-0 py-3 bg-transparent border-b border-[#1C1C1C]/30 text-[#1C1C1C] placeholder:text-[#555555]/70 text-sm focus:border-[#F5B700] focus:outline-none transition-colors resize-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-xs text-[#1C1C1C] font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#F5B700] text-[#1C1C1C] text-xs tracking-[0.1em] font-semibold hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors cursor-pointer"
                  >
                    Request Private Consultation
                  </button>
                  <span className="text-xs text-[#555555]">
                    Response within one business day.
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Studio Contact Information */}
          <div className="lg:col-span-5 bg-[#1C1C1C] text-[#FFF8E6] border border-[#1C1C1C] p-8 md:p-10 space-y-7">
            <div>
              <p className="text-xs tracking-[0.12em] uppercase text-[#F5B700] font-semibold mb-2">
                Studio Atelier
              </p>
              <h3 className="font-serif text-2xl text-[#FFF8E6] font-medium">
                Visit or Reach Our Principals
              </h3>
            </div>

            <div className="space-y-5 text-sm border-t border-[#FFF8E6]/15 pt-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#F5B700] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#FFF8E6]/70 mb-1">Studio Location</p>
                  <p className="text-[#FFF8E6] leading-relaxed">
                    {STUDIO_CONTACT.addressLine1}
                    <br />
                    {STUDIO_CONTACT.addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#F5B700] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#FFF8E6]/70 mb-1">Telephone</p>
                  <a
                    href={`tel:${STUDIO_CONTACT.phoneDisplay.replace(/[^+\d]/g, '')}`}
                    className="text-[#FFF8E6] hover:text-[#F5B700] transition-colors tabular-nums"
                  >
                    {STUDIO_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#F5B700] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#FFF8E6]/70 mb-1">Email</p>
                  <a
                    href={`mailto:${STUDIO_CONTACT.email}`}
                    className="text-[#FFF8E6] hover:text-[#F5B700] transition-colors"
                  >
                    {STUDIO_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#F5B700] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#FFF8E6]/70 mb-1">Consultation Hours</p>
                  <p className="text-[#FFF8E6]">{STUDIO_CONTACT.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Interactive Google Maps Section + Studio Address Details Beside Map */}
        <div className="pt-14 border-t border-[#1C1C1C]/15 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-[#F5B700]" aria-hidden="true" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#1C1C1C] font-semibold">
                Atelier Location
              </p>
            </div>
            <h3 className="font-serif text-3xl text-[#1C1C1C] font-medium">
              Material Library &amp; Design Studio
            </h3>
            <p className="text-sm leading-[1.75] text-[#555555]">
              Private studio appointments include curated stone, timber, linen, and bronze
              material reviews alongside full-scale architectural drawings.
            </p>

            <div className="pt-4 border-t border-[#1C1C1C]/15 space-y-3 text-sm">
              <div>
                <p className="text-xs text-[#555555] mb-0.5">Studio Address</p>
                <p className="font-semibold text-[#1C1C1C]">{STUDIO_CONTACT.brandName}</p>
                <p className="text-[#555555] leading-relaxed">
                  {STUDIO_CONTACT.addressLine1}
                  <br />
                  {STUDIO_CONTACT.addressLine2}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#1C1C1C] font-medium">
                <span className="tabular-nums">{STUDIO_CONTACT.phoneDisplay}</span>
                <span>{STUDIO_CONTACT.email}</span>
              </div>
              <p className="text-xs text-[#555555] pt-1">
                Private parking &amp; material sample consultations available by prior appointment.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <StudioMap />
          </div>
        </div>
      </div>
    </section>
  );
}
