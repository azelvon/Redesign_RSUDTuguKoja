/**
 * navbar.js — RSUD Tugu Koja Global Navbar Component
 * 
 * HCI Principles Applied (Pertemuan 7 & 7.b):
 *  - Breadth > Depth: 4 item, 1 level, no submenu (7.b hal 26)
 *  - Task-Oriented Wording: "Cari Dokter" uses verb-first (7.b hal 47)
 *  - Menu Order by Frequency: Layanan first (7.b hal 42)
 *  - Keyboard Shortcuts: accesskey + underline mnemonic (7.b hal 49-52)
 *  - Figure-Ground: Hybrid glassmorphism → solid on scroll (7.b hal 35)
 *  - Menu Context: Active page pill indicator (7.b hal 38)
 *  - Small Displays: Less is more, touch-friendly (7.a hal 16)
 *  - Direct Action Items: No cascading indicators needed (7.b hal 47)
 *  - Phrasing: Consistent, concise labels in Bahasa (7.a hal 22)
 */
(function NavbarComponent() {
    'use strict';

    // ── Path helpers ─────────────────────────────────────────────
    const src   = document.currentScript ? document.currentScript.getAttribute('src') : '';
    const depth = (src.match(/\.\.\//g) || []).length;
    const base  = '../'.repeat(depth);
    const page  = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    // ── Active-link class logic ──────────────────────────────────
    function navLinkClass(names) {
        const pages  = Array.isArray(names) ? names : [names];
        const active = pages.some(n => page === n || (n === 'index' && page === ''));
        return active
            ? 'nav-link nav-link--active font-label-lg text-label-lg no-underline'
            : 'nav-link font-label-lg text-label-lg no-underline';
    }

    // Page groups for multi-page active states
    const layananPages    = ['layanan', 'poliklinik', 'igd', 'rawat-inap', 'laboratorium', 'peta'];
    const caridokterPages = ['caridokter', 'profil'];

    // ── HTML Template ────────────────────────────────────────────
    const html = `
<style>
    /* ── No-underline utility ─────────────────────────────── */
    .no-underline { text-decoration: none !important; }

    /* ── Fixed navbar wrapper ─────────────────────────────── */
    #navbar-fixed-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        pointer-events: none;
    }
    #navbar-fixed-wrapper > * {
        pointer-events: auto;
    }

    /* ── Floating Glassmorphism Header (Hybrid) ──────────── */
    /* Fix 3: Figure-Ground — semi-transparent over hero,    */
    /*         transitions to solid white on scroll           */
    #navbar-header {
        margin: 12px 16px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.75);
        box-shadow: 0 4px 24px -4px rgba(34, 66, 102, 0.08);
        transition: all 0.38s cubic-bezier(0.22, 1, 0.36, 1);
        display: flex;
        flex-direction: column;
    }
    @media (min-width: 1240px) {
        #navbar-header {
            max-width: 1160px;
            margin: 16px auto;
        }
    }
    
    /* Scrolled state → solid white, strong figure-ground */
    #navbar-header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 4px 20px rgba(34, 66, 102, 0.12);
        border-color: rgba(255, 255, 255, 1);
    }

    /* Hide state on scroll down */
    #navbar-header.nav-hidden {
        transform: translateY(-150%);
        opacity: 0;
        pointer-events: none;
    }


    /* ── Navbar inner layout ──────────────────────────────── */
    .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px 8px 24px;
    }

    /* ── Desktop nav links (Modern Pill Style) ────────────── */
    .nav-links-container {
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(34, 66, 102, 0.03);
        padding: 6px;
        border-radius: 9999px;
        border: 1px solid rgba(0,0,0,0.03);
    }

    /* Fix 4: Text contrast — subtle halo ensures readability */
    .nav-link {
        color: #43474e;
        padding: 10px 20px;
        border-radius: 9999px;
        transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        font-weight: 500;
        position: relative;
        overflow: hidden;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }
    .nav-link:hover:not(.nav-link--active) {
        background: rgba(52, 145, 140, 0.1);
        color: #34918C;
    }
    .nav-link--active {
        background: #224266;
        color: #ffffff !important;
        box-shadow: 0 4px 12px rgba(34, 66, 102, 0.25);
        text-shadow: none;
    }

    /* Fix 1: Keyboard Shortcuts — underline mnemonic char    */
    /* Per materi 7.b hal 49: "Designate the mnemonic         */
    /* character by underlining it"                            */
    .nav-mnemonic {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-thickness: 1.5px;
        text-decoration-color: rgba(52, 145, 140, 0.5);
    }
    .nav-link--active .nav-mnemonic {
        text-decoration-color: rgba(255, 255, 255, 0.5);
    }

    /* ── Mobile menu: slide-down animation ────────────────── */
    #mobile-nav {
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                    opacity 0.3s ease,
                    padding 0.3s ease;
    }
    #mobile-nav.is-open {
        max-height: 400px;
        opacity: 1;
        padding-bottom: 12px;
    }

    /* ── Mobile nav links ─────────────────────────────────── */
    .mobile-nav-link {
        text-decoration: none !important;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 24px;
        margin: 4px 12px;
        border-radius: 12px;
        transition: all 0.2s ease;
        color: #43474e;
    }
    .mobile-nav-link:hover { 
        background: rgba(52, 145, 140, 0.08); 
        color: #34918C; 
        transform: translateX(4px);
    }
    .mobile-nav-link.mobile-active { 
        background: rgba(34, 66, 102, 0.06);
        color: #224266; 
        font-weight: 700; 
    }

    /* ── Menu icon morph ──────────────────────────────────── */
    #menu-toggle-icon {
        transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        display: block;
    }
    .menu-is-open #menu-toggle-icon {
        transform: rotate(90deg) scale(0.9);
    }

    /* ── Navbar logo ─────────────────────────────────────── */
    .navbar-logo-img {
        height: 48px;
        width: auto;
        object-fit: contain;
        transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.06));
    }
    .navbar-logo-link:hover .navbar-logo-img {
        transform: scale(1.04) rotate(-1deg);
    }

    /* ── Spacer ───────────────────────────────────────────── */
    #navbar-spacer {
        display: block;
        width: 100%;
    }
</style>

<!-- Fixed wrapper: Emergency Bar + Navbar Header -->
<div id="navbar-fixed-wrapper">
    <!-- Emergency Top Bar -->
    <div id="emergency-bar" class="w-full bg-emergency-red text-white shadow-md relative z-50">
        <div class="max-w-container-max mx-auto px-gutter py-1.5 flex justify-center items-center gap-4">
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">emergency_home</span>
            <span class="font-label-md text-[13px] tracking-wide font-medium">Emergency: 112</span>
            <div class="hidden md:block w-px h-3.5 bg-white/40"></div>
            <span class="hidden md:block font-label-md text-[13px] tracking-wide font-medium">IGD 24 Jam: (021) 4393 0530</span>
        </div>
    </div>

    <!-- Main Header — Glassmorphism Floating Pill (Hybrid) -->
    <header id="navbar-header">
        <div class="navbar-inner">
            <!-- Logo -->
            <a href="${base}index.html" class="navbar-logo-link no-underline flex items-center group" aria-label="Kembali ke Beranda — RSUD Tugu Koja" title="Beranda">
                <img
                    src="${base}assets/images/logo/logo_rsud.png"
                    alt="Logo RSUD Tugu Koja"
                    class="navbar-logo-img"
                >
            </a>

            <!-- Desktop Navigation -->
            <!-- Fix 2: Menu order by frequency (Layanan first) -->
            <!-- Fix 1: accesskey shortcuts (Alt+L, Alt+C, Alt+B, Alt+T) -->
            <nav class="hidden md:flex nav-links-container" aria-label="Navigasi Utama">
                <a class="${navLinkClass(layananPages)}"  href="${base}layanan.html" accesskey="l"><span class="nav-mnemonic">L</span>ayanan</a>
                <a class="${navLinkClass(caridokterPages)}" href="${base}caridokter.html" accesskey="c"><span class="nav-mnemonic">C</span>ari Dokter</a>
                <a class="${navLinkClass('berita')}"      href="${base}berita.html" accesskey="b"><span class="nav-mnemonic">B</span>erita</a>
                <a class="${navLinkClass('tentangkami')}" href="${base}tentangkami.html" accesskey="t"><span class="nav-mnemonic">T</span>entang Kami</a>
            </nav>

            <!-- Mobile Menu Toggle -->
            <button
                id="menu-toggle-btn"
                class="md:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-surface-container-low transition-colors shadow-sm bg-white border border-surface-subtle"
                style="color: #224266;"
                aria-label="Buka menu navigasi"
                aria-expanded="false"
                aria-controls="mobile-nav"
            >
                <span id="menu-toggle-icon" class="material-symbols-outlined text-[22px]">menu</span>
            </button>
        </div>

        <!-- Mobile Navigation Drawer (same order as desktop) -->
        <div id="mobile-nav" class="md:hidden" role="navigation" aria-label="Navigasi Mobile">
            <div class="border-t border-surface-subtle/50 mx-4 pt-2"></div>
            <a class="mobile-nav-link font-label-lg text-label-lg ${layananPages.includes(page) ? 'mobile-active' : ''}"
               href="${base}layanan.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">medical_services</span> Layanan
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${caridokterPages.includes(page) ? 'mobile-active' : ''}"
               href="${base}caridokter.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">person_search</span> Cari Dokter
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${page === 'berita' ? 'mobile-active' : ''}"
               href="${base}berita.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">newspaper</span> Berita
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${page === 'tentangkami' ? 'mobile-active' : ''}"
               href="${base}tentangkami.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">info</span> Tentang Kami
            </a>
        </div>
    </header>
</div>

<!-- Spacer: pushes page content below the fixed navbar -->
<div id="navbar-spacer"></div>`;

    // ── Inject & Boot ────────────────────────────────────────────
    function inject() {
        const placeholder = document.getElementById('navbar-container');
        if (!placeholder) return;
        placeholder.outerHTML = html;
        bootInteractions();
    }

    // ── Interactive behaviours (post-inject) ─────────────────────
    function bootInteractions() {
        const fixedWrapper = document.getElementById('navbar-fixed-wrapper');
        const header    = document.getElementById('navbar-header');
        const mobileNav = document.getElementById('mobile-nav');
        const toggleBtn = document.getElementById('menu-toggle-btn');
        const toggleIcon = document.getElementById('menu-toggle-icon');
        const spacer    = document.getElementById('navbar-spacer');
        const emergencyBar = document.getElementById('emergency-bar');
        
        if (!header || !mobileNav || !toggleBtn || !fixedWrapper || !spacer) return;

        // Dynamic spacer (only emergency bar height — navbar floats over hero)
        function updateSpacer() {
            setTimeout(() => {
                spacer.style.height = (emergencyBar ? emergencyBar.offsetHeight : 0) + 'px';
            }, 50);
        }
        
        updateSpacer();
        window.addEventListener('resize', updateSpacer);
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') updateSpacer();
        });

        // Scroll Elevation & Hide-on-Scroll Logic
        let lastScrollY = window.scrollY;
        
        const scrollHandler = () => {
            const currentScrollY = window.scrollY;
            
            // 1. Toggle glassmorphism/solid state
            header.classList.toggle('scrolled', currentScrollY > 20);

            // 2. Hide on scroll down / Show on scroll up
            // Threshold of 60px to avoid hiding right at the very top
            if (currentScrollY > 60 && !menuOpen) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down -> Hide navbar header only
                    header.classList.add('nav-hidden');
                } else {
                    // Scrolling up -> Show navbar header
                    header.classList.remove('nav-hidden');
                }
            } else {
                // Always show at the top or if mobile menu is open
                header.classList.remove('nav-hidden');
            }

            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler();

        // Mobile Menu Logic
        let menuOpen = false;
        const toggleMenu = () => {
            menuOpen = !menuOpen;
            mobileNav.classList.toggle('is-open', menuOpen);
            toggleBtn.setAttribute('aria-expanded', String(menuOpen));
            toggleIcon.textContent = menuOpen ? 'close' : 'menu';
            toggleBtn.classList.toggle('menu-is-open', menuOpen);
            updateSpacer();
        };

        toggleBtn.addEventListener('click', toggleMenu);

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOpen) {
                toggleMenu();
                toggleBtn.focus();
            }
        });

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();