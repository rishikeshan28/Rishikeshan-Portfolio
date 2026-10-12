import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const htmlEl = document.documentElement;
    const saved = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', saved);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const t = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    document.querySelectorAll('.fade-up, .scale-in, .slide-left, .slide-right').forEach(el => observer.observe(el));

    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    if (mobileMenuBtn && mobileMenu) mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
    if (closeMenuBtn && mobileMenu) closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileLinks.forEach(l => l.addEventListener('click', () => mobileMenu && mobileMenu.classList.remove('active')));

    function updateMenuVisibility() {
      const desktopMenu = document.getElementById('desktopMenu');
      if (!desktopMenu || !mobileMenuBtn) return;
      if (window.innerWidth >= 768) { desktopMenu.style.display = 'flex'; mobileMenuBtn.style.display = 'none'; }
      else { desktopMenu.style.display = 'none'; mobileMenuBtn.style.display = 'block'; }
    }
    updateMenuVisibility();
    window.addEventListener('resize', updateMenuVisibility);

    // smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // contact form -> open whatsapp
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const message = document.getElementById('message')?.value || '';
        const txt = encodeURIComponent(`Hi, Rishikeshan!\n\nName: ${name}\nPhone: ${phone}\n\nMessage: ${message}`);
        window.open(`https://wa.me/919025430223?text=${txt}`, '_blank');
        if (successMessage) successMessage.classList.add('show');
        contactForm.reset();
        setTimeout(() => successMessage && successMessage.classList.remove('show'), 5000);
      });
    }

    // nav active link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const onActive = () => {
      let current = '';
      sections.forEach(s => { if (window.pageYOffset >= s.offsetTop - 200) current = s.id; });
      navLinks.forEach(link => { if (link.getAttribute('href') === `#${current}`) link.style.color = 'var(--text-primary)'; else link.style.color = 'var(--text-secondary)'; });
    };
    window.addEventListener('scroll', onActive);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateMenuVisibility);
      window.removeEventListener('scroll', onActive);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Rishikeshan - Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <nav id="navbar">
          <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <img src="/assets/rk-logo.png" alt="RK" className="logo-image" style={{width:40,height:40,borderRadius:10}} />
            </div>
            <div id="desktopMenu" style={{display:'none', gap:32, alignItems:'center'}}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>
            <button id="mobileMenuBtn" aria-label="menu" style={{background:'none',border:'none'}}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </nav>

        <div className="mobile-menu" id="mobileMenu">
          <button id="closeMenuBtn" style={{position:'absolute',top:24,right:24,fontSize:32,background:'none',border:'none'}}>&times;</button>
          <a href="#home" className="mobile-link">Home</a>
          <a href="#about" className="mobile-link">About</a>
          <a href="#experience" className="mobile-link">Experience</a>
          <a href="#skills" className="mobile-link">Skills</a>
          <a href="#contact" className="mobile-link">Contact</a>
        </div>

        <section id="home" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:80}}>
          <div style={{maxWidth:900,textAlign:'center'}}>
            <div className="fade-up" style={{marginBottom:24}}>
              <span style={{display:'inline-block', padding:'8px 20px', background:'rgba(0,113,227,0.1)', borderRadius:20, color:'var(--accent-primary)'}}>👋 Welcome to my Portfolio</span>
            </div>
            <h1 id="heroName" className="fade-up delay-100" style={{fontSize:72,fontWeight:700,marginBottom:24,lineHeight:1.1}}>Hi, I'm <span className="gradient-text">Rishikeshan</span></h1>
            <p id="heroTagline" className="fade-up delay-200" style={{fontSize:24,color:'var(--text-secondary)',marginBottom:40}}>Front-End Developer | IT Support Specialist | Network Penetration Testing</p>
            <div className="fade-up delay-300" style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
              <a href="#contact"><button className="btn-primary">Get in Touch</button></a>
              <a href="#experience"><button className="btn-secondary">View My Work</button></a>
            </div>
          </div>
        </section>

        <section id="about">
          <div style={{textAlign:'center', marginBottom:64}}>
            <span className="fade-up" style={{color:'var(--accent-primary)',fontSize:14,fontWeight:600,letterSpacing:2,textTransform:'uppercase'}}>About Me</span>
            <h2 id="aboutTitle" className="fade-up delay-100" style={{fontSize:56,fontWeight:700,marginTop:16}}>Who I Am</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
            <div className="scale-in">
              <div style={{aspectRatio:'1',borderRadius:32,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                <img src="/assets/rk-logo.png" alt="Rishikeshan" style={{width:160,height:160,borderRadius:'50%',objectFit:'cover'}} />
              </div>
            </div>
            <div>
              <p className="fade-up" style={{fontSize:20,color:'var(--text-secondary)',lineHeight:1.8}}>I'm a passionate <strong style={{color:'var(--accent-primary)'}}>Front-End Developer</strong> and <strong style={{color:'var(--accent-secondary)'}}>IT Support Specialist</strong> with expertise in Network Penetration Testing.</p>
            </div>
          </div>
        </section>

        <section id="contact">
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="fade-up" style={{color:'var(--accent-primary)',fontSize:14,fontWeight:600,letterSpacing:2,textTransform:'uppercase'}}>Get In Touch</span>
            <h2 id="contactTitle" className="fade-up delay-100" style={{fontSize:56,fontWeight:700,marginTop:16}}>Contact Me</h2>
          </div>
          <div style={{maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:48}}>
            <div className="card">
              <h3 style={{fontSize:24,fontWeight:700,marginBottom:24}}>Contact Info</h3>
              <p style={{color:'var(--text-secondary)'}}>Email: rishikeshan2821@gmail.com</p>
              <p style={{color:'var(--text-secondary)'}}>Phone: +91 9025430223</p>
            </div>
            <div className="card scale-in">
              <h3 style={{fontSize:24,fontWeight:700,marginBottom:24}}>Send a Message</h3>
              <form id="contactForm" style={{display:'flex',flexDirection:'column',gap:16}}>
                <div>
                  <label htmlFor="name" style={{display:'block',marginBottom:8,color:'var(--text-secondary)'}}>Name</label>
                  <input id="name" name="name" required placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="phone" style={{display:'block',marginBottom:8,color:'var(--text-secondary)'}}>Phone</label>
                  <input id="phone" name="phone" required placeholder="Your phone number" />
                </div>
                <div>
                  <label htmlFor="message" style={{display:'block',marginBottom:8,color:'var(--text-secondary)'}}>Message</label>
                  <textarea id="message" name="message" required placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
              <div id="successMessage" className="success-message">✅ Message sent successfully! I'll get back to you soon.</div>
            </div>
          </div>
        </section>

        <footer style={{padding:48,borderTop:'1px solid rgba(0,0,0,0.1)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:24}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <img src="/assets/rk-logo.png" alt="RK" className="logo-image" />
            </div>
            <p style={{color:'var(--text-secondary)'}}>© 2026 Rishikeshan. All rights reserved.</p>
          </div>
        </footer>

        <div style={{position:'fixed',bottom:24,right:24,zIndex:999}}>
          <a href="https://wa.me/919025430223?text=Hi%2C%20Rishikeshan" target="_blank" rel="noreferrer" className="whatsapp-btn" style={{width:60,height:60,borderRadius:50,background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
          </a>
        </div>

        <div style={{position:'fixed',bottom:96,right:24,zIndex:999}}>
          <button id="themeToggle" className="theme-toggle-btn" aria-label="Toggle theme">
            <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/></svg>
            <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
        </div>
      </main>
    </>
  )
}
