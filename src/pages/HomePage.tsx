import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Stethoscope, CalendarCheck, HeartPulse, Users,
  Lock, ClipboardList, Pill, Eye, Phone, Mail, MapPin,
  ChevronRight, Star, FileText, Menu, X,
} from 'lucide-react'

/* ───────────────────────────────── Home Page ───────────────────────────────── */

export const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const svgRef = useRef<HTMLObjectElement>(null)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  const replayAnimation = useCallback(() => {
    const obj = svgRef.current
    if (obj) {
      const svgDoc = obj.contentDocument
      if (svgDoc) {
        const svg = svgDoc.querySelector('svg')
        if (svg) {
          svg.classList.remove('animated')
          void svg.getBoundingClientRect()
          svg.classList.add('animated')
        }
      }
    }
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
    if (id === '#home') replayAnimation()
  }

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100">
      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/50 bg-[#050814]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Med</span>
              <span className="text-lg font-bold text-cyan-400">os</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/40 hover:brightness-110"
            >
              Login Portal
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-800/50 bg-[#050814]/95 px-6 py-4 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="block w-full py-3 text-left text-sm font-medium text-slate-300 transition hover:text-cyan-400"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/login"
              className="mt-2 block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-center text-sm font-semibold text-white"
            >
              Login Portal
            </Link>
          </div>
        )}
      </nav>

      {/* ════════════════════════ HERO SECTION ════════════════════════ */}
      <section id="home" className="relative overflow-hidden pt-28">
        {/* Glow effects */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[100px]" />

        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:py-24">
          {/* Left – Copy */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Smarter Healthcare,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Built for Everyone
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              Streamline appointments, secure medical records, and connect your entire
              care team on one unified platform — giving patients full control of their health journey.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition hover:shadow-cyan-500/40 hover:brightness-110"
              >
                Get Started <ChevronRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => scrollTo('#about')}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/60"
              >
                Learn More
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              {[
                { value: '10K+', label: 'Patients' },
                { value: '200+', label: 'Doctors' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Illustration */}
          <div className="flex-1">
            <div className="mx-auto max-w-lg">
              <object
                ref={svgRef}
                type="image/svg+xml"
                data="/doctors-team.svg"
                aria-label="Doctors team illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ ABOUT US ════════════════════════ */}
      <section id="about" className="relative py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Left – Visual */}
            <div className="flex-1">
              <div className="relative">
                <div className="rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-900/50 p-10">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: <Stethoscope size={28} />, label: 'Expert Doctors', count: '200+', color: 'text-cyan-400 bg-cyan-500/15' },
                      { icon: <HeartPulse size={28} />, label: 'Nurses', count: '500+', color: 'text-pink-400 bg-pink-500/15' },
                      { icon: <Users size={28} />, label: 'Patients Served', count: '10K+', color: 'text-emerald-400 bg-emerald-500/15' },
                      { icon: <CalendarCheck size={28} />, label: 'Appointments', count: '50K+', color: 'text-amber-400 bg-amber-500/15' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-800/40 bg-white/[0.02] p-6 text-center transition hover:border-slate-700/60 hover:bg-white/[0.04]"
                      >
                        <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                          {item.icon}
                        </div>
                        <p className="text-2xl font-bold text-white">{item.count}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border-4 border-cyan-500/10" />
              </div>
            </div>

            {/* Right – Copy */}
            <div className="flex-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">About Us</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Revolutionizing Healthcare{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Information Management
                </span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                Medos is a comprehensive hospital information management system built with security and
                privacy at its core. Our platform empowers healthcare facilities to manage patient records,
                appointments, prescriptions, and audit trails — all while maintaining the highest standards of
                data protection and regulatory compliance.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                We believe that patients should have full control over their medical data. That's why every access
                to patient records requires explicit consent, and every action is logged in an immutable audit trail.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: <Lock size={16} />, text: 'Patient-controlled data consent system' },
                  { icon: <Eye size={16} />, text: 'Complete audit trail for every data access' },
                  { icon: <ShieldCheck size={16} />, text: 'Role-based access control (Admin, Doctor, Nurse, Patient)' },
                  { icon: <Stethoscope size={16} />, text: 'Seamless doctor-patient communication' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                      {f.icon}
                    </div>
                    <p className="text-sm text-slate-300">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section id="services" className="relative py-24">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">Our Services</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Comprehensive Solutions for{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Modern Healthcare
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
              Everything your healthcare facility needs, in one secure platform.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Stethoscope size={24} />,
                title: 'Expert Doctors',
                desc: 'Connect with top-tier specialists across various departments. Doctors can manage visits, write prescriptions, and access patient history with consent.',
                color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
              },
              {
                icon: <CalendarCheck size={24} />,
                title: 'Easy Scheduling',
                desc: 'Book appointments online instantly. Patients, doctors, and nurses can manage schedules seamlessly through our intuitive interface.',
                color: 'from-emerald-500/20 to-green-500/20 text-emerald-400',
              },
              {
                icon: <ClipboardList size={24} />,
                title: 'Medical Records',
                desc: 'Maintain complete electronic health records including visit notes, lab results, and medical history — all in one secure place.',
                color: 'from-rose-500/20 to-pink-500/20 text-rose-400',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Patient Consent',
                desc: 'Patients control who sees their data. Grant or revoke access to medical records at any time with our consent management system.',
                color: 'from-violet-500/20 to-purple-500/20 text-violet-400',
              },
              {
                icon: <Pill size={24} />,
                title: 'Prescription Management',
                desc: 'Doctors write digital prescriptions that patients can view instantly. Track medication name, dosage, frequency, and duration.',
                color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
              },
              {
                icon: <FileText size={24} />,
                title: 'Audit Logging',
                desc: 'Every access to patient data is recorded. Full compliance audit trails to meet HIPAA and other regulatory requirements.',
                color: 'from-sky-500/20 to-indigo-500/20 text-sky-400',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-800/50 bg-white/[0.02] p-8 transition hover:border-slate-700/60 hover:bg-white/[0.04] hover:shadow-xl"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ WHY CHOOSE US / FEATURES ════════════════════════ */}
      <section id="features" className="relative py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Built for{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Security & Privacy
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                icon: <Lock size={22} />,
                title: 'End-to-End Encryption',
                desc: 'All data is encrypted with 256-bit AES encryption at rest and in transit. Your patients\' data is never exposed.',
              },
              {
                icon: <ShieldCheck size={22} />,
                title: 'Role-Based Access Control',
                desc: 'Admin, Doctor, Nurse, and Patient roles each have carefully scoped permissions. No unauthorized access possible.',
              },
              {
                icon: <Eye size={22} />,
                title: 'Complete Audit Trail',
                desc: 'Every read, write, and modification to patient data is logged with timestamps and user identity. Full accountability.',
              },
              {
                icon: <HeartPulse size={22} />,
                title: 'Patient Data Ownership',
                desc: 'Patients own their data. They can grant, revoke, and review who accessed their medical records at any time.',
              },
              {
                icon: <ClipboardList size={22} />,
                title: 'Digital Medical Records',
                desc: 'Complete electronic health records including visit notes, prescriptions, lab results, and medical history.',
              },
              {
                icon: <Star size={22} />,
                title: 'Modern User Experience',
                desc: 'Clean, intuitive interface designed for healthcare professionals. Minimal learning curve, maximum productivity.',
              },
            ].map((f, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-slate-800/40 bg-white/[0.02] p-6 transition hover:border-slate-700/50 hover:bg-white/[0.04]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 text-cyan-400">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ CTA SECTION ════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-slate-900 p-12 text-center md:p-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[80px]" />
            <h2 className="relative text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your Healthcare Facility?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm text-slate-400">
              Join thousands of healthcare professionals already using Medos for secure, efficient patient management.
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
              >
                Create Free Account <ChevronRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/60"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ CONTACT ════════════════════════ */}
      <section id="contact" className="relative border-t border-slate-800/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">Get in Touch</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Contact Us</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: <Phone size={22} />, title: 'Phone', lines: ['+91 98765 43210', '+91 87654 32109'] },
              { icon: <Mail size={22} />, title: 'Email', lines: ['support@medos.com', 'm0907268228@gmail.com'] },
              { icon: <MapPin size={22} />, title: 'Address', lines: ['123 Health Street', 'Wellness City, HC 45678'] },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-800/40 bg-white/[0.02] p-8 text-center transition hover:border-slate-700/50 hover:bg-white/[0.04]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  {c.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                {c.lines.map((l, i) => (
                  <p key={i} className="mt-1 text-sm text-slate-400">{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="border-t border-slate-800/50 bg-slate-950/80 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Logo */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                <ShieldCheck size={22} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Med</span>
                <span className="text-lg font-bold text-cyan-400">os</span>
              </div>
            </button>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Features', href: '#features' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-slate-400 transition hover:text-cyan-400"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800/50 pt-8 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Medos. All rights reserved. Built with privacy and security at the core.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
