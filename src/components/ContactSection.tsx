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
    <section id="contact" className="py-24 md:py-32 bg-[#F5F2EC] text-[#24231F]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-10 border-b border-[#24231F]/12">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.14em] text-[#A68A64] font-medium mb-4">
              Begin A Conversation
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.9rem)] leading-[1.06] font-normal text-[#24231F]">
              Let&apos;s Create Something Beautiful.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#24231F] text-[#F5F2EC] text-xs tracking-[0.08em] font-medium hover:bg-[#A68A64] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#A68A64]" />
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
                className="p-8 md:p-10 bg-[#EAE5DC]/65 border border-[#24231F]/12 space-y-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#24231F] text-[#F5F2EC] flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl text-[#24231F]">
                  Thank You, {submittedRecord.name}.
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#77736B] max-w-lg">
                  Your consultation request for{' '}
                  <span className="text-[#24231F] font-medium">
                    {submittedRecord.projectType}
                  </span>{' '}
                  has been recorded. A principal designer will respond to{' '}
                  <span className="text-[#24231F]">{submittedRecord.email}</span> within one
                  business day.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="px-6 py-3 border border-[#24231F]/25 text-xs tracking-[0.08em] font-medium text-[#24231F] hover:bg-[#24231F] hover:text-[#F5F2EC] transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#A68A64] text-[#F5F2EC] text-xs tracking-[0.08em] font-medium hover:bg-[#24231F] transition-colors"
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
                      className="block text-xs tracking-[0.08em] text-[#77736B] mb-2"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-[#24231F]/25 text-[#24231F] placeholder:text-[#77736B]/55 text-sm focus:border-[#A68A64] focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs tracking-[0.08em] text-[#77736B] mb-2"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-[#24231F]/25 text-[#24231F] placeholder:text-[#77736B]/55 text-sm focus:border-[#A68A64] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs tracking-[0.08em] text-[#77736B] mb-2"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-[#24231F]/25 text-[#24231F] placeholder:text-[#77736B]/55 text-sm focus:border-[#A68A64] focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs tracking-[0.08em] text-[#77736B] mb-2"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-[#24231F]/25 text-[#24231F] text-sm focus:border-[#A68A64] focus:outline-none transition-colors cursor-pointer"
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
                    className="block text-xs tracking-[0.08em] text-[#77736B] mb-2"
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
                    className="w-full px-0 py-3 bg-transparent border-b border-[#24231F]/25 text-[#24231F] placeholder:text-[#77736B]/55 text-sm focus:border-[#A68A64] focus:outline-none transition-colors resize-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-xs text-[#9A3412]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#24231F] text-[#F5F2EC] text-xs tracking-[0.1em] font-medium hover:bg-[#A68A64] transition-colors cursor-pointer"
                  >
                    Request Private Consultation
                  </button>
                  <span className="text-xs text-[#77736B]">
                    Response within one business day.
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Studio Contact Information */}
          <div className="lg:col-span-5 bg-[#EAE5DC]/55 border border-[#24231F]/10 p-8 md:p-10 space-y-7">
            <div>
              <p className="text-xs tracking-[0.12em] text-[#A68A64] font-medium mb-2">
                Studio Atelier
              </p>
              <h3 className="font-serif text-2xl text-[#24231F] font-normal">
                Visit or Reach Our Principals
              </h3>
            </div>

            <div className="space-y-5 text-sm border-t border-[#24231F]/12 pt-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#A68A64] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#77736B] mb-1">Studio Location</p>
                  <p className="text-[#24231F] leading-relaxed">
                    {STUDIO_CONTACT.addressLine1}
                    <br />
                    {STUDIO_CONTACT.addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#A68A64] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#77736B] mb-1">Telephone</p>
                  <a
                    href={`tel:${STUDIO_CONTACT.phoneDisplay.replace(/[^+\d]/g, '')}`}
                    className="text-[#24231F] hover:text-[#A68A64] transition-colors tabular-nums"
                  >
                    {STUDIO_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#A68A64] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#77736B] mb-1">Email</p>
                  <a
                    href={`mailto:${STUDIO_CONTACT.email}`}
                    className="text-[#24231F] hover:text-[#A68A64] transition-colors"
                  >
                    {STUDIO_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#A68A64] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-[#77736B] mb-1">Consultation Hours</p>
                  <p className="text-[#24231F]">{STUDIO_CONTACT.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Interactive Google Maps Section + Studio Address Details Beside Map */}
        <div className="pt-14 border-t border-[#24231F]/12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-4 space-y-5">
            <p className="text-xs tracking-[0.14em] text-[#A68A64] font-medium">
              Atelier Location
            </p>
            <h3 className="font-serif text-3xl text-[#24231F] font-normal">
              Material Library &amp; Design Studio
            </h3>
            <p className="text-sm leading-[1.75] text-[#77736B]">
              Private studio appointments include curated stone, timber, linen, and bronze
              material reviews alongside full-scale architectural drawings.
            </p>

            <div className="pt-4 border-t border-[#24231F]/12 space-y-3 text-sm">
              <div>
                <p className="text-xs text-[#77736B] mb-0.5">Studio Address</p>
                <p className="font-medium text-[#24231F]">{STUDIO_CONTACT.brandName}</p>
                <p className="text-[#77736B] leading-relaxed">
                  {STUDIO_CONTACT.addressLine1}
                  <br />
                  {STUDIO_CONTACT.addressLine2}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#77736B]">
                <span className="tabular-nums">{STUDIO_CONTACT.phoneDisplay}</span>
                <span>{STUDIO_CONTACT.email}</span>
              </div>
              <p className="text-xs text-[#77736B] pt-1">
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
