import React from 'react'
import { motion } from 'framer-motion'

const PHONE_POST = {
  id: 'post-1',
  image: '/projects/Social Media Posts/shared image (4).jpg',
  title: 'Social Launch Story',
  client: 'Brand Social Kit',
  likes: '11,742',
  caption: 'We craft scroll-stopping social content that builds brand authority and drives real engagement.',
}

const SIDE_POSTS = [
  { id: 'post-2', image: '/projects/Social Media Posts/shared image (5).jpg', title: 'Community Pulse' },
  { id: 'post-3', image: '/projects/Social Media Posts/shared image (6).jpg', title: 'Content Spark' },
  { id: 'post-4', image: '/projects/Social Media Posts/shared image (7).png', title: 'Brand Motion' },
  { id: 'post-5', image: '/projects/Social Media Posts/Business World Travel/shared image (2).jpg', title: 'World Travel' },
]

function PhoneMockup() {
  const PW = 240, PH = 490, BR = 40
  return (
    <div className="relative flex-shrink-0 select-none" style={{ width: PW, height: PH }}>
      <div className="absolute inset-0" style={{
        borderRadius: BR,
        background: 'linear-gradient(160deg,#1c1c1e 0%,#080808 100%)',
        boxShadow: '0 0 0 1.5px rgba(255,255,255,0.12),0 0 0 6px #101010,0 30px 80px rgba(0,0,0,0.95)',
      }} />
      <div className="absolute flex flex-col overflow-hidden bg-white" style={{ inset: 0, borderRadius: BR - 4 }}>
        {/* Dynamic Island */}
        <div className="absolute z-10 bg-black rounded-full" style={{ top: 10, left: '50%', transform: 'translateX(-50%)', width: 82, height: 23 }} />
        {/* IG Header */}
        <div className="flex items-center justify-between flex-shrink-0 bg-white" style={{ paddingTop: 40, paddingBottom: 6, paddingLeft: 12, paddingRight: 12 }}>
          <span className="font-black text-gray-900" style={{ fontFamily: 'Georgia,serif', fontSize: 15, letterSpacing: '-0.02em' }}>Instagram</span>
          <div className="flex gap-3">
            <svg style={{ width: 18, height: 18 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <svg style={{ width: 18, height: 18 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
        {/* Stories */}
        <div className="flex gap-2 flex-shrink-0 overflow-hidden" style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 7 }}>
          {['B9', 'Nikon', 'Travel', 'Avenir'].map((n, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-shrink-0">
              <div className="rounded-full p-[2px]" style={{ background: i === 0 ? 'none' : 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', border: i === 0 ? '2px solid #d1d5db' : 'none' }}>
                <div className="rounded-full bg-white" style={{ padding: 1.5 }}>
                  <div className="rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500" style={{ width: 28, height: 28, fontSize: 6 }}>{n[0]}</div>
                </div>
              </div>
              <span className="text-gray-500 truncate" style={{ fontSize: 5.5, maxWidth: 30 }}>{n}</span>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 bg-gray-100" style={{ height: 1 }} />
        {/* Post author */}
        <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '5px 10px' }}>
          <div className="flex items-center gap-2">
            <div className="rounded-full flex items-center justify-center" style={{ width: 24, height: 24, background: 'linear-gradient(135deg,#C4EF47,#a8d400)', flexShrink: 0 }}>
              <span style={{ fontSize: 6 }} className="font-black text-black">B9</span>
            </div>
            <div>
              <p className="font-bold text-gray-900" style={{ fontSize: 8, lineHeight: 1.2 }}>brand9studio</p>
              <p className="text-gray-400" style={{ fontSize: 6 }}>Sponsored · Creative Design</p>
            </div>
          </div>
          <svg style={{ width: 12, height: 12 }} className="text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
          </svg>
        </div>
        {/* Post image — fills remaining space, no crop */}
        <div className="flex-1 bg-gray-50 overflow-hidden flex items-center justify-center" style={{ minHeight: 0 }}>
          <img src={PHONE_POST.image} alt={PHONE_POST.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        {/* Actions */}
        <div className="flex-shrink-0" style={{ padding: '5px 10px 3px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
            <div className="flex items-center gap-3">
              <svg style={{ width: 13, height: 13 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <svg style={{ width: 13, height: 13 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <svg style={{ width: 13, height: 13 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <svg style={{ width: 13, height: 13 }} className="text-gray-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="font-bold text-gray-900" style={{ fontSize: 7.5 }}>{PHONE_POST.likes} likes</p>
          <p className="text-gray-700" style={{ fontSize: 6.5, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            <span className="font-bold">brand9studio</span>{' '}{PHONE_POST.caption}
          </p>
        </div>
        {/* Bottom nav */}
        <div className="flex-shrink-0 flex items-center justify-around border-t border-gray-100 bg-white" style={{ padding: '4px 14px 7px' }}>
          <svg style={{ width: 15, height: 15 }} fill="currentColor" className="text-gray-900" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
          <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <div className="rounded-lg bg-gray-900 flex items-center justify-center" style={{ width: 20, height: 20 }}>
            <svg style={{ width: 10, height: 10 }} fill="white" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
          </div>
          <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
          </svg>
          <div className="rounded-full flex items-center justify-center" style={{ width: 15, height: 15, background: 'linear-gradient(135deg,#C4EF47,#a8d400)' }}>
            <span style={{ fontSize: 5 }} className="font-black text-black">B9</span>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute bg-neutral-600 rounded-l-sm" style={{ right: -4, top: 108, width: 3, height: 38 }} />
      <div className="absolute bg-neutral-600 rounded-r-sm" style={{ left: -4, top: 94, width: 3, height: 26 }} />
      <div className="absolute bg-neutral-600 rounded-r-sm" style={{ left: -4, top: 132, width: 3, height: 26 }} />
      <div className="absolute bg-neutral-600 rounded-r-sm" style={{ left: -4, top: 170, width: 3, height: 26 }} />
    </div>
  )
}

export default function SocialMediaShowcase() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#080808 0%,#111 60%,#0a0a0a 100%)' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse at 10% 60%,rgba(196,239,71,0.05) 0%,transparent 50%),radial-gradient(ellipse at 88% 15%,rgba(255,255,255,0.02) 0%,transparent 45%)',
      }} />

      {/*
        ── REFERENCE LAYOUT ──────────────────────────
        LEFT col  : phone (full height)
        RIGHT col :
          TOP ROW  → description (left) + Creative Pieces title (right)
          BOTTOM ROW → 4 post images, as large as possible
        ─────────────────────────────────────────────
      */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch px-6 md:px-10 py-10 md:py-12 gap-10 lg:gap-14 min-h-[560px]">

        {/* ── LEFT: Phone ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 relative self-center lg:self-auto"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))' }}
        >
          <div className="absolute pointer-events-none" style={{ inset: '-22%', background: 'radial-gradient(circle,rgba(196,239,71,0.1) 0%,transparent 62%)', filter: 'blur(30px)' }} />
          <PhoneMockup />
        </motion.div>

        {/* ── RIGHT: text top + posts bottom ── */}
        <div className="flex-1 flex flex-col min-w-0 w-full gap-10 lg:gap-5 relative z-20">

          {/* TOP ROW: description (left) + Creative Pieces (right) */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-6 md:gap-4">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg lg:max-w-2xl text-center md:text-left"
            >
              <span className="block font-bold uppercase mb-2.5" style={{ fontSize: 10, letterSpacing: '0.3em', color: '#C4EF47' }}>
                Social Media Design
              </span>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 1.7 }}>
                At Brand9 Studio, we craft{' '}
                <strong style={{ color: '#fff' }}>scroll-stopping social creatives</strong>{' '}
                that blend strategy with aesthetics — turning your brand into a{' '}
                <span style={{ color: '#C4EF47', fontWeight: 600 }}>recognisable, trusted presence</span>{' '}
                across every platform. Here are a few pieces we're proud of.
              </p>
            </motion.div>

            {/* Creative Pieces title */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 text-center md:text-right"
            >
              <h2 className="font-black leading-none text-white select-none" style={{ fontSize: 'clamp(46px,6.5vw,88px)', fontFamily: '"Archivo",sans-serif', letterSpacing: '-0.04em' }}>
                Creative
              </h2>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h2 className="font-black leading-none select-none" style={{ fontSize: 'clamp(42px,6vw,82px)', fontFamily: '"Pinyon Script","Caveat",cursive', color: '#C4EF47', lineHeight: 1, textShadow: '0 0 60px rgba(196,239,71,0.28)' }}>
                  Pieces
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', bottom: -2, right: 0, height: 2, width: '65%', background: 'linear-gradient(90deg,transparent,#C4EF47)', transformOrigin: 'right' }}
                />
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW: 4 post images — grid for responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 flex-1 min-h-0"
          >
            {SIDE_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative cursor-pointer w-full aspect-square bg-[#0a0a0a] rounded-md flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_6px_28px_rgba(0,0,0,0.7)]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-contain block"
                  draggable={false}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-center md:justify-end flex-shrink-0 gap-1.5 text-[11px] pb-2 md:pb-0">
            <span className="text-white/35">Client:</span>
            <span className="text-white/65 italic font-semibold">Brand Social Kit</span>
            <span className="text-white/20 mx-1">·</span>
            <span className="text-white/35">Agency:</span>
            <span className="text-white/65 italic font-semibold">Brand9 Studio</span>
          </div>
        </div>
      </div>
    </div>
  )
}
