(function () {
    const src = document.currentScript ? document.currentScript.getAttribute('src') : '';
    const depth = (src.match(/\.\.\//g) || []).length;
    const base = '../'.repeat(depth);

    const html = `
    <footer class="w-full bg-jakarta-blue text-white" style="padding:48px 24px 0;">
        <div class="mx-auto grid grid-cols-1 gap-8" style="max-width:1280px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">
            <div style="display:flex;flex-direction:column;gap:16px;">
                <a href="${base}index.html" style="font-size:22px;font-weight:700;color:#fff;text-decoration:none;">RSUD Tugu Koja</a>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;">Rumah Sehat untuk Jakarta.<br>Melayani dengan hati, profesional, dan inovatif.</p>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
                <h5 style="font-weight:700;color:#fff;margin-bottom:4px;">Navigasi</h5>
                <a href="${base}index.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Beranda</a>
                <a href="${base}caridokter.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Cari Dokter</a>
                <a href="${base}layanan.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Layanan</a>
                <a href="${base}berita.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Berita</a>
                <a href="${base}tentangkami.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Tentang Kami</a>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
                <h5 style="font-weight:700;color:#fff;margin-bottom:4px;">Layanan</h5>
                <a href="${base}layanan/igd.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">IGD 24 Jam</a>
                <a href="${base}layanan/poliklinik.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Poliklinik</a>
                <a href="${base}layanan/rawat-inap.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Rawat Inap</a>
                <a href="${base}layanan/laboratorium.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Laboratorium</a>
                <a href="${base}layanan/peta.html" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:15px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Peta RS</a>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
                <h5 style="font-weight:700;color:#fff;margin-bottom:4px;">Kontak</h5>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;">Jl. Walang Permai No.39,<br>Tugu Utara, Koja, Jakarta Utara 14260</p>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;">Telp: (021) 4393 8478</p>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;">IGD: (021) 4393 0530</p>
                <p style="color:rgba(255,255,255,0.8);font-size:15px;">rsudtugukoja@jakarta.go.id</p>
            </div>
        </div>
        <div style="max-width:1280px;margin:32px auto 0;padding:24px;border-top:1px solid rgba(255,255,255,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <p style="color:rgba(255,255,255,0.6);font-size:14px;">© 2024 RSUD Tugu Koja — Rumah Sehat untuk Jakarta</p>
            <div style="display:flex;gap:24px;">
                <a href="#" style="color:rgba(255,255,255,0.6);font-size:14px;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Aksesibilitas</a>
                <a href="#" style="color:rgba(255,255,255,0.6);font-size:14px;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">PPID</a>
                <a href="#" style="color:rgba(255,255,255,0.6);font-size:14px;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Kebijakan Privasi</a>
            </div>
        </div>
    </footer>`;

    function inject() {
        const el = document.getElementById('footer-container');
        if (el) el.outerHTML = html;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else { inject(); }
})();