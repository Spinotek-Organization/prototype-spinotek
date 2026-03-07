window.app = {
    // === State ===
    isLoggedIn: false,
    currentUser: null,
    lastSearchContext: 'pub',
    lastRoute: { origin: 'SUB', dest: 'BDJ' },
    scheduleResults: [],

    // Slider State
    currentSlide: 0,
    slideInterval: null,

    // Dummy Data
    dummyUser: {
        email: 'test@dlu.co.id',
        password: 'password123',
        name: 'Budi Santoso'
    },

    // === Slider Implementations ===
    initSlider() {
        this.startSlideInterval();
    },

    setSlide(index) {
        const images = document.querySelectorAll('.slider-img');
        const dots = document.querySelectorAll('.slider-dot');

        if (images.length === 0) return;

        images.forEach((img, i) => {
            if (i === index) {
                img.classList.remove('opacity-0', 'z-0');
                img.classList.add('opacity-100', 'z-10');
            } else {
                img.classList.remove('opacity-100', 'z-10');
                img.classList.add('opacity-0', 'z-0');
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-white/50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.remove('bg-white');
                dot.classList.add('bg-white/50');
            }
        });

        this.currentSlide = index;
        this.startSlideInterval(); // Reset interval on manual click
    },

    nextSlide() {
        const images = document.querySelectorAll('.slider-img');
        if (images.length === 0) return;
        const nextIndex = (this.currentSlide + 1) % images.length;
        this.setSlide(nextIndex);
    },

    startSlideInterval() {
        if (this.slideInterval) clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    // === Navigation Flow ===
    navigate(pageId) {
        // Hide all pages
        document.querySelectorAll('.page-section').forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden'); // Also explicitly hide
        });

        // Show target page
        if (pageId === 'home') {
            if (this.isLoggedIn) {
                document.getElementById('page-dashboard-user').classList.remove('hidden');
                document.getElementById('page-dashboard-user').classList.add('active');
            } else {
                document.getElementById('page-booking').classList.remove('hidden');
                document.getElementById('page-booking').classList.add('active');
                this.setBookingStep(1); // Reset to step 1 for logged-out
            }
        } else {
            const targetEl = document.getElementById('page-' + pageId);
            if (targetEl) {
                targetEl.classList.remove('hidden');
                targetEl.classList.add('active');
            }
        }
        window.scrollTo(0, 0);
        // Always close inline results when navigating away
        this.closeInlineResults();
    },

    switchDashboardTab(event, tabId) {
        if (event) event.preventDefault();

        // 1. Hide all dashboard tabs
        document.querySelectorAll('.dashboard-tab').forEach(el => {
            el.classList.remove('block');
            el.classList.add('hidden');
        });

        // 2. Remove active styling from all sidebar links
        const navIds = ['nav-tab-profile', 'nav-tab-search', 'nav-tab-orders'];
        navIds.forEach(id => {
            const navEl = document.getElementById(id);
            if (navEl) {
                // reset to inactive style
                navEl.className = "flex justify-between items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-dlu-blue rounded-lg transition group";
                // ensure icon has default gray instead of inheriting white
                const icon = navEl.querySelector('i');
                if (icon) {
                    if (!icon.className.includes('text-gray-400')) {
                        icon.className += ' text-gray-400 group-hover:text-dlu-blue';
                    }
                }
            }
        });

        // 3. Show the targeted tab
        const targetTab = document.getElementById('dashboard-tab-' + tabId);
        if (targetTab) {
            targetTab.classList.remove('hidden');
            targetTab.classList.add('block');
        }

        // 4. Add active styling to the clicked sidebar link
        const activeNav = document.getElementById('nav-tab-' + tabId);
        if (activeNav) {
            activeNav.className = "flex justify-between items-center px-4 py-3 bg-dlu-blue text-white rounded-lg shadow-sm transition";
            const icon = activeNav.querySelector('i');
            if (icon) {
                icon.className = icon.className.replace('text-gray-400', '').replace('group-hover:text-dlu-blue', '').trim();
            }
        }
    },

    // === Progress Bar / Booking Steps ===
    setBookingStep(stepNumber) {
        // Hide all booking steps
        document.querySelectorAll('.booking-step').forEach(el => {
            el.classList.add('hidden');
        });

        // Add special routing for step 1 when logged in
        if (stepNumber === 1) {
            if (this.isLoggedIn) {
                this.navigate('home'); // The home router handles logged in vs out
                // Ensure the search tab is active
                this.switchDashboardTab(null, 'search');
                return; // skip the manual step-1 un-hide below because navigate/dashboard handles it
            }
        }

        // Show target step
        const targetStepId = ['step-1-cari', 'step-2-pilih', 'step-3-isidata', 'step-4-bayar'][stepNumber - 1];
        document.getElementById(targetStepId).classList.remove('hidden');
        if (stepNumber === 2) {
            this.syncPilihClassOptions(this.lastSearchContext);
        }

        // Toggle Progress Bar Visibility
        const progressBar = document.getElementById('booking-progress-bar');
        if (progressBar) {
            if (stepNumber === 1) {
                progressBar.classList.add('hidden');
            } else {
                progressBar.classList.remove('hidden');
            }
        }

        // Update progress bar UI
        for (let i = 1; i <= 4; i++) {
            const indicator = document.getElementById('stepIndicator' + i);
            indicator.classList.remove('active', 'completed');

            if (i < stepNumber) {
                indicator.classList.add('completed');
                indicator.querySelector('p').classList.remove('text-gray-400');
            } else if (i === stepNumber) {
                indicator.classList.add('active');
                indicator.querySelector('p').classList.remove('text-gray-400');
            } else {
                indicator.querySelector('p').classList.add('text-gray-400');
            }
        }
        window.scrollTo(0, 0);
    },

    searchSchedule() {
        // If user is already logged in, go to the full booking flow as before
        if (this.isLoggedIn) {
            const btn = document.querySelector('[onclick="app.searchSchedule()"]');
            if (!btn) return;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mencari...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                this.lastSearchContext = 'pub';
                const originText = document.getElementById('search-origin')?.value || '';
                const destText = document.getElementById('search-dest')?.value || '';
                this.lastRoute = {
                    origin: this.toRouteCode(originText, 'SUB'),
                    dest: this.toRouteCode(destText, 'BDJ')
                };
                this.syncPilihClassOptions('pub');
                this.setBookingStep(2);
            }, 800);
            return;
        }

        // === PUBLIC / NOT LOGGED IN: show inline results ===
        const originEl = document.getElementById('search-origin');
        const destEl = document.getElementById('search-dest');
        const origin = originEl ? originEl.value.trim() : '';
        const dest = destEl ? destEl.value.trim() : '';

        if (!origin || !dest) {
            Swal.fire({ icon: 'warning', title: 'Lengkapi Data', text: 'Silakan pilih pelabuhan asal dan tujuan terlebih dahulu.', confirmButtonColor: '#003d7a' });
            return;
        }

        const btn = document.querySelector('[onclick="app.searchSchedule()"]');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mencari...'; btn.disabled = true; }

        setTimeout(() => {
            if (btn) { btn.innerHTML = originalText; btn.disabled = false; }

            // Mock schedule data
            const schedules = [
                { ship: 'KM. Dharma Kencana II', depart: '20:30 WIB', arrive: '18:30 WITA', departDate: 'Jum, 21 Mar 2026', arriveDate: 'Sab, 22 Mar 2026', duration: '±22 jam', economyPrice: 'Rp 490.000', vipPrice: 'Rp 1.200.000', seats: 120 },
                { ship: 'KM. Dharma Rucitra 1', depart: '09:00 WIB', arrive: '08:00 WITA', departDate: 'Sab, 22 Mar 2026', arriveDate: 'Min, 23 Mar 2026', duration: '±23 jam', economyPrice: 'Rp 480.000', vipPrice: 'Rp 1.150.000', seats: 34 },
                { ship: 'KM. Dharma Kencana VIII', depart: '23:00 WIB', arrive: '20:00 WITA', departDate: 'Sab, 22 Mar 2026', arriveDate: 'Min, 23 Mar 2026', duration: '±22 jam', economyPrice: 'Rp 500.000', vipPrice: 'Rp 1.300.000', seats: 200 },
            ];

            const list = document.getElementById('inline-results-list');
            const section = document.getElementById('inline-results-section');
            const subtitle = document.getElementById('inline-results-subtitle');
            const cta = document.getElementById('inline-login-cta');

            if (!list || !section) return;

            subtitle.textContent = `${origin} → ${dest} • ${schedules.length} jadwal tersedia`;

            list.innerHTML = schedules.map((s, i) => `
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5 duration-200">
                    <div class="p-5">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <!-- Ship Info & Route -->
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="fa-solid fa-ship text-dlu-blue"></i>
                                    <span class="font-bold text-gray-800 text-base">${s.ship}</span>
                                    ${s.seats < 50 ? `<span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">Hampir Penuh</span>` : `<span class="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Tersedia</span>`}
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-gray-900">${s.depart}</div>
                                        <div class="text-xs text-gray-500">${s.departDate}</div>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <span class="text-[10px] text-gray-400 mb-1">${s.duration}</span>
                                        <div class="w-full flex items-center gap-1">
                                            <div class="h-0.5 flex-1 bg-gray-200"></div>
                                            <i class="fa-solid fa-ship text-dlu-blue text-xs"></i>
                                            <div class="h-0.5 flex-1 bg-gray-200"></div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-gray-900">${s.arrive}</div>
                                        <div class="text-xs text-gray-500">${s.arriveDate}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Price & CTA -->
                            <div class="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                <div>
                                    <div class="text-xs text-gray-400">Mulai dari</div>
                                    <div class="text-xl font-extrabold text-dlu-blue">${s.economyPrice}</div>
                                    <div class="text-xs text-gray-400">/ Dewasa</div>
                                </div>
                                <button onclick="app.promptLoginToBook()"
                                    class="bg-dlu-blue text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-800 transition shadow-sm text-sm flex items-center gap-2">
                                    Pesan <i class="fa-solid fa-arrow-right text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Class Prices Footer -->
                    <div class="bg-gray-50 px-5 py-2.5 flex gap-6 border-t border-gray-100 text-xs text-gray-500">
                        <span><i class="fa-solid fa-chair mr-1 text-gray-400"></i> Ekonomi: <b class="text-gray-700">${s.economyPrice}</b></span>
                        <span><i class="fa-solid fa-gem mr-1 text-yellow-500"></i> VIP: <b class="text-gray-700">${s.vipPrice}</b></span>
                        <span class="ml-auto"><i class="fa-solid fa-user mr-1 text-gray-400"></i> <b>${s.seats}</b> kursi</span>
                    </div>
                </div>
            `).join('');

            // Show the section
            section.classList.remove('hidden');
            cta.classList.remove('hidden');

            // Smooth scroll to results
            setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }, 900);
    },

    searchDashboardSchedule(e) {
        if (e) e.preventDefault();

        const originEl = document.getElementById('dash-origin');
        const destEl = document.getElementById('dash-dest');
        const origin = originEl ? originEl.value.trim() : '';
        const dest = destEl ? destEl.value.trim() : '';

        if (!origin || !dest) {
            Swal.fire({
                icon: 'warning',
                title: 'Lengkapi Data',
                text: 'Kota asal dan kota tujuan wajib diisi sebelum mencari jadwal.',
                confirmButtonColor: '#003d7a'
            });
            return;
        }

        this.lastSearchContext = 'dash';
        this.lastRoute = { origin, dest };
        this.syncPilihClassOptions('dash');
        this.navigate('booking');
        this.setBookingStep(2);
    },

    toRouteCode(text, fallback = '-') {
        if (!text) return fallback;
        const match = String(text).match(/\(([^)]+)\)/);
        if (match && match[1]) return match[1].trim().toUpperCase();
        const compact = String(text).replace(/[^a-zA-Z]/g, '').toUpperCase();
        return compact.slice(0, 3) || fallback;
    },

    buildMockSchedules() {
        const ships = [
            'KM. Dharma Rucitra 1',
            'KM. Dharma Kencana VII',
            'KM. Dharma Ferry V',
            'KM. Dharma Kencana II',
            'KM. Dharma Kartika IX',
            'KM. Dharma Lautan Utama'
        ];
        const departures = [
            ['Jumat, 20 Mar 2026', '20:30 WIB', 'Sabtu, 21 Mar 2026', '16:47 WITA'],
            ['Sabtu, 21 Mar 2026', '09:00 WIB', 'Minggu, 22 Mar 2026', '08:10 WITA'],
            ['Sabtu, 21 Mar 2026', '14:30 WIB', 'Minggu, 22 Mar 2026', '12:55 WITA'],
            ['Sabtu, 21 Mar 2026', '22:15 WIB', 'Minggu, 22 Mar 2026', '19:40 WITA'],
            ['Minggu, 22 Mar 2026', '07:45 WIB', 'Senin, 23 Mar 2026', '06:30 WITA'],
            ['Minggu, 22 Mar 2026', '19:20 WIB', 'Senin, 23 Mar 2026', '17:10 WITA']
        ];

        const results = [];
        for (let i = 0; i < 14; i++) {
            const ship = ships[i % ships.length];
            const dep = departures[i % departures.length];
            results.push({
                ship,
                departLabel: dep[0],
                departTime: dep[1],
                arriveLabel: dep[2],
                arriveTime: dep[3]
            });
        }
        return results;
    },

    renderScheduleResults(context = 'pub') {
        const listEl = document.getElementById('schedule-results-list');
        const countEl = document.getElementById('schedule-count');
        const originEl = document.getElementById('schedule-route-origin');
        const destEl = document.getElementById('schedule-route-dest');
        if (!listEl) return;

        if (!this.scheduleResults || this.scheduleResults.length === 0) {
            this.scheduleResults = this.buildMockSchedules();
        }

        if (countEl) countEl.textContent = String(this.scheduleResults.length);
        if (originEl) originEl.textContent = this.lastRoute?.origin || 'SUB';
        if (destEl) destEl.textContent = this.lastRoute?.dest || 'BDJ';

        const ticketTypes = this.getSelectedTicketTypes(context);
        const detailTitle = ticketTypes.pnp && ticketTypes.knd
            ? 'Pilih Kelas Penumpang & Kendaraan'
            : (ticketTypes.knd ? 'Pilih Kelas Kendaraan' : 'Pilih Kelas Penumpang');
        const golonganLabel = this.getSelectedVehicleGolonganLabel(context);

        listEl.innerHTML = this.scheduleResults.map((s, idx) => {
            const id = idx + 1;
            const isLast = idx === this.scheduleResults.length - 1;
            return `
                <div class="p-6 ${isLast ? '' : 'border-b'} hover:bg-gray-50 transition relative">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div class="mb-4 md:mb-0">
                            <h3 class="font-bold text-lg text-dlu-blue">${s.ship}</h3>
                            <div class="flex items-center text-sm text-gray-600 mt-2 space-x-6">
                                <div>
                                    <p class="font-medium">Berangkat</p>
                                    <p>${s.departLabel} - ${s.departTime}</p>
                                </div>
                                <div>
                                    <p class="font-medium">Tiba</p>
                                    <p>${s.arriveLabel} - ${s.arriveTime}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                class="bg-white border-2 border-dlu-blue text-dlu-blue font-semibold px-6 py-2 rounded-lg hover:bg-dlu-light transition"
                                onclick="app.toggleDetail('detail-${id}')">
                                Pilih Kelas <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div id="detail-${id}" class="hidden mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 id="detail-title-${id}" class="font-bold mb-4 text-gray-700">${detailTitle}</h4>

                        <div id="detail-pnp-${id}" class="${ticketTypes.pnp ? '' : 'hidden'}">
                            <div class="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p class="font-semibold">Kelas Ekonomi</p>
                                    <p class="text-sm text-gray-500">Rp 490.000 / Dewasa</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex items-center border rounded bg-white">
                                        <button class="px-3 py-1 hover:bg-gray-100 text-gray-600 border-r"
                                            onclick="app.updateQty('qty-eko-${id}', -1, ${id})">-</button>
                                        <input type="text" id="qty-eko-${id}"
                                            class="w-12 text-center text-sm focus:outline-none bg-transparent" value="0" readonly>
                                        <button class="px-3 py-1 hover:bg-gray-100 text-gray-600 border-l"
                                            onclick="app.updateQty('qty-eko-${id}', 1, ${id})">+</button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-between items-center py-3">
                                <div>
                                    <p class="font-semibold text-gray-500">Kelas VIP</p>
                                    <p class="text-sm text-gray-400">Rp 600.000 / Dewasa</p>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold border border-red-200">PENUH</span>
                                    <button class="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded font-semibold text-sm w-24" disabled>Tidak Tersedia</button>
                                </div>
                            </div>
                        </div>

                        <div id="detail-knd-${id}" class="${ticketTypes.knd ? '' : 'hidden'} mt-2 pt-2 border-t border-gray-200">
                            <p class="text-xs font-semibold text-dlu-blue mb-2.5">Pilihan Kendaraan</p>
                            <div class="flex justify-between items-center py-3">
                                <div>
                                    <p class="font-semibold">Kelas Kendaraan <span id="detail-knd-golongan-${id}" class="text-sm text-gray-500 font-normal">${golonganLabel}</span></p>
                                    <p class="text-sm text-gray-500">Rp 1.285.000 / Unit</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex items-center border rounded bg-white">
                                        <button class="px-3 py-1 hover:bg-gray-100 text-gray-600 border-r"
                                            onclick="app.updateQty('qty-knd-${id}', -1, ${id})">-</button>
                                        <input type="text" id="qty-knd-${id}"
                                            class="w-12 text-center text-sm focus:outline-none bg-transparent" value="0" readonly>
                                        <button class="px-3 py-1 hover:bg-gray-100 text-gray-600 border-l"
                                            onclick="app.updateQty('qty-knd-${id}', 1, ${id})">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between gap-3 flex-wrap">
                            <p id="detail-summary-${id}" class="text-sm text-gray-500">Belum ada tiket dipilih.</p>
                            <button id="detail-continue-${id}" class="px-5 py-2.5 rounded-lg font-semibold text-sm bg-gray-300 text-gray-500 cursor-not-allowed"
                                onclick="app.proceedFromClassSelection(${id})" disabled>
                                Lanjut Isi Data
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.scheduleResults.forEach((_, idx) => this.refreshClassSelectionCTA(idx + 1));
    },

    closeInlineResults() {
        const section = document.getElementById('inline-results-section');
        if (section) section.classList.add('hidden');
    },

    promptLoginToBook() {
        Swal.fire({
            icon: 'info',
            title: 'Login Diperlukan',
            html: 'Untuk memesan tiket, silakan <b>masuk</b> atau <b>daftar</b> akun DLU Ferry terlebih dahulu.',
            confirmButtonText: 'Masuk / Daftar',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonColor: '#003d7a',
        }).then(result => {
            if (result.isConfirmed) this.navigate('login');
        });
    },

    // === Searchable Custom Dropdown ===
    toggleDropdown(type) {
        const dropdown = document.getElementById('dropdown-' + type);
        const isActive = dropdown.classList.contains('active');

        // Close all dropdowns first
        document.querySelectorAll('.custom-select-dropdown').forEach(el => el.classList.remove('active'));

        if (!isActive) {
            dropdown.classList.add('active');
            dropdown.querySelector('input').focus();
        }
    },

    filterPorts(type, query) {
        const list = document.getElementById('list-' + type);
        const options = list.querySelectorAll('.custom-select-option');
        const lowerQuery = query.toLowerCase();

        options.forEach(opt => {
            const text = opt.innerText.toLowerCase();
            opt.style.display = text.includes(lowerQuery) ? 'block' : 'none';
        });
    },

    selectPort(type, portText) {
        document.getElementById('search-' + type).value = portText;
        document.getElementById('dropdown-' + type).classList.remove('active');
        this.validateInput(document.getElementById('search-' + type).parentElement.parentElement); // trigger validation styling
    },

    // === Form UI & Validations ===
    togglePassword(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    },

    validateInput(groupEl, isInvalid = false) {
        groupEl.classList.remove('input-valid', 'input-invalid');
        if (isInvalid) {
            groupEl.classList.add('input-invalid');
        } else {
            groupEl.classList.add('input-valid');
        }
    },

    setupInlineValidations() {
        // Generic required inputs
        const inputs = [
            { id: 'reg-name', type: 'text' },
            { id: 'reg-id', type: 'text', min: 10 },
            { id: 'reg-phone', type: 'text', min: 10 },
            { id: 'reg-password', type: 'password', min: 6 },
            { id: 'login-email', type: 'email' },
            { id: 'login-password', type: 'text', min: 1 } // generic
        ];

        inputs.forEach(field => {
            const el = document.getElementById(field.id);
            if (!el) return;

            el.addEventListener('blur', (e) => {
                const val = e.target.value.trim();
                const group = document.getElementById(field.id + '-group');

                if (field.type === 'email') {
                    // Basic email regex
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                    if (isValid) this.validateInput(group);
                    else if (val.length > 0) this.validateInput(group, true);
                    else group.classList.remove('input-valid', 'input-invalid');
                } else {
                    const min = field.min || 3;
                    if (val.length >= min) this.validateInput(group);
                    else if (val.length > 0) this.validateInput(group, true);
                    else group.classList.remove('input-valid', 'input-invalid');
                }
            });
        });

        // Special Async-like Email Validation Mock
        const regEmail = document.getElementById('reg-email');
        if (regEmail) {
            regEmail.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                const group = document.getElementById('reg-email-group');
                const errorText = document.getElementById('reg-email-error');

                // Clear state while typing
                group.classList.remove('input-valid', 'input-invalid');
                errorText.style.display = 'none';

                // Basic valid format check before showing mock error
                const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

                if (isValidFormat) {
                    // MOCK: if email is test@gmail.com, show error immediately
                    if (val.toLowerCase() === 'test@gmail.com') {
                        this.validateInput(group, true);
                        errorText.style.display = 'block';
                    } else {
                        this.validateInput(group);
                    }
                }
            });
        }
    },

    handleLogin(e) {
        e.preventDefault();

        const emailInput = document.getElementById('login-email').value.trim();
        const passwordInput = document.getElementById('login-password').value;

        if (emailInput === this.dummyUser.email && passwordInput === this.dummyUser.password) {
            this.isLoggedIn = true;
            this.currentUser = this.dummyUser;

            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk',
                text: `Selamat datang kembali, ${this.currentUser.name}!`,
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                document.getElementById('nav-auth-btn').classList.add('hidden');
                document.getElementById('nav-public-links').classList.add('hidden');
                const userMenu = document.getElementById('nav-user-menu');
                userMenu.classList.replace('hidden', 'flex');
                document.getElementById('nav-user-name').innerText = this.currentUser.name;

                document.getElementById('nav-user-name').innerText = this.currentUser.name;

                // Return to appropriate view
                this.navigate('home');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Masuk',
                text: 'Email atau password salah. Coba gunakan test@dlu.co.id / password123',
                confirmButtonColor: '#00478F'
            });
        }
    },

    handleRegister(e) {
        e.preventDefault();

        // Check if our mock validation is blocking
        const emailInput = document.getElementById('reg-email').value;
        if (emailInput.toLowerCase() === 'test@gmail.com') {
            Swal.fire({
                icon: 'error',
                title: 'Pendaftaran Gagal',
                text: 'Email ini sudah digunakan. Silakan cek form Anda.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil',
            text: 'Akun Anda telah dibuat. Silakan lanjut ke beranda.',
            confirmButtonColor: '#00478F'
        }).then(() => {
            document.getElementById('nav-auth-btn').classList.add('hidden');
            document.getElementById('nav-public-links').classList.add('hidden');
            document.getElementById('nav-user-menu').classList.replace('hidden', 'flex');

            this.navigate('home');
        });
    },

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;

        Swal.fire({
            icon: 'info',
            title: 'Berhasil Keluar',
            text: 'Anda telah keluar dari akun.',
            timer: 1000,
            showConfirmButton: false
        }).then(() => {
            document.getElementById('nav-auth-btn').classList.remove('hidden');
            document.getElementById('nav-public-links').classList.remove('hidden');
            document.getElementById('nav-user-menu').classList.replace('flex', 'hidden');

            // If on a step > 1, reset to step 1
            this.setBookingStep(1);
            this.navigate('login');
        });
    },

    // === Public sidebar form: multi-select ticket type toggle ===
    pubToggleTicket(type) {
        const btn = document.getElementById(`pub-toggle-${type}`);
        const area = document.getElementById('pub-kendaraan-area');
        if (!btn) return;

        const isActive = btn.classList.contains('border-dlu-blue');

        // At least one must stay active — block deactivating if it's the only one active
        const otherType = type === 'pnp' ? 'knd' : 'pnp';
        const otherBtn = document.getElementById(`pub-toggle-${otherType}`);
        if (isActive && !otherBtn.classList.contains('border-dlu-blue')) return; // prevent all-off

        if (isActive) {
            // Deactivate
            btn.classList.remove('border-dlu-blue', 'bg-dlu-light', 'text-dlu-blue');
            btn.classList.add('border-gray-200', 'bg-white', 'text-gray-400');
        } else {
            // Activate
            btn.classList.add('border-dlu-blue', 'bg-dlu-light', 'text-dlu-blue');
            btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-400');
        }

        // Show/hide vehicle dropdown based on knd toggle state
        const kndBtn = document.getElementById('pub-toggle-knd');
        if (area) {
            if (kndBtn && kndBtn.classList.contains('border-dlu-blue')) {
                area.classList.remove('hidden');
            } else {
                area.classList.add('hidden');
            }
        }
    },

    // === Dashboard form: multi-select ticket type toggle ===
    dashToggleTicket(type) {
        const toggle = document.getElementById(`dash-toggle-${type}`);
        const check = document.getElementById(`dash-check-${type}`);
        const area = document.getElementById('dash-kendaraan-area');
        if (!toggle || !check) return;

        const isActive = !check.checked; // we'll flip it
        const otherType = type === 'pnp' ? 'knd' : 'pnp';
        const otherCheck = document.getElementById(`dash-check-${otherType}`);

        // Prevent deactivating the last selected
        if (check.checked && !otherCheck?.checked) return;

        check.checked = !check.checked;

        const applyActive = (t, active) => {
            const el = document.getElementById(`dash-toggle-${t}`);
            const iconBg = document.getElementById(`dash-iconbg-${t}`);
            const icon = document.getElementById(`dash-icon-${t}`);
            const title = document.getElementById(`dash-title-${t}`);
            const sub = document.getElementById(`dash-sub-${t}`);

            if (!el) return;
            if (active) {
                el.classList.add('border-dlu-blue', 'bg-dlu-light');
                el.classList.remove('border-gray-200', 'bg-white');
                if (iconBg) { iconBg.classList.add('bg-dlu-blue/10'); iconBg.classList.remove('bg-gray-100'); }
                if (icon) { icon.classList.add('text-dlu-blue'); icon.classList.remove('text-gray-400', 'text-gray-500'); }
                if (title) { title.classList.add('text-dlu-blue'); title.classList.remove('text-gray-500'); }
                if (sub) { sub.classList.add('text-blue-400'); sub.classList.remove('text-gray-400'); }
            } else {
                el.classList.remove('border-dlu-blue', 'bg-dlu-light');
                el.classList.add('border-gray-200', 'bg-white');
                if (iconBg) { iconBg.classList.remove('bg-dlu-blue/10'); iconBg.classList.add('bg-gray-100'); }
                if (icon) { icon.classList.remove('text-dlu-blue'); icon.classList.add('text-gray-400'); }
                if (title) { title.classList.remove('text-dlu-blue'); title.classList.add('text-gray-500'); }
                if (sub) { sub.classList.remove('text-blue-400'); sub.classList.add('text-gray-400'); }
            }
            // toggle checkmark badge
            const badge = document.getElementById(`dash-badge-${t}`);
            if (badge) badge.classList.toggle('hidden', !active);
        };

        applyActive('pnp', document.getElementById('dash-check-pnp').checked);
        applyActive('knd', document.getElementById('dash-check-knd').checked);

        // Show/hide vehicle golongan dropdown
        if (area) {
            const kndChecked = document.getElementById('dash-check-knd').checked;
            area.classList.toggle('hidden', !kndChecked);
        }
    },

    // Helper: get currently selected ticket types from form context
    getSelectedTicketTypes(context) {
        if (context === 'pub') {
            const pnpActive = document.getElementById('pub-toggle-pnp')?.classList.contains('border-dlu-blue');
            const kndActive = document.getElementById('pub-toggle-knd')?.classList.contains('border-dlu-blue');
            return { pnp: !!pnpActive, knd: !!kndActive };
        } else { // dash
            return {
                pnp: document.getElementById('dash-check-pnp')?.checked ?? true,
                knd: document.getElementById('dash-check-knd')?.checked ?? false,
            };
        }
    },

    getSelectedVehicleGolonganLabel(context) {
        const selectId = context === 'dash' ? 'dash-golongan-knd' : 'pub-golongan-knd';
        const selectEl = document.getElementById(selectId);
        if (!selectEl || !selectEl.value) return '(Golongan belum dipilih)';
        const opt = selectEl.options[selectEl.selectedIndex];
        return opt ? `(${opt.textContent.trim()})` : '(Golongan belum dipilih)';
    },

    syncPilihClassOptions(context = 'pub') {
        this.renderScheduleResults(context);
    },

    refreshClassSelectionCTA(itemId = 1) {
        const pnpWrap = document.getElementById(`detail-pnp-${itemId}`);
        const kndWrap = document.getElementById(`detail-knd-${itemId}`);
        const qtyPnpEl = document.getElementById(`qty-eko-${itemId}`);
        const qtyKndEl = document.getElementById(`qty-knd-${itemId}`);
        const summaryEl = document.getElementById(`detail-summary-${itemId}`);
        const continueBtn = document.getElementById(`detail-continue-${itemId}`);

        if (!summaryEl || !continueBtn) return;

        const pnpVisible = !!pnpWrap && !pnpWrap.classList.contains('hidden');
        const kndVisible = !!kndWrap && !kndWrap.classList.contains('hidden');

        const qtyPnp = pnpVisible && qtyPnpEl ? (parseInt(qtyPnpEl.value, 10) || 0) : 0;
        const qtyKnd = kndVisible && qtyKndEl ? (parseInt(qtyKndEl.value, 10) || 0) : 0;
        const total = qtyPnp + qtyKnd;

        const parts = [];
        if (qtyPnp > 0) parts.push(`Penumpang ${qtyPnp}`);
        if (qtyKnd > 0) parts.push(`Kendaraan ${qtyKnd}`);

        if (parts.length > 0) {
            summaryEl.textContent = `Pilihan: ${parts.join(' | ')}`;
            continueBtn.disabled = false;
            continueBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            continueBtn.classList.add('bg-dlu-blue', 'text-white', 'hover:bg-blue-800');
        } else {
            summaryEl.textContent = 'Belum ada tiket dipilih.';
            continueBtn.disabled = true;
            continueBtn.classList.remove('bg-dlu-blue', 'text-white', 'hover:bg-blue-800');
            continueBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        }

        return total;
    },

    proceedFromClassSelection(itemId = 1) {
        const total = this.refreshClassSelectionCTA(itemId) || 0;
        if (total <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Jumlah Tiket Belum Valid',
                text: 'Minimal pilih 1 tiket sebelum lanjut ke isi data.',
                confirmButtonColor: '#00478F'
            });
            return;
        }

        const qtyPnp = parseInt(document.getElementById(`qty-eko-${itemId}`)?.value || '0', 10) || 0;
        const qtyKnd = parseInt(document.getElementById(`qty-knd-${itemId}`)?.value || '0', 10) || 0;
        const classParts = [];
        if (qtyPnp > 0) classParts.push(`Ekonomi x${qtyPnp}`);
        if (qtyKnd > 0) classParts.push(`Kendaraan x${qtyKnd}`);
        const classLabel = classParts.length > 0 ? classParts.join(' + ') : 'Sesuai Pilihan';

        this.bookTicket(classLabel);
    },

    toggleDetail(detailId) {
        const el = document.getElementById(detailId);
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    },

    updateQty(inputId, change, itemId = null) {
        const input = document.getElementById(inputId);
        if (!input) return;
        let val = parseInt(input.value);
        val += change;
        if (val < 0) val = 0;
        if (val > 10) val = 10;
        input.value = val;
        const derivedId = itemId || parseInt((inputId.match(/(\d+)$/) || [])[1] || '0', 10);
        if (derivedId > 0) this.refreshClassSelectionCTA(derivedId);
    },

    showFullAlert() {
        // Redesign enhancement: show a clear alert instead of refreshing
        Swal.fire({
            icon: 'warning',
            title: 'Tiket Penuh',
            text: 'Mohon maaf, tiket untuk kelas VIP pada jadwal ini sudah terisi penuh. Silakan pilih kelas atau hari lain.',
            confirmButtonColor: '#00478F',
            confirmButtonText: 'Mengerti'
        });
    },

    bookTicket(className, qtyInputId = null, ticketTypeLabel = 'penumpang') {
        if (qtyInputId) {
            const qtyInput = document.getElementById(qtyInputId);
            const qty = qtyInput ? parseInt(qtyInput.value, 10) : 0;
            if (!Number.isFinite(qty) || qty <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Jumlah Tiket Belum Valid',
                    text: `Minimal pilih 1 tiket ${ticketTypeLabel} sebelum lanjut.`,
                    confirmButtonColor: '#00478F'
                });
                return;
            }
        }

        if (!this.isLoggedIn) {
            Swal.fire({
                icon: 'info',
                title: 'Silakan Masuk',
                text: 'Untuk melanjutkan ke pengisian data penumpang dan pembayaran, silakan masuk ke akun Anda terlebih dahulu.',
                confirmButtonText: 'Masuk Sekarang',
                confirmButtonColor: '#00478F',
                showCancelButton: true,
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.navigate('login');
                }
            });
            return;
        }

        // Navigate to pesan-tiket page
        if (className) {
            const classEl = document.getElementById('pt-class');
            if (classEl) classEl.textContent = className;
        }
        this.navigate('pesan-tiket');
    },

    backToPilih() {
        // Go back to booking flow step 2 (Pilih)
        this.navigate('booking');
        this.setBookingStep(2);
    },

    // === Pesan Tiket Page Helpers ===
    ptToggleKet(prefix) {
        const sel = document.getElementById(prefix + '-muatan');
        const wrap = document.getElementById(prefix + '-ket-wrap');
        if (!sel || !wrap) return;
        wrap.style.display = sel.value === '1' ? 'flex' : 'none';
    },

    ptTogglePayAccordion() {
        const header = document.getElementById('pt-pay-header');
        const body = document.getElementById('pt-pay-body');
        if (!header || !body) return;
        header.classList.toggle('open');
        body.classList.toggle('open');
    },

    ptSelectPay(optId) {
        document.querySelectorAll('.pt-pay-opt').forEach(el => el.classList.remove('selected'));
        const opt = document.getElementById(optId);
        if (opt) opt.classList.add('selected');
    },

    normalizeETicketData(rawData) {
        const normalize = (text) => String(text || '-').replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
        return {
            kode: normalize(rawData?.kode),
            kapal: normalize(rawData?.kapal),
            asal: normalize(rawData?.asal),
            asalSub: normalize(rawData?.asalSub),
            tujuan: normalize(rawData?.tujuan),
            tujuanSub: normalize(rawData?.tujuanSub),
            berangkat: normalize(rawData?.berangkat),
            tiba: normalize(rawData?.tiba),
            kelas: normalize(rawData?.kelas),
            total: normalize(rawData?.total),
            bank: normalize(rawData?.bank || '-'),
            cetakPada: normalize(rawData?.cetakPada || new Date().toLocaleString('id-ID'))
        };
    },

    downloadETicketPdf(rawData, fileName = null) {
        const data = this.normalizeETicketData(rawData);

        const jsPDFCtor = window.jspdf && window.jspdf.jsPDF;
        if (!jsPDFCtor) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Membuat PDF',
                text: 'Library PDF tidak tersedia. Silakan refresh halaman.',
                confirmButtonColor: '#1a6fc4'
            });
            return;
        }

        const doc = new jsPDFCtor({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 40;
        let y = 44;

        // Header
        doc.setFillColor(0, 71, 143);
        doc.rect(0, 0, pageWidth, 96, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('E-Ticket DLU Ferry', margin, y);
        y += 24;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Kode Booking: ${data.kode}`, margin, y);

        y = 130;
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Rute', margin, y);
        y += 18;
        doc.setFontSize(14);
        doc.text(`${data.asal} (${data.asalSub})`, margin, y);
        doc.text('->', pageWidth / 2 - 8, y);
        doc.text(`${data.tujuan} (${data.tujuanSub})`, pageWidth / 2 + 20, y);

        y += 28;
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y, pageWidth - margin, y);
        y += 24;

        const drawRow = (label, value) => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(107, 114, 128);
            doc.text(label, margin, y);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(17, 24, 39);
            doc.text(value, margin + 140, y);
            y += 24;
        };

        drawRow('Kapal', data.kapal);
        drawRow('Kelas', data.kelas);
        drawRow('Berangkat', data.berangkat);
        drawRow('Tiba', data.tiba);
        drawRow('Metode Bayar', data.bank);

        y += 6;
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y, pageWidth - margin, y);
        y += 28;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(107, 114, 128);
        doc.text('Total Pembayaran', margin, y);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(0, 71, 143);
        doc.text(data.total, margin + 140, y);

        y += 34;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(`Dibuat pada ${data.cetakPada}. Simpan file e-ticket ini untuk check-in.`, margin, y);

        doc.save(fileName || `E-Ticket-${data.kode}.pdf`);
    },

    ptDownloadETicketPdf(kodeBooking, bankName = '-') {
        const getText = (id, fallback = '-') => {
            const el = document.getElementById(id);
            return el && el.textContent ? el.textContent.trim() : fallback;
        };

        const data = {
            kode: kodeBooking || '-',
            kapal: getText('pt-ship-name'),
            asal: getText('pt-origin-name'),
            asalSub: getText('pt-origin-sub'),
            tujuan: getText('pt-dest-name'),
            tujuanSub: getText('pt-dest-sub'),
            berangkat: getText('pt-depart-time'),
            tiba: getText('pt-arrive-time'),
            kelas: getText('pt-class'),
            total: getText('pt-total-display'),
            bank: bankName
        };
        this.downloadETicketPdf(data);
    },

    getOrderETicketData(orderCode) {
        const orders = {
            'DLU-A1B2C3': {
                kode: 'DLU-A1B2C3',
                kapal: 'KM. Dharma Kencana VII',
                asal: 'Surabaya (SUB)',
                asalSub: 'Pel. Tanjung Perak',
                tujuan: 'Makassar (MAK)',
                tujuanSub: 'Pel. Soekarno Hatta',
                berangkat: '10 Mar 2026, 09:00 WIB',
                tiba: '11 Mar 2026, 08:15 WITA',
                kelas: '2 Penumpang',
                total: 'Rp 980.000',
                bank: 'Lunas'
            }
        };
        return orders[orderCode] || null;
    },

    showOrderETicketPopup(orderCode) {
        const rawData = this.getOrderETicketData(orderCode);
        if (!rawData) {
            Swal.fire({
                icon: 'warning',
                title: 'Data E-Ticket Tidak Ditemukan',
                text: `Data e-ticket untuk kode booking ${orderCode} belum tersedia.`,
                confirmButtonColor: '#00478F'
            });
            return;
        }

        const data = this.normalizeETicketData(rawData);
        Swal.fire({
            title: 'E-Ticket',
            width: 760,
            confirmButtonColor: '#00478F',
            confirmButtonText: 'Cetak E-Ticket',
            showCancelButton: true,
            cancelButtonText: 'Tutup',
            html: `
                <div class="text-left bg-white border border-gray-200 rounded-xl p-4">
                    <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                        <p class="font-bold text-gray-800">Kode Booking: <span class="text-dlu-blue">${data.kode}</span></p>
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">LUNAS</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Kapal</span><span class="font-semibold text-gray-800 text-right">${data.kapal}</span></div>
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Rute</span><span class="font-semibold text-gray-800 text-right">${data.asal} -> ${data.tujuan}</span></div>
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Pelabuhan</span><span class="font-semibold text-gray-800 text-right">${data.asalSub} -> ${data.tujuanSub}</span></div>
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Berangkat</span><span class="font-semibold text-gray-800 text-right">${data.berangkat}</span></div>
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Tiba</span><span class="font-semibold text-gray-800 text-right">${data.tiba}</span></div>
                        <div class="flex justify-between gap-4"><span class="text-gray-500">Kelas</span><span class="font-semibold text-gray-800 text-right">${data.kelas}</span></div>
                        <div class="flex justify-between gap-4 pt-2 border-t border-gray-100"><span class="text-gray-500">Total</span><span class="font-bold text-dlu-blue text-right">${data.total}</span></div>
                    </div>
                </div>
            `
        }).then((result) => {
            if (result.isConfirmed) {
                this.downloadETicketPdf(data);
            }
        });
    },

    ptSubmit(e) {
        e.preventDefault();
        const bank = document.querySelector('input[name="pt_bank"]:checked');
        if (!bank) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih Pembayaran',
                text: 'Silakan pilih metode pembayaran terlebih dahulu.',
                confirmButtonColor: '#1a6fc4'
            });
            return;
        }
        const btn = document.getElementById('pt-submit-btn');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...'; }
        setTimeout(() => {
            const kode = 'DLU-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            const bankNameEl = bank.closest('label')?.querySelector('p');
            const bankName = bankNameEl ? bankNameEl.textContent.trim() : 'Virtual Account';
            Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil!',
                html: 'E-ticket siap diunduh.<br><b>Kode Booking: ' + kode + '</b>',
                showCancelButton: true,
                confirmButtonColor: '#1a6fc4',
                confirmButtonText: 'Download E-Ticket PDF',
                cancelButtonText: 'Kembali ke Beranda'
            }).then((result) => {
                if (result.isConfirmed) this.ptDownloadETicketPdf(kode, bankName);
                this.navigate('home');
            });
            if (btn) { btn.disabled = false; btn.innerHTML = 'Lanjut ke Pembayaran <i class="fa-solid fa-arrow-right"></i>'; }
        }, 1200);
    }
};

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial UI state setup based on static class attributes
    app.navigate('home');

    // Initialize Slider
    app.initSlider();

    // Run custom setup methods
    app.setupInlineValidations();

    // Round Trip Toggle Logic (New Dashboard)
    const roundTripCheck = document.getElementById('roundtrip');
    if (roundTripCheck) {
        roundTripCheck.addEventListener('change', (e) => {
            const container = document.getElementById('return-date-container');
            if (e.target.checked) {
                container.classList.remove('opacity-50', 'pointer-events-none');
            } else {
                container.classList.add('opacity-50', 'pointer-events-none');
            }
        });
    }
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-container')) {
            document.querySelectorAll('.custom-select-dropdown').forEach(el => {
                el.classList.remove('active');
            });
        }
    });
});
