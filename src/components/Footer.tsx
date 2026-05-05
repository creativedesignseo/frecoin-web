import { Link } from 'react-router'
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

const helpfulLinks = [
  { label: 'FAQ', path: '/#faq' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Warranty Info', path: '/warranty' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-green">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Newsletter + Logo */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" fill="#10b981" />
                <rect x="18" y="2" width="12" height="12" rx="2" fill="#10b981" />
                <rect x="2" y="18" width="12" height="12" rx="2" fill="#10b981" />
                <rect x="18" y="18" width="12" height="12" rx="2" fill="#10b981" />
              </svg>
              <span className="text-white font-heading text-2xl tracking-tight">Auron</span>
            </div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Stay in the loop</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#162B4D] border border-border-dark text-white rounded-full px-5 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-white/40"
              />
              <button
                className="ml-2 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 transition-all hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-3">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-sans relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Helpful Resources */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Helpful Resources</h4>
            <ul className="space-y-3">
              {helpfulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-sans relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-sans text-lg font-medium mb-4">Contact Info</h4>
            <ul className="space-y-3 text-white/60 text-sm font-sans">
              <li>123 Solar Street, Green Valley, CA 90210</li>
              <li>(555) 123-4567</li>
              <li>hello@auronenergy.com</li>
              <li>Mon–Fri: 8AM – 6PM</li>
            </ul>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border-dark text-center">
          <p className="text-white/50 text-sm font-sans">
            &copy; 2024 Auron Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
