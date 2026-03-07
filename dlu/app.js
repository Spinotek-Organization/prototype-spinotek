window.app = {
    // === State ===
    isLoggedIn: false,
    currentUser: null,
    lastSearchContext: 'pub',
    lastRoute: { origin: 'SUB', dest: 'BDJ' },
    scheduleResults: [],
    selectedScheduleDateKey: null,
    scheduleWindowAnchorKey: null,
    renderedScheduleIds: [],
    fareViewFilters: {},
    fareAvailabilityCache: {},
    lastTripDates: null,
    currentBookingSelection: null,
    orderETickets: {},
    orderHistory: [],

    // Slider State
    currentSlide: 0,
    slideInterval: null,

    // Dummy Data
    dummyUser: {
        email: 'test@dlu.co.id',
        password: 'password123',
        name: 'Budi Santoso'
    },

    // Real Scraped Data
    dluData: {
        "ports": {
            "2": "Banjarmasin (Pel.Trisakti) / BDJ",
            "3": "Balikpapan (Pel.Semayang) / BPN",
            "4": "Batulicin (Pel.Samudra) / BTW",
            "6": "Kumai (Pel.Panglima Utar) / KUM",
            "7": "Maumere (Pel.Lorens Say) / MOF",
            "8": "Makassar (Pel.Soekarno Hatta) / MAK",
            "9": "Sampit (Pel.Mentaya) / SMQ",
            "10": "Semarang (Pel.Tanjung Emas) / SRG",
            "11": "Surabaya (Pel.Tanjung Perak) / SUB",
            "12": "Pontianak (Pel.Dwikora) / PNK",
            "13": "Ketapang Kalbar (Pel.Perintis) / KTG",
            "14": "Labuan Bajo (Pel.Wae Kelambu) / LBJ",
            "15": "Baubau (Pel.Murhum) / BUW",
            "16": "Parepare (Pel.Nusantara) / PAP",
            "17": "Ende (Pel. Ende) / ENE",
            "18": "Bawean / BWN",
            "20": "Selayar / KSR",
            "21": "Lombok (Pel. Kedaro KRN7 / Pel. Gilimas) / LOM",
            "22": "Pel. Benoa / BNA",
            "23": "Kupang (Pel. Tenau) / KOE",
            "24": "Waingapu (Pel. Waingapu) / WGP",
            "25": "Palu (Pel. Donggala) / DON"
        },
        "destinationsByOrigin": {
            "2": [11], "3": [11, 16, 25], "4": [8, 16], "6": [10, 11], "7": [11, 14, 21],
            "8": [4, 11, 15, 20], "9": [10, 11], "10": [6, 9, 12, 13],
            "11": [2, 3, 4, 6, 7, 8, 9, 14, 17, 18, 21, 22, 23, 24, 25],
            "12": [10], "13": [10], "14": [7, 11, 17, 21, 23, 24], "15": [8, 20],
            "16": [3, 4], "17": [11, 14, 21, 23, 24], "18": [6, 11], "20": [8, 15],
            "21": [7, 11, 14, 17, 22, 23, 24], "22": [11, 21, 23, 24],
            "23": [11, 14, 17, 21, 22, 24], "24": [11, 14, 17, 21, 22, 23], "25": [3, 11]
        }
    },

    initPorts() {
        const ports = this.dluData.ports;

        // Native SELECT elements for Dashboard Tab
        const dashOrigin = document.getElementById('dash-origin');
        const dashDest = document.getElementById('dash-dest');

        // Custom DOM List elements for Public Page Dropdown
        const listOrigin = document.getElementById('list-origin');
        const listDest = document.getElementById('list-dest');

        if (dashOrigin) {
            dashOrigin.innerHTML = '<option value="">-- Pilih Asal --</option>';
            for (const [id, name] of Object.entries(ports)) {
                if (this.dluData.destinationsByOrigin[id] && this.dluData.destinationsByOrigin[id].length > 0) {
                    const codeMatch = name.match(/\/ ([A-Z]{3})/);
                    const code = codeMatch ? codeMatch[1] : id;
                    dashOrigin.innerHTML += `<option value="${code}">${name}</option>`;
                }
            }
        }

        if (dashDest) {
            dashDest.innerHTML = '<option value="">-- Pilih Tujuan --</option>';
            for (const [id, name] of Object.entries(ports)) {
                const codeMatch = name.match(/\/ ([A-Z]{3})/);
                const code = codeMatch ? codeMatch[1] : id;
                dashDest.innerHTML += `<option value="${code}">${name}</option>`;
            }
        }

        if (listOrigin) {
            listOrigin.innerHTML = '';
            for (const [id, name] of Object.entries(ports)) {
                if (this.dluData.destinationsByOrigin[id] && this.dluData.destinationsByOrigin[id].length > 0) {
                    listOrigin.innerHTML += `<div class="custom-select-option hover:bg-blue-50 transition-colors" onclick="app.selectPort('origin', '${name.replace(/'/g, "\\'")}')">${name}</div>`;
                }
            }
        }

        if (listDest) {
            this.renderPublicDestinationOptionsByOriginCode('');
        }

        // Add listener for Dashboard Origin to filter destinations dynamically
        if (dashOrigin) {
            dashOrigin.addEventListener('change', (e) => this.filterDestinationsByOriginCode(e.target.value));
        }
    },

    renderPublicDestinationOptionsByOriginCode(originCode = '') {
        const listDest = document.getElementById('list-dest');
        if (!listDest) return;

        const ports = this.dluData?.ports || {};
        let originId = null;

        if (originCode) {
            for (const [id, name] of Object.entries(ports)) {
                const code = this.toRouteCode(name, id);
                if (String(code).toUpperCase() === String(originCode).toUpperCase() || String(id) === String(originCode)) {
                    originId = id;
                    break;
                }
            }
        }

        const allowedDestIds = originId ? (this.dluData.destinationsByOrigin[originId] || []) : null;
        const targetDestIds = Array.isArray(allowedDestIds) && allowedDestIds.length > 0
            ? allowedDestIds.map((id) => String(id))
            : Object.keys(ports);

        listDest.innerHTML = '';
        targetDestIds.forEach((destId) => {
            const portName = ports[destId];
            if (!portName) return;
            listDest.innerHTML += `<div class="custom-select-option hover:bg-blue-50 transition-colors" onclick="app.selectPort('dest', '${portName.replace(/'/g, "\\'")}')">${portName}</div>`;
        });

        const destInput = document.getElementById('search-dest');
        if (destInput?.value) {
            const selectedDestCode = this.toRouteCode(destInput.value, '');
            const allowedCodes = new Set(targetDestIds.map((destId) => this.toRouteCode(ports[destId], destId)));
            if (!allowedCodes.has(selectedDestCode)) {
                destInput.value = '';
                const destGroup = destInput.parentElement?.parentElement;
                if (destGroup) destGroup.classList.remove('input-valid', 'input-invalid');
            }
        }
    },

    filterDestinationsByOriginCode(originCode) {
        // Find origin ID from code
        let originId = null;
        for (const [id, name] of Object.entries(this.dluData.ports)) {
            const match = name.match(/\/ ([A-Z]{3})/);
            if ((match && match[1] === originCode) || id === originCode) {
                originId = id;
                break;
            }
        }

        const dashDest = document.getElementById('dash-dest');
        if (dashDest && originId) {
            const allowedDestIds = this.dluData.destinationsByOrigin[originId] || [];
            dashDest.innerHTML = '<option value="">-- Pilih Tujuan --</option>';
            for (const destId of allowedDestIds) {
                const name = this.dluData.ports[destId];
                if (name) {
                    const match = name.match(/\/ ([A-Z]{3})/);
                    const code = match ? match[1] : destId;
                    dashDest.innerHTML += `<option value="${code}">${name}</option>`;
                }
            }
        } else if (dashDest && !originId) {
            // Reset to all if no origin selected
            this.initPorts();
        }
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

    toggleMobileNav(forceOpen = null) {
        const panel = document.getElementById('nav-mobile-panel');
        const toggleBtn = document.getElementById('nav-mobile-toggle');
        const toggleIcon = document.getElementById('nav-mobile-toggle-icon');
        if (!panel || !toggleBtn || !toggleIcon) return;

        const willOpen = typeof forceOpen === 'boolean' ? forceOpen : panel.classList.contains('hidden');
        panel.classList.toggle('hidden', !willOpen);
        toggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        toggleIcon.className = willOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    },

    syncNavbarAuthState() {
        const desktopGuest = document.getElementById('nav-desktop-guest');
        const desktopAuthBtn = document.getElementById('nav-auth-btn');
        const desktopPublicLinks = document.getElementById('nav-public-links');
        const toggleBtn = document.getElementById('nav-mobile-toggle');
        const panel = document.getElementById('nav-mobile-panel');

        const mobilePublicLinks = document.getElementById('nav-mobile-public-links');
        const mobileAuthBtn = document.getElementById('nav-mobile-auth-btn');
        const mobileDashboardLinks = document.getElementById('nav-mobile-dashboard-links');
        const mobileUserMenu = document.getElementById('nav-mobile-user-menu');
        const mobileUserName = document.getElementById('nav-mobile-user-name');

        const isAuth = !!this.isLoggedIn;
        const name = this.currentUser?.name || 'User';

        if (desktopGuest) {
            desktopGuest.className = isAuth
                ? 'hidden md:hidden items-center gap-2 sm:gap-4'
                : 'hidden md:flex items-center gap-2 sm:gap-4';
        }

        if (desktopPublicLinks) {
            desktopPublicLinks.className = isAuth ? 'hidden' : 'hidden lg:flex space-x-8 items-center';
        }

        if (desktopAuthBtn) desktopAuthBtn.classList.toggle('hidden', isAuth);
        if (mobilePublicLinks) mobilePublicLinks.classList.toggle('hidden', isAuth);
        if (mobileAuthBtn) mobileAuthBtn.classList.toggle('hidden', isAuth);
        if (mobileDashboardLinks) mobileDashboardLinks.classList.toggle('hidden', !isAuth);

        if (mobileUserMenu) {
            mobileUserMenu.classList.toggle('hidden', !isAuth);
        }

        if (mobileUserName) mobileUserName.innerText = name;

        if (toggleBtn) toggleBtn.classList.toggle('md:hidden', !isAuth);
        if (panel) panel.classList.toggle('md:hidden', !isAuth);
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
        this.toggleMobileNav(false);
        // Always close inline results when navigating away
        this.closeInlineResults();
    },

    openDashboardTab(tabId, event) {
        if (event) event.preventDefault();
        this.navigate('home');
        this.switchDashboardTab(null, tabId);
        this.toggleMobileNav(false);
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
        const baseClass = 'flex items-center justify-between gap-2 px-3 py-2.5 text-gray-100 hover:bg-blue-800 rounded-lg transition group';
        const activeClass = 'flex items-center justify-between gap-2 px-3 py-2.5 bg-dlu-blue text-white rounded-lg shadow-sm transition';
        navIds.forEach(id => {
            const navEl = document.getElementById(id);
            if (navEl) {
                // reset to inactive style
                navEl.className = baseClass;
                // ensure icon has default gray instead of inheriting white
                const icon = navEl.querySelector('i');
                if (icon) {
                    icon.classList.add('text-blue-200', 'group-hover:text-white');
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
            activeNav.className = activeClass;
            const icon = activeNav.querySelector('i');
            if (icon) {
                icon.classList.remove('text-blue-200', 'group-hover:text-white');
            }
        }

        if (tabId === 'orders') {
            this.renderOrdersHistory();
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
                this.selectedScheduleDateKey = null;
                this.fareAvailabilityCache = {};
                this.scheduleResults = this.buildMockSchedules();
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
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mencari...';
            btn.disabled = true;
        }

        setTimeout(() => {
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }

            this.lastSearchContext = 'pub';
            this.lastRoute = {
                origin: this.toRouteCode(origin, 'SUB'),
                dest: this.toRouteCode(dest, 'BDJ')
            };
            this.selectedScheduleDateKey = null;
            this.fareAvailabilityCache = {};
            this.scheduleWindowAnchorKey = this.toDateKey(new Date());
            this.scheduleResults = this.buildMockSchedules();

            const todayKey = this.scheduleWindowAnchorKey;
            const upcomingSchedules = this.scheduleResults.filter((item) => item.departDateKey >= todayKey);
            this.renderInlinePublicSchedules(upcomingSchedules, { originLabel: origin, destLabel: dest });
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

        const tripDates = this.getDashboardTripDates();
        if (!tripDates?.departDate?.key) {
            Swal.fire({
                icon: 'warning',
                title: 'Tanggal Berangkat Belum Valid',
                text: 'Silakan pilih tanggal berangkat yang valid.',
                confirmButtonColor: '#003d7a'
            });
            return;
        }
        if (tripDates.isRoundTrip && (!tripDates.returnDate || tripDates.returnDate.utcDate.getTime() < tripDates.departDate.utcDate.getTime())) {
            Swal.fire({
                icon: 'warning',
                title: 'Tanggal Pulang Belum Valid',
                text: 'Tanggal pulang harus sama atau setelah tanggal berangkat.',
                confirmButtonColor: '#003d7a'
            });
            return;
        }

        this.lastSearchContext = 'dash';
        this.lastRoute = { origin, dest };
        this.lastTripDates = tripDates;
        this.selectedScheduleDateKey = null;
        this.scheduleWindowAnchorKey = tripDates.departDate.key;
        this.fareViewFilters = {};
        this.fareAvailabilityCache = {};
        this.scheduleResults = this.buildMockSchedules();
        this.syncPilihClassOptions('dash');
        this.navigate('booking');
        this.setBookingStep(2);
    },

    toRouteCode(text, fallback = '-') {
        if (!text) return fallback;
        const routeCodeMatch = String(text).match(/\/\s*([A-Z]{3,4})\s*$/i);
        if (routeCodeMatch && routeCodeMatch[1]) return routeCodeMatch[1].trim().toUpperCase();
        const bracketCodeMatch = String(text).match(/\(([A-Z]{3,4})\)/i);
        if (bracketCodeMatch && bracketCodeMatch[1]) return bracketCodeMatch[1].trim().toUpperCase();
        const compact = String(text).replace(/[^a-zA-Z]/g, '').toUpperCase();
        return compact.slice(0, 3) || fallback;
    },

    getDaysInMonth(year, monthIndex) {
        return new Date(year, monthIndex + 1, 0).getDate();
    },

    buildDateKeyFromParts(year, monthIndex, day) {
        const y = String(year).padStart(4, '0');
        const m = String(monthIndex + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${y}-${m}-${d}`;
    },

    parseDashboardDate(prefix = 'depart') {
        const dayEl = document.getElementById(`dash-${prefix}-day`);
        const monthEl = document.getElementById(`dash-${prefix}-month`);
        const yearEl = document.getElementById(`dash-${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl) return null;

        const day = parseInt(dayEl.value, 10);
        const monthIndex = parseInt(monthEl.value, 10);
        const year = parseInt(yearEl.value, 10);
        if (!Number.isFinite(day) || !Number.isFinite(monthIndex) || !Number.isFinite(year)) return null;

        const maxDays = this.getDaysInMonth(year, monthIndex);
        const safeDay = Math.min(Math.max(day, 1), maxDays);
        return {
            day: safeDay,
            monthIndex,
            year,
            key: this.buildDateKeyFromParts(year, monthIndex, safeDay),
            utcDate: new Date(Date.UTC(year, monthIndex, safeDay))
        };
    },

    normalizeDashboardDayOptions(prefix = 'depart') {
        const dayEl = document.getElementById(`dash-${prefix}-day`);
        const monthEl = document.getElementById(`dash-${prefix}-month`);
        const yearEl = document.getElementById(`dash-${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl) return;

        const monthIndex = parseInt(monthEl.value, 10);
        const year = parseInt(yearEl.value, 10);
        if (!Number.isFinite(monthIndex) || !Number.isFinite(year)) return;

        const currentSelectedDay = parseInt(dayEl.value, 10) || 1;
        const maxDays = this.getDaysInMonth(year, monthIndex);
        const safeDay = Math.min(Math.max(currentSelectedDay, 1), maxDays);

        dayEl.innerHTML = Array.from({ length: maxDays }, (_, idx) => {
            const val = idx + 1;
            return `<option value="${val}">${val}</option>`;
        }).join('');
        dayEl.value = String(safeDay);
    },

    setDashboardDate(prefix = 'depart', dateObj = new Date()) {
        const dayEl = document.getElementById(`dash-${prefix}-day`);
        const monthEl = document.getElementById(`dash-${prefix}-month`);
        const yearEl = document.getElementById(`dash-${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl) return;

        yearEl.value = String(dateObj.getFullYear());
        monthEl.value = String(dateObj.getMonth());
        this.normalizeDashboardDayOptions(prefix);
        dayEl.value = String(dateObj.getDate());
    },

    syncRoundTripDateState() {
        const roundTripEl = document.getElementById('roundtrip');
        const returnContainer = document.getElementById('return-date-container');
        const returnDay = document.getElementById('dash-return-day');
        const returnMonth = document.getElementById('dash-return-month');
        const returnYear = document.getElementById('dash-return-year');
        if (!roundTripEl || !returnContainer || !returnDay || !returnMonth || !returnYear) return;

        const enabled = !!roundTripEl.checked;
        returnContainer.classList.toggle('opacity-50', !enabled);
        returnContainer.classList.toggle('pointer-events-none', !enabled);
        [returnDay, returnMonth, returnYear].forEach((el) => {
            el.disabled = !enabled;
        });
    },

    ensureReturnNotBeforeDeparture() {
        const roundTripEl = document.getElementById('roundtrip');
        if (!roundTripEl?.checked) return;
        const depart = this.parseDashboardDate('depart');
        const ret = this.parseDashboardDate('return');
        if (!depart || !ret) return;
        if (ret.utcDate.getTime() < depart.utcDate.getTime()) {
            this.setDashboardDate('return', new Date(depart.utcDate.getTime()));
        }
    },

    getDashboardTripDates() {
        const depart = this.parseDashboardDate('depart');
        const roundTrip = !!document.getElementById('roundtrip')?.checked;
        const ret = this.parseDashboardDate('return');
        return {
            isRoundTrip: roundTrip,
            departDate: depart,
            returnDate: ret
        };
    },

    initDashboardDateControls() {
        const departDay = document.getElementById('dash-depart-day');
        const departMonth = document.getElementById('dash-depart-month');
        const departYear = document.getElementById('dash-depart-year');
        const returnDay = document.getElementById('dash-return-day');
        const returnMonth = document.getElementById('dash-return-month');
        const returnYear = document.getElementById('dash-return-year');
        const roundTripEl = document.getElementById('roundtrip');
        if (!departDay || !departMonth || !departYear || !returnDay || !returnMonth || !returnYear || !roundTripEl) return;

        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const thisYear = new Date().getFullYear();
        const yearOptions = Array.from({ length: 4 }, (_, i) => thisYear - 1 + i);
        const monthOptionsHtml = monthLabels.map((label, idx) => `<option value="${idx}">${label}</option>`).join('');
        const yearOptionsHtml = yearOptions.map((y) => `<option value="${y}">${y}</option>`).join('');

        [departMonth, returnMonth].forEach((el) => {
            el.innerHTML = monthOptionsHtml;
        });
        [departYear, returnYear].forEach((el) => {
            el.innerHTML = yearOptionsHtml;
        });

        const today = new Date();
        this.setDashboardDate('depart', today);

        const tomorrow = new Date(today.getTime());
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.setDashboardDate('return', tomorrow);

        const onDepartChange = () => {
            this.normalizeDashboardDayOptions('depart');
            this.ensureReturnNotBeforeDeparture();
        };
        const onReturnChange = () => {
            this.normalizeDashboardDayOptions('return');
            this.ensureReturnNotBeforeDeparture();
        };

        departMonth.addEventListener('change', onDepartChange);
        departYear.addEventListener('change', onDepartChange);
        departDay.addEventListener('change', this.ensureReturnNotBeforeDeparture.bind(this));
        returnMonth.addEventListener('change', onReturnChange);
        returnYear.addEventListener('change', onReturnChange);
        returnDay.addEventListener('change', this.ensureReturnNotBeforeDeparture.bind(this));

        roundTripEl.addEventListener('change', () => {
            this.syncRoundTripDateState();
            this.ensureReturnNotBeforeDeparture();
        });

        this.syncRoundTripDateState();
        this.ensureReturnNotBeforeDeparture();
    },

    parseRupiahToNumber(value) {
        if (typeof value === 'number' && Number.isFinite(value)) return value;
        if (value === null || value === undefined) return 0;
        const digits = String(value).replace(/[^0-9]/g, '');
        return digits ? parseInt(digits, 10) : 0;
    },

    formatRupiah(value) {
        const amount = this.parseRupiahToNumber(value);
        return `Rp ${amount.toLocaleString('id-ID')}`;
    },

    toDateKey(dateObj) {
        const y = dateObj.getUTCFullYear();
        const m = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getUTCDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    },

    fromDateKey(dateKey) {
        const [y, m, d] = String(dateKey || '').split('-').map(Number);
        if (!y || !m || !d) return new Date();
        return new Date(Date.UTC(y, m - 1, d));
    },

    formatIndoDateLabel(dateObj) {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(dateObj).replace(/\./g, '');
    },

    formatTimeLabel(dateObj, tzLabel = 'WIB') {
        const hh = String(dateObj.getUTCHours()).padStart(2, '0');
        const mm = String(dateObj.getUTCMinutes()).padStart(2, '0');
        return `${hh}:${mm} ${tzLabel}`;
    },

    formatDurationLabel(minutes) {
        const total = Math.max(0, parseInt(minutes, 10) || 0);
        const hh = Math.floor(total / 60);
        const mm = total % 60;
        return mm > 0 ? `±${hh} jam ${mm} menit` : `±${hh} jam`;
    },

    getSelectedDateKey(fallback = '') {
        return this.selectedScheduleDateKey || fallback;
    },

    setSelectedDateKey(dateKey, context = 'dash') {
        this.selectedScheduleDateKey = dateKey;
        this.renderScheduleResults(context);
    },

    getScheduleBasePrice(schedule, context = 'dash') {
        const ticketTypes = this.getSelectedTicketTypes(context);
        const fares = schedule?.fares || {};
        const pnpEconomy = this.parseRupiahToNumber(fares.pnpEconomy || 490000);
        const kndBase = this.parseRupiahToNumber(fares.kndBase || 1285000);

        if (ticketTypes.pnp && ticketTypes.knd) return pnpEconomy + kndBase;
        if (ticketTypes.knd) return kndBase;
        return pnpEconomy;
    },

    buildDateBuckets(context = 'dash') {
        const scheduleByDate = new Map();
        this.scheduleResults.forEach((schedule) => {
            const key = schedule.departDateKey;
            if (!scheduleByDate.has(key)) scheduleByDate.set(key, []);
            scheduleByDate.get(key).push(schedule);
        });

        const sortedKeys = Array.from(scheduleByDate.keys()).sort();
        const fallbackKey = sortedKeys[Math.floor(sortedKeys.length / 2)] || this.toDateKey(new Date());
        const anchorKey = this.scheduleWindowAnchorKey || fallbackKey;
        const anchorDate = this.fromDateKey(anchorKey);
        const buckets = [];

        for (let offset = -7; offset <= 6; offset++) {
            const d = new Date(anchorDate.getTime());
            d.setUTCDate(d.getUTCDate() + offset);
            const dateKey = this.toDateKey(d);
            const daySchedules = scheduleByDate.get(dateKey) || [];
            let minPrice = null;

            daySchedules.forEach((item) => {
                const price = this.getScheduleBasePrice(item, context);
                if (Number.isFinite(price) && price > 0 && (minPrice === null || price < minPrice)) {
                    minPrice = price;
                }
            });

            buckets.push({
                dateKey,
                dateObj: d,
                schedules: daySchedules,
                minPrice,
                available: daySchedules.length > 0
            });
        }

        return buckets;
    },

    buildMockSchedules() {
        const ships = [
            'KM. Dharma Rucitra 1', 'KM. Dharma Kencana VII', 'KM. Dharma Ferry V',
            'KM. Dharma Kencana II', 'KM. Dharma Kartika IX', 'KM. Dharma Lautan Utama',
            'KM. Kirana I', 'KM. Kirana III', 'KM. Satya Kencana III', 'KM. Kumala'
        ];

        // Retrieve selected route for deterministic hashing
        const origin = this.lastRoute?.origin || 'SUB';
        const dest = this.lastRoute?.dest || 'BPN';
        const routeStr = origin + dest;
        const hash = routeStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 1234;

        const departTemplates = [
            { hour: 6, minute: 0, duration: 12 * 60 + (hash % 1200) },
            { hour: 9, minute: 15, duration: 14 * 60 + ((hash + 100) % 1500) },
            { hour: 14, minute: 30, duration: 16 * 60 + ((hash + 200) % 1800) },
            { hour: 20, minute: 30, duration: 20 * 60 + ((hash + 300) % 1000) }
        ];

        const baseDate = this.scheduleWindowAnchorKey
            ? this.fromDateKey(this.scheduleWindowAnchorKey)
            : (() => {
                const now = new Date();
                return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            })();
        this.scheduleWindowAnchorKey = this.scheduleWindowAnchorKey || this.toDateKey(baseDate);

        const results = [];
        let idCounter = 1;

        // Base Economy price between 200k and 600k
        const ecoBaseHash = 200000 + ((hash % 40) * 10000);
        // Base Kendaraan price between 1M and 4M
        const kndBaseHash = 1000000 + ((hash % 30) * 100000);

        for (let dayOffset = -7; dayOffset <= 6; dayOffset++) {
            const dayDate = new Date(baseDate.getTime());
            dayDate.setUTCDate(dayDate.getUTCDate() + dayOffset);
            const year = dayDate.getUTCFullYear();
            const month = dayDate.getUTCMonth();
            const day = dayDate.getUTCDate();

            // Randomly some days have schedules, some don't.
            const hasSchedules = (hash + dayOffset) % 5 !== 0;

            if (hasSchedules) {
                const schedulesPerDay = 1 + ((hash + dayOffset + 7) % 3); // 1-3 jadwal/hari

                for (let i = 0; i < schedulesPerDay; i++) {
                    const tpl = departTemplates[(dayOffset + i + hash) % departTemplates.length];
                    const departDate = new Date(Date.UTC(year, month, day, tpl.hour, tpl.minute));
                    const departTimestamp = departDate.getTime();
                    const arriveDate = new Date(departTimestamp + (tpl.duration + 60) * 60000); // +60 mnt WIB->WITA
                    const ship = ships[(dayOffset + i + hash) % ships.length];

                    const baseEco = ecoBaseHash + (((dayOffset + 7) * 5000 + i * 15000) % 50000);

                    // Detailed Class Fares Generation
                    const pnpFares = {
                        "VIP Room 1 (1 Tempat Tidur) - incl. 1 PNP": { dewasa: Math.round((baseEco * 1.53) / 5000) * 5000, anak: 0, bayi: 0 },
                        "VIP Room 2 (2 Tempat Tidur) - incl. 2 PNP": { dewasa: Math.round((baseEco * 3.06) / 5000) * 5000, anak: 0, bayi: 0 },
                        "VIP": { dewasa: Math.round((baseEco * 1.28) / 5000) * 5000, anak: Math.round((baseEco * 1.02) / 5000) * 5000, bayi: Math.round((baseEco * 0.17) / 5000) * 5000 },
                        "Kelas I": { dewasa: Math.round((baseEco * 1.39) / 5000) * 5000, anak: Math.round((baseEco * 1.12) / 5000) * 5000, bayi: Math.round((baseEco * 0.19) / 5000) * 5000 },
                        "Kelas II": { dewasa: Math.round((baseEco * 1.31) / 5000) * 5000, anak: Math.round((baseEco * 1.02) / 5000) * 5000, bayi: Math.round((baseEco * 0.17) / 5000) * 5000 },
                        "Kelas III": { dewasa: Math.round((baseEco * 1.25) / 5000) * 5000, anak: Math.round((baseEco * 0.93) / 5000) * 5000, bayi: Math.round((baseEco * 0.15) / 5000) * 5000 },
                        "Ekonomi": { dewasa: baseEco, anak: Math.round((baseEco * 0.75) / 5000) * 5000, bayi: Math.round((baseEco * 0.13) / 5000) * 5000 },
                        "Ekonomi - Tidur": { dewasa: Math.round((baseEco * 1.02) / 5000) * 5000, anak: Math.round((baseEco * 0.79) / 5000) * 5000, bayi: Math.round((baseEco * 0.13) / 5000) * 5000 },
                        "Ekonomi - Duduk": { dewasa: baseEco, anak: Math.round((baseEco * 0.75) / 5000) * 5000, bayi: Math.round((baseEco * 0.13) / 5000) * 5000 }
                    };

                    const kndBase = kndBaseHash + (((dayOffset + 7) * 20000 + i * 50000) % 250000);

                    results.push({
                        id: idCounter++,
                        ship,
                        departDateKey: this.toDateKey(departDate),
                        departLabel: this.formatIndoDateLabel(departDate),
                        departTime: this.formatTimeLabel(departDate, 'WIB'),
                        departTimestamp,
                        arriveLabel: this.formatIndoDateLabel(arriveDate),
                        arriveTime: this.formatTimeLabel(arriveDate, 'WITA'),
                        durationMinutes: tpl.duration,
                        fares: {
                            pnpEconomy: baseEco, // for base price calculation
                            pnpVip: pnpFares["VIP"].dewasa,
                            kndBase,
                            detailedPnp: pnpFares
                        }
                    });
                }
            }
        }

        return results.sort((a, b) => a.departTimestamp - b.departTimestamp);
    },

    renderScheduleResults(context = 'pub') {
        const listEl = document.getElementById('schedule-results-list');
        const countEl = document.getElementById('schedule-count');
        const originEl = document.getElementById('schedule-route-origin');
        const destEl = document.getElementById('schedule-route-dest');
        const stripEl = document.getElementById('schedule-date-strip');
        if (!listEl) return;

        if (!this.scheduleResults || this.scheduleResults.length === 0) {
            this.scheduleResults = this.buildMockSchedules();
            this.fareAvailabilityCache = {};
        }

        if (originEl) originEl.textContent = this.lastRoute?.origin || 'SUB';
        if (destEl) destEl.textContent = this.lastRoute?.dest || 'BDJ';

        const ticketTypes = this.getSelectedTicketTypes(context);
        const detailTitle = ticketTypes.pnp && ticketTypes.knd
            ? 'Pilih Kelas Penumpang & Kendaraan'
            : (ticketTypes.knd ? 'Pilih Kelas Kendaraan' : 'Pilih Kelas Penumpang');
        const golonganLabel = this.getSelectedVehicleGolonganLabel(context);

        const dateBuckets = this.buildDateBuckets(context);
        const firstAvailable = dateBuckets.find((b) => b.available);
        const hasCurrentSelected = dateBuckets.some((b) => b.dateKey === this.selectedScheduleDateKey);
        if (!hasCurrentSelected) {
            this.selectedScheduleDateKey = firstAvailable ? firstAvailable.dateKey : (dateBuckets[7]?.dateKey || null);
        }
        const selectedDateKey = this.getSelectedDateKey(firstAvailable ? firstAvailable.dateKey : '');

        if (stripEl) {
            stripEl.innerHTML = dateBuckets.map((bucket) => {
                const isActive = bucket.dateKey === selectedDateKey;
                const dayLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'short', timeZone: 'UTC' }).format(bucket.dateObj).replace('.', '');
                const dateLabel = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: '2-digit', timeZone: 'UTC' }).format(bucket.dateObj).replace(/\./g, '');
                const priceLabel = bucket.available ? this.formatRupiah(bucket.minPrice) : 'Tidak ada';
                const btnClass = isActive
                    ? 'border-dlu-blue bg-dlu-light text-dlu-blue'
                    : (bucket.available ? 'border-gray-200 bg-white text-gray-700 hover:border-dlu-blue' : 'border-gray-200 bg-gray-50 text-gray-400');
                const disabledAttr = bucket.available ? '' : 'disabled';
                const clickAttr = bucket.available ? `onclick="app.setSelectedDateKey('${bucket.dateKey}', '${context}')"` : '';
                return `
                    <button type="button" ${disabledAttr} ${clickAttr}
                        class="inline-flex flex-col items-start justify-center text-left min-w-[156px] h-[72px] mr-2 px-3 py-2 rounded-lg border transition ${btnClass}">
                        <span class="text-xs font-medium">${dayLabel}, ${dateLabel}</span>
                        <span class="text-base font-bold mt-0.5">${priceLabel}</span>
                    </button>
                `;
            }).join('');
        }

        const filteredSchedules = this.scheduleResults
            .filter((s) => s.departDateKey === selectedDateKey)
            .map((s) => ({ ...s, basePrice: this.getScheduleBasePrice(s, context) }))
            .sort((a, b) => {
                if (a.basePrice !== b.basePrice) return a.basePrice - b.basePrice;
                return a.departTimestamp - b.departTimestamp;
            });

        if (countEl) countEl.textContent = String(filteredSchedules.length);

        if (filteredSchedules.length === 0) {
            this.renderedScheduleIds = [];
            listEl.innerHTML = `
                <div class="p-6 text-sm text-gray-500">
                    Tidak ada jadwal keberangkatan pada tanggal ini. Silakan pilih tanggal lain.
                </div>
            `;
            return;
        }

        const mainClassFilters = this.getMainClassFilters(context);
        const defaultFareViewFilter = this.getDefaultFareViewFilter(context);

        listEl.innerHTML = `
            <p class="md:hidden px-4 pt-3 text-[11px] text-gray-500">Geser tabel ke samping untuk lihat kolom lengkap.</p>
            <div class="overflow-x-auto pb-1">
                <table class="w-full min-w-[760px] md:min-w-[980px] text-xs sm:text-sm">
                    <thead class="bg-gray-50 text-gray-600 border-b">
                        <tr>
                            <th class="text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Kapal</th>
                            <th class="text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Berangkat</th>
                            <th class="hidden lg:table-cell text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Tiba</th>
                            <th class="hidden sm:table-cell text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Durasi</th>
                            <th class="text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Mulai dari</th>
                            <th class="text-left font-semibold px-3 md:px-4 py-2.5 md:py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${filteredSchedules.map((s) => {
            const id = s.id;
            const kndPriceText = this.formatRupiah(s.fares?.kndBase);
            const basePriceText = this.formatRupiah(s.basePrice);
            const durationLabel = this.formatDurationLabel(s.durationMinutes);
            const pnpEntries = Object.entries(s.fares?.detailedPnp || {});
            const filteredPnpEntries = pnpEntries.filter(([className]) => {
                const isRoom = className.includes('Room');
                if (isRoom) return this.matchRoomClassFilter(className, mainClassFilters.room);
                return this.matchPassengerClassFilter(className, mainClassFilters.passenger);
            });

            return `
                                <tr class="hover:bg-gray-50 transition align-top">
                                    <td class="px-3 md:px-4 py-3">
                                        <p class="font-semibold text-gray-900">${s.ship}</p>
                                    </td>
                                    <td class="px-3 md:px-4 py-3">
                                        <p class="font-semibold text-gray-900">${s.departTime}</p>
                                        <p class="text-xs text-gray-500 mt-0.5">${s.departLabel}</p>
                                        <p class="text-[11px] text-gray-500 mt-1 lg:hidden">Tiba ${s.arriveTime}</p>
                                    </td>
                                    <td class="hidden lg:table-cell px-3 md:px-4 py-3">
                                        <p class="font-semibold text-gray-900">${s.arriveTime}</p>
                                        <p class="text-xs text-gray-500 mt-0.5">${s.arriveLabel}</p>
                                    </td>
                                    <td class="hidden sm:table-cell px-3 md:px-4 py-3 text-gray-700">${durationLabel}</td>
                                    <td class="px-3 md:px-4 py-3">
                                        <p class="font-bold text-dlu-blue text-sm md:text-base">${basePriceText}</p>
                                    </td>
                                    <td class="px-3 md:px-4 py-3">
                                        <button
                                            class="bg-white border-2 border-dlu-blue text-dlu-blue font-semibold text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-dlu-light transition whitespace-nowrap"
                                            onclick="app.toggleDetail('detail-${id}', this)"
                                            data-detail-toggle="detail-${id}"
                                            aria-expanded="false">
                                            Pilih Kelas <i data-detail-icon class="fa-solid fa-chevron-down ml-2 text-xs transition-transform duration-200"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr id="detail-${id}" class="hidden bg-slate-50/60">
                                    <td colspan="6" class="px-2 sm:px-4 py-3 md:py-4">
                                        <div class="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm">
                                            <div class="flex flex-wrap items-start justify-between gap-2 pb-3 mb-4 border-b border-gray-100">
                                                <h4 id="detail-title-${id}" class="font-bold text-gray-700">${detailTitle}</h4>
                                                <p class="text-xs text-gray-500">Pilih tiket lalu lanjut isi data.</p>
                                            </div>

                                            <div id="detail-pnp-${id}" class="${ticketTypes.pnp ? '' : 'hidden'}">
                                                <div class="mb-3 flex flex-wrap gap-2">
                                                    <button type="button" id="fare-filter-${id}-all"
                                                        class="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-dlu-blue"
                                                        onclick="app.setFareFilter(${id}, 'all')">
                                                        Semua
                                                    </button>
                                                    <button type="button" id="fare-filter-${id}-penumpang"
                                                        class="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-dlu-blue"
                                                        onclick="app.setFareFilter(${id}, 'penumpang')">
                                                        Kelas Penumpang
                                                    </button>
                                                    <button type="button" id="fare-filter-${id}-kamar"
                                                        class="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-dlu-blue"
                                                        onclick="app.setFareFilter(${id}, 'kamar')">
                                                        Kelas Kamar
                                                    </button>
                                                </div>
                                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    ${filteredPnpEntries.length > 0 ? filteredPnpEntries.map(([className, agePrices], idx) => {
                const safeClassId = `${className.replace(/[^a-zA-Z0-9]/g, '')}${idx}`;
                const isRoom = className.includes('Room');
                const fareType = isRoom ? 'kamar' : 'penumpang';
                const dewasaPrice = Number(agePrices?.dewasa) || 0;
                const isAvailable = this.isFareAvailable(id, className, idx);
                const statusLabel = isAvailable ? 'Tersedia' : 'Tidak tersedia';
                const statusClass = isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600';
                const startPrice = isRoom
                    ? dewasaPrice
                    : Math.min(...['dewasa', 'anak', 'bayi'].map((age) => Number(agePrices?.[age]) || Number.POSITIVE_INFINITY));
                const startPriceLabel = Number.isFinite(startPrice) ? this.formatRupiah(startPrice) : this.formatRupiah(0);
                const panelId = `fare-body-${id}-${safeClassId}`;
                const panelGroup = `fare-body-${id}`;
                const panelVisibleClass = idx === 0 ? '' : 'hidden';

                let inputGroup = '';
                if (isRoom) {
                    inputGroup = `
                        <div class="flex items-center justify-between text-sm pt-2">
                            <span class="text-gray-600">Unit</span>
                            <div class="flex items-center border rounded-lg bg-white">
                                <button type="button" class="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 border-r disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed" onclick="app.updateQty('qty-${id}-${safeClassId}-dewasa', -1, ${id})" ${isAvailable ? '' : 'disabled'}>-</button>
                                <input type="text" id="qty-${id}-${safeClassId}-dewasa" class="pnp-input-${id} w-8 text-center text-xs focus:outline-none bg-transparent disabled:text-gray-300" value="0" readonly data-classname="${className}" data-price="${dewasaPrice}" ${isAvailable ? '' : 'disabled'}>
                                <button type="button" class="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 border-l disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed" onclick="app.updateQty('qty-${id}-${safeClassId}-dewasa', 1, ${id})" ${isAvailable ? '' : 'disabled'}>+</button>
                            </div>
                        </div>
                        ${isAvailable ? '' : '<p class="text-[11px] text-red-500 mt-2">Kelas ini sedang tidak tersedia.</p>'}
                    `;
                } else {
                    inputGroup = ['dewasa', 'anak', 'bayi'].map((age) => {
                        const ageLabel = age === 'dewasa' ? 'Dewasa' : (age === 'anak' ? 'Anak' : 'Bayi');
                        const agePrice = Number(agePrices?.[age]) || 0;
                        return `
                            <div class="flex items-center justify-between text-sm ${age === 'dewasa' ? 'pt-2 border-t border-gray-100' : 'mt-2'}">
                                <div class="flex flex-col">
                                    <span class="text-gray-600">${ageLabel}</span>
                                    <span class="text-[10px] text-gray-400 font-medium">${this.formatRupiah(agePrice)}</span>
                                </div>
                                <div class="flex items-center border rounded-lg bg-white">
                                    <button type="button" class="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 border-r disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed" onclick="app.updateQty('qty-${id}-${safeClassId}-${age}', -1, ${id})" ${isAvailable ? '' : 'disabled'}>-</button>
                                    <input type="text" id="qty-${id}-${safeClassId}-${age}" class="pnp-input-${id} w-8 text-center text-xs focus:outline-none bg-transparent disabled:text-gray-300" value="0" readonly data-classname="${className} ${ageLabel}" data-price="${agePrice}" ${isAvailable ? '' : 'disabled'}>
                                    <button type="button" class="px-2.5 py-1.5 hover:bg-gray-100 text-gray-600 border-l disabled:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed" onclick="app.updateQty('qty-${id}-${safeClassId}-${age}', 1, ${id})" ${isAvailable ? '' : 'disabled'}>+</button>
                                </div>
                            </div>
                        `;
                    }).join('') + (isAvailable ? '' : '<p class="text-[11px] text-red-500 mt-2">Kelas ini sedang tidak tersedia.</p>');
                }

                return `
                    <div class="bg-white border border-gray-200 rounded-xl transition hover:border-blue-300 ${isAvailable ? '' : 'opacity-70'}" data-fare-card-for="${id}" data-fare-type="${fareType}">
                        <button type="button"
                            class="w-full flex items-start justify-between gap-3 px-3 py-3 text-left md:cursor-default"
                            onclick="app.toggleFareCard('${panelId}', '${panelGroup}', this)"
                            data-fare-trigger="${panelGroup}">
                            <div class="min-w-0">
                                <p class="font-bold text-dlu-blue text-sm leading-snug">${className}</p>
                                <p class="text-xs text-gray-500 mt-1">Mulai ${startPriceLabel}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${statusClass}">${statusLabel}</span>
                                <i data-fare-chevron class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 md:hidden ${idx === 0 ? 'rotate-180' : ''}"></i>
                            </div>
                        </button>
                        <div id="${panelId}" class="fare-detail-body ${panelGroup} ${panelVisibleClass} md:block px-3 pb-3 border-t border-gray-100">
                            ${inputGroup}
                        </div>
                    </div>
                `;
            }).join('') : `
                                                        <div class="md:col-span-2 lg:col-span-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-sm text-gray-500">
                                                            Tidak ada kelas yang cocok dengan filter utama input. Silakan ubah filter kelas di form pencarian.
                                                        </div>
                                                    `}
                                                </div>
                                            </div>

                                            <div id="detail-knd-${id}" class="${ticketTypes.knd ? '' : 'hidden'} mt-5 pt-4 border-t border-gray-200">
                                                <p class="text-sm font-bold text-gray-700 mb-2">Kendaraan</p>
                                                <div class="flex justify-between items-center py-3 px-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition">
                                                    <div>
                                                        <p class="font-semibold text-gray-800">Golongan <span id="detail-knd-golongan-${id}" class="text-sm text-gray-500 font-normal">${golonganLabel}</span></p>
                                                        <p class="text-sm font-medium text-dlu-blue mt-1">${kndPriceText} <span class="text-xs text-gray-500 font-normal">/ Unit</span></p>
                                                    </div>
                                                    <div class="flex items-center border rounded-lg bg-white shadow-sm">
                                                        <button class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-r" onclick="app.updateQty('qty-knd-${id}', -1, ${id})">-</button>
                                                        <input type="text" id="qty-knd-${id}" class="knd-input-${id} w-10 text-center text-sm font-medium focus:outline-none bg-transparent" value="0" readonly data-classname="Kendaraan ${golonganLabel}" data-price="${Number(s.fares?.kndBase) || 0}">
                                                        <button class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-l" onclick="app.updateQty('qty-knd-${id}', 1, ${id})">+</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mt-5 class-selection-summary md:sticky md:bottom-4 z-10 rounded-xl border border-blue-100 bg-white/95 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
                                                <div class="min-w-0">
                                                    <span class="text-xs text-gray-500">Ringkasan Pilihan</span>
                                                    <p id="detail-summary-${id}" class="text-sm font-semibold text-dlu-blue max-w-full md:max-w-xl">Belum ada tiket dipilih.</p>
                                                    <p id="detail-total-${id}" class="text-base font-bold text-gray-800 mt-0.5">${this.formatRupiah(0)}</p>
                                                </div>
                                                <button id="detail-continue-${id}" class="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-sm bg-gray-300 text-gray-500 cursor-not-allowed transition"
                                                    onclick="app.proceedFromClassSelection(${id})" disabled>
                                                    Lanjut Isi Data <i class="fa-solid fa-arrow-right ml-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.renderedScheduleIds = filteredSchedules.map((s) => s.id);
        this.renderedScheduleIds.forEach((id) => {
            if (!this.fareViewFilters[id]) this.fareViewFilters[id] = defaultFareViewFilter;
            this.refreshClassSelectionCTA(id);
            this.applyFareFilter(id);
        });
    },

    closeInlineResults() {
        const section = document.getElementById('inline-results-section');
        if (section) section.classList.add('hidden');
    },

    renderInlinePublicSchedules(schedules = [], meta = {}) {
        const list = document.getElementById('inline-results-list');
        const section = document.getElementById('inline-results-section');
        const subtitle = document.getElementById('inline-results-subtitle');
        const cta = document.getElementById('inline-login-cta');
        if (!list || !section || !subtitle || !cta) return;

        const originCode = this.lastRoute?.origin || '-';
        const destCode = this.lastRoute?.dest || '-';
        const originLabel = meta.originLabel || originCode;
        const destLabel = meta.destLabel || destCode;

        subtitle.textContent = `${originCode} -> ${destCode} | ${schedules.length} jadwal tersedia`;

        if (!Array.isArray(schedules) || schedules.length === 0) {
            list.innerHTML = `
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                    <p class="font-semibold text-gray-700">Tidak ada jadwal dari ${this.escapeHtml(originLabel)} ke ${this.escapeHtml(destLabel)} untuk hari ini dan seterusnya.</p>
                    <p class="text-sm text-gray-500 mt-2">Silakan ubah rute pencarian untuk melihat jadwal lainnya.</p>
                </div>
            `;
            cta.classList.add('hidden');
            section.classList.remove('hidden');
            setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            return;
        }

        list.innerHTML = schedules.map((s) => {
            const basePrice = this.getScheduleBasePrice(s, 'pub');
            const ecoPrice = this.formatRupiah(s.fares?.pnpEconomy);
            const vipPrice = this.formatRupiah(s.fares?.pnpVip);
            const durationLabel = this.formatDurationLabel(s.durationMinutes);

            const pnpEntries = Object.entries(s.fares?.detailedPnp || {});
            const availableCount = pnpEntries.filter(([className], idx) => this.isFareAvailable(s.id, className, idx)).length;
            const available = availableCount > 0;
            const availabilityBadge = available
                ? `<span class="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Tersedia</span>`
                : `<span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">Tidak Tersedia</span>`;
            const actionButton = available
                ? `<button onclick="app.promptLoginToBook()" class="bg-dlu-blue text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-800 transition shadow-sm text-sm flex items-center gap-2">Pesan <i class="fa-solid fa-arrow-right text-xs"></i></button>`
                : `<button disabled class="bg-gray-200 text-gray-500 font-bold py-2.5 px-6 rounded-xl text-sm cursor-not-allowed">Penuh</button>`;

            return `
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5 duration-200">
                    <div class="p-5">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="fa-solid fa-ship text-dlu-blue"></i>
                                    <span class="font-bold text-gray-800 text-base">${this.escapeHtml(s.ship)}</span>
                                    ${availabilityBadge}
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-gray-900">${this.escapeHtml(s.departTime)}</div>
                                        <div class="text-xs text-gray-500">${this.escapeHtml(s.departLabel)}</div>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <span class="text-[10px] text-gray-400 mb-1">${this.escapeHtml(durationLabel)}</span>
                                        <div class="w-full flex items-center gap-1">
                                            <div class="h-0.5 flex-1 bg-gray-200"></div>
                                            <i class="fa-solid fa-ship text-dlu-blue text-xs"></i>
                                            <div class="h-0.5 flex-1 bg-gray-200"></div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-gray-900">${this.escapeHtml(s.arriveTime)}</div>
                                        <div class="text-xs text-gray-500">${this.escapeHtml(s.arriveLabel)}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                <div>
                                    <div class="text-xs text-gray-400">Mulai dari</div>
                                    <div class="text-xl font-extrabold text-dlu-blue">${this.escapeHtml(this.formatRupiah(basePrice))}</div>
                                    <div class="text-xs text-gray-400">/ tiket</div>
                                </div>
                                ${actionButton}
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-5 py-2.5 flex gap-6 border-t border-gray-100 text-xs text-gray-500 flex-wrap">
                        <span><i class="fa-solid fa-chair mr-1 text-gray-400"></i> Ekonomi: <b class="text-gray-700">${this.escapeHtml(ecoPrice)}</b></span>
                        <span><i class="fa-solid fa-gem mr-1 text-yellow-500"></i> VIP: <b class="text-gray-700">${this.escapeHtml(vipPrice)}</b></span>
                        <span class="ml-auto"><i class="fa-solid fa-ticket mr-1 text-gray-400"></i> <b>${availableCount}</b> kelas tersedia</span>
                    </div>
                </div>
            `;
        }).join('');

        section.classList.remove('hidden');
        cta.classList.remove('hidden');
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
        const input = document.getElementById('search-' + type);
        const dropdown = document.getElementById('dropdown-' + type);
        if (!input || !dropdown) return;

        input.value = portText;
        dropdown.classList.remove('active');
        this.validateInput(input.parentElement.parentElement); // trigger validation styling

        if (type === 'origin') {
            const originCode = this.toRouteCode(portText, '');
            this.renderPublicDestinationOptionsByOriginCode(originCode);
        }
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
                this.syncNavbarAuthState();
                // Return to appropriate view
                this.navigate('home');
                this.switchDashboardTab(null, 'search');
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
            const regName = document.getElementById('reg-name')?.value?.trim() || 'Pengguna Baru';
            this.isLoggedIn = true;
            this.currentUser = { name: regName };
            this.syncNavbarAuthState();
            this.navigate('home');
            this.switchDashboardTab(null, 'search');
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
            this.syncNavbarAuthState();
            this.toggleMobileNav(false);
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

    getMainClassFilters(context = 'dash') {
        if (context !== 'dash') {
            return { passenger: 'all', room: 'all' };
        }
        const passenger = document.getElementById('dash-passenger-class')?.value || 'all';
        const room = document.getElementById('dash-room-class')?.value || 'all';
        return { passenger, room };
    },

    getDefaultFareViewFilter(context = 'dash') {
        const filters = this.getMainClassFilters(context);
        if (filters.room !== 'all' && filters.passenger === 'all') return 'kamar';
        if (filters.passenger !== 'all' && filters.room === 'all') return 'penumpang';
        return 'all';
    },

    matchPassengerClassFilter(className, filterKey = 'all') {
        if (filterKey === 'all') return true;
        const text = String(className || '').toLowerCase();
        const rules = {
            vip: /^vip$/i,
            kelas_i: /^kelas i$/i,
            kelas_ii: /^kelas ii$/i,
            kelas_iii: /^kelas iii$/i,
            ekonomi: /^ekonomi$/i,
            ekonomi_tidur: /^ekonomi\s*-\s*tidur$/i,
            ekonomi_duduk: /^ekonomi\s*-\s*duduk$/i
        };
        const rule = rules[filterKey];
        return rule ? rule.test(text) : true;
    },

    matchRoomClassFilter(className, filterKey = 'all') {
        if (filterKey === 'all') return true;
        const text = String(className || '').toLowerCase();
        if (filterKey === 'vip_room_1') return text.includes('vip room 1');
        if (filterKey === 'vip_room_2') return text.includes('vip room 2');
        return true;
    },

    isFareAvailable(scheduleId, className, index = 0) {
        // Randomized per search result, cached so status doesn't change on every rerender/click.
        const key = `${scheduleId}|${className}|${index}`;
        if (typeof this.fareAvailabilityCache[key] !== 'boolean') {
            this.fareAvailabilityCache[key] = Math.random() >= 0.25; // ~75% tersedia
        }
        return this.fareAvailabilityCache[key];
    },

    syncPilihClassOptions(context = 'pub') {
        this.renderScheduleResults(context);
    },

    setFareFilter(itemId, filterType = 'all') {
        this.fareViewFilters[itemId] = filterType;
        this.applyFareFilter(itemId);
    },

    applyFareFilter(itemId) {
        const activeFilter = this.fareViewFilters[itemId] || this.getDefaultFareViewFilter(this.lastSearchContext || 'dash');
        const cards = document.querySelectorAll(`[data-fare-card-for="${itemId}"]`);

        cards.forEach((card) => {
            const fareType = card.dataset.fareType || 'penumpang';
            const showCard = activeFilter === 'all' || activeFilter === fareType;
            card.classList.toggle('hidden', !showCard);
        });

        ['all', 'penumpang', 'kamar'].forEach((type) => {
            const btn = document.getElementById(`fare-filter-${itemId}-${type}`);
            if (!btn) return;
            const isActive = type === activeFilter;
            btn.classList.toggle('bg-dlu-blue', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('border-dlu-blue', isActive);
            btn.classList.toggle('bg-white', !isActive);
            btn.classList.toggle('text-gray-700', !isActive);
            btn.classList.toggle('border-gray-200', !isActive);
        });
    },

    refreshClassSelectionCTA(itemId = 1) {
        const pnpWrap = document.getElementById(`detail-pnp-${itemId}`);
        const kndWrap = document.getElementById(`detail-knd-${itemId}`);
        const summaryEl = document.getElementById(`detail-summary-${itemId}`);
        const totalEl = document.getElementById(`detail-total-${itemId}`);
        const continueBtn = document.getElementById(`detail-continue-${itemId}`);

        if (!summaryEl || !continueBtn) return;

        const pnpVisible = !!pnpWrap && !pnpWrap.classList.contains('hidden');
        const kndVisible = !!kndWrap && !kndWrap.classList.contains('hidden');

        let totalPnp = 0;
        let totalKnd = 0;
        let totalAmount = 0;
        const selectedClasses = [];
        const selectedItems = [];

        if (pnpVisible) {
            const pnpInputs = document.querySelectorAll(`.pnp-input-${itemId}`);
            pnpInputs.forEach(input => {
                const val = parseInt(input.value, 10) || 0;
                if (val > 0) {
                    totalPnp += val;
                    const unitPrice = parseInt(input.dataset.price || '0', 10) || 0;
                    totalAmount += unitPrice * val;
                    selectedClasses.push(`${input.dataset.classname} x${val}`);
                    selectedItems.push({
                        category: 'pnp',
                        label: input.dataset.classname || 'Penumpang',
                        qty: val,
                        unitPrice
                    });
                }
            });
        }

        if (kndVisible) {
            const qtyKndEl = document.getElementById(`qty-knd-${itemId}`);
            const val = qtyKndEl ? (parseInt(qtyKndEl.value, 10) || 0) : 0;
            if (val > 0) {
                totalKnd += val;
                const unitPrice = qtyKndEl ? (parseInt(qtyKndEl.dataset.price || '0', 10) || 0) : 0;
                totalAmount += unitPrice * val;
                selectedClasses.push(`${qtyKndEl?.dataset.classname || 'Kendaraan'} x${val}`);
                selectedItems.push({
                    category: 'knd',
                    label: qtyKndEl?.dataset.classname || 'Kendaraan',
                    qty: val,
                    unitPrice
                });
            }
        }

        const total = totalPnp + totalKnd;

        const parts = [];
        if (totalPnp > 0) parts.push(`PNP ${totalPnp}`);
        if (totalKnd > 0) parts.push(`KND ${totalKnd}`);

        if (parts.length > 0) {
            summaryEl.innerHTML = `Total Tiket: <b>${parts.join(' | ')}</b><span class="text-xs font-normal text-gray-500 block mt-0.5 max-w-full md:max-w-lg break-words" title="${selectedClasses.join(', ')}">${selectedClasses.join(', ')}</span>`;
            if (totalEl) totalEl.textContent = this.formatRupiah(totalAmount);
            continueBtn.disabled = false;
            continueBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            continueBtn.classList.add('bg-dlu-blue', 'text-white', 'hover:bg-blue-800', 'shadow-md');
        } else {
            summaryEl.innerHTML = 'Belum ada tiket dipilih.';
            if (totalEl) totalEl.textContent = this.formatRupiah(0);
            continueBtn.disabled = true;
            continueBtn.classList.remove('bg-dlu-blue', 'text-white', 'hover:bg-blue-800', 'shadow-md');
            continueBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        }

        return {
            total,
            totalPnp,
            totalKnd,
            totalAmount,
            classLabel: selectedClasses.length > 0 ? selectedClasses.join(', ') : 'Sesuai Pilihan',
            selectedItems
        };
    },

    proceedFromClassSelection(itemId = 1) {
        const result = this.refreshClassSelectionCTA(itemId) || { total: 0 };
        if (result.total <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Jumlah Tiket Belum Valid',
                text: 'Minimal pilih 1 tiket sebelum lanjut ke isi data.',
                confirmButtonColor: '#00478F'
            });
            return;
        }

        this.bookTicket({
            scheduleId: itemId,
            classLabel: result.classLabel,
            totalAmount: result.totalAmount,
            totalPnp: result.totalPnp,
            totalKnd: result.totalKnd,
            selectedItems: result.selectedItems
        });
    },

    toggleDetail(detailId, triggerEl = null) {
        const el = document.getElementById(detailId);
        if (!el) return;

        const isOpening = el.classList.contains('hidden');
        if (isOpening) {
            document.querySelectorAll('tr[id^="detail-"]').forEach((row) => {
                if (row.id !== detailId) row.classList.add('hidden');
            });
            document.querySelectorAll('[data-detail-toggle]').forEach((btn) => {
                if (btn !== triggerEl) {
                    btn.setAttribute('aria-expanded', 'false');
                    const icon = btn.querySelector('[data-detail-icon]');
                    if (icon) icon.classList.remove('rotate-180');
                }
            });
            el.classList.remove('hidden');
            const idMatch = detailId.match(/^detail-(\d+)$/);
            if (idMatch) this.applyFareFilter(parseInt(idMatch[1], 10));
        } else {
            el.classList.add('hidden');
        }

        if (triggerEl) {
            triggerEl.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
            const icon = triggerEl.querySelector('[data-detail-icon]');
            if (icon) icon.classList.toggle('rotate-180', isOpening);
        }
    },

    toggleFareCard(panelId, groupClass = '', triggerEl = null) {
        if (window.matchMedia('(min-width: 768px)').matches) return;
        const panel = document.getElementById(panelId);
        if (!panel) return;

        const isOpening = panel.classList.contains('hidden');
        if (isOpening && groupClass) {
            document.querySelectorAll(`.${groupClass}`).forEach((node) => node.classList.add('hidden'));
            document.querySelectorAll(`[data-fare-trigger="${groupClass}"] [data-fare-chevron]`).forEach((icon) => {
                icon.classList.remove('rotate-180');
            });
        }

        panel.classList.toggle('hidden', !isOpening);
        if (triggerEl) {
            const icon = triggerEl.querySelector('[data-fare-chevron]');
            if (icon) icon.classList.toggle('rotate-180', isOpening);
        }
    },

    updateQty(inputId, change, itemId = null) {
        const input = document.getElementById(inputId);
        if (!input || input.disabled) return;
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

    getPortMetaByCode(code) {
        const normalizedCode = String(code || '').trim().toUpperCase();
        const found = Object.values(this.dluData?.ports || {}).find((entry) => {
            const match = String(entry).match(/\/\s*([A-Z]{3})\s*$/);
            return match && match[1] === normalizedCode;
        });
        if (!found) return { name: normalizedCode || '-', sub: '-' };

        const match = String(found).match(/^(.*?)\s*\((.*?)\)\s*\/\s*[A-Z]{3}\s*$/);
        if (!match) return { name: found, sub: '-' };
        return {
            name: match[1].trim(),
            sub: match[2].trim()
        };
    },

    escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    initOrderHistoryData() {
        if (this.orderHistory.length > 0) return;
        this.orderHistory = [
            {
                code: 'DLU-A1B2C3',
                bookedAt: '2026-03-05T10:00:00+07:00',
                status: 'LUNAS',
                route: 'Surabaya (SUB) -> Makassar (MAK)',
                shipSummary: 'KM. Dharma Kencana VII | 2 Penumpang',
                departAt: '10 Mar 2026, 09:00 WIB',
                total: 'Rp 980.000',
                transportType: 'ship'
            },
            {
                code: 'DLU-X9Y8Z7',
                bookedAt: '2026-02-20T08:30:00+07:00',
                status: 'MENUNGGU PEMBAYARAN',
                route: 'Balikpapan (BPN) -> Surabaya (SUB)',
                shipSummary: 'KM. Dharma Ferry V | 1 Kendaraan (Gol II)',
                departAt: '25 Feb 2026, 14:00 WITA',
                total: 'Rp 1.285.000',
                transportType: 'car'
            }
        ];
    },

    getOrderStatusMeta(status) {
        const key = String(status || '').toUpperCase();
        if (key === 'LUNAS') {
            return {
                badgeClass: 'bg-green-100 text-green-700',
                icon: 'fa-solid fa-check-circle',
                label: 'LUNAS'
            };
        }
        if (key === 'DIBATALKAN') {
            return {
                badgeClass: 'bg-red-100 text-red-700',
                icon: 'fa-solid fa-ban',
                label: 'DIBATALKAN'
            };
        }
        return {
            badgeClass: 'bg-yellow-100 text-yellow-700',
            icon: 'fa-solid fa-clock',
            label: 'MENUNGGU PEMBAYARAN'
        };
    },

    upsertOrderHistoryFromETicket(rawTicketData) {
        const data = this.normalizeETicketData(rawTicketData);
        const idx = this.orderHistory.findIndex((item) => item.code === data.kode);
        const route = `${data.asal} -> ${data.tujuan}`;
        const shipSummary = `${data.kapal} | ${data.kelas}`;
        const item = {
            code: data.kode,
            bookedAt: new Date().toISOString(),
            status: data.status || 'LUNAS',
            route,
            shipSummary,
            departAt: data.berangkat,
            total: data.total,
            transportType: data.vehicles.length > 0 ? 'car' : 'ship'
        };

        if (idx >= 0) {
            this.orderHistory[idx] = { ...this.orderHistory[idx], ...item };
        } else {
            this.orderHistory.unshift(item);
        }
    },

    renderOrdersHistory() {
        const listEl = document.getElementById('orders-list');
        if (!listEl) return;
        this.initOrderHistoryData();

        const searchInput = document.getElementById('orders-search-input');
        const statusFilter = document.getElementById('orders-status-filter');
        const emptyStateEl = document.getElementById('orders-empty-state');
        const keyword = (searchInput?.value || '').trim().toLowerCase();
        const selectedStatus = String(statusFilter?.value || 'SEMUA').toUpperCase();

        const byNewest = [...this.orderHistory].sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
        const filtered = byNewest.filter((item) => {
            const statusOk = selectedStatus === 'SEMUA' || String(item.status || '').toUpperCase() === selectedStatus;
            const haystack = `${item.code} ${item.route} ${item.shipSummary}`.toLowerCase();
            const keywordOk = !keyword || haystack.includes(keyword);
            return statusOk && keywordOk;
        });

        if (filtered.length === 0) {
            listEl.innerHTML = '';
            if (emptyStateEl) emptyStateEl.classList.remove('hidden');
            return;
        }
        if (emptyStateEl) emptyStateEl.classList.add('hidden');

        listEl.innerHTML = filtered.map((item) => {
            const meta = this.getOrderStatusMeta(item.status);
            const codeSafe = String(item.code || '').replace(/'/g, "\\'");
            const routeText = this.escapeHtml(item.route || '-');
            const shipText = this.escapeHtml(item.shipSummary || '-');
            const departText = this.escapeHtml(item.departAt || '-');
            const totalText = this.escapeHtml(item.total || '-');
            const iconClass = item.transportType === 'car' ? 'fa-solid fa-car' : 'fa-solid fa-ship';
            const bookedDate = this.escapeHtml(new Date(item.bookedAt).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }));
            const statusLabel = this.escapeHtml(meta.label);

            const actionHtml = statusLabel === 'LUNAS'
                ? `
                    <button
                        class="w-full md:w-auto border border-dlu-blue text-dlu-blue hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg text-sm transition"
                        onclick="app.showOrderETicketPopup('${codeSafe}')">
                        Lihat E-Tiket
                    </button>
                `
                : (statusLabel === 'DIBATALKAN'
                    ? `<p class="text-xs text-gray-400 font-medium">Pesanan ini sudah dibatalkan.</p>`
                    : `
                        <div class="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                            <button
                                class="w-full sm:w-auto bg-dlu-blue text-white hover:bg-blue-800 font-semibold py-2 px-4 rounded-lg text-sm transition"
                                onclick="app.payPendingOrder('${codeSafe}')">
                                Bayar Sekarang
                            </button>
                            <button
                                class="w-full sm:w-auto text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold py-2 px-4 rounded-lg text-sm transition"
                                onclick="app.cancelOrder('${codeSafe}')">
                                Batal
                            </button>
                        </div>
                    `);

            return `
                <div class="border border-gray-200 rounded-xl p-5 hover:border-dlu-blue hover:shadow-md transition ${statusLabel === 'DIBATALKAN' ? 'opacity-75' : ''}">
                    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                        <div>
                            <p class="text-xs text-gray-500 font-semibold mb-1">Tanggal Pemesanan: ${bookedDate}</p>
                            <h3 class="text-lg font-bold text-gray-800">Kode Booking: <span class="text-dlu-blue">${this.escapeHtml(item.code)}</span></h3>
                        </div>
                        <div class="text-left md:text-right">
                            <span class="inline-block ${meta.badgeClass} text-xs font-bold px-3 py-1 rounded-full">
                                <i class="${meta.icon} mr-1"></i> ${statusLabel}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div class="flex items-start sm:items-center gap-4 w-full min-w-0">
                            <div class="bg-gray-50 p-3 rounded-lg flex items-center justify-center">
                                <i class="${iconClass} text-2xl text-gray-400"></i>
                            </div>
                            <div class="min-w-0">
                                <p class="font-bold text-gray-800">${routeText}</p>
                                <p class="text-sm text-gray-500">${shipText}</p>
                                <p class="text-xs text-gray-400 mt-1">Berangkat: ${departText}</p>
                                <p class="text-xs font-semibold text-dlu-blue mt-1">Total: ${totalText}</p>
                            </div>
                        </div>
                        ${actionHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    payPendingOrder(orderCode) {
        const idx = this.orderHistory.findIndex((item) => item.code === orderCode);
        if (idx < 0) return;
        const order = this.orderHistory[idx];
        order.status = 'LUNAS';

        if (!this.orderETickets[orderCode]) {
            const routeParts = String(order.route || '').split('->').map((part) => part.trim());
            const shipParts = String(order.shipSummary || '').split('|').map((part) => part.trim());
            this.orderETickets[orderCode] = {
                kode: orderCode,
                status: 'LUNAS',
                kapal: shipParts[0] || '-',
                asal: routeParts[0] || '-',
                asalSub: '-',
                tujuan: routeParts[1] || '-',
                tujuanSub: '-',
                berangkat: order.departAt || '-',
                tiba: '-',
                kelas: shipParts[1] || '-',
                summaryLabel: `Total Pembayaran (${shipParts[1] || '-'})`,
                total: order.total || '-',
                bank: 'Virtual Account',
                pemesan: {
                    nama: this.currentUser?.name || '-',
                    email: this.currentUser?.email || '-',
                    phone: '-',
                    identitas: '-',
                    kota: '-'
                },
                passengers: [],
                vehicles: [],
                cetakPada: new Date().toLocaleString('id-ID')
            };
        }

        Swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil',
            text: `Pesanan ${orderCode} sudah berubah menjadi LUNAS.`,
            confirmButtonColor: '#00478F'
        }).then(() => {
            this.renderOrdersHistory();
            this.showOrderETicketPopup(orderCode);
        });
    },

    cancelOrder(orderCode) {
        const idx = this.orderHistory.findIndex((item) => item.code === orderCode);
        if (idx < 0) return;
        this.orderHistory[idx].status = 'DIBATALKAN';
        this.renderOrdersHistory();
    },

    inferPassengerType(label) {
        const text = String(label || '').toLowerCase();
        if (text.includes('anak')) return { type: 'Anak', note: '(2 - 11 tahun)' };
        if (text.includes('bayi')) return { type: 'Bayi', note: '(< 2 tahun)' };
        return { type: 'Dewasa', note: '(>= 12 tahun)' };
    },

    getPassengerClassName(label) {
        const raw = String(label || '').trim();
        // Remove trailing age suffix so class name stays clean (e.g. "VIP Dewasa" -> "VIP").
        return raw.replace(/\s+(Dewasa|Anak|Bayi)$/i, '').trim() || 'Kelas Penumpang';
    },

    expandSelectionUnits(selection = {}, category = 'pnp') {
        const items = Array.isArray(selection.selectedItems) ? selection.selectedItems : [];
        const units = [];
        items
            .filter((item) => item?.category === category)
            .forEach((item) => {
                const qty = Math.max(0, parseInt(item.qty, 10) || 0);
                const unitPrice = Math.max(0, parseInt(item.unitPrice, 10) || 0);
                for (let i = 0; i < qty; i++) {
                    units.push({
                        label: item.label || (category === 'pnp' ? 'Penumpang' : 'Kendaraan'),
                        unitPrice
                    });
                }
            });
        return units;
    },

    renderPesanTiketDynamicForms(selection = {}) {
        const paxList = document.getElementById('pt-pax-list');
        const kndList = document.getElementById('pt-knd-list');
        if (!paxList || !kndList) return;

        const passengerUnits = this.expandSelectionUnits(selection, 'pnp');
        const vehicleUnits = this.expandSelectionUnits(selection, 'knd');
        const passengerPass = 2500;
        const vehiclePass = 32200;
        const cityOptionsHtml = `
            <option value="">-- Pilih kota/kabupaten --</option>
            <option>Kota Jakarta</option>
            <option>Kota Makassar</option>
            <option>Kota Surabaya</option>
            <option>Kota Balikpapan</option>
            <option>Kota Banjarmasin</option>
            <option>Kabupaten Tanah Bumbu (Batulicin)</option>
            <option>Kota Samarinda</option>
            <option>Kota Manado</option>
            <option>Kota Denpasar</option>
        `;

        paxList.innerHTML = passengerUnits.map((unit, idx) => {
            const paxNo = idx + 1;
            const prefix = `pax${idx}`;
            const person = this.inferPassengerType(unit.label);
            const passengerClass = this.escapeHtml(this.getPassengerClassName(unit.label));
            const isAdult = person.type === 'Dewasa';
            const unitPriceText = this.formatRupiah(unit.unitPrice);
            const subtotalText = this.formatRupiah(unit.unitPrice + passengerPass);
            const fareLabel = this.escapeHtml(`Tarif ${this.getPassengerClassName(unit.label)} ${person.type}`);
            const titleOptions = isAdult
                ? `
                    <option>Tuan</option>
                    <option>Nyonya</option>
                    <option>Nona</option>
                `
                : `
                    <option>An.</option>
                    <option>Sdr.</option>
                    <option>Sdri.</option>
                `;
            return `
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 flex-wrap gap-2">
                        <div class="flex items-center gap-2">
                            <span class="bg-blue-100 text-dlu-blue text-xs font-bold px-3 py-1 rounded-full">Penumpang ${paxNo}</span>
                            <span class="font-semibold text-sm text-gray-700">${person.type}</span>
                            <span class="text-xs text-gray-400">${person.note}</span>
                            <span class="text-[11px] font-semibold text-dlu-blue bg-blue-50 px-2 py-0.5 rounded">${passengerClass}</span>
                        </div>
                        <span class="text-xs text-gray-500">Tarif: <span class="font-semibold text-gray-800">${unitPriceText}</span></span>
                    </div>
                    <div class="p-4">
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                            <div class="md:col-span-3">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Titel <span class="text-red-500">*</span></label>
                                <select id="${prefix}-title" name="${prefix}_title" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition cursor-pointer">
                                    ${titleOptions}
                                </select>
                            </div>
                            <div class="md:col-span-9">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                                <input type="text" id="${prefix}-name" name="${prefix}_name" placeholder="Sesuai KTP / Passport" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                            ${isAdult ? `
                            <div class="md:col-span-5">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">KTP/SIM/Passport <span class="text-red-500">*</span></label>
                                <input type="text" id="${prefix}-idnum" name="${prefix}_idnum" placeholder="No. Identitas" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>` : ''}
                            <div class="${isAdult ? 'md:col-span-3' : 'md:col-span-4'}">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Tgl Lahir <span class="text-red-500">*</span></label>
                                <input type="text" id="${prefix}-dob" name="${prefix}_dob" placeholder="DD-MM-YYYY" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>
                            <div class="${isAdult ? 'md:col-span-4' : 'md:col-span-8'}">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Kota/Kab. <span class="text-red-500">*</span></label>
                                <select id="${prefix}-city" name="${prefix}_city" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition cursor-pointer">
                                    ${cityOptionsHtml}
                                </select>
                            </div>
                            <div class="md:col-span-5">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Ket.</label>
                                <textarea id="${prefix}-ket" name="${prefix}_ket" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition resize-y"></textarea>
                            </div>
                            <div class="md:col-span-7">
                                <div class="space-y-2 text-sm">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1.5">${fareLabel}</label>
                                        <div class="w-full border border-gray-200 rounded-lg px-3 py-2 text-right font-semibold text-gray-800 bg-white">
                                            ${unitPriceText}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1.5">Pass Penumpang</label>
                                        <div class="w-full border border-gray-200 rounded-lg px-3 py-2 text-right font-semibold text-gray-800 bg-white">
                                            ${this.formatRupiah(passengerPass)}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-gray-800 mb-1.5">Subtotal</label>
                                        <div class="w-full border border-gray-200 rounded-lg px-3 py-2 text-right font-bold text-gray-800 bg-gray-50">
                                            ${subtotalText}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        kndList.innerHTML = vehicleUnits.map((unit, idx) => {
            const kndNo = idx + 1;
            const prefix = `knd${idx}`;
            const unitLabel = this.escapeHtml(unit.label || 'Kendaraan');
            const unitPriceText = this.formatRupiah(unit.unitPrice);
            const subtotalText = this.formatRupiah(unit.unitPrice + vehiclePass);
            return `
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 flex-wrap gap-2">
                        <div class="flex items-center gap-2">
                            <span class="bg-blue-100 text-dlu-blue text-xs font-bold px-3 py-1 rounded-full">Kendaraan ${kndNo}</span>
                            <span class="font-semibold text-sm text-gray-700">${unitLabel}</span>
                        </div>
                        <span class="text-xs text-gray-500">Tarif: <span class="font-semibold text-gray-800">${unitPriceText}</span></span>
                    </div>
                    <div class="p-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Nama Pemilik (STNK) <span class="text-red-500">*</span></label>
                                <input type="text" id="${prefix}-name" name="${prefix}_name" placeholder="Nama sesuai STNK" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">No. Polisi <span class="text-red-500">*</span></label>
                                <input type="text" id="${prefix}-nopol" name="${prefix}_nopol" placeholder="Contoh: L 1234 AB" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Kota / Kab. <span class="text-red-500">*</span></label>
                                <select id="${prefix}-city" name="${prefix}_city" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition cursor-pointer">
                                    <option value="">-- Pilih --</option>
                                    <option>Kota Jakarta</option>
                                    <option>Kota Makassar</option>
                                    <option>Kota Surabaya</option>
                                    <option>Kota Balikpapan</option>
                                    <option>Kabupaten Tanah Bumbu (Batulicin)</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Muatan</label>
                                <select id="${prefix}-muatan" name="${prefix}_muatan" onchange="app.ptToggleKet('${prefix}')" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition cursor-pointer">
                                    <option value="0">KOSONG</option>
                                    <option value="1">ADA MUATAN</option>
                                </select>
                            </div>
                            <div id="${prefix}-ket-wrap" class="hidden">
                                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Keterangan Muatan</label>
                                <input type="text" id="${prefix}-ket" placeholder="Keterangan muatan" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-dlu-blue outline-none transition">
                            </div>
                        </div>
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4 text-sm">
                            <div class="flex justify-between text-gray-500 py-1"><span>Tarif Kendaraan</span><span>${unitPriceText}</span></div>
                            <div class="flex justify-between text-gray-500 py-1"><span>Pass Kendaraan</span><span>${this.formatRupiah(vehiclePass)}</span></div>
                            <div class="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2 mt-1"><span>Subtotal</span><span>${subtotalText}</span></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    applyBookingSelectionToPesanTiket(selection = {}) {
        this.currentBookingSelection = selection;
        const scheduleId = parseInt(selection.scheduleId, 10);
        const selectedSchedule = this.scheduleResults.find((s) => s.id === scheduleId);
        if (!selectedSchedule) return;

        const originMeta = this.getPortMetaByCode(this.lastRoute?.origin || 'SUB');
        const destMeta = this.getPortMetaByCode(this.lastRoute?.dest || 'BDJ');
        const shipCode = String(selectedSchedule.ship || '')
            .replace(/[^A-Za-z0-9]/g, '')
            .slice(-4)
            .toUpperCase() || 'DLU';

        const shipNameEl = document.getElementById('pt-ship-name');
        if (shipNameEl) {
            shipNameEl.innerHTML = `${selectedSchedule.ship} <span class="text-sm font-normal text-gray-400 ml-1" id="pt-ship-code">${shipCode}</span>`;
        }

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        setText('pt-origin-name', originMeta.name);
        setText('pt-origin-sub', originMeta.sub);
        setText('pt-dest-name', destMeta.name);
        setText('pt-dest-sub', destMeta.sub);
        setText('pt-depart-time', `${selectedSchedule.departLabel} - ${selectedSchedule.departTime}`);
        setText('pt-arrive-time', `${selectedSchedule.arriveLabel} - ${selectedSchedule.arriveTime}`);
        setText('pt-duration', this.formatDurationLabel(selectedSchedule.durationMinutes));
        setText('pt-class', selection.classLabel || 'Sesuai Pilihan');

        const totalAmountText = this.formatRupiah(selection.totalAmount || 0);
        setText('pt-total-display', totalAmountText);
        setText('pt-grand-total-display', totalAmountText);

        const totalPnp = parseInt(selection.totalPnp, 10) || 0;
        const totalKnd = parseInt(selection.totalKnd, 10) || 0;
        const summaryParts = [];
        if (totalPnp > 0) summaryParts.push(`${totalPnp} Penumpang`);
        if (totalKnd > 0) summaryParts.push(`${totalKnd} Kendaraan`);
        setText('pt-total-summary-label', `Total Pembayaran (${summaryParts.length ? summaryParts.join(' + ') : '0 Tiket'})`);
        setText('pt-pax-title', `Data Penumpang${totalPnp > 0 ? ` (${totalPnp})` : ''}`);
        setText('pt-knd-title', `Data Kendaraan${totalKnd > 0 ? ` (${totalKnd})` : ''}`);

        const paxSection = document.getElementById('pt-pax-section');
        const kndSection = document.getElementById('pt-veh-section');
        if (paxSection) paxSection.classList.toggle('hidden', totalPnp <= 0);
        if (kndSection) kndSection.classList.toggle('hidden', totalKnd <= 0);
        this.renderPesanTiketDynamicForms(selection);
    },

    bookTicket(selectionOrClassName, qtyInputId = null, ticketTypeLabel = 'penumpang') {
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
        const isSelectionObject = typeof selectionOrClassName === 'object' && selectionOrClassName !== null;
        const className = isSelectionObject ? (selectionOrClassName.classLabel || 'Sesuai Pilihan') : selectionOrClassName;

        if (isSelectionObject) {
            this.applyBookingSelectionToPesanTiket(selectionOrClassName);
        } else if (className) {
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

    getNodeText(id, fallback = '-') {
        const el = document.getElementById(id);
        const value = el && el.textContent ? el.textContent.trim() : '';
        return value || fallback;
    },

    getInputValue(id, fallback = '-') {
        const el = document.getElementById(id);
        if (!el) return fallback;
        const value = typeof el.value === 'string' ? el.value.trim() : '';
        return value || fallback;
    },

    collectPassengerManifest(selection = this.currentBookingSelection) {
        const units = this.expandSelectionUnits(selection || {}, 'pnp');
        return units.map((unit, idx) => {
            const prefix = `pax${idx}`;
            const person = this.inferPassengerType(unit.label);
            const isAdult = person.type === 'Dewasa';
            const title = this.getInputValue(`${prefix}-title`, '');
            const nameOnly = this.getInputValue(`${prefix}-name`, `Penumpang ${idx + 1}`);
            const fullName = `${title && title !== '-' ? `${title} ` : ''}${nameOnly}`.trim();

            return {
                no: idx + 1,
                nama: fullName || `Penumpang ${idx + 1}`,
                jenis: person.type,
                kelas: this.getPassengerClassName(unit.label),
                identitas: isAdult ? this.getInputValue(`${prefix}-idnum`, '-') : '-',
                tglLahir: this.getInputValue(`${prefix}-dob`, '-'),
                kota: this.getInputValue(`${prefix}-city`, '-')
            };
        });
    },

    collectVehicleManifest(selection = this.currentBookingSelection) {
        const units = this.expandSelectionUnits(selection || {}, 'knd');
        return units.map((unit, idx) => {
            const prefix = `knd${idx}`;
            return {
                no: idx + 1,
                jenis: unit.label || `Kendaraan ${idx + 1}`,
                pemilik: this.getInputValue(`${prefix}-name`, '-'),
                nopol: this.getInputValue(`${prefix}-nopol`, '-'),
                kota: this.getInputValue(`${prefix}-city`, '-')
            };
        });
    },

    buildLiveETicketData(kodeBooking, bankName = '-', status = 'LUNAS') {
        const code = String(kodeBooking || `DLU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
        return {
            kode: code,
            status,
            kapal: this.getNodeText('pt-ship-name'),
            asal: this.getNodeText('pt-origin-name'),
            asalSub: this.getNodeText('pt-origin-sub'),
            tujuan: this.getNodeText('pt-dest-name'),
            tujuanSub: this.getNodeText('pt-dest-sub'),
            berangkat: this.getNodeText('pt-depart-time'),
            tiba: this.getNodeText('pt-arrive-time'),
            kelas: this.getNodeText('pt-class'),
            summaryLabel: this.getNodeText('pt-total-summary-label'),
            total: this.getNodeText('pt-total-display'),
            bank: bankName,
            pemesan: {
                nama: this.getInputValue('pt-name', '-'),
                email: this.getInputValue('pt-email', '-'),
                phone: this.getInputValue('pt-phone', '-'),
                identitas: this.getInputValue('pt-idnum', '-'),
                kota: this.getInputValue('pt-city', '-')
            },
            passengers: this.collectPassengerManifest(),
            vehicles: this.collectVehicleManifest(),
            cetakPada: new Date().toLocaleString('id-ID')
        };
    },

    normalizeETicketData(rawData) {
        const normalize = (text) => String(text || '-').replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim() || '-';
        const normalizeList = (list, mapFn) => Array.isArray(list) ? list.map(mapFn) : [];
        const pemesan = rawData?.pemesan || {};

        return {
            kode: normalize(rawData?.kode),
            status: normalize(rawData?.status || 'LUNAS'),
            kapal: normalize(rawData?.kapal),
            asal: normalize(rawData?.asal),
            asalSub: normalize(rawData?.asalSub),
            tujuan: normalize(rawData?.tujuan),
            tujuanSub: normalize(rawData?.tujuanSub),
            berangkat: normalize(rawData?.berangkat),
            tiba: normalize(rawData?.tiba),
            kelas: normalize(rawData?.kelas),
            summaryLabel: normalize(rawData?.summaryLabel || rawData?.kelas),
            total: normalize(rawData?.total),
            bank: normalize(rawData?.bank || '-'),
            cetakPada: normalize(rawData?.cetakPada || new Date().toLocaleString('id-ID')),
            pemesan: {
                nama: normalize(pemesan?.nama),
                email: normalize(pemesan?.email),
                phone: normalize(pemesan?.phone),
                identitas: normalize(pemesan?.identitas),
                kota: normalize(pemesan?.kota)
            },
            passengers: normalizeList(rawData?.passengers, (item, idx) => ({
                no: idx + 1,
                nama: normalize(item?.nama),
                jenis: normalize(item?.jenis),
                kelas: normalize(item?.kelas),
                identitas: normalize(item?.identitas),
                tglLahir: normalize(item?.tglLahir),
                kota: normalize(item?.kota)
            })),
            vehicles: normalizeList(rawData?.vehicles, (item, idx) => ({
                no: idx + 1,
                jenis: normalize(item?.jenis),
                pemilik: normalize(item?.pemilik),
                nopol: normalize(item?.nopol),
                kota: normalize(item?.kota)
            }))
        };
    },

    buildETicketPopupHtml(rawData) {
        const data = this.normalizeETicketData(rawData);
        const esc = (value) => this.escapeHtml(value);
        const isPaid = /LUNAS/i.test(data.status);
        const statusClass = isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
        const passengerRows = data.passengers.length
            ? data.passengers.map((p) => `
                <tr class="border-t border-gray-100">
                    <td class="py-2.5 pr-2 font-medium text-gray-700">${esc(String(p.no))}</td>
                    <td class="py-2.5 pr-2 text-gray-800">${esc(p.nama)}</td>
                    <td class="py-2.5 pr-2 text-gray-600">${esc(`${p.kelas} / ${p.jenis}`)}</td>
                    <td class="py-2.5 text-gray-600">${esc(`ID: ${p.identitas} | DOB: ${p.tglLahir}`)}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="4" class="py-3 text-center text-gray-500">Tidak ada data penumpang.</td></tr>';

        const vehicleRows = data.vehicles.length
            ? data.vehicles.map((v) => `
                <tr class="border-t border-gray-100">
                    <td class="py-2.5 pr-2 font-medium text-gray-700">${esc(String(v.no))}</td>
                    <td class="py-2.5 pr-2 text-gray-800">${esc(v.jenis)}</td>
                    <td class="py-2.5 pr-2 text-gray-600">${esc(v.pemilik)}</td>
                    <td class="py-2.5 text-gray-600">${esc(v.nopol)}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="4" class="py-3 text-center text-gray-500">Tidak ada data kendaraan.</td></tr>';

        return `
            <div class="text-left overflow-hidden border border-gray-200 rounded-2xl">
                <div class="bg-gradient-to-r from-dlu-blue to-blue-700 text-white px-5 py-4">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p class="text-xs uppercase tracking-wide opacity-80">DLU E-Ticket</p>
                            <h3 class="text-lg font-bold mt-0.5">${esc(data.kode)}</h3>
                        </div>
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full ${statusClass}">${esc(data.status)}</span>
                    </div>
                    <p class="text-sm mt-3 font-semibold">${esc(data.asal)} -> ${esc(data.tujuan)}</p>
                    <p class="text-xs opacity-90 mt-1">${esc(data.berangkat)}</p>
                </div>

                <div class="p-4 sm:p-5 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div class="rounded-xl border border-gray-200 bg-gray-50 p-3">
                            <p class="text-xs text-gray-500 mb-1">Kapal</p>
                            <p class="font-semibold text-gray-800">${esc(data.kapal)}</p>
                            <p class="text-xs text-gray-500 mt-1">${esc(data.asalSub)} -> ${esc(data.tujuanSub)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-gray-50 p-3">
                            <p class="text-xs text-gray-500 mb-1">Total Pembayaran</p>
                            <p class="font-bold text-lg text-dlu-blue">${esc(data.total)}</p>
                            <p class="text-xs text-gray-500 mt-1">${esc(data.bank)}</p>
                        </div>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-3">
                        <p class="font-semibold text-gray-800 mb-2">Data Pemesan</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p class="text-gray-600">Nama: <span class="font-medium text-gray-800">${esc(data.pemesan.nama)}</span></p>
                            <p class="text-gray-600">Telepon: <span class="font-medium text-gray-800">${esc(data.pemesan.phone)}</span></p>
                            <p class="text-gray-600">Email: <span class="font-medium text-gray-800">${esc(data.pemesan.email)}</span></p>
                            <p class="text-gray-600">Kota: <span class="font-medium text-gray-800">${esc(data.pemesan.kota)}</span></p>
                        </div>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-3">
                        <p class="font-semibold text-gray-800 mb-2">Manifest Penumpang (${data.passengers.length})</p>
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-xs sm:text-sm">
                                <thead class="text-left text-gray-500 border-b border-gray-100">
                                    <tr>
                                        <th class="pb-2 pr-2 w-8">No</th>
                                        <th class="pb-2 pr-2">Nama</th>
                                        <th class="pb-2 pr-2">Kelas</th>
                                        <th class="pb-2">Identitas / Tgl Lahir</th>
                                    </tr>
                                </thead>
                                <tbody>${passengerRows}</tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-xl border border-gray-200 p-3">
                        <p class="font-semibold text-gray-800 mb-2">Manifest Kendaraan (${data.vehicles.length})</p>
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-xs sm:text-sm">
                                <thead class="text-left text-gray-500 border-b border-gray-100">
                                    <tr>
                                        <th class="pb-2 pr-2 w-8">No</th>
                                        <th class="pb-2 pr-2">Jenis</th>
                                        <th class="pb-2 pr-2">Pemilik</th>
                                        <th class="pb-2">No Polisi</th>
                                    </tr>
                                </thead>
                                <tbody>${vehicleRows}</tbody>
                            </table>
                        </div>
                    </div>

                    <p class="text-[11px] text-gray-500">Dicetak pada ${esc(data.cetakPada)}. Simpan e-ticket ini untuk proses check-in.</p>
                </div>
            </div>
        `;
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
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40;
        const lineGap = 14;
        let y = 42;

        const ensureSpace = (needed = 24) => {
            if (y + needed > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        };

        const drawSectionTitle = (title) => {
            ensureSpace(24);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text(title, margin, y);
            y += 12;
            doc.setDrawColor(229, 231, 235);
            doc.line(margin, y, pageWidth - margin, y);
            y += 14;
        };

        const drawKeyValue = (label, value) => {
            ensureSpace(22);
            const valueText = String(value || '-');
            const valueLines = doc.splitTextToSize(valueText, pageWidth - margin * 2 - 150);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(107, 114, 128);
            doc.text(label, margin, y);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(17, 24, 39);
            doc.text(valueLines, margin + 150, y);
            y += Math.max(20, valueLines.length * lineGap);
        };

        const drawManifest = (title, rows, formatter, emptyMessage) => {
            drawSectionTitle(title);
            if (!rows.length) {
                ensureSpace(18);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10.5);
                doc.setTextColor(107, 114, 128);
                doc.text(emptyMessage, margin, y);
                y += 18;
                return;
            }
            rows.forEach((row, idx) => {
                const text = `${idx + 1}. ${formatter(row)}`;
                const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
                ensureSpace(lines.length * lineGap + 6);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10.5);
                doc.setTextColor(31, 41, 55);
                doc.text(lines, margin, y);
                y += lines.length * lineGap + 5;
            });
        };

        doc.setFillColor(0, 71, 143);
        doc.rect(0, 0, pageWidth, 104, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(21);
        doc.text('DLU E-Ticket', margin, y);
        y += 24;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Kode Booking: ${data.kode}`, margin, y);
        doc.text(`Status: ${data.status}`, pageWidth - margin - 120, y);
        y = 132;

        drawSectionTitle('Rute Perjalanan');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(17, 24, 39);
        const route = `${data.asal} -> ${data.tujuan}`;
        doc.text(route, margin, y);
        y += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(75, 85, 99);
        doc.text(`${data.asalSub} -> ${data.tujuanSub}`, margin, y);
        y += 22;

        drawSectionTitle('Informasi Tiket');
        drawKeyValue('Kapal', data.kapal);
        drawKeyValue('Kelas', data.kelas);
        drawKeyValue('Berangkat', data.berangkat);
        drawKeyValue('Tiba', data.tiba);
        drawKeyValue('Metode Bayar', data.bank);
        drawKeyValue('Ringkasan', data.summaryLabel);

        ensureSpace(36);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(107, 114, 128);
        doc.text('Total Pembayaran', margin, y);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(21);
        doc.setTextColor(0, 71, 143);
        doc.text(data.total, margin + 150, y);
        y += 28;

        drawSectionTitle('Data Pemesan');
        drawKeyValue('Nama', data.pemesan.nama);
        drawKeyValue('Telepon', data.pemesan.phone);
        drawKeyValue('Email', data.pemesan.email);
        drawKeyValue('Identitas', data.pemesan.identitas);
        drawKeyValue('Kota', data.pemesan.kota);

        drawManifest(
            `Manifest Penumpang (${data.passengers.length})`,
            data.passengers,
            (p) => `${p.nama} | ${p.kelas}/${p.jenis} | ID: ${p.identitas} | DOB: ${p.tglLahir} | ${p.kota}`,
            'Tidak ada data penumpang.'
        );

        drawManifest(
            `Manifest Kendaraan (${data.vehicles.length})`,
            data.vehicles,
            (v) => `${v.jenis} | Pemilik: ${v.pemilik} | Nopol: ${v.nopol} | ${v.kota}`,
            'Tidak ada data kendaraan.'
        );

        ensureSpace(20);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(107, 114, 128);
        doc.text(`Dibuat pada ${data.cetakPada}. Simpan file ini untuk check-in di pelabuhan.`, margin, y);

        doc.save(fileName || `E-Ticket-${data.kode}.pdf`);
    },

    ptDownloadETicketPdf(kodeBooking, bankName = '-') {
        const data = this.buildLiveETicketData(kodeBooking, bankName, 'LUNAS');
        this.downloadETicketPdf(data);
    },

    getOrderETicketData(orderCode) {
        if (orderCode && this.orderETickets[orderCode]) {
            return this.orderETickets[orderCode];
        }

        const orders = {
            'DLU-A1B2C3': {
                kode: 'DLU-A1B2C3',
                status: 'LUNAS',
                kapal: 'KM. Dharma Kencana VII',
                asal: 'Surabaya (SUB)',
                asalSub: 'Pel. Tanjung Perak',
                tujuan: 'Makassar (MAK)',
                tujuanSub: 'Pel. Soekarno Hatta',
                berangkat: '10 Mar 2026, 09:00 WIB',
                tiba: '11 Mar 2026, 08:15 WITA',
                kelas: '2 Penumpang',
                summaryLabel: 'Total Pembayaran (2 Penumpang)',
                total: 'Rp 980.000',
                bank: 'BRI Virtual Account',
                pemesan: {
                    nama: 'Budi Santoso',
                    email: 'budi@example.com',
                    phone: '081234567890',
                    identitas: '3510xxxxxxxxxxxx',
                    kota: 'Kota Surabaya'
                },
                passengers: [
                    { nama: 'Tuan Budi Santoso', jenis: 'Dewasa', kelas: 'Ekonomi', identitas: '3510xxxxxxxxxxxx', tglLahir: '12-01-1990', kota: 'Kota Surabaya' },
                    { nama: 'Nyonya Siti Nuraini', jenis: 'Dewasa', kelas: 'Ekonomi', identitas: '3510xxxxxxxxxxxx', tglLahir: '24-09-1992', kota: 'Kota Surabaya' }
                ],
                vehicles: [],
                cetakPada: new Date().toLocaleString('id-ID')
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
            width: 960,
            confirmButtonColor: '#00478F',
            confirmButtonText: 'Download PDF',
            showCancelButton: true,
            cancelButtonText: 'Tutup',
            html: this.buildETicketPopupHtml(data)
        }).then((result) => {
            if (result.isConfirmed) this.downloadETicketPdf(data);
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
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
        }
        setTimeout(() => {
            const kode = `DLU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            const bankNameEl = bank.closest('label')?.querySelector('p');
            const bankName = bankNameEl ? bankNameEl.textContent.trim() : 'Virtual Account';
            const ticketData = this.buildLiveETicketData(kode, bankName, 'LUNAS');
            this.orderETickets[kode] = ticketData;
            this.upsertOrderHistoryFromETicket(ticketData);

            Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil!',
                html: `Kode booking: <b>${this.escapeHtml(kode)}</b><br>E-ticket sudah siap.`,
                confirmButtonColor: '#00478F',
                confirmButtonText: 'Lihat E-Ticket',
                showDenyButton: true,
                denyButtonText: 'Download PDF',
                showCancelButton: true,
                cancelButtonText: 'Kembali ke Beranda'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.navigate('home');
                    if (this.isLoggedIn) this.openDashboardTab('orders');
                    this.showOrderETicketPopup(kode);
                    return;
                }
                if (result.isDenied) {
                    this.downloadETicketPdf(ticketData);
                }
                this.navigate('home');
            });
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Lanjut ke Pembayaran <i class="fa-solid fa-arrow-right"></i>';
            }
        }, 1200);
    }
};

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial UI state setup based on static class attributes
    app.navigate('home');
    app.syncNavbarAuthState();
    app.toggleMobileNav(false);

    // Initialize Slider
    app.initSlider();

    // Populate dropdowns with real data
    app.initPorts();
    app.initOrderHistoryData();
    app.renderOrdersHistory();

    // Run custom setup methods
    app.setupInlineValidations();

    // Initialize dashboard date controls:
    // - default departure = today
    // - round trip enables/disables return date
    // - return date cannot be before departure
    app.initDashboardDateControls();

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-container')) {
            document.querySelectorAll('.custom-select-dropdown').forEach(el => {
                el.classList.remove('active');
            });
        }
        const panel = document.getElementById('nav-mobile-panel');
        const toggleBtn = document.getElementById('nav-mobile-toggle');
        if (panel && toggleBtn && !panel.classList.contains('hidden')) {
            const clickedInsidePanel = panel.contains(e.target);
            const clickedToggleBtn = toggleBtn.contains(e.target);
            if (!clickedInsidePanel && !clickedToggleBtn) {
                app.toggleMobileNav(false);
            }
        }
    });
});


