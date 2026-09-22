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
  "use strict";

  // ── Path helpers ─────────────────────────────────────────────
  const src = document.currentScript ? document.currentScript.getAttribute("src") : "";
  const depth = (src.match(/\.\.\//g) || []).length;
  const base = "../".repeat(depth);
  const page = window.location.pathname.split("/").pop().replace(".html", "") || "index";

  // ── Active-link class logic ──────────────────────────────────
  function navLinkClass(names) {
    const pages = Array.isArray(names) ? names : [names];
    const active = pages.some((n) => page === n || (n === "index" && page === ""));
    return active ? "nav-link nav-link--active font-label-lg text-label-lg no-underline" : "nav-link font-label-lg text-label-lg no-underline";
  }

  // Page groups for multi-page active states
  const layananPages = ["layanan", "poliklinik", "igd", "rawat-inap", "laboratorium", "radiologi", "farmasi", "peta"];
  const caridokterPages = ["caridokter", "profil"];

  // ── HTML Template ────────────────────────────────────────────
  const html = `
<style>
    /* ── No-underline utility ─────────────────────────────── */
    .no-underline { text-decoration: none !important; }

    /* ── Static full-width navbar wrapper (Not fixed) ───── */
    #navbar-fixed-wrapper {
        position: relative;
        width: 100%;
        z-index: 100;
    }

    /* ── Emergency bar persistence (Solid crisp navy) ─────── */
    #emergency-bar {
        width: 100%;
        background: #11263c;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
        overflow: hidden;
    }

    /* ── Full-width static navbar (Non-floating & Non-fixed) ─ */
    #navbar-header {
        width: 100%;
        margin: 0;
        border-radius: 0;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        box-shadow: 0 2px 8px -2px rgba(34, 66, 102, 0.05);
        display: flex;
        flex-direction: column;
        position: relative;
    }

    /* ── Navbar inner layout ──────────────────────────────── */
    .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 24px;
        width: 100%;
        max-width: 1320px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    /* ── Desktop nav links ────────────── */
    .nav-links-container {
        align-items: center;
        gap: 20px;
    }

    /* ── Solid Themed CTA Button (Buat Janji: Solid Jakarta Navy) ── */
    .navbar-cta-btn {
        background: #224266 !important;
        box-shadow: 0 4px 12px -2px rgba(34, 66, 102, 0.25) !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        transition: all 0.25s ease !important;
    }
    .navbar-cta-btn:hover {
        background: #183350 !important;
        box-shadow: 0 6px 16px -2px rgba(34, 66, 102, 0.35) !important;
        transform: translateY(-1px);
    }

    /* Text contrast & active styling */
    .nav-link {
        color: #334155;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s ease;
        font-weight: 600;
    }
    .nav-link:hover {
        color: #34918C;
        background-color: rgba(52, 145, 140, 0.07);
    }
    .nav-link--active {
        color: #224266 !important;
        background-color: rgba(34, 66, 102, 0.06);
    }



    /* ── Mobile menu: slide-down animation ────────────────── */
    #mobile-nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        border-radius: 0;
        box-shadow: 0 12px 28px rgba(34, 66, 102, 0.12);
        
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transform: translateY(-8px);
        transition: max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                    opacity 0.25s ease,
                    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                    padding 0.25s ease;
        pointer-events: none;
    }
    #mobile-nav.is-open {
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        opacity: 1;
        transform: translateY(0);
        padding-bottom: 16px;
        pointer-events: auto;
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

    /* ── Spacer: Not needed for static navbar ────────────── */
    #navbar-spacer {
        display: none !important;
    }
</style>

<!-- Full-width Navbar Wrapper (Static Document Flow) -->
<div id="navbar-fixed-wrapper">
    <!-- Emergency Top Bar -->
    <div id="emergency-bar" class="w-full text-white shadow-sm relative z-50">
        <div class="max-w-container-max mx-auto px-gutter py-1.5 flex justify-center items-center gap-3 md:gap-4 text-white flex-wrap relative">
            <!-- Noticeable Emergency Pill Badge -->
            <a href="tel:112" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emergency-red text-white text-[11px] font-bold tracking-wide uppercase shadow-[0_0_12px_rgba(230,57,70,0.45)] hover:brightness-110 transition-all no-underline">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span class="material-symbols-outlined text-[13px]" style="font-variation-settings:'FILL' 1;">emergency</span>
                <span>Emergency 112</span>
            </a>

            <div class="hidden sm:block w-px h-3.5 bg-white/20"></div>

            <!-- IGD 24 Jam Hotline -->
            <div class="flex items-center gap-1.5 text-[12px] md:text-[13px] text-white/90">
                <span class="material-symbols-outlined text-[15px] text-[#34918C]" style="font-variation-settings:'FILL' 1;">phone_in_talk</span>
                <span class="font-medium text-slate-300">IGD 24 Jam:</span>
                <a href="tel:02126061110" class="text-white font-bold hover:text-health-green transition-colors no-underline tracking-wide">(021) 2606 1110</a>
            </div>

            <!-- Tombol Tutup (X) -->
            <button
                id="close-emergency-bar"
                type="button"
                class="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer border-none bg-transparent"
                aria-label="Tutup bar informasi darurat"
                title="Tutup"
            >
                <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
        </div>
    </div>

    <!-- Main Header -->
    <header id="navbar-header">
        <div class="navbar-inner">
            <!-- Logo & Brand Name -->
            <a href="${base}index.html" class="navbar-logo-link no-underline flex items-center gap-2.5 md:gap-3 group" aria-label="Kembali ke Beranda — RSUD Tugu Koja" title="Beranda">
                <img
                    src="${base}assets/images/logo/RumahSehat.png"
                    alt="Logo Rumah Sehat RSUD Tugu Koja"
                    class="navbar-logo-img"
                    style="height: 42px; width: auto; object-fit: contain;"
                >
                <div class="flex flex-col justify-center leading-tight">
                    <span class="font-bold text-[17px] md:text-[19px] text-jakarta-blue tracking-tight group-hover:text-health-green transition-colors">RSUD Tugu Koja</span>
                    <span class="text-[10px] md:text-[11px] font-semibold text-slate-400 tracking-wide">Rumah Sehat untuk Jakarta</span>
                </div>
            </a>

            <!-- Desktop Navigation -->
            <!-- Fix 2: Menu order by frequency (Layanan first) -->
            <!-- Fix 1: accesskey shortcuts (Alt+L, Alt+C, Alt+B, Alt+T) -->
            <nav class="hidden md:flex nav-links-container" aria-label="Navigasi Utama">
                <!-- LAYANAN NESTED DROPDOWN -->
                <div class="relative group">
                    <a class="${navLinkClass(layananPages)} flex items-center gap-1 cursor-pointer" href="${base}layanan.html" accesskey="l">
                        Layanan
                        <span class="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180">keyboard_arrow_down</span>
                    </a>
                    
                    <!-- Level 1 Dropdown -->
                    <div class="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div class="w-72 bg-white rounded-2xl shadow-xl border border-surface-subtle p-2 space-y-1 relative">
                            
                            <!-- Gawat Darurat -->
                            <a href="${base}layanan/igd.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-emergency-red/10 text-primary hover:text-emergency-red transition-colors">
                                <span class="material-symbols-outlined text-[20px]">emergency</span>
                                <span class="font-label-md">Gawat Darurat 24 Jam</span>
                            </a>
                            
                            <!-- Rawat Inap (Langsung tanpa submenu) -->
                            <a href="${base}layanan/rawat-inap.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors">
                                <span class="material-symbols-outlined text-[20px]">bed</span>
                                <span class="font-label-md flex-1">Rawat Inap</span>
                            </a>

                            <!-- Rawat Jalan (Trigger Level 2) -->
                            <div class="relative group/rj">
                                <a href="${base}layanan.html#rawat-jalan" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-[20px]">stethoscope</span>
                                    <span class="font-label-md flex-1">Rawat Jalan</span>
                                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                                </a>
                                
                                <!-- Level 2 Dropdown (Mega Panel untuk 19 item) -->
                                <div class="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/rj:opacity-100 group-hover/rj:visible transition-all duration-300 z-50">
                                    <div class="w-[600px] bg-white rounded-2xl shadow-xl border border-surface-subtle p-6 relative flex flex-col gap-4">
                                        <div class="border-b border-surface-subtle pb-2 mb-2">
                                            <h4 class="font-headline-sm text-jakarta-blue">Pelayanan Rawat Jalan</h4>
                                            <span class="text-xs text-text-muted">14 Poliklinik & 5 Klinik Khusus</span>
                                        </div>
                                        <div class="grid grid-cols-3 gap-x-6 gap-y-3">
                                            <div class="space-y-2">
                                                <a href="${base}layanan/poli-kandungan.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Kandungan & Kebidanan</a>
                                                <a href="${base}layanan/poli-anak.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Anak</a>
                                                <a href="${base}layanan/poli-penyakit-dalam.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Penyakit Dalam</a>
                                                <a href="${base}layanan/poli-bedah-umum.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Bedah Umum</a>
                                                <a href="${base}layanan/poli-mata.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Mata</a>
                                                <a href="${base}layanan/poli-tht-kl.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli THT-KL</a>
                                            </div>
                                            <div class="space-y-2">
                                                <a href="${base}layanan/poli-saraf.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Saraf</a>
                                                <a href="${base}layanan/poli-paru.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Paru</a>
                                                <a href="${base}layanan/poli-jantung.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Jantung & Pembuluh</a>
                                                <a href="${base}layanan/poli-kulit-kelamin.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Kulit & Kelamin</a>
                                                <a href="${base}layanan/poli-fisik-rehab.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Fisik & Rehab</a>
                                                <a href="${base}layanan/poli-konservasi-gigi.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Konservasi Gigi</a>
                                            </div>
                                            <div class="space-y-2">
                                                <a href="${base}layanan/poli-gigi-umum.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Gigi Umum</a>
                                                <a href="${base}layanan/poli-akupunktur.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Akupunktur</a>
                                                <div class="h-px bg-surface-subtle my-2"></div>
                                                <a href="${base}layanan/klinik-gizi.html" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Gizi</a>
                                                <a href="${base}layanan/klinik-mcu.html" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik MCU</a>
                                                <a href="${base}layanan/klinik-geriatri.html" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Geriatri</a>
                                                <a href="${base}layanan/klinik-sehati.html" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Sehati</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            

                            <!-- Penunjang Medis (Trigger Level 2) -->
                            <div class="relative group/pm">
                                <a href="${base}layanan/laboratorium.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-[20px]">biotech</span>
                                    <span class="font-label-md flex-1">Penunjang Medis</span>
                                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                                </a>
                                
                                <!-- Level 2 Dropdown -->
                                <div class="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/pm:opacity-100 group-hover/pm:visible transition-all duration-300 z-50">
                                    <div class="w-56 bg-white rounded-2xl shadow-xl border border-surface-subtle p-2 relative flex flex-col gap-1">
                                        <a href="${base}layanan/laboratorium.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Laboratorium</a>
                                        <a href="${base}layanan/radiologi.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Radiologi</a>
                                        <a href="${base}layanan/farmasi.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Farmasi</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <a class="${navLinkClass(caridokterPages)}" href="${base}caridokter.html" accesskey="c">Cari Dokter</a>
                <a class="${navLinkClass('berita')}" href="${base}berita.html" accesskey="b">Berita</a>
                <a class="${navLinkClass('tentangkami')}" href="${base}tentangkami.html" accesskey="t">Tentang Kami</a>
            </nav>
            <!-- CTA: Buat Janji -->
            <a href="${base}appointment.html" class="navbar-cta-btn hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-label-lg text-label-lg no-underline" style="color:white;font-size:14px;">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 1;">event_available</span>
                Buat Janji
            </a>

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
            
            <!-- Mobile Layanan Accordion -->
            <div class="mx-4 my-1">
                <button onclick="document.getElementById('mobile-layanan-menu').classList.toggle('hidden'); this.querySelector('.arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors text-[#43474e] font-label-lg text-label-lg ${layananPages.includes(page) ? 'mobile-active' : ''}">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">medical_services</span>
                        <span class="">Layanan</span>
                    </div>
                    <span class="material-symbols-outlined arrow transition-transform text-[20px]">keyboard_arrow_down</span>
                </button>
                <div id="mobile-layanan-menu" class="hidden pl-11 pr-2 pb-2 space-y-1">
                    <a href="${base}layanan.html" class="block py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium">Semua Layanan</a>
                    <a href="${base}layanan/igd.html" class="block py-2 text-[14px] text-emergency-red hover:text-emergency-red/80 font-medium">Gawat Darurat 24 Jam</a>
                    
                                        <a href="${base}layanan/rawat-inap.html" class="block py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium">Rawat Inap</a>
                    
                    <!-- Rawat Jalan Accordion -->
                    <button onclick="document.getElementById('mobile-rawat-jalan').classList.toggle('hidden'); this.querySelector('.sub-arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium text-left">
                        Rawat Jalan
                        <span class="material-symbols-outlined sub-arrow transition-transform text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <div id="mobile-rawat-jalan" class="hidden pl-3 border-l-2 border-surface-subtle space-y-1 my-1">
                        <a href="${base}layanan/poli-kandungan.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kandungan & Kebidanan</a>
                        <a href="${base}layanan/poli-anak.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Anak</a>
                        <a href="${base}layanan/poli-penyakit-dalam.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Penyakit Dalam</a>
                        <a href="${base}layanan/poli-bedah-umum.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Bedah Umum</a>
                        <a href="${base}layanan/poli-mata.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Mata</a>
                        <a href="${base}layanan/poli-tht-kl.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli THT-KL</a>
                        <a href="${base}layanan/poli-saraf.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Saraf</a>
                        <a href="${base}layanan/poli-paru.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Paru</a>
                        <a href="${base}layanan/poli-jantung.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Jantung & Pembuluh Darah</a>
                        <a href="${base}layanan/poli-kulit-kelamin.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kulit & Kelamin</a>
                        <a href="${base}layanan/poli-fisik-rehab.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kedokteran Fisik & Rehab</a>
                        <a href="${base}layanan/poli-konservasi-gigi.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Konservasi Gigi</a>
                        <a href="${base}layanan/poli-gigi-umum.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Gigi Umum</a>
                        <a href="${base}layanan/poli-akupunktur.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Akupunktur</a>
                        <div class="h-px bg-surface-subtle my-1"></div>
                        <a href="${base}layanan/klinik-gizi.html" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Gizi</a>
                        <a href="${base}layanan/klinik-mcu.html" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik MCU</a>
                        <a href="${base}layanan/klinik-geriatri.html" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Geriatri</a>
                        <a href="${base}layanan/klinik-sehati.html" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Sehati</a>
                    </div>
                    <!-- Penunjang Medis Accordion -->
                    <button onclick="document.getElementById('mobile-penunjang-medis').classList.toggle('hidden'); this.querySelector('.sub-arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium text-left">
                        Penunjang Medis
                        <span class="material-symbols-outlined sub-arrow transition-transform text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <div id="mobile-penunjang-medis" class="hidden pl-3 border-l-2 border-surface-subtle space-y-1 my-1">
                        <a href="${base}layanan/laboratorium.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Laboratorium</a>
                        <a href="${base}layanan/radiologi.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Radiologi</a>
                        <a href="${base}layanan/farmasi.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Farmasi</a>
                    </div>
                </div>
            </div>

            <a class="mobile-nav-link font-label-lg text-label-lg ${caridokterPages.includes(page) ? 'mobile-active' : ''}"
               href="${base}caridokter.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">person_search</span> Cari Dokter
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${page === "berita" ? "mobile-active" : ""}"
               href="${base}berita.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">newspaper</span> Berita
            </a>
            <a class="mobile-nav-link font-label-lg text-label-lg ${page === "tentangkami" ? "mobile-active" : ""}"
               href="${base}tentangkami.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">info</span> Tentang Kami
            </a>
            <!-- CTA Mobile -->
            <div class="mx-4 mt-2 mb-3">
                <a href="${base}appointment.html" style="text-decoration:none;">
                    <div class="navbar-cta-btn flex items-center justify-center gap-2 rounded-xl font-label-lg py-3" style="font-size:15px;color:white;">
                        <span class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 1;">event_available</span>
                        Buat Janji Temu Online
                    </div>
                </a>
            </div>
        </div>
    </header>
</div>

<!-- Spacer: pushes page content below the fixed navbar -->
<div id="navbar-spacer"></div>`;

  // ── Inject & Boot ────────────────────────────────────────────
  function inject() {
    const placeholder = document.getElementById("navbar-container");
    if (!placeholder) return;
    placeholder.outerHTML = html;
    bootInteractions();
  }

  // ── Interactive behaviours (post-inject) ─────────────────────
  function bootInteractions() {
    const fixedWrapper = document.getElementById("navbar-fixed-wrapper");
    const header = document.getElementById("navbar-header");
    const mobileNav = document.getElementById("mobile-nav");
    const toggleBtn = document.getElementById("menu-toggle-btn");
    const toggleIcon = document.getElementById("menu-toggle-icon");
    const spacer = document.getElementById("navbar-spacer");
    const emergencyBar = document.getElementById("emergency-bar");

    if (!header || !mobileNav || !toggleBtn || !fixedWrapper || !spacer) return;

    // Close Emergency Bar Logic (Temporary dismiss, restores upon page refresh)
    const closeEmergencyBtn = document.getElementById("close-emergency-bar");
    if (closeEmergencyBtn && emergencyBar) {
      // Hapus data tersimpan sebelumnya agar bar langsung muncul kembali saat refresh
      try { sessionStorage.removeItem("emergency_bar_closed"); } catch (e) {}

      closeEmergencyBtn.addEventListener("click", () => {
        emergencyBar.style.maxHeight = emergencyBar.offsetHeight + "px";
        emergencyBar.offsetHeight; // Force reflow
        emergencyBar.style.opacity = "0";
        emergencyBar.style.maxHeight = "0px";
        emergencyBar.style.paddingTop = "0px";
        emergencyBar.style.paddingBottom = "0px";
        setTimeout(() => {
          emergencyBar.style.display = "none";
        }, 300);
      });
    }

    // Mobile Menu Logic
    let menuOpen = false;
    const toggleMenu = () => {
      menuOpen = !menuOpen;
      mobileNav.classList.toggle("is-open", menuOpen);
      toggleBtn.setAttribute("aria-expanded", String(menuOpen));
      toggleIcon.textContent = menuOpen ? "close" : "menu";
      toggleBtn.classList.toggle("menu-is-open", menuOpen);
      header.classList.toggle("menu-is-open", menuOpen);
    };

    toggleBtn.addEventListener("click", toggleMenu);

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOpen) {
        toggleMenu();
        toggleBtn.focus();
      }
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (menuOpen) toggleMenu();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
