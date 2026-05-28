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
  const layananPages = ["layanan", "poliklinik", "igd", "rawat-inap", "laboratorium", "peta"];
  const caridokterPages = ["caridokter", "profil"];

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

    /* ── Emergency bar persistence ─────────────────────────── */
    #emergency-bar {
        position: sticky;
        top: 0;
        z-index: 1001;
    }

    /* ── Floating pill navbar ──────────── */
    #navbar-header {
        margin: 16px auto 0 auto;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.90);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(226, 232, 240, 0.75);
        box-shadow: 0 4px 24px -4px rgba(34, 66, 102, 0.08);
        transition: all 0.38s cubic-bezier(0.22, 1, 0.36, 1);
        display: flex;
        flex-direction: column;
        width: calc(100% - 48px);
        max-width: calc(1280px - 48px);
    }
    
    /* Scrolled state */
    #navbar-header.scrolled {
        margin-top: 12px;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(34, 66, 102, 0.12);
        border-color: rgba(226, 232, 240, 1);
        max-width: calc(1280px - 96px); /* Sedikit mengecil saat discroll agar manis */
    }

    /* ── Navbar inner layout ──────────────────────────────── */
    .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    /* ── Desktop nav links ────────────── */
    .nav-links-container {
        display: flex;
        align-items: center;
        gap: 24px;
    }

    /* Text contrast & active styling with underline */
    .nav-link {
        color: #43474e;
        padding: 8px 4px;
        transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        font-weight: 600;
        position: relative;
    }
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #34918C;
        border-radius: 2px;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }
    .nav-link:hover {
        color: #34918C;
    }
    .nav-link:hover::after {
        transform: scaleX(1);
    }
    .nav-link--active {
        color: #224266 !important;
    }
    .nav-link--active::after {
        transform: scaleX(1);
        background-color: #224266;
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
        text-decoration-color: rgba(34, 66, 102, 0.5);
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
        max-height: calc(100vh - 80px);
        overflow-y: auto;
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
            <span class="hidden md:block font-label-md text-[13px] tracking-wide font-medium">IGD 24 Jam: (021) 2606 1110</span>
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
                <!-- LAYANAN NESTED DROPDOWN -->
                <div class="relative group">
                    <a class="\ flex items-center gap-1 cursor-pointer" href="\layanan.html" accesskey="l">
                        <span class="nav-mnemonic">L</span>ayanan
                        <span class="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180">keyboard_arrow_down</span>
                    </a>
                    
                    <!-- Level 1 Dropdown -->
                    <div class="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div class="w-72 bg-white rounded-2xl shadow-xl border border-surface-subtle p-2 space-y-1 relative">
                            
                            <!-- Gawat Darurat -->
                            <a href="\layanan/igd.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-emergency-red/10 text-primary hover:text-emergency-red transition-colors">
                                <span class="material-symbols-outlined text-[20px]">emergency</span>
                                <span class="font-label-md">Gawat Darurat 24 Jam</span>
                            </a>
                            
                            <!-- Rawat Inap (Langsung tanpa submenu) -->
                            <a href="\layanan/rawat-inap.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors">
                                <span class="material-symbols-outlined text-[20px]">bed</span>
                                <span class="font-label-md flex-1">Rawat Inap</span>
                            </a>

                            <!-- Rawat Jalan (Trigger Level 2) -->
                            <div class="relative group/rj">
                                <a href="\layanan.html#rawat-jalan" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors cursor-pointer">
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
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Kandungan & Kebidanan</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Anak</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Penyakit Dalam</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Bedah Umum</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Mata</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli THT-KL</a>
                                            </div>
                                            <div class="space-y-2">
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Saraf</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Paru</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Jantung & Pembuluh</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Kulit & Kelamin</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Fisik & Rehab</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Konservasi Gigi</a>
                                            </div>
                                            <div class="space-y-2">
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Gigi Umum</a>
                                                <a href="\caridokter.html" class="block text-[13px] text-on-surface-variant hover:text-health-green transition-colors">Poli Akupunktur</a>
                                                <div class="h-px bg-surface-subtle my-2"></div>
                                                <a href="\klinik-detail.html?id=klinik-gizi" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Gizi</a>
                                                <a href="\klinik-detail.html?id=klinik-mcu" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik MCU</a>
                                                <a href="\klinik-detail.html?id=klinik-geriatri" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Geriatri</a>
                                                <a href="\klinik-detail.html?id=klinik-sehati" class="block text-[13px] font-bold text-jakarta-blue hover:text-health-green transition-colors">Klinik Sehati</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            

                            <!-- Penunjang Medis (Trigger Level 2) -->
                            <div class="relative group/pm">
                                <a href="\layanan/laboratorium.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container text-primary transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-[20px]">biotech</span>
                                    <span class="font-label-md flex-1">Penunjang Medis</span>
                                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                                </a>
                                
                                <!-- Level 2 Dropdown -->
                                <div class="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/pm:opacity-100 group-hover/pm:visible transition-all duration-300 z-50">
                                    <div class="w-56 bg-white rounded-2xl shadow-xl border border-surface-subtle p-2 relative flex flex-col gap-1">
                                        <a href="\layanan/laboratorium.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Laboratorium</a>
                                        <a href="\layanan.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Radiologi</a>
                                        <a href="\layanan.html" class="p-3 rounded-xl hover:bg-surface-container text-[13px] text-on-surface-variant hover:text-health-green font-medium transition-colors">Farmasi</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <a class="" href="\caridokter.html" accesskey="c"><span class="nav-mnemonic">C</span>ari Jadwal</a>
                <a class=""      href="berita.html" accesskey="b"><span class="nav-mnemonic">B</span>erita</a>
                <a class="" href="tentangkami.html" accesskey="t"><span class="nav-mnemonic">T</span>entang Kami</a>
            </nav>
            <!-- CTA: Buat Janji -->
            <a href="${base}appointment.html" class="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-health-green text-white rounded-xl font-label-lg text-label-lg hover:brightness-110 transition-all shadow-sm no-underline" style="color:white;font-size:14px;">
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
                <button onclick="document.getElementById('mobile-layanan-menu').classList.toggle('hidden'); this.querySelector('.arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors text-[#43474e] font-label-lg text-label-lg">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">medical_services</span>
                        <span class="">Layanan</span>
                    </div>
                    <span class="material-symbols-outlined arrow transition-transform text-[20px]">keyboard_arrow_down</span>
                </button>
                <div id="mobile-layanan-menu" class="hidden pl-11 pr-2 pb-2 space-y-1">
                    <a href="\layanan.html" class="block py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium">Semua Layanan</a>
                    <a href="\layanan/igd.html" class="block py-2 text-[14px] text-emergency-red hover:text-emergency-red/80 font-medium">Gawat Darurat 24 Jam</a>
                    
                                        <a href="\layanan/rawat-inap.html" class="block py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium">Rawat Inap</a>
                    
                    <!-- Rawat Jalan Accordion -->
                    <button onclick="document.getElementById('mobile-rawat-jalan').classList.toggle('hidden'); this.querySelector('.sub-arrow').classList.toggle('rotate-180');" class="w-full flex items-center justify-between py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium text-left">
                        Rawat Jalan
                        <span class="material-symbols-outlined sub-arrow transition-transform text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <div id="mobile-rawat-jalan" class="hidden pl-3 border-l-2 border-surface-subtle space-y-1 my-1">
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kandungan & Kebidanan</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Anak</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Penyakit Dalam</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Bedah Umum</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Mata</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli THT-KL</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Saraf</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Paru</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Jantung & Pembuluh Darah</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kulit & Kelamin</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Kedokteran Fisik & Rehab</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Konservasi Gigi</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Gigi Umum</a>
                        <a href="\caridokter.html" class="block py-1.5 text-[13px] text-text-muted hover:text-health-green">Poli Akupunktur</a>
                        <div class="h-px bg-surface-subtle my-1"></div>
                        <a href="\klinik-detail.html?id=klinik-gizi" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Gizi</a>
                        <a href="\klinik-detail.html?id=klinik-mcu" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik MCU</a>
                        <a href="\klinik-detail.html?id=klinik-geriatri" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Geriatri</a>
                        <a href="\klinik-detail.html?id=klinik-sehati" class="block py-1.5 text-[13px] font-medium text-jakarta-blue">Klinik Sehati</a>
                    </div>
                    <a href="\layanan/laboratorium.html" class="block py-2 text-[14px] text-on-surface-variant hover:text-health-green font-medium">Penunjang Medis</a>
                </div>
            </div>

            <a class="mobile-nav-link font-label-lg text-label-lg "
               href="\caridokter.html">
                <span class="material-symbols-outlined text-[20px]" style="color:#34918C;">person_search</span> Cari Jadwal
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
                    <div class="flex items-center justify-center gap-2 bg-health-green text-white px-4 py-3 rounded-xl font-label-lg" style="font-size:15px;color:white;">
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

    // Dynamic spacer
    function updateSpacer() {
      setTimeout(() => {
        if (document.body.classList.contains("peta-fullscreen")) {
          spacer.style.height = fixedWrapper.offsetHeight + "px";
        } else {
          spacer.style.height = (emergencyBar ? emergencyBar.offsetHeight : 0) + "px";
        }
      }, 50);
    }

    updateSpacer();
    window.addEventListener("resize", updateSpacer);
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") updateSpacer();
    });

    // Scroll Elevation & Hide-on-Scroll Logic
    let lastScrollY = window.scrollY;

    const scrollHandler = () => {
      const currentScrollY = window.scrollY;

      // 1. Toggle glassmorphism/solid state
      header.classList.toggle("scrolled", currentScrollY > 20);

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    scrollHandler();

    // Mobile Menu Logic
    let menuOpen = false;
    const toggleMenu = () => {
      menuOpen = !menuOpen;
      mobileNav.classList.toggle("is-open", menuOpen);
      toggleBtn.setAttribute("aria-expanded", String(menuOpen));
      toggleIcon.textContent = menuOpen ? "close" : "menu";
      toggleBtn.classList.toggle("menu-is-open", menuOpen);
      updateSpacer();
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
