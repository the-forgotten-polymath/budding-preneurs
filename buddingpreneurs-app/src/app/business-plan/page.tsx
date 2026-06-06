"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";import { siteMetadata } from "../../data/siteData";

export default function BusinessPlanPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    { q: "Why is the 1-Month Trial only ₹999?", a: "To help you experience BP before making a long-term commitment." },
    { q: "Can I get clients in 3 months?", a: "Active participation can increase your chances of getting leads, referrals, and clients by up to 75%." },
    { q: "What if I'm not earning ₹50K/month yet?", a: "Start with Trial or Basic and grow with the community." },
    { q: "Is there a refund policy?", a: "Yes, a 24-hour refund policy applies to new memberships." },
    { q: "Do I need an established business to join?", a: "No, beginners and aspiring entrepreneurs are welcome." },
    { q: "Will BP promote my business?", a: "Yes, through networking, showcases, promotions, and visibility opportunities." },
    { q: "Is attendance mandatory?", a: "No, but active members gain the actual result and maximum benefits." },
    { q: "Can I upgrade my membership later?", a: "Yes, you can upgrade anytime." },
    { q: "How is BP different from social media groups?", a: "BP offers structured networking, learning, visibility, and growth opportunities." },
    { q: "Can I become a leader or mentor in BP?", a: "Yes, active members can apply for leadership and mentorship roles." },
    { q: "Who can join BP?", a: "Entrepreneurs, professionals, freelancers, coaches, creators, and business owners." },
    { q: "What is the biggest benefit of joining BP?", a: "Access to a supportive ecosystem for learning, networking, visibility, and business growth" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Business Plan', path: '/business-plan' },
    { name: 'Disclaimer', path: '/disclaimer' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col relative overflow-hidden select-none">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        {/* Simplified Header for brevity, same as others */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white relative flex-shrink-0">
              <img 
                src="/brand_logo.png" 
                alt="Buddingpreneurs Brand Logo" 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">
              Buddingpreneurs
            </span>
          </a>
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-[11px] xl:text-xs font-semibold transition-colors ${
                  link.name === 'Business Plan' 
                    ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" 
                    : "text-[#1A1A1A] hover:text-[#C9540A]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/contact" className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-[#C9540A] hover:bg-[#A8420A] text-white shadow-sm">
              <span>Join for Free</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-gray-200 rounded-full transition-colors z-50 relative">
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 pb-6 overflow-y-auto lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center text-center mt-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'Business Plan' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-6">
            <span>Membership Plans</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
            Invest in Your <br />
            <span className="italic font-serif text-[#C9540A]">Business Journey</span>
          </h1>
          <p className="text-[#334155] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you're just starting out or looking to scale your existing home-based venture, our membership plans are designed to give you the exact support, training, and community you need.
          </p>
        </section>

        {/* PRICING SECTION */}
        <section className="pb-24 px-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black mb-8 border-b pb-4 text-center">Membership Tiers</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Basic Plan */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Basic Plan</h3>
                <p className="text-slate-500 mb-6 text-xs min-h-[40px]">For founders ready to get visible</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-[#1A1A1A]">Contact Us</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A1A] mb-4">Everything in Trial, plus:</div>
                <ul className="space-y-3 mb-8 flex-1 text-xs">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Full posting access in Inner Circle WhatsApp</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Verified Member Badge for your profile</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 1 Welcome Post with your photo on Facebook</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 3 Promotion Posts for your business in 3 months</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Host 1 Facebook Live of 20 minutes to showcase your expertise</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 15-min Onboarding Call to set you up for success</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 3 Content Hooks crafted for your business</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Post Your Ask on Ask-Give Friday once</li>
                </ul>
                <a href="/contact" className="flex items-center justify-center w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">Get Visible Now &rarr;</a>
              </div>

              {/* Standard Plan */}
              <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 border border-slate-800 relative shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 bg-[#C9540A] text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
                <h3 className="text-xl font-bold mb-2 mt-4 md:mt-0">Standard Plan</h3>
                <p className="text-gray-400 mb-6 text-xs min-h-[40px]">For founders ready to get clients</p>
                <div className="mb-6">
                  <span className="text-3xl font-black">Contact Us</span>
                </div>
                <div className="text-xs font-bold text-white mb-4">Everything in Basic, plus:</div>
                <ul className="space-y-3 mb-8 flex-1 text-xs text-gray-300">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Priority Replies in WhatsApp Inner Circle</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Welcome Post on Facebook + WhatsApp Story</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 6 Promotion Posts in 6 months across platforms</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 1 Brand Shoutout by Buddingpreneurs®</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Host 3 Live Sessions to build authority</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 1 Professional Reel created and posted for you</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 30-min Strategy Call for business guidance</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 7-Day Content Idea List customized for you</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> We Post 1 Customer Review for social proof</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Community Spotlight Feature</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 1 Welcome Post on our Instagram</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Post Your Ask on Ask-Give Friday every month</li>
                </ul>
                <a href="/contact" className="flex items-center justify-center w-full py-3 rounded-xl bg-[#C9540A] font-bold text-sm hover:bg-white hover:text-[#C9540A] transition-colors">Get Started &rarr;</a>
              </div>
              
              {/* Premium Plan */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Premium Plan</h3>
                <p className="text-slate-500 mb-6 text-xs min-h-[40px]">For founders ready to lead</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-[#1A1A1A]">Contact Us</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A1A] mb-4">Everything in Standard, plus:</div>
                <ul className="space-y-3 mb-8 flex-1 text-xs">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> VIP Access in WhatsApp with admin team replies</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Listed on Buddingpreneurs® Official Member Page</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 12 Promotion Posts - 1 every month for full year</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 2 Brand Shoutouts by Buddingpreneurs®</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Host 6 Live Sessions across the year</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 3 Professional Reels created for you</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Two 30-min Strategy Calls with our team</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 15-Day Content Plan for your business</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> We Post 2 Customer Reviews for you</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 2 Community Spotlight Features</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 2 Posts on our Instagram in 12 months</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Curated Introduction to 3 Members for collaborations</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Free Access to 1 Premium Skill Session</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> Pin Your Ask on Ask-Give Friday once every quarter</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 10-min Welcome Call with Team Lead</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0"/> 24-Hour Early Access to brand deals</li>
                </ul>
                <a href="/contact" className="flex items-center justify-center w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">Become a Leader &rarr;</a>
              </div>
            </div>

            {/* Launch & Retention Offers */}
            <div className="mt-16 bg-[#F4F1ED] rounded-2xl p-8 border border-slate-200">
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-6 flex items-center gap-3"><span className="text-3xl">💡</span> Launch & Retention Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-[#C9540A] mb-4 text-base">Early Sign-up Bonuses</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> First 15 members lock in lifetime pricing</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Get 1 month free with annual sign-up</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Invite 200 members, get 1 month free promo on fb</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Free 15-min strategy call for early sign-ups</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#C9540A] mb-4 text-base">Ongoing Engagement Rewards</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Member of the Month feature with promo across platforms</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Earn rewards for referrals (e.g., $5 credit per signup)</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Content contributions (blog/podcast) for visibility</li>
                    <li className="flex gap-2"><span className="text-[#C9540A]">✦</span> Monthly challenge prizes (e.g., best pitch, growth story)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY JOIN US / FEATURES */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">More Than Just a <span className="italic font-serif text-[#C9540A]">Membership</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                When you join Buddingpreneurs, you aren't just paying for courses—you're investing in a thriving ecosystem designed to guarantee your success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Mentorship</h3>
                <p className="text-gray-400">Get direct feedback, personalized advice, and strategic guidance from successful women entrepreneurs.</p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Vibrant Sisterhood</h3>
                <p className="text-gray-400">Never feel alone in your journey. Connect, collaborate, and grow alongside hundreds of like-minded women.</p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Actionable Growth</h3>
                <p className="text-gray-400">Our programs focus on practical, actionable steps that directly translate to brand visibility and income.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#1A1A1A]">Frequently Asked <span className="italic font-serif text-[#C9540A]">Questions</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:border-[#C9540A]/30">
                  <button 
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#1A1A1A] focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg pr-8">{faq.q}</span>
                    <span className={`text-[#C9540A] text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">Ready to turn your skills into a business?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Take the first step towards financial independence today. Join the community and start your entrepreneurial journey.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-[#C9540A] text-white hover:bg-[#1A1A1A] shadow-lg hover:shadow-xl">
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      {/* FULL FOOTER */}
      <footer id="contact" className="py-16 px-6 bg-[#1C1C1C] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black tracking-tight text-white font-sans lowercase">buddingpreneurs</span>
            </a>
            <p className="text-[#888888] text-sm leading-relaxed max-w-sm font-sans mb-8">
              Indian women entrepreneurs rise here. Join the sisterhood, build your personal brand, set up digital catalogs, and achieve economic self-reliance.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">IG</a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">FB</a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">LI</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#888888]">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="/community" className="hover:text-white transition-colors">Community</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4 text-sm text-[#888888]">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#C9540A]">✉</span>
                <span>{siteMetadata.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#C9540A]">📍</span>
                <span>{siteMetadata.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#666666]">
          <span>&copy; {new Date().getFullYear()} Buddingpreneurs. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/disclaimer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/disclaimer" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
