"use client";

import React from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Tshirt", href: "/products/tshirt" },
        { label: "Jacket", href: "/products/jacket" },
        { label: "Shoes", href: "/products/shoes" },
        { label: "Pants", href: "/products/pants" },
        { label: "Sunglasses", href: "/products/sunglasses" },
        { label: "Tuxedo", href: "/products/tuxedo" },
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "Men", href: "/categories/men" },
        { label: "Women", href: "/categories/women" },
        { label: "Kids", href: "/categories/kids" },
        { label: "Gift", href: "/categories/gift" },
        { label: "New Arrival", href: "/categories/new-arrival" },
      ],
    },
    {
      title: "Our Social Media",
      links: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Facebook", href: "https://facebook.com" },
        { label: "Youtube", href: "https://youtube.com" },
        { label: "Twitter", href: "https://twitter.com" },
      ],
    },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-linear-to-b from-neutral-50 to-stone-100 mt-32">
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-6">
              <h2 className="text-6xl font-bold tracking-tighter transition-transform duration-300 group-hover:scale-105">
                HEAVENLY
              </h2>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-md">
              Get newsletter update for upcoming product and best discount for
              all item
            </p>

            {/* Newsletter Form */}
            <div className="flex gap-3 max-w-md">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-300 placeholder:text-neutral-400"
              />
              <button className="px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Submit
              </button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
              {footerSections.map((section) => (
                <div
                  key={section.title}
                  className="space-y-4"
                  
                >
                  <h3 className="text-neutral-900 font-semibold text-base">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-neutral-500 text-sm hover:text-neutral-900 transition-colors duration-300 inline-block "
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className="text-white/80 text-sm"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              © 2023 Tulos Production
            </p>

            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/80 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/40 hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
