(function () {
    const src = document.currentScript ? document.currentScript.getAttribute('src') : '';
    const depth = (src.match(/\.\.\//g) || []).length;
    const base = '../'.repeat(depth);
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    function cls(names) {
        const arr = Array.isArray(names) ? names : [names];
        const active = arr.some(n => page === n || (n === 'index' && page === ''));
        return active
            ? 'font-label-lg text-label-lg text-jakarta-blue border-b-2 border-jakarta-blue pb-1'
            : 'font-label-lg text-label-lg text-on-surface-variant hover:text-jakarta-blue transition-colors';
    }

    const layananPages = ['layanan', 'poliklinik', 'igd', 'rawat-inap', 'laboratorium', 'peta'];

    const html = `
    <div class="w-full bg-emergency-red text-white py-2 flex justify-center items-center gap-4" style="padding-left:24px;padding-right:24px;position:relative;z-index:60;">
        <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 1;">emergency_home</span>
        <span style="font-size:14px;font-weight:600;">Emergency: 112</span>
        <div style="height:16px;width:1px;background:rgba(255,255,255,0.3);" class="hidden md:block"></div>
        <span style="font-size:14px;font-weight:600;" class="hidden md:block">IGD 24 Jam: (021) 4393 0530</span>
    </div>
    <header class="w-full bg-surface-container-lowest border-b border-surface-subtle shadow-sm" style="position:sticky;top:0;z-index:50;">
        <div class="w-full mx-auto flex items-center justify-between" style="max-width:1280px;padding:16px 24px;">
            <a href="${base}index.html" class="font-headline-md text-headline-md text-jakarta-blue font-bold hover:opacity-80 transition-opacity" style="text-decoration:none;">RSUD Tugu Koja</a>
            <nav class="hidden md:flex items-center" style="gap:32px;">
                <a class="${cls('index')}" href="${base}index.html" style="text-decoration:none;">Beranda</a>
                <a class="${cls('caridokter')}" href="${base}caridokter.html" style="text-decoration:none;">Cari Dokter</a>
                <a class="${cls(layananPages)}" href="${base}layanan.html" style="text-decoration:none;">Layanan</a>
                <a class="${cls('berita')}" href="${base}berita.html" style="text-decoration:none;">Berita</a>
                <a class="${cls('tentangkami')}" href="${base}tentangkami.html" style="text-decoration:none;">Tentang Kami</a>
            </nav>
            <button class="md:hidden" onclick="document.getElementById('mobile-nav').classList.toggle('hidden')">
                <span class="material-symbols-outlined" style="color:#224266;">menu</span>
            </button>
        </div>
        <div id="mobile-nav" class="hidden md:hidden border-t border-surface-subtle flex flex-col" style="padding:16px 24px;gap:16px;background:#fff;">
            <a class="${cls('index')}" href="${base}index.html" style="text-decoration:none;">Beranda</a>
            <a class="${cls('caridokter')}" href="${base}caridokter.html" style="text-decoration:none;">Cari Dokter</a>
            <a class="${cls(layananPages)}" href="${base}layanan.html" style="text-decoration:none;">Layanan</a>
            <a class="${cls('berita')}" href="${base}berita.html" style="text-decoration:none;">Berita</a>
            <a class="${cls('tentangkami')}" href="${base}tentangkami.html" style="text-decoration:none;">Tentang Kami</a>
        </div>
    </header>`;

    function inject() {
        const el = document.getElementById('navbar-container');
        if (el) el.outerHTML = html;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else { inject(); }
})();