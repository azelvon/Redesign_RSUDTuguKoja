/**
 * footer.js — RSUD Tugu Koja Global Footer Component
 *
 * HCI Principles Applied:
 *  - Konsistensi: Same layout & color scheme across all pages
 *  - Familiaritas: Standard footer pattern, predictable placement
 *  - Fleksibilitas: Multiple contact methods (phone, email, map embed)
 *  - Keterpahaman: Jam operasional scannable, clear sections
 *  - Kenyamanan Pengguna: High contrast, sufficient spacing, ARIA labels
 *  - Daya Ingat: Consistent element positioning
 */
(function FooterComponent() {
    'use strict';

    const src   = document.currentScript ? document.currentScript.getAttribute('src') : '';
    const depth = (src.match(/\.\.\//g) || []).length;
    const base  = '../'.repeat(depth);
    const currentYear = new Date().getFullYear();

    const html = `
<style>
    /* ── Back to top button ────────────────────────────────── */
    #back-to-top {
        position: fixed;
        bottom: 88px;
        right: 32px;
        z-index: 900;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: #224266;
        color: #ffffff;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px -4px rgba(34,66,102,0.3);
        opacity: 0;
        transform: translateY(12px);
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                    background-color 0.2s ease;
    }
    #back-to-top.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }
    #back-to-top:hover {
        background: #34918C;
        transform: translateY(-2px);
    }

    /* ── Footer link hover ────────────────────────────────── */
    .footer-link {
        text-decoration: none !important;
        position: relative;
        display: inline-block;
        color: rgba(255,255,255,0.65);
        transition: color 0.22s ease;
        padding-bottom: 1px;
    }
    .footer-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #9af2ec;
        border-radius: 9999px;
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .footer-link:hover { color: #ffffff; }
    .footer-link:hover::after { transform: scaleX(1); }

    /* ── Bottom bar links ─────────────────────────────────── */
    .footer-meta-link {
        text-decoration: none !important;
        color: rgba(255,255,255,0.4);
        font-size: 13px;
        transition: color 0.2s ease;
    }
    .footer-meta-link:hover { color: rgba(255,255,255,0.8); }

    /* ── Social icon buttons ──────────────────────────────── */
    .social-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.6);
        text-decoration: none !important;
        transition: background-color 0.25s ease, color 0.25s ease,
                    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .social-btn:hover {
        background: rgba(154,242,236,0.15);
        color: #9af2ec;
        transform: translateY(-2px);
    }

    /* ── Contact icon rows ────────────────────────────────── */
    .contact-row {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: rgba(255,255,255,0.65);
    }
    .contact-row .material-symbols-outlined {
        font-size: 18px;
        flex-shrink: 0;
        margin-top: 2px;
        color: #9af2ec;
    }

    /* ── Schedule badge ───────────────────────────────────── */
    .schedule-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        font-size: 13px;
        color: rgba(255,255,255,0.6);
    }
    .schedule-item:last-child { border-bottom: none; }
    .schedule-item .schedule-time {
        color: rgba(255,255,255,0.85);
        font-weight: 600;
    }

    /* ── Map container ────────────────────────────────────── */
    .footer-map-wrap {
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.1);
    }
    .footer-map-wrap iframe {
        display: block;
        width: 100%;
        height: 140px;
        filter: grayscale(0.3) brightness(0.85);
        transition: filter 0.3s ease;
    }
    .footer-map-wrap:hover iframe {
        filter: grayscale(0) brightness(1);
    }
</style>

<footer class="w-full" style="background: linear-gradient(180deg, #1a3554 0%, #224266 100%);" role="contentinfo" aria-label="Footer RSUD Tugu Koja">

    <!-- Accent line -->
    <div class="w-full h-[3px]" style="background: linear-gradient(90deg, #224266 0%, #34918C 30%, #9af2ec 50%, #34918C 70%, #224266 100%);"></div>

    <!-- Main footer body -->
    <div class="max-w-container-max mx-auto px-gutter pt-14 pb-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            <!-- Column 1: Brand (span 4) -->
            <div class="lg:col-span-4 flex flex-col gap-4">
                <a href="${base}index.html" class="no-underline flex items-center group w-fit" style="text-decoration:none;">
                    <div style="background: white; padding: 6px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease;" class="hover:scale-105">
                        <img
                            src="${base}assets/images/logo/logo_rsud.png"
                            alt="Logo RSUD Tugu Koja"
                            style="height:36px;width:auto;object-fit:contain;"
                        >
                    </div>
                </a>
                <p class="font-body-md text-[14px] leading-relaxed max-w-xs" style="color:rgba(255,255,255,0.55);">
                    Rumah Sehat untuk Jakarta — melayani masyarakat Jakarta Utara
                    dengan pelayanan kesehatan prima dan profesional.
                </p>
                <div class="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" style="background:rgba(255,255,255,0.06);">
                    <span class="material-symbols-outlined text-[16px]" style="color:#9af2ec;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">verified</span>
                    <span style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;">Terakreditasi KARS Paripurna</span>
                </div>
                <div class="flex items-center gap-2 pt-1">
                    <a href="https://www.instagram.com/rsudtugukoja/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/rsudtugukoja" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@RSUDTuguKoja" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="YouTube">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#1a3554" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                    </a>
                </div>
            </div>

            <!-- Column 2: Navigasi (span 2) -->
            <div class="lg:col-span-2 flex flex-col gap-4">
                <h5 class="text-white font-bold text-[13px] tracking-wider uppercase" style="letter-spacing:0.1em;">Navigasi</h5>
                <nav class="flex flex-col gap-2.5" aria-label="Footer Navigasi">
                    <a class="footer-link font-label-md text-[13px]" href="${base}index.html">Beranda</a>
                    <a class="footer-link font-label-md text-[13px]" href="${base}caridokter.html">Cari Dokter</a>
                    <a class="footer-link font-label-md text-[13px]" href="${base}layanan.html">Layanan</a>
                    <a class="footer-link font-label-md text-[13px]" href="${base}berita.html">Berita & Artikel</a>
                    <a class="footer-link font-label-md text-[13px]" href="${base}tentangkami.html">Tentang Kami</a>
                </nav>
            </div>

            <!-- Column 3: Jam & Kontak (span 3) -->
            <div class="lg:col-span-3 flex flex-col gap-4">
                <h5 class="text-white font-bold text-[13px] tracking-wider uppercase" style="letter-spacing:0.1em;">Kontak & Jam</h5>
                <div class="flex flex-col gap-3">
                    <div class="contact-row">
                        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">call</span>
                        <div class="flex flex-col gap-0.5">
                            <a href="tel:02143938478" class="footer-link text-[13px]">(021) 4393 8478</a>
                            <a href="tel:02143930530" class="footer-link text-[13px]">IGD: (021) 4393 0530</a>
                        </div>
                    </div>
                    <div class="contact-row">
                        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">mail</span>
                        <a href="mailto:rsudtugukoja@jakarta.go.id" class="footer-link text-[13px]">rsudtugukoja@jakarta.go.id</a>
                    </div>
                </div>
                <!-- Jam Operasional -->
                <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:10px 12px;margin-top:2px;">
                    <div class="schedule-item">
                        <span>IGD & Rawat Inap</span>
                        <span class="schedule-time">24 Jam</span>
                    </div>
                    <div class="schedule-item">
                        <span>Poliklinik</span>
                        <span class="schedule-time">Sen–Jum, 07.30–16.00</span>
                    </div>
                </div>
            </div>

            <!-- Column 4: Lokasi + Map (span 3) -->
            <div class="lg:col-span-3 flex flex-col gap-4">
                <h5 class="text-white font-bold text-[13px] tracking-wider uppercase" style="letter-spacing:0.1em;">Lokasi</h5>
                <div class="contact-row">
                    <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">location_on</span>
                    <p class="text-[13px] leading-snug" style="color:rgba(255,255,255,0.6);">
                        Jl. Walang Permai No.39,<br>Tugu Utara, Koja,<br>Jakarta Utara 14260
                    </p>
                </div>
                <div class="footer-map-wrap">
                    <iframe
                        src="google.com/maps/place/RSUD+Tugu+Koja/@-6.127324,106.9044779,17z/data=!4m14!1m7!3m6!1s0x2e6a1ff9504cd945:0xcd7356564c9971b1!2sRSUD+Tugu+Koja!8m2!3d-6.127324!4d106.9070528!16s%2Fg%2F1tgv9fms!3m5!1s0x2e6a1ff9504cd945:0xcd7356564c9971b1!8m2!3d-6.127324!4d106.9070528!16s%2Fg%2F1tgv9fms?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUyNS4wIKXMDSoASAFQAw%3D%3D"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Lokasi RSUD Tugu Koja di Google Maps"
                    ></iframe>
                </div>
            </div>

        </div>
    </div>

    <!-- Bottom bar -->
    <div style="border-top:1px solid rgba(255,255,255,0.08);">
        <div class="max-w-container-max mx-auto px-gutter py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p class="text-[12px]" style="color:rgba(255,255,255,0.35);">
                &copy; ${currentYear} RSUD Tugu Koja &mdash; Pemerintah Provinsi DKI Jakarta
            </p>
            <div class="flex items-center gap-5">
                <a href="${base}standar%20pelayanan.html" class="footer-meta-link">Standar Pelayanan</a>
                <a href="https://rsudtugukoja.jakarta.go.id/ppid/public/page/beranda" target="_blank" rel="noopener noreferrer" class="footer-meta-link">PPID</a>
                <a href="https://rsudtugukoja.jakarta.go.id/pengaduan" target="_blank" rel="noopener noreferrer" class="footer-meta-link">Pengaduan</a>
            </div>
        </div>
    </div>

</footer>

<!-- Back to Top button -->
<button id="back-to-top" aria-label="Kembali ke atas" title="Kembali ke atas">
    <span class="material-symbols-outlined text-[22px]">keyboard_arrow_up</span>
</button>`;

    function inject() {
        const placeholder = document.getElementById('footer-container');
        if (placeholder) placeholder.outerHTML = html;
        bootBackToTop();
    }

    function bootBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        // Smooth scroll to top
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }

})();