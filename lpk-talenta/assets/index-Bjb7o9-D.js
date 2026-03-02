(function () { const e = document.createElement("link").relList; if (e && e.supports && e.supports("modulepreload")) return; for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s); new MutationObserver(s => { for (const r of s) if (r.type === "childList") for (const t of r.addedNodes) t.tagName === "LINK" && t.rel === "modulepreload" && n(t) }).observe(document, { childList: !0, subtree: !0 }); function i(s) { const r = {}; return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r } function n(s) { if (s.ep) return; s.ep = !0; const r = i(s); fetch(s.href, r) } })(); function l() {
    const a = document.getElementById("navbar-container"); a.innerHTML = `
        <div class="nav-wrapper glass">
            <nav class="navbar">
                <a href="#" class="logo">
                    <img src="https://talentaacademy.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-02-at-09.53.42.jpeg" alt="Talenta Academy Logo">
                    TALENTA<span>ACADEMY</span>
                </a>
                <ul class="nav-links">
                    <li class="nav-item"><a href="#hero-section">Beranda</a></li>
                    <li class="nav-item has-mega">
                        <a href="#programs-section">Program</a>
                        <div class="vertical-menu glass">
                            <div class="menu-header">EXPLORE PROGRAMS</div>
                            <div class="menu-items">
                                <a href="#" class="menu-item it">
                                    <div class="item-icon">💻</div>
                                    <div class="item-info">
                                        <div class="item-title">Teknologi & IT</div>
                                        <div class="item-desc">Kuasai skill teknologi terbaru</div>
                                    </div>
                                    <div class="item-arrow">→</div>
                                </a>
                                <a href="#" class="menu-item business">
                                    <div class="item-icon">📊</div>
                                    <div class="item-info">
                                        <div class="item-title">Bisnis</div>
                                        <div class="item-desc">Strategi & manajemen modern</div>
                                    </div>
                                    <div class="item-arrow">→</div>
                                </a>
                                <a href="#" class="menu-item creative">
                                    <div class="item-icon">🎨</div>
                                    <div class="item-info">
                                        <div class="item-title">Kreatif</div>
                                        <div class="item-desc">Desain & komunikasi visual</div>
                                    </div>
                                    <div class="item-arrow">→</div>
                                </a>
                                <a href="#" class="menu-item skills">
                                    <div class="item-icon">💡</div>
                                    <div class="item-info">
                                        <div class="item-title">Soft skills</div>
                                        <div class="item-desc">Pengembangan diri & karakter</div>
                                    </div>
                                    <div class="item-arrow">→</div>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item"><a href="#about-section">Tentang Kami</a></li>
                    <li class="nav-item"><a href="#testimonial-section">Testimoni</a></li>
                    <li><a href="#cta-section" class="btn btn-primary">Daftar Sekarang</a></li>
                </ul>
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    `} function d() {
    const a = document.getElementById("hero-section"), e = "https://www.smadwiwarna.sch.id/wp-content/uploads/2023/02/model-pembelajaran-interaktif-768x509.jpg"; a.innerHTML = `
        <div class="hero">
            <div class="container hero-container">
                <div class="hero-content reveal">
                    <span class="section-subtitle">Akselerasi Karir Anda</span>
                    <h1 class="hero-title">Bangun Masa Depan Gemilang bersama <br><span>Talenta Academy</span></h1>
                    <p class="hero-description">Tingkatkan skill profesional Anda dengan program bersertifikasi yang disusun langsung oleh praktisi industri. Bergabunglah dengan puluhan ribu profesional yang telah sukses bertransformasi.</p>
                    <div class="hero-btns">
                        <a href="#programs-section" class="btn btn-primary">Jelajahi Program</a>
                        <a href="#about-section" class="btn btn-outline">Pelajari Lebih Lanjut</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-num">15rb+</span>
                            <span class="stat-label">Lulusan Sukses</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-num">4.9/5</span>
                            <span class="stat-label">Rating Kepuasan</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-num">50+</span>
                            <span class="stat-label">Program Pilihan</span>
                        </div>
                    </div>
                </div>
                <div class="hero-visual reveal">
                    <div class="visual-card glass">
                        <div class="card-dots"><span></span><span></span><span></span></div>
                        <div class="card-image-container">
                            <img src="${e}" alt="Talenta Academy Platform" class="visual-image" loading="lazy">
                        </div>
                    </div>
                    <div class="floating-badge badge-1 glass">Instruktur Praktisi Ahli</div>
                    <div class="floating-badge badge-2 glass">Kurikulum Siap Kerja</div>
                </div>
            </div>
        </div>
    `} function c() {
    const a = document.getElementById("about-section"); a.innerHTML = `
        <div class="about">
            <div class="container">
                <div class="about-grid">
                    <div class="about-image reveal">
                        <div class="image-wrapper">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Students learning" loading="lazy">
                            <div class="exp-badge glass">
                                <strong>10+</strong>
                                <span>Tahun Pengalaman</span>
                            </div>
                        </div>
                    </div>
                    <div class="about-content reveal">
                        <span class="section-subtitle">Mengapa Memilih Kami</span>
                        <h2 class="section-title">Standar Keunggulan Pelatihan Profesional</h2>
                        <p class="about-text">Talenta Academy hadir untuk menjembatani kesenjangan antara dunia pendidikan dan kebutuhan industri sejati. Kurikulum adaptif kami dirancang khusus oleh pakar lapangan untuk memastikan setiap lulusan memiliki daya saing tinggi.</p>
                        <ul class="benefit-list">
                            <li><strong>Mentorship Eksklusif:</strong> Belajar langsung dari praktisi top yang membagikan wawasan dunia nyata.</li>
                            <li><strong>Kurikulum Relevan:</strong> Materi selalu diperbarui mengikuti tren teknologi dan bisnis global terkini.</li>
                            <li><strong>Dukungan Karir Aktif:</strong> Sesi bimbingan karir, review CV, hingga koneksi ke hiring partners.</li>
                            <li><strong>Studi Kasus Nyata:</strong> Pendekatan pembelajaran berbasis proyek nyata (Project-Based Learning).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `} const o = "/lpk-talenta/assets/administrasi-keuangan-Bb6M6vcd.png", m = "/lpk-talenta/assets/administrasi-perkantoran-VxDrxFso.png", p = "/lpk-talenta/assets/aplikasi-perkantoran-BYg1AkYF.png", v = "/lpk-talenta/assets/pelayanan-pelanggan-BW9NpFJ3.png", u = "/lpk-talenta/assets/service-excellence-pelayanan-prima-CJxyxn-S.png", g = "/lpk-talenta/assets/sumber-daya-manusia-sdm-Bed68WHa.png", h = "/lpk-talenta/assets/training-of-trainer-C1SoSZGd.png"; function k() {
    const a = document.getElementById("programs-section"); a.innerHTML = `
        <div class="programs">
            <div class="container">
                <span class="section-subtitle">Keunggulan Kami</span>
                <h2 class="section-title">Program Pelatihan & Sertifikasi</h2>
                <div class="program-grid">
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${o}" alt="Administrasi Keuangan" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Administrasi Keuangan</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${m}" alt="Administrasi Perkantoran" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Administrasi Perkantoran</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${p}" alt="Aplikasi Perkantoran" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Aplikasi Perkantoran</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${v}" alt="Pelayanan Pelanggan" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Pelayanan Pelanggan</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${u}" alt="Service Excellence" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Service Excellence</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${g}" alt="Sumber Daya Manusia" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Sumber Daya Manusia</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                    <div class="program-card reveal">
                        <div class="card-image">
                            <img src="${h}" alt="Training of Trainer" loading="lazy">
                        </div>
                        <div class="card-body">
                            <h3>Training of Trainer</h3>
                            <a href="#" class="card-link">Lihat Silabus <span>&rarr;</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `} function f() {
    const a = document.getElementById("testimonial-section"), i = [{ initials: "AP", name: "Aditya Pratama", role: "Software Engineer di Bank Swasta", quote: "Talenta Academy sangat tepat sasaran. Mentor membantu merapikan alur pikir coding saya sehingga lebih terstruktur untuk level enterprise." }, { initials: "SN", name: "Siti Nurbaya", role: "UI/UX Designer di Startup", quote: "Proyek desain akhirnya langsung saya gunakan untuk portofolio, dan dari sanalah saya dipanggil interview hingga diterima bekerja." }, { initials: "BP", name: "Budi Pratama", role: "Fullstack Developer di TechIndo", quote: "Belajar di sini bukan cuma soal teori, tapi benar-benar praktek studi kasus nyata. Saya sekarang jauh lebih percaya diri saat interview technical." }, { initials: "DN", name: "Dewi Novita", role: "Data Analyst di FinTech", quote: "Jejaring (networking) alumni dari Talenta sangat luas dan aktif. Saya sering mendapat insight baru dari para senior di grup komunitas." }, { initials: "RS", name: "Rizky Syahputra", role: "Mobile Developer di Software House", quote: "Kurikulumnya update mengikuti standar industri terbaru. Pendekatan problem solving-nya sangat terasa manfaatnya ketika terjun di project asli." }, { initials: "AL", name: "Amanda Lestari", role: "Product Manager", quote: "Sesi bimbingan karir dan tips menghadapi HRD benar-benar menjadi kunci keberhasilan saya menembus pekerjaan kurang dari satu bulan." }].map(n => `
        <div class="testimonial-browser-card">
            <div class="browser-header">
                <div class="browser-dots"><span></span><span></span><span></span></div>
                <div class="browser-address">Lulusan / ${n.name}</div>
            </div>
            <div class="browser-content">
                <div class="stars">★★★★★</div>
                <p class="quote">"${n.quote}"</p>
                <div class="user-info">
                    <div class="user-avatar">${n.initials}</div>
                    <div>
                        <h4>${n.name}</h4>
                        <span>${n.role}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join(""); a.innerHTML = `
        <div class="testimonials-infinite-wrapper">
            <div class="container testimonial-header-container">
                <span class="section-subtitle">Kisah Sukses</span>
                <h2 class="section-title">Apa Kata Lulusan Kami</h2>
            </div>
            
            <div class="testimonial-slider-container">
                <div class="testimonial-slider-track">
                    ${i}
                    ${i} <!-- Duplicate for seamless loop -->
                </div>
            </div>
        </div>
    `} function b() {
    const a = document.getElementById("cta-section"); a.innerHTML = `
        <div class="why-us-section">
            <div class="container">
                <div class="section-header-blue reveal">
                    <h2 class="section-title white">Kenapa Harus Talenta Academy?</h2>
                </div>
                
                <div class="why-us-grid">
                    <div class="why-card reveal">
                        <div class="why-icon">🎯</div>
                        <p>Materi dan proses pembelajaran adalah <strong>Tailor Made</strong>, didesign sesuai dan mengikuti analisa kebutuhan untuk solusi masalah dari klien/peserta.</p>
                    </div>
                    <div class="why-card reveal">
                        <div class="why-icon">📈</div>
                        <p>Materi memberikan <strong>Impact dan Insight</strong> yang dirasakan mampu mendorong peserta untuk mempraktikkan pembelajaran setiap waktu.</p>
                    </div>
                    <div class="why-card reveal">
                        <div class="why-icon">💡</div>
                        <p>Materi dan cara penyampaian mampu menggugah dan mendorong peserta untuk mempraktikkan dan mengeksplorasi <strong>kreatifitas</strong>.</p>
                    </div>
                    <div class="why-card reveal">
                        <div class="why-icon">🤝</div>
                        <p>Materi dan proses pembelajaran melibatkan <strong>interaksi peserta</strong> untuk aktif dan proaktif selama pembelajaran.</p>
                    </div>
                    <div class="why-card reveal">
                        <div class="why-icon">🧠</div>
                        <p>Materi dan proses pembelajaran berasal dari <strong>keilmuan yang dipadukan dengan pengalaman</strong> dan contoh nyata bagi klien/peserta.</p>
                    </div>
                    <div class="why-card reveal">
                        <div class="why-icon">🌟</div>
                        <p>Materi dan proses pembelajaran disampaikan secara <strong>ringan, menghibur dan menyenangkan</strong> sehingga efektif memberikan pengalaman belajar terbaik.</p>
                    </div>
                </div>
            </div>
        </div>
    `} function y() {
    const a = document.getElementById("footer-section"); a.innerHTML = `
        <div class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="#" class="logo">TALENTA<span>ACADEMY</span></a>
                        <p>Memberikan pendidikan sertifikasi dan vokasi premium untuk mencetak ahli profesional di era digital secara berkelanjutan.</p>
                        <div class="footer-logo-watermark">
                            <img src="https://talentaacademy.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-02-at-09.53.42.jpeg" alt="Talenta Academy Watermark" loading="lazy">
                        </div>
                        <div class="social-icons">
                            <!-- Facebook -->
                            <a href="#">
                                <svg viewBox="0 0 24 24">
                                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1v-2.9h2.1V9.6c0-2.1 1.2-3.3 3.1-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12"/>
                                </svg>
                            </a>

                            <!-- Instagram -->
                            <a href="#">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5m5.5-.8a1.1 1.1 0 1 0-1.1-1.1 1.1 1.1 0 0 0 1.1 1.1"/>
                                </svg>
                            </a>

                            <!-- LinkedIn -->
                            <a href="#">
                                <svg viewBox="0 0 24 24">
                                    <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.5 2.5 2.5 0 0 0 5 3.5zM3 9h4v12H3zm7 0h3.8v1.7h.1a4.17 4.17 0 0 1 3.7-2c4 0 4.7 2.6 4.7 6v6.3h-4V15c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v6H10z"/>
                                </svg>
                            </a>

                            <!-- Twitter -->
                            <a href="#">
                                <svg viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.9-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 9a12.15 12.15 0 0 1-8.8-4.46 4.27 4.27 0 0 0 1.33 5.7A4.2 4.2 0 0 1 2 9.7v.05a4.28 4.28 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 3A8.6 8.6 0 0 1 2 18.58 12.13 12.13 0 0 0 8.29 20c7.55 0 11.68-6.25 11.68-11.67v-.53A8.18 8.18 0 0 0 22.46 6z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="footer-links">
                        <h4>Program</h4>
                        <ul>
                            <li><a href="#">Pengembangan Web</a></li>
                            <li><a href="#">Sains Data</a></li>
                            <li><a href="#">Desain UI/UX</a></li>
                            <li><a href="#">Pemasaran Digital</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Perusahaan</h4>
                        <ul>
                            <li><a href="#">Tentang Kami</a></li>
                            <li><a href="#">Karir</a></li>
                            <li><a href="#">Mitra</a></li>
                            <li><a href="#">Kontak</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Dukungan</h4>
                        <ul>
                            <li><a href="#">Pusat Bantuan</a></li>
                            <li><a href="#">Kebijakan Privasi</a></li>
                            <li><a href="#">Syarat Ketentuan</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 Talenta Academy. Hak cipta dilindungi undang-undang.</p>
                    <p class="footer-credit">powered by <span>Spinotek</span></p>
                </div>
            </div>
        </div>
    `} function A() {
    const a = document.getElementById("talenta-program-section"), e = document.getElementById("academy-services-section"), i = { personality: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80", secretary: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80", pemasaran: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", penjualan: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80", reguler: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", public: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80", inhouse: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" }; a && (a.innerHTML = `
            <div class="special-section programs-accent">
                <div class="container">
                    <span class="section-subtitle">Talenta Program</span>
                    <h2 class="section-title">Program Unggulan Kami</h2>
                    
                    <div class="premium-grid">
                        <div class="premium-card reveal">
                            <div class="premium-img">
                                <img src="${i.personality}" alt="Personality Development" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Personality Development</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Program ini disusun agar peserta dapat memahami dirinya, mengembangkan potensi internal & eksternal, menetapkan tujuan hidup, serta menumbuhkan rasa percaya diri.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>

                        <div class="premium-card reveal">
                            <div class="premium-img">
                                <img src="${i.secretary}" alt="Professional Secretary" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Professional Secretary</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Meningkatkan wawasan, pengetahuan, dan keterampilan sekretaris agar tetap relevan dengan kebutuhan pasar global dan perkembangan dunia usaha.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>

                        <div class="premium-card reveal">
                            <div class="premium-img">
                                <img src="${i.pemasaran}" alt="Manajemen Pemasaran" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Manajemen Pemasaran</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Menghasilkan tenaga perencana pemasaran profesional yang memahami falsafah manajemen, sistem pemasaran, dan rencana strategis perusahaan.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>

                        <div class="premium-card reveal">
                            <div class="premium-img">
                                <img src="${i.penjualan}" alt="Manajemen Unit Penjualan" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Manajemen Unit Penjualan</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Mengelola unit penjualan secara profesional: menyusun strategi, target, perencanaan kerja, seleksi tenaga kerja, hingga penugasan yang efektif.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>
                    </div>

                    <div class="program-summary reveal">
                        <p>Kami memiliki 16 program berupa pelatihan dan pengembangan sumber daya manusia, bagi individu, profesional, institusi bisnis, korporasi dan lembaga publik. Segera pilih programmu sekarang !</p>
                        <div class="center-btn">
                            <a href="#" class="btn btn-primary">Lihat Seluruh Program</a>
                        </div>
                    </div>
                </div>
            </div>
        `), e && (e.innerHTML = `
            <div class="special-section services-bg">
                <div class="container">
                    <span class="section-subtitle">Layanan Kami</span>
                    <h2 class="section-title">Layanan Talenta Academy</h2>
                    
                    <div class="premium-grid three-cols">
                        <div class="premium-card small reveal">
                            <div class="premium-img">
                                <img src="${i.reguler}" alt="Reguler Class" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Reguler Class</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Bahasa, Komputer, Administrasi, Komunikasi, Akutansi, Desain.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>

                        <div class="premium-card small reveal">
                            <div class="premium-img">
                                <img src="${i.public}" alt="Public Training" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>Public Training</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Public Speaking, Team Building, Management, Human Resource, etc.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>

                        <div class="premium-card small reveal">
                            <div class="premium-img">
                                <img src="${i.inhouse}" alt="In House Training" loading="lazy">
                            </div>
                            <div class="premium-info">
                                <h3>In House Training</h3>
                                <p class="description-tag">Deskripsi</p>
                                <p class="detail-text">Kursus yang dirancang khusus (Tailor made) berdasarkan kebutuhan spesifik perusahaan.</p>
                                <a href="#" class="detail-link">LIHAT DETAIL <span>&rarr;</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
} document.addEventListener("DOMContentLoaded", () => { l(), d(), c(), k(), A(), f(), b(), y(); const t = document.querySelector(".menu-toggle"), n = document.querySelector(".nav-links"); t && n && t.addEventListener("click", () => { t.classList.toggle("active"), n.classList.toggle("active") }), document.querySelectorAll('.nav-links a[href^="#"]').forEach(e => { e.addEventListener("click", () => { t.classList.remove("active"), n.classList.remove("active") }) }); const a = { threshold: .05, rootMargin: "0px 0px -50px 0px" }, e = new IntersectionObserver(i => { i.forEach(s => { s.isIntersecting && (s.target.classList.add("reveal-active"), e.unobserve(s.target)) }) }, a); document.querySelectorAll(".reveal").forEach(i => e.observe(i)) });
