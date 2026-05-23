/**
 * navbar.js — RSUD Tugu Koja Global Navbar Component
 * 
 * HCI Principles Applied:
 *  - Estetika Modern: Glassmorphism floating pill design (tidak membosankan)
 *  - Konsistensi: Uniform navigation across all pages
 *  - Kesesuaian Harapan: Logo click = home (web convention)
 *  - Visibilitas: Active page indicator berupa solid pill yang kontras
 *  - Kemampuan Pembelajaran: Clean 4-item menu, clear labels
 *  - Keterkontrolan: Escape key closes mobile menu
 *  - Umpan Balik: Hover pills, morphing icons, scroll elevation
 *  - Ketahanan: Emergency strip always fixed at top
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
        pointer-events: none; /* Let clicks pass through empty spaces */
    }
    
    /* Make children clickable */
    #navbar-fixed-wrapper > * {
        pointer-events: auto;
    }

    /* ── Floating Glassmorphism Header ────────────────────── */
    #navbar-header {
        margin: 12px 16px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.8);
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
    
    #navbar-header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 12px 36px -8px rgba(34, 66, 102, 0.15);
        border-color: rgba(255,255,255,1);
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
    .nav-link {
        color: #43474e;
        padding: 10px 20px;
        border-radius: 9999px;
        transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        font-weight: 500;
        position: relative;
        overflow: hidden;
    }
    .nav-link:hover:not(.nav-link--active) {
        background: rgba(52, 145, 140, 0.1);
        color: #34918C;
    }
    .nav-link--active {
        background: #224266;
        color: #ffffff !important;
        box-shadow: 0 4px 12px rgba(34, 66, 102, 0.25);
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

    /* ── Spacer to prevent content hiding behind fixed navbar ── */
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

    <!-- Main Header — Glassmorphism Floating Pill -->
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
            <nav class="hidden md:flex nav-links-container" aria-label="Navigasi Utama">
                <a class="${navLinkClass(caridokterPages)}" href="${base}caridokter.html">Cari Dokter</a>
                <a class="${navLinkClass(layananPages)}"  href="${base}layanan.html">Layanan</a>
                <a class="${navLinkClass('berita')}"      href="${base}berita.html">Berita</a>
                <a class="${navLinkClass('tentangkami')}" href="${base}tentangkami.html">Tentang Kami</a>
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

        <!-- Mobile Navigation Drawer -->
        <div id="mobile-nav" class="md:hidden" role="navigation" aria-label="Navigasi Mobile">
            <div class="border-t border-surface-subtle/50 mx-4 pt-2"></div>
            <a class="mobile-nav-link font-label-lg text-label-lg ${caridokterPages.includes(page) ? 'mobile-active' : ''}"
               href="${base}caridokter.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">person_search</span> Cari Dokter
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${layananPages.includes(page) ? 'mobile-active' : ''}"
               href="${base}layanan.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">medical_services</span> Layanan
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

        // Dynamic spacer calculation (only push down by emergency bar height)
        // so the floating navbar overlays the hero image
        function updateSpacer() {
            setTimeout(() => {
                spacer.style.height = (emergencyBar ? emergencyBar.offsetHeight : 0) + 'px';
            }, 50);
        }
        
        // Initial call + attach to events
        updateSpacer();
        window.addEventListener('resize', updateSpacer);
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') updateSpacer();
        });

        // Scroll Elevation
        const scrollHandler = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
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
            updateSpacer(); // Recalculate spacer when menu opens/closes
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