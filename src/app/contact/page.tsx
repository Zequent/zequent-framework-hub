'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const BULLETS = [
  'No sales deck. A real conversation about your stack.',
  'Same-day response, every time.',
  'Engineered in Switzerland. Deployed at the edge.',
];

export default function ContactPage() {
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    if (leftRef.current) {
      gsap.from(Array.from(leftRef.current.children), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
    if (formRef.current) {
      gsap.from(Array.from(formRef.current.children), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.15,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-zequent-black relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 110% at 10% 55%, rgba(255,80,44,0.32) 0%, rgba(255,60,30,0.14) 45%, transparent 72%)',
        }}
      />

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-[52%] flex flex-col px-10 py-10 lg:py-16 lg:px-16 lg:min-h-screen lg:justify-between">
          <Link href="/" className="inline-block">
            <img src="/images/Zequent_logo_white.svg" alt="Zequent" className="h-6 w-auto" />
          </Link>

          <div ref={leftRef} className="mt-16 lg:mt-0 lg:mb-16 flex flex-col">
            <p className="font-soehne text-xs uppercase tracking-[0.22em] text-white/25 mb-8">
              Schedule a demo · Get in touch
            </p>

            <h1 className="font-soehne text-4xl sm:text-5xl lg:text-5xl xl:text-[3.6rem] font-light text-white leading-[1.05] tracking-tight mb-10">
              Let&apos;s build
              <br />
              something{' '}
              <span style={{ color: '#FF6044' }}>real.</span>
            </h1>

            <div className="flex flex-col gap-4 mb-12">
              {BULLETS.map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-primary opacity-60" />
                  <p className="font-soehne text-sm text-white/50 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <a
              href="mailto:office@zequent.com"
              className="font-soehne text-sm text-white/30 hover:text-white/60 transition-colors tracking-wide"
            >
              office@zequent.com
            </a>
          </div>
        </div>

        <div
          className="lg:w-[48%] flex items-center px-10 py-12 lg:py-16 lg:px-16 lg:min-h-screen"
        >
          <div className="w-full max-w-md">
            {status === 'success' ? (
              <div className="flex flex-col items-start gap-5 py-8">
                <CheckCircle className="w-10 h-10" style={{ color: '#FF6044' }} strokeWidth={1.25} />
                <h2 className="font-soehne text-2xl font-light text-white leading-snug">
                  Message received.
                </h2>
                <p className="font-soehne text-base text-white/35 leading-relaxed">
                  We&apos;ll be in touch at{' '}
                  <span className="text-white/60">{form.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', company: '', message: '' });
                  }}
                  className="mt-2 font-soehne text-xs text-white/25 hover:text-white/50 transition-colors uppercase tracking-widest"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div ref={formRef} className="flex flex-col">
                <p className="font-soehne text-xs uppercase tracking-[0.2em] text-white/20 mb-10">
                  Fill in the form
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="flex flex-col gap-3">
                      <label className="font-soehne text-xs uppercase tracking-[0.14em] text-white/55">
                        Name <span style={{ color: 'rgba(255,96,68,0.7)' }}>*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        className="w-full bg-transparent border-b py-3 text-white text-sm font-soehne placeholder:text-white/15 focus:outline-none"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', transition: 'border-color 0.25s' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,96,68,0.7)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="font-soehne text-xs uppercase tracking-[0.14em] text-white/55">
                        Email <span style={{ color: 'rgba(255,96,68,0.7)' }}>*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@org.com"
                        required
                        className="w-full bg-transparent border-b py-3 text-white text-sm font-soehne placeholder:text-white/15 focus:outline-none"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', transition: 'border-color 0.25s' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,96,68,0.7)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="font-soehne text-xs uppercase tracking-[0.14em] text-white/55">
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full bg-transparent border-b py-3 text-white text-sm font-soehne placeholder:text-white/15 focus:outline-none"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', transition: 'border-color 0.25s' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,96,68,0.7)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="font-soehne text-xs uppercase tracking-[0.14em] text-white/55">
                      Message <span style={{ color: 'rgba(255,96,68,0.7)' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What are you building or deploying?"
                      required
                      rows={5}
                      className="w-full bg-transparent border-b py-3 text-white text-sm font-soehne placeholder:text-white/15 focus:outline-none resize-none"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', transition: 'border-color 0.25s' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,96,68,0.7)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 font-soehne text-sm text-white/40">
                      <AlertCircle className="w-4 h-4 shrink-0" style={{ color: '#FF6044' }} />
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                      className="relative inline-flex items-center gap-3 px-8 py-4 font-soehne text-sm font-medium uppercase tracking-widest overflow-hidden disabled:opacity-40"
                      style={{
                        background: '#FF6044',
                        color: btnHover && status !== 'loading' ? '#FF6044' : '#ffffff',
                        transition: 'color 0.18s ease 0.14s',
                      }}
                    >
                      <span
                        className="absolute inset-0"
                        style={{
                          background: '#ffffff',
                          transform: btnHover && status !== 'loading' ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: btnHover ? 'left' : 'right',
                          transition: 'transform 0.36s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        {status === 'loading' ? (
                          <span className="flex gap-[5px] items-center">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: '0ms' }}
                            />
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: '150ms' }}
                            />
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: '300ms' }}
                            />
                          </span>
                        ) : (
                          <>
                            Send message
                            <ArrowRight
                              className="w-4 h-4 transition-transform duration-200"
                              style={{ transform: btnHover ? 'translateX(3px)' : 'translateX(0)' }}
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
