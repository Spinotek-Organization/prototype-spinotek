// Rental Mobil - Fleet Management System
const D_VER = 'rm_v2.0';
const STORAGE_PREFIX = 'rm_';

const INIT_ARMADA = [
    {
        id: 'ARM-001',
        name: 'Toyota Avanza 1.5 G',
        plate: 'B 1234 ABC',
        year: 2023,
        seats: 7,
        pricePerDay: 350000,
        status: 'tersedia',
        photo: null,
    },
    {
        id: 'ARM-002',
        name: 'Daihatsu Xenia 1.5 R',
        plate: 'B 5678 DEF',
        year: 2022,
        seats: 7,
        pricePerDay: 350000,
        status: 'disewa',
        photo: null,
    },
    {
        id: 'ARM-003',
        name: 'Toyota Innova Reborn 2.4',
        plate: 'B 9012 GHI',
        year: 2024,
        seats: 7,
        pricePerDay: 600000,
        status: 'tersedia',
        photo: null,
    },
    {
        id: 'ARM-004',
        name: 'Mitsubishi Pajero Sport',
        plate: 'B 3456 JKL',
        year: 2023,
        seats: 7,
        pricePerDay: 800000,
        status: 'maintenance',
        photo: null,
    },
    {
        id: 'ARM-005',
        name: 'Toyota Fortuner 2.4',
        plate: 'B 7890 MNO',
        year: 2024,
        seats: 7,
        pricePerDay: 850000,
        status: 'tersedia',
        photo: null,
    },
    {
        id: 'ARM-006',
        name: 'Toyota HiAce',
        plate: 'B 2345 PQR',
        year: 2022,
        seats: 14,
        pricePerDay: 1200000,
        status: 'tersedia',
        photo: null,
    },
];

const INIT_PELANGGAN = [
    {
        id: 'PLG-001',
        name: 'Budi Santoso',
        phone: '081234567890',
        address: 'Jl. Merdeka No. 10, Jakarta',
        idCard: '3201234567890001',
    },
    {
        id: 'PLG-002',
        name: 'Rina Puspitasari',
        phone: '082345678901',
        address: 'Jl. Sudirman No. 25, Bandung',
        idCard: '3207654321098765',
    },
    {
        id: 'PLG-003',
        name: 'Ahmad Hidayat',
        phone: '083456789012',
        address: 'Jl. Gatot Subroto No. 5, Surabaya',
        idCard: '3501234567890012',
    },
    {
        id: 'PLG-004',
        name: 'Siti Nurhaliza',
        phone: '084567890123',
        address: 'Jl. Diponegoro No. 12, Semarang',
        idCard: '3301234567890023',
    },
    {
        id: 'PLG-005',
        name: 'Dedi Kurniawan',
        phone: '085678901234',
        address: 'Jl. Pemuda No. 8, Yogyakarta',
        idCard: '3401234567890034',
    },
    {
        id: 'PLG-006',
        name: 'Maya Sari',
        phone: '086789012345',
        address: 'Jl. Asia Afrika No. 3, Bandung',
        idCard: '3201234567890045',
    },
    {
        id: 'PLG-007',
        name: 'Rudi Hermawan',
        phone: '087890123456',
        address: 'Jl. Thamrin No. 7, Jakarta',
        idCard: '3101234567890056',
    },
    {
        id: 'PLG-008',
        name: 'Linda Agustina',
        phone: '088901234567',
        address: 'Jl. Ahmad Yani No. 15, Surabaya',
        idCard: '3501234567890067',
    },
];
const INIT_BOOKING = [
    {
        id: 'BKG-001',
        number: 'BKG/2026/09/001',
        quotationId: null,
        pelangganId: 'PLG-001',
        mobilId: 'ARM-001',
        startDate: '2026-09-01',
        endDate: '2026-09-03',
        pickupLocation: 'Bandara Soekarno-Hatta',
        returnLocation: 'Hotel Grand Mercure',
        withDriver: false,
        status: 'selesai',
        createdAt: '2026-09-01',
    },
    {
        id: 'BKG-002',
        number: 'BKG/2026/09/002',
        quotationId: null,
        pelangganId: 'PLG-002',
        mobilId: 'ARM-002',
        startDate: '2026-09-05',
        endDate: '2026-09-08',
        pickupLocation: 'Stasiun Bandung',
        returnLocation: 'Stasiun Bandung',
        withDriver: false,
        status: 'selesai',
        createdAt: '2026-09-05',
    },
    {
        id: 'BKG-003',
        number: 'BKG/2026/09/003',
        quotationId: null,
        pelangganId: 'PLG-003',
        mobilId: 'ARM-003',
        startDate: '2026-09-10',
        endDate: '2026-09-13',
        pickupLocation: 'Hotel Sheraton Surabaya',
        returnLocation: 'Bandara Juanda',
        withDriver: true,
        status: 'selesai',
        createdAt: '2026-09-10',
    },
    {
        id: 'BKG-004',
        number: 'BKG/2026/09/004',
        quotationId: null,
        pelangganId: 'PLG-004',
        mobilId: 'ARM-001',
        startDate: '2026-09-14',
        endDate: '2026-09-16',
        pickupLocation: 'Stasiun Semarang',
        returnLocation: 'Hotel Patra Jasa',
        withDriver: false,
        status: 'selesai',
        createdAt: '2026-09-14',
    },
    {
        id: 'BKG-005',
        number: 'BKG/2026/09/005',
        quotationId: null,
        pelangganId: 'PLG-005',
        mobilId: 'ARM-005',
        startDate: '2026-09-16',
        endDate: '2026-09-18',
        pickupLocation: 'Malioboro Hotel',
        returnLocation: 'Bandara Adisucipto',
        withDriver: true,
        status: 'selesai',
        createdAt: '2026-09-16',
    },
    {
        id: 'BKG-006',
        number: 'BKG/2026/09/006',
        quotationId: 'QTN-002',
        pelangganId: 'PLG-006',
        mobilId: 'ARM-006',
        startDate: '2026-09-18',
        endDate: '2026-09-20',
        pickupLocation: 'Bandara Husein Sastranegara',
        returnLocation: 'Hotel Trans Bandung',
        withDriver: true,
        status: 'selesai',
        createdAt: '2026-09-18',
    },
    {
        id: 'BKG-007',
        number: 'BKG/2026/09/007',
        quotationId: null,
        pelangganId: 'PLG-001',
        mobilId: 'ARM-003',
        startDate: '2026-09-20',
        endDate: '2026-09-23',
        pickupLocation: 'Kantor Jakarta Pusat',
        returnLocation: 'Kantor Jakarta Pusat',
        withDriver: false,
        status: 'berjalan',
        createdAt: '2026-09-20',
    },
    {
        id: 'BKG-008',
        number: 'BKG/2026/09/008',
        quotationId: null,
        pelangganId: 'PLG-007',
        mobilId: 'ARM-002',
        startDate: '2026-09-21',
        endDate: '2026-09-24',
        pickupLocation: 'Apartemen Thamrin',
        returnLocation: 'Apartemen Thamrin',
        withDriver: false,
        status: 'berjalan',
        createdAt: '2026-09-21',
    },
    {
        id: 'BKG-009',
        number: 'BKG/2026/09/009',
        quotationId: null,
        pelangganId: 'PLG-003',
        mobilId: 'ARM-001',
        startDate: '2026-09-23',
        endDate: '2026-09-25',
        pickupLocation: 'Hotel Majapahit Surabaya',
        returnLocation: 'Bandara Juanda',
        withDriver: false,
        status: 'dikonfirmasi',
        createdAt: '2026-09-22',
    },
    {
        id: 'BKG-010',
        number: 'BKG/2026/09/010',
        quotationId: null,
        pelangganId: 'PLG-008',
        mobilId: 'ARM-005',
        startDate: '2026-09-25',
        endDate: '2026-09-27',
        pickupLocation: 'Stasiun Surabaya Gubeng',
        returnLocation: 'Mall Tunjungan Plaza',
        withDriver: true,
        status: 'pending',
        createdAt: '2026-09-23',
    },
    {
        id: 'BKG-011',
        number: 'BKG/2026/09/011',
        quotationId: null,
        pelangganId: 'PLG-004',
        mobilId: 'ARM-006',
        startDate: '2026-09-28',
        endDate: '2026-09-30',
        pickupLocation: 'Kantor Semarang',
        returnLocation: 'Bandara Achmad Yani',
        withDriver: true,
        status: 'pending',
        createdAt: '2026-09-24',
    },
    {
        id: 'BKG-012',
        number: 'BKG/2026/09/012',
        quotationId: null,
        pelangganId: 'PLG-005',
        mobilId: 'ARM-003',
        startDate: '2026-09-07',
        endDate: '2026-09-09',
        pickupLocation: 'Hotel Hyatt Yogyakarta',
        returnLocation: 'Bandara Adisucipto',
        withDriver: false,
        status: 'dibatalkan',
        createdAt: '2026-09-07',
    },
];

const INIT_INVOICE = [
    {
        id: 'INV-001',
        number: 'INV/2026/09/001',
        bookingId: 'BKG-001',
        items: [
            { description: 'Sewa Toyota Avanza 1.5 G x2 hari', amount: 700000 },
            { description: 'Biaya supir', amount: 0 },
        ],
        total: 700000,
        paid: 700000,
        denda: 0,
        status: 'lunas',
        createdAt: '2026-09-03',
    },
    {
        id: 'INV-002',
        number: 'INV/2026/09/002',
        bookingId: 'BKG-002',
        items: [
            { description: 'Sewa Daihatsu Xenia 1.5 R x3 hari', amount: 1050000 },
            { description: 'Biaya supir', amount: 0 },
        ],
        total: 1050000,
        paid: 1050000,
        denda: 0,
        status: 'lunas',
        createdAt: '2026-09-08',
    },
    {
        id: 'INV-003',
        number: 'INV/2026/09/003',
        bookingId: 'BKG-003',
        items: [
            { description: 'Sewa Toyota Innova Reborn 2.4 x3 hari', amount: 1800000 },
            { description: 'Biaya supir', amount: 200000 },
        ],
        total: 2000000,
        paid: 2000000,
        denda: 0,
        status: 'lunas',
        createdAt: '2026-09-13',
    },
    {
        id: 'INV-004',
        number: 'INV/2026/09/004',
        bookingId: 'BKG-004',
        items: [
            { description: 'Sewa Toyota Avanza 1.5 G x2 hari', amount: 700000 },
            { description: 'Biaya supir', amount: 0 },
        ],
        total: 700000,
        paid: 500000,
        denda: 0,
        status: 'sebagian',
        createdAt: '2026-09-16',
    },
    {
        id: 'INV-005',
        number: 'INV/2026/09/005',
        bookingId: 'BKG-005',
        items: [
            { description: 'Sewa Toyota Fortuner 2.4 x2 hari', amount: 1700000 },
            { description: 'Biaya supir', amount: 150000 },
        ],
        total: 1850000,
        paid: 1850000,
        denda: 0,
        status: 'lunas',
        createdAt: '2026-09-18',
    },
    {
        id: 'INV-006',
        number: 'INV/2026/09/006',
        bookingId: 'BKG-006',
        items: [
            { description: 'Sewa Toyota HiAce x2 hari', amount: 2400000 },
            { description: 'Biaya supir', amount: 200000 },
        ],
        total: 2600000,
        paid: 1300000,
        denda: 0,
        status: 'sebagian',
        createdAt: '2026-09-20',
    },
    {
        id: 'INV-007',
        number: 'INV/2026/09/007',
        bookingId: 'BKG-007',
        items: [
            { description: 'Sewa Toyota Innova Reborn 2.4 x3 hari', amount: 1800000 },
            { description: 'Biaya supir', amount: 0 },
        ],
        total: 1800000,
        paid: 0,
        denda: 0,
        status: 'belum_bayar',
        createdAt: '2026-09-23',
    },
];
const INIT_PEMBAYARAN = [
    {
        id: 'PAY-001',
        invoiceId: 'INV-001',
        amount: 700000,
        date: '2026-09-01',
        method: 'transfer',
        status: 'terverifikasi',
        createdAt: '2026-09-01',
    },
    {
        id: 'PAY-002',
        invoiceId: 'INV-002',
        amount: 1050000,
        date: '2026-09-05',
        method: 'qris',
        status: 'terverifikasi',
        createdAt: '2026-09-05',
    },
    {
        id: 'PAY-003',
        invoiceId: 'INV-003',
        amount: 2000000,
        date: '2026-09-10',
        method: 'transfer',
        status: 'terverifikasi',
        createdAt: '2026-09-10',
    },
    {
        id: 'PAY-004',
        invoiceId: 'INV-004',
        amount: 500000,
        date: '2026-09-14',
        method: 'tunai',
        status: 'terverifikasi',
        createdAt: '2026-09-14',
    },
    {
        id: 'PAY-005',
        invoiceId: 'INV-005',
        amount: 1850000,
        date: '2026-09-16',
        method: 'transfer',
        status: 'terverifikasi',
        createdAt: '2026-09-16',
    },
    {
        id: 'PAY-006',
        invoiceId: 'INV-006',
        amount: 1300000,
        date: '2026-09-18',
        method: 'kartu',
        status: 'terverifikasi',
        createdAt: '2026-09-18',
    },
];

const INIT_BIAYA = [
    {
        id: 'EXP-001',
        mobilId: 'ARM-001',
        type: 'bbm',
        amount: 250000,
        date: '2026-09-01',
        description: 'Isi BBM full tank sebelum rental',
    },
    {
        id: 'EXP-002',
        mobilId: 'ARM-002',
        type: 'bbm',
        amount: 200000,
        date: '2026-09-05',
        description: 'Isi BBM full tank',
    },
    {
        id: 'EXP-003',
        mobilId: 'ARM-003',
        type: 'maintenance',
        amount: 500000,
        date: '2026-09-08',
        description: 'Servis berkala 10.000 km',
    },
    {
        id: 'EXP-004',
        mobilId: 'ARM-004',
        type: 'maintenance',
        amount: 1200000,
        date: '2026-09-10',
        description: 'Ganti oli mesin + filter',
    },
    {
        id: 'EXP-005',
        mobilId: 'ARM-005',
        type: 'bbm',
        amount: 300000,
        date: '2026-09-16',
        description: 'Isi BBM Pertamax full tank',
    },
    {
        id: 'EXP-006',
        mobilId: 'ARM-006',
        type: 'cuci',
        amount: 75000,
        date: '2026-09-18',
        description: 'Cuci mobil dalam luar',
    },
    {
        id: 'EXP-007',
        mobilId: 'ARM-001',
        type: 'pajak',
        amount: 350000,
        date: '2026-09-20',
        description: 'Pajak kendaraan tahunan STNK',
    },
    {
        id: 'EXP-008',
        mobilId: 'ARM-003',
        type: 'bbm',
        amount: 275000,
        date: '2026-09-20',
        description: 'Isi BBM Solar full tank',
    },
];

const INIT_QUOTATION = [
    {
        id: 'QTN-001',
        number: 'QTN/2026/09/001',
        pelangganId: 'PLG-003',
        mobilId: 'ARM-003',
        startDate: '2026-09-25',
        endDate: '2026-09-28',
        withDriver: true,
        pricePerDay: 600000,
        totalEstimate: 2000000,
        validUntil: '2026-09-24',
        status: 'draft',
        createdAt: '2026-09-22',
    },
    {
        id: 'QTN-002',
        number: 'QTN/2026/09/002',
        pelangganId: 'PLG-006',
        mobilId: 'ARM-006',
        startDate: '2026-09-18',
        endDate: '2026-09-20',
        withDriver: true,
        pricePerDay: 1200000,
        totalEstimate: 2600000,
        validUntil: '2026-09-17',
        status: 'disetujui',
        createdAt: '2026-09-15',
    },
];

const INIT_USERS = [
    {
        id: 'USR-001',
        name: 'Owner Utama',
        email: 'owner@rental.com',
        password: 'password123',
        role: 'owner',
        status: 'active',
    },
    {
        id: 'USR-002',
        name: 'Admin CS',
        email: 'admin@rental.com',
        password: 'password123',
        role: 'admin',
        status: 'active',
    },
];
let currentUser = null;
let currentTab = 'dashboard';
let armada = [];
let pelanggan = [];
let booking = [];
let invoice = [];
let pembayaran = [];
let biaya = [];
let quotations = [];
let users = [];
let revenueChart = null;
let statusChart = null;
let armadaView = 'grid';

function loadData() {
    const ver = localStorage.getItem(STORAGE_PREFIX + 'data_version');
    if (ver !== D_VER) {
        resetData(true);
        return;
    }
    armada = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'armada') || '[]');
    pelanggan = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'pelanggan') || '[]');
    booking = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'booking') || '[]');
    invoice = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'invoice') || '[]');
    pembayaran = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'pembayaran') || '[]');
    biaya = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'biaya') || '[]');
    quotations = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'quotation') || '[]');
    users = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'users') || '[]');
}
function saveData() {
    localStorage.setItem(STORAGE_PREFIX + 'data_version', D_VER);
    localStorage.setItem(STORAGE_PREFIX + 'armada', JSON.stringify(armada));
    localStorage.setItem(STORAGE_PREFIX + 'pelanggan', JSON.stringify(pelanggan));
    localStorage.setItem(STORAGE_PREFIX + 'booking', JSON.stringify(booking));
    localStorage.setItem(STORAGE_PREFIX + 'invoice', JSON.stringify(invoice));
    localStorage.setItem(STORAGE_PREFIX + 'pembayaran', JSON.stringify(pembayaran));
    localStorage.setItem(STORAGE_PREFIX + 'biaya', JSON.stringify(biaya));
    localStorage.setItem(STORAGE_PREFIX + 'quotation', JSON.stringify(quotations));
    localStorage.setItem(STORAGE_PREFIX + 'users', JSON.stringify(users));
}
function resetData(silent) {
    armada = JSON.parse(JSON.stringify(INIT_ARMADA));
    pelanggan = JSON.parse(JSON.stringify(INIT_PELANGGAN));
    booking = JSON.parse(JSON.stringify(INIT_BOOKING));
    invoice = JSON.parse(JSON.stringify(INIT_INVOICE));
    pembayaran = JSON.parse(JSON.stringify(INIT_PEMBAYARAN));
    biaya = JSON.parse(JSON.stringify(INIT_BIAYA));
    quotations = JSON.parse(JSON.stringify(INIT_QUOTATION));
    users = JSON.parse(JSON.stringify(INIT_USERS));
    saveData();
    if (!silent) {
        toast('Data berhasil direset ke default', 'success');
        renderDashboard();
        if (currentTab !== 'dashboard') go(currentTab);
    }
}
function fmt(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
}
function fmtShort(n) {
    if (n >= 1000000) return 'Rp ' + (n / 1000000).toFixed(1).replace('.0', '') + 'jt';
    if (n >= 1000) return 'Rp ' + Math.round(n / 1000) + 'K';
    return 'Rp ' + n;
}
function fmtDate(d) {
    if (!d) return '-';
    return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function fmtDateShort(d) {
    if (!d) return '-';
    return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
function pid(prefix, arr) {
    const nums = arr.map((a) => parseInt(a.id.split('-')[1]) || 0);
    const max = nums.length > 0 ? Math.max(...nums) : 0;
    return prefix + '-' + String(max + 1).padStart(3, '0');
}
function getPelanggan(id) {
    return pelanggan.find((p) => p.id === id);
}
function getMobil(id) {
    return armada.find((a) => a.id === id);
}
function getBooking(id) {
    return booking.find((b) => b.id === id);
}
function today() {
    const d = new Date();
    return (
        d.getFullYear() +
        '-' +
        String(d.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(d.getDate()).padStart(2, '0')
    );
}
function daysBetween(a, b) {
    return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000) + 1;
}
function toast(msg, type) {
    const el = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');
    document.getElementById('toast-msg').textContent = msg;
    icon.className =
        'fa-solid ' +
        (type === 'error'
            ? 'fa-circle-exclamation text-rose-400'
            : type === 'info'
              ? 'fa-circle-info text-blue-400'
              : 'fa-circle-check text-emerald-400');
    el.classList.remove('translate-y-20', 'opacity-0');
    el.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        el.classList.add('translate-y-20', 'opacity-0');
        el.classList.remove('translate-y-0', 'opacity-100');
    }, 2500);
}
function statusBadge(status) {
    const map = {
        tersedia: { c: 'emerald', l: 'Tersedia' },
        disewa: { c: 'amber', l: 'Disewa' },
        maintenance: { c: 'rose', l: 'Maintenance' },
        pending: { c: 'blue', l: 'Pending' },
        dikonfirmasi: { c: 'emerald', l: 'Dikonfirmasi' },
        berjalan: { c: 'amber', l: 'Berjalan' },
        selesai: { c: 'emerald', l: 'Selesai' },
        dibatalkan: { c: 'rose', l: 'Dibatalkan' },
        belum_bayar: { c: 'rose', l: 'Belum Bayar' },
        sebagian: { c: 'amber', l: 'Sebagian' },
        lunas: { c: 'emerald', l: 'Lunas' },
        draft: { c: 'slate', l: 'Draft' },
        dikirim: { c: 'blue', l: 'Dikirim' },
        disetujui: { c: 'emerald', l: 'Disetujui' },
        ditolak: { c: 'rose', l: 'Ditolak' },
        dikonversi: { c: 'amber', l: 'Dikonversi' },
        terverifikasi: { c: 'emerald', l: 'Terverifikasi' },
        active: { c: 'emerald', l: 'Active' },
        nonaktif: { c: 'rose', l: 'Nonaktif' },
    };
    const s = map[status] || { c: 'slate', l: status };
    return (
        '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-' +
        s.c +
        '-50"><span class="w-1.5 h-1.5 rounded-full bg-' +
        s.c +
        '-500"></span><span class="text-xs font-semibold text-' +
        s.c +
        '-700">' +
        s.l +
        '</span></span>'
    );
}
function methodLabel(m) {
    const map = { tunai: 'Tunai', transfer: 'Transfer', qris: 'QRIS', kartu: 'Kartu' };
    return map[m] || m;
}
function biayaTypeIcon(t) {
    const map = {
        bbm: 'fa-gas-pump',
        maintenance: 'fa-wrench',
        pajak: 'fa-file-invoice',
        cuci: 'fa-droplet',
        parkir: 'fa-square-parking',
        lainnya: 'fa-ellipsis',
    };
    return map[t] || 'fa-circle';
}
function biayaTypeColor(t) {
    const map = {
        bbm: 'amber',
        maintenance: 'blue',
        pajak: 'slate',
        cuci: 'blue',
        parkir: 'slate',
        lainnya: 'slate',
    };
    return map[t] || 'slate';
}
function emptyState(icon, text, sub) {
    return (
        '<div class="text-center py-12"><i class="fa-solid ' +
        icon +
        ' text-4xl text-slate-300 mb-3"></i><p class="text-sm font-medium text-slate-400">' +
        text +
        '</p>' +
        (sub ? '<p class="text-xs text-slate-300 mt-1">' + sub + '</p>' : '') +
        '</div>'
    );
}
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');
    const btnText = document.getElementById('login-btn-text');
    const btnLoad = document.getElementById('login-btn-loading');

    btnText.classList.add('hidden');
    btnLoad.classList.remove('hidden');
    btn.disabled = true;
    errEl.classList.add('hidden');

    setTimeout(() => {
        const user = users.find(
            (u) => u.email === email && u.password === pass && u.status === 'active',
        );
        if (!user) {
            errEl.textContent = 'Email atau password salah';
            errEl.classList.remove('hidden');
            btnText.classList.remove('hidden');
            btnLoad.classList.add('hidden');
            btn.disabled = false;
            return;
        }
        currentUser = user;
        localStorage.setItem(STORAGE_PREFIX + 'current_user', JSON.stringify(user));
        document.getElementById('page-login').classList.add('hidden');
        document.getElementById('app-wrapper').classList.remove('hidden');
        applyRoleAccess();
        updateUserProfile();
        go('dashboard');
        startClock();
    }, 600);
}
function logout() {
    currentUser = null;
    localStorage.removeItem(STORAGE_PREFIX + 'current_user');
    document.getElementById('app-wrapper').classList.add('hidden');
    document.getElementById('page-login').classList.remove('hidden');
    const btnText = document.getElementById('login-btn-text');
    const btnLoad = document.getElementById('login-btn-loading');
    const btn = document.getElementById('login-btn');
    if (btnText) btnText.classList.remove('hidden');
    if (btnLoad) btnLoad.classList.add('hidden');
    if (btn) btn.disabled = false;
    if (revenueChart) {
        revenueChart.destroy();
        revenueChart = null;
    }
    if (statusChart) {
        statusChart.destroy();
        statusChart = null;
    }
}
function togglePass() {
    const inp = document.getElementById('login-pass');
    const eye = document.getElementById('pass-eye');
    if (inp.type === 'password') {
        inp.type = 'text';
        eye.className = 'fa-solid fa-eye-slash text-sm';
    } else {
        inp.type = 'password';
        eye.className = 'fa-solid fa-eye text-sm';
    }
}
function applyRoleAccess() {
    document.querySelectorAll('.owner-only').forEach((el) => {
        el.style.display = currentUser && currentUser.role === 'owner' ? '' : 'none';
    });
}
function updateUserProfile() {
    if (!currentUser) return;
    const initials = currentUser.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    const roleLabel = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    const avatar = document.getElementById('header-avatar');
    const name = document.getElementById('header-user-name');
    const role = document.getElementById('header-user-role');
    if (avatar) avatar.textContent = initials;
    if (name) name.textContent = currentUser.name;
    if (role) role.textContent = roleLabel;
}
function go(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
    document.querySelectorAll('.sidebar-item').forEach((el) => el.classList.remove('active'));
    const tabEl = document.getElementById('tab-' + tab);
    if (tabEl) {
        tabEl.classList.remove('hidden');
        tabEl.classList.add('fade-in');
    }
    const navEl = document.getElementById('nav-' + tab);
    if (navEl) navEl.classList.add('active');
    const titles = {
        dashboard: ['Dashboard', 'Fleet overview'],
        armada: ['Armada', 'Vehicle fleet management'],
        pelanggan: ['Pelanggan', 'Customer management'],
        quotation: ['Quotation', 'Price quotations'],
        booking: ['Booking', 'Reservation management'],
        invoice: ['Invoice', 'Invoice management'],
        pembayaran: ['Pembayaran', 'Payment tracking'],
        biaya: ['Biaya Operasional', 'Operating costs'],
        laporan: ['Laporan', 'Financial reports'],
        users: ['Manajemen User', 'User accounts'],
    };
    const t = titles[tab] || [tab, ''];
    document.getElementById('page-title').textContent = t[0];
    document.getElementById('page-subtitle').textContent = t[1];
    closeSidebar();
    renderTab(tab);
}
function renderTab(tab) {
    switch (tab) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'armada':
            renderArmada();
            break;
        case 'pelanggan':
            renderPelanggan();
            break;
        case 'quotation':
            renderQuotation();
            break;
        case 'booking':
            renderBooking();
            break;
        case 'invoice':
            renderInvoice();
            break;
        case 'pembayaran':
            renderPembayaran();
            break;
        case 'biaya':
            renderBiaya();
            break;
        case 'laporan':
            renderLaporan();
            break;
        case 'users':
            renderUsers();
            break;
    }
}
function openSidebar() {
    document.getElementById('sidebar').classList.remove('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.remove('hidden');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.add('hidden');
}
function openModal(id) {}
function closeModal(id) {
    const el = document.getElementById('modal-' + id);
    if (el) {
        el.classList.add('opacity-0');
        setTimeout(() => el.remove(), 200);
    }
}
function startClock() {
    function tick() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
    tick();
    setInterval(tick, 1000);
}
function renderDashboard() {
    const activeBooking = booking.filter((b) =>
        ['berjalan', 'dikonfirmasi', 'pending'].includes(b.status),
    ).length;
    const availableCars = armada.filter((a) => a.status === 'tersedia').length;
    const now = new Date();
    const cm = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
    const mi = invoice.filter((inv) => inv.createdAt && inv.createdAt.startsWith(cm));
    const mr = mi.reduce((s, inv) => s + inv.paid, 0);
    const mc = biaya
        .filter((b) => b.date && b.date.startsWith(cm))
        .reduce((s, b) => s + b.amount, 0);
    document.getElementById('d-booking').textContent = activeBooking;
    document.getElementById('d-available').textContent = availableCars;
    document.getElementById('d-revenue').textContent = fmt(mr);
    document.getElementById('d-profit').textContent = fmt(mr - mc);
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentYear = String(now.getFullYear());
    const mb = {};
    booking
        .filter((b) => ['selesai', 'berjalan', 'dikonfirmasi'].includes(b.status))
        .filter((b) => {
            const m = b.startDate.split('-')[1];
            const y = b.startDate.split('-')[0];
            return m === currentMonth && y === currentYear;
        })
        .forEach((b) => {
            mb[b.mobilId] = (mb[b.mobilId] || 0) + 1;
        });
    let hM = null,
        hC = 0;
    for (const [k, v] of Object.entries(mb)) {
        if (v > hC) {
            hC = v;
            hM = getMobil(k);
        }
    }
    if (hM) {
        document.getElementById('hero-vehicle-name').textContent = hM.name;
        document.getElementById('hero-vehicle-plate').textContent = hM.plate;
        document.getElementById('hero-vehicle-rentals').textContent = hC + ' kali disewa bulan ini';
        document.getElementById('hero-vehicle-price').textContent = fmt(hM.pricePerDay) + '/hari';
    }
    const rb = [...booking].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
    const tbody = document.getElementById('d-recent-bookings');
    if (!rb.length) {
        tbody.innerHTML =
            '<tr><td colspan="5" class="text-center py-8 text-slate-400 text-sm">Tidak ada booking terbaru</td></tr>';
    } else {
        tbody.innerHTML = rb
            .map((b, i) => {
                const plg = getPelanggan(b.pelangganId),
                    mbl = getMobil(b.mobilId);
                return (
                    '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-3 text-xs text-slate-400">' +
                    (i + 1) +
                    '</td><td class="py-2.5 px-3 font-medium">' +
                    (plg ? plg.name : '-') +
                    '</td><td class="py-2.5 px-3">' +
                    (mbl ? mbl.name : '-') +
                    '</td><td class="py-2.5 px-3 text-xs text-slate-500">' +
                    fmtDateShort(b.startDate) +
                    ' - ' +
                    fmtDateShort(b.endDate) +
                    '</td><td class="py-2.5 px-3">' +
                    statusBadge(b.status) +
                    '</td></tr>'
                );
            })
            .join('');
    }
    renderRevenueChart();
    renderStatusChart();
}
function renderRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    if (revenueChart) revenueChart.destroy();
    const days = [],
        amounts = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const ds =
            d.getFullYear() +
            '-' +
            String(d.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(d.getDate()).padStart(2, '0');
        days.push(d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }));
        amounts.push(pembayaran.filter((p) => p.date === ds).reduce((s, p) => s + p.amount, 0));
    }
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Pendapatan',
                    data: amounts,
                    backgroundColor: 'rgba(245,158,11,0.2)',
                    borderColor: '#f59e0b',
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.6,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: (v) => fmtShort(v), font: { size: 10 } },
                    grid: { color: 'rgba(0,0,0,0.04)' },
                },
                x: { ticks: { font: { size: 10 } }, grid: { display: false } },
            },
        },
    });
}
function renderStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    if (statusChart) statusChart.destroy();
    const t = armada.filter((a) => a.status === 'tersedia').length;
    const d = armada.filter((a) => a.status === 'disewa').length;
    const m = armada.filter((a) => a.status === 'maintenance').length;
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Tersedia', 'Disewa', 'Maintenance'],
            datasets: [
                {
                    data: [t, d, m],
                    backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
                    borderWidth: 0,
                    cutout: '70%',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
        },
    });
    document.getElementById('status-legend').innerHTML =
        '<div class="flex items-center gap-2 text-xs"><span class="w-2 h-2 rounded-full bg-emerald-500"></span><span class="text-slate-500">Tersedia: <strong>' +
        t +
        '</strong> unit</span></div>' +
        '<div class="flex items-center gap-2 text-xs"><span class="w-2 h-2 rounded-full bg-amber-500"></span><span class="text-slate-500">Disewa: <strong>' +
        d +
        '</strong> unit</span></div>' +
        '<div class="flex items-center gap-2 text-xs"><span class="w-2 h-2 rounded-full bg-rose-500"></span><span class="text-slate-500">Maintenance: <strong>' +
        m +
        '</strong> unit</span></div>';
}
function toggleArmadaView() {
    armadaView = armadaView === 'grid' ? 'table' : 'grid';
    const btn = document.getElementById('armada-view-btn');
    if (armadaView === 'table') {
        btn.innerHTML = '<i class="fa-solid fa-grip mr-1"></i> Grid';
        document.getElementById('armada-grid').classList.add('hidden');
        document.getElementById('armada-table-wrap').classList.remove('hidden');
    } else {
        btn.innerHTML = '<i class="fa-solid fa-table-list mr-1"></i> Tabel';
        document.getElementById('armada-grid').classList.remove('hidden');
        document.getElementById('armada-table-wrap').classList.add('hidden');
    }
    renderArmada();
}
function renderArmada() {
    const search = (document.getElementById('armada-search').value || '').toLowerCase();
    const filter = document.getElementById('armada-filter').value || '';
    let data = armada.filter(
        (a) =>
            (a.name.toLowerCase().includes(search) || a.plate.toLowerCase().includes(search)) &&
            (!filter || a.status === filter),
    );
    document.getElementById('armada-count').textContent = data.length + ' unit kendaraan';
    const svgCar =
        '<svg viewBox="0 0 160 112" class="w-full h-full text-slate-300"><rect fill="none" stroke="currentColor" stroke-width="1.5" rx="8" x="10" y="40" width="140" height="50"/><rect fill="none" stroke="currentColor" stroke-width="1.5" rx="4" x="30" y="20" width="50" height="30"/><rect fill="none" stroke="currentColor" stroke-width="1.5" rx="4" x="90" y="20" width="40" height="30"/><circle fill="none" stroke="currentColor" stroke-width="1.5" cx="40" cy="95" r="10"/><circle fill="none" stroke="currentColor" stroke-width="1.5" cx="120" cy="95" r="10"/></svg>';
    if (armadaView === 'grid') {
        const grid = document.getElementById('armada-grid');
        if (!data.length) {
            grid.innerHTML = emptyState('fa-car', 'Tidak ada armada ditemukan');
            return;
        }
        grid.innerHTML = data
            .map((a) => {
                const ph = a.photo
                    ? '<img src="' + a.photo + '" class="w-full h-full object-cover"/>'
                    : svgCar;
                const eid = a.id.replace(/'/g, "\\'");
                return (
                    '<div class="bg-white border border-slate-200/60 rounded-2xl p-4 hover:shadow-lg transition-all"><div class="flex gap-4"><div class="w-28 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 photo-ph">' +
                    ph +
                    '</div><div class="flex-1 min-w-0"><h3 class="font-bold text-slate-800 truncate text-sm">' +
                    a.name +
                    '</h3><p class="text-sm text-slate-500 font-mono">' +
                    a.plate +
                    '</p><div class="flex items-center gap-3 mt-1 text-xs text-slate-400"><span><i class="fa-solid fa-calendar mr-1"></i>' +
                    a.year +
                    '</span><span><i class="fa-solid fa-chair mr-1"></i>' +
                    a.seats +
                    ' Kursi</span></div></div><div class="text-right shrink-0"><p class="text-lg font-extrabold text-amber-600">' +
                    fmtShort(a.pricePerDay) +
                    '</p><p class="text-xs text-slate-400">per hari</p><div class="mt-2">' +
                    statusBadge(a.status) +
                    '</div></div></div><div class="flex gap-2 mt-3 pt-3 border-t border-slate-100"><button onclick="editArmada(\'' +
                    eid +
                    '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-pen mr-1"></i>Edit</button><button onclick="deleteArmada(\'' +
                    eid +
                    '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash mr-1"></i>Hapus</button></div></div>'
                );
            })
            .join('');
    } else {
        const tbody = document.getElementById('armada-tbody');
        if (!data.length) {
            tbody.innerHTML =
                '<tr><td colspan="7" class="text-center py-8 text-slate-400">Tidak ada armada</td></tr>';
            return;
        }
        tbody.innerHTML = data
            .map((a) => {
                const eid = a.id.replace(/'/g, "\\'");
                return (
                    '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 font-medium">' +
                    a.name +
                    '</td><td class="py-2.5 px-4 font-mono text-sm">' +
                    a.plate +
                    '</td><td class="py-2.5 px-4">' +
                    a.year +
                    '</td><td class="py-2.5 px-4">' +
                    a.seats +
                    '</td><td class="py-2.5 px-4 font-semibold text-amber-600">' +
                    fmt(a.pricePerDay) +
                    '</td><td class="py-2.5 px-4">' +
                    statusBadge(a.status) +
                    '</td><td class="py-2.5 px-4"><div class="flex gap-2"><button onclick="editArmada(\'' +
                    eid +
                    '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-pen"></i></button><button onclick="deleteArmada(\'' +
                    eid +
                    '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
                );
            })
            .join('');
    }
}
function openArmadaModal(editId) {
    const a = editId ? armada.find((x) => x.id === editId) : null;
    const title = a ? 'Edit Armada' : 'Tambah Armada';
    const m = document.createElement('div');
    m.id = 'modal-armada';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('armada');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">' +
        title +
        '</h3><p class="text-xs text-slate-400 italic">Vehicle data</p></div><button onclick="closeModal(\'armada\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="saveArmada(event)" class="p-6 space-y-4">' +
        (a ? '<input type="hidden" id="armada-edit-id" value="' + a.id + '">' : '') +
        '<div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nama / Tipe Mobil</label><input id="armada-name" type="text" value="' +
        (a ? a.name : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="Toyota Avanza 1.5 G"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nomor Polisi</label><input id="armada-plate" type="text" value="' +
        (a ? a.plate : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="B 1234 ABC"></div><div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tahun</label><input id="armada-year" type="number" value="' +
        (a ? a.year : new Date().getFullYear()) +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Kursi</label><input id="armada-seats" type="number" value="' +
        (a ? a.seats : 7) +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Harga Sewa / Hari (Rp)</label><input id="armada-price" type="number" value="' +
        (a ? a.pricePerDay : 350000) +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Status</label><select id="armada-status" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="tersedia"' +
        (a && a.status === 'tersedia' ? ' selected' : '') +
        '>Tersedia</option><option value="disewa"' +
        (a && a.status === 'disewa' ? ' selected' : '') +
        '>Disewa</option><option value="maintenance"' +
        (a && a.status === 'maintenance' ? ' selected' : '') +
        '>Maintenance</option></select></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'armada\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function saveArmada(e) {
    e.preventDefault();
    const editId = document.getElementById('armada-edit-id');
    const data = {
        name: document.getElementById('armada-name').value.trim(),
        plate: document.getElementById('armada-plate').value.trim(),
        year: parseInt(document.getElementById('armada-year').value),
        seats: parseInt(document.getElementById('armada-seats').value),
        pricePerDay: parseInt(document.getElementById('armada-price').value),
        status: document.getElementById('armada-status').value,
    };
    if (editId) {
        const idx = armada.findIndex((a) => a.id === editId.value);
        if (idx >= 0) armada[idx] = { ...armada[idx], ...data };
        toast('Armada berhasil diupdate', 'success');
    } else {
        armada.push({ id: pid('ARM', armada), ...data, photo: null });
        toast('Armada berhasil ditambahkan', 'success');
    }
    saveData();
    closeModal('armada');
    renderArmada();
}
function editArmada(id) {
    openArmadaModal(id);
}
function deleteArmada(id) {
    if (!confirm('Yakin hapus armada ini?')) return;
    armada = armada.filter((a) => a.id !== id);
    saveData();
    renderArmada();
    toast('Armada berhasil dihapus', 'success');
}
function renderPelanggan() {
    const search = (document.getElementById('pelanggan-search').value || '').toLowerCase();
    let data = pelanggan.filter(
        (p) => p.name.toLowerCase().includes(search) || p.phone.includes(search),
    );
    document.getElementById('pelanggan-count').textContent = data.length + ' pelanggan';
    const tbody = document.getElementById('pelanggan-tbody');
    if (!data.length) {
        tbody.innerHTML =
            '<tr><td colspan="6" class="text-center py-8 text-slate-400">Tidak ada pelanggan</td></tr>';
        return;
    }
    tbody.innerHTML = data
        .map((p) => {
            const rc = booking.filter((b) => b.pelangganId === p.id).length;
            const eid = p.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 font-medium">' +
                p.name +
                '</td><td class="py-2.5 px-4 text-sm">' +
                p.phone +
                '</td><td class="py-2.5 px-4 text-sm text-slate-500 max-w-[200px] truncate">' +
                p.address +
                '</td><td class="py-2.5 px-4 font-mono text-xs">' +
                p.idCard +
                '</td><td class="py-2.5 px-4 text-center"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-600">' +
                rc +
                '</span></td><td class="py-2.5 px-4"><div class="flex gap-2"><button onclick="editPelanggan(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-pen"></i></button><button onclick="deletePelanggan(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
            );
        })
        .join('');
}
function openPelangganModal(editId) {
    const p = editId ? pelanggan.find((x) => x.id === editId) : null;
    const title = p ? 'Edit Pelanggan' : 'Tambah Pelanggan';
    const m = document.createElement('div');
    m.id = 'modal-pelanggan';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('pelanggan');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">' +
        title +
        '</h3><p class="text-xs text-slate-400 italic">Customer data</p></div><button onclick="closeModal(\'pelanggan\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="savePelanggan(event)" class="p-6 space-y-4">' +
        (p ? '<input type="hidden" id="pelanggan-edit-id" value="' + p.id + '">' : '') +
        '<div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nama Lengkap</label><input id="pelanggan-name" type="text" value="' +
        (p ? p.name : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nomor HP / WhatsApp</label><input id="pelanggan-phone" type="text" value="' +
        (p ? p.phone : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Alamat</label><textarea id="pelanggan-address" rows="2" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none">' +
        (p ? p.address : '') +
        '</textarea></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nomor KTP / SIM</label><input id="pelanggan-idcard" type="text" value="' +
        (p ? p.idCard : '') +
        '" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'pelanggan\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function savePelanggan(e) {
    e.preventDefault();
    const editId = document.getElementById('pelanggan-edit-id');
    const data = {
        name: document.getElementById('pelanggan-name').value.trim(),
        phone: document.getElementById('pelanggan-phone').value.trim(),
        address: document.getElementById('pelanggan-address').value.trim(),
        idCard: document.getElementById('pelanggan-idcard').value.trim(),
    };
    if (editId) {
        const idx = pelanggan.findIndex((p) => p.id === editId.value);
        if (idx >= 0) pelanggan[idx] = { ...pelanggan[idx], ...data };
        toast('Pelanggan berhasil diupdate', 'success');
    } else {
        pelanggan.push({ id: pid('PLG', pelanggan), ...data });
        toast('Pelanggan berhasil ditambahkan', 'success');
    }
    saveData();
    closeModal('pelanggan');
    renderPelanggan();
}
function editPelanggan(id) {
    openPelangganModal(id);
}
function deletePelanggan(id) {
    if (!confirm('Yakin hapus pelanggan ini?')) return;
    pelanggan = pelanggan.filter((p) => p.id !== id);
    saveData();
    renderPelanggan();
    toast('Pelanggan berhasil dihapus', 'success');
}
function renderQuotation() {
    document.getElementById('quotation-count').textContent = quotations.length + ' quotation';
    const tbody = document.getElementById('quotation-tbody');
    if (!quotations.length) {
        tbody.innerHTML =
            '<tr><td colspan="7" class="text-center py-8 text-slate-400">Tidak ada quotation</td></tr>';
        return;
    }
    tbody.innerHTML = quotations
        .map((q, i) => {
            const plg = getPelanggan(q.pelangganId),
                mbl = getMobil(q.mobilId);
            const cc = q.status === 'disetujui';
            const eid = q.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 text-xs text-slate-400">' +
                (i + 1) +
                '</td><td class="py-2.5 px-4 font-medium">' +
                (plg ? plg.name : '-') +
                '</td><td class="py-2.5 px-4">' +
                (mbl ? mbl.name : '-') +
                '</td><td class="py-2.5 px-4 text-xs text-slate-500">' +
                fmtDateShort(q.startDate) +
                ' - ' +
                fmtDateShort(q.endDate) +
                '</td><td class="py-2.5 px-4 font-semibold text-amber-600">' +
                fmt(q.totalEstimate) +
                '</td><td class="py-2.5 px-4">' +
                statusBadge(q.status) +
                '</td><td class="py-2.5 px-4"><div class="flex gap-2">' +
                (cc
                    ? '<button onclick="convertQtnToBooking(\'' +
                      eid +
                      '\')" class="text-xs font-semibold text-amber-600 hover:text-amber-700"><i class="fa-solid fa-arrow-right mr-1"></i>Convert</button>'
                    : '') +
                '<button onclick="deleteQuotation(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
            );
        })
        .join('');
}
function openQuotationModal() {
    const m = document.createElement('div');
    m.id = 'modal-quotation';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('quotation');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">Buat Quotation</h3><p class="text-xs text-slate-400 italic">Price quotation</p></div><button onclick="closeModal(\'quotation\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="saveQuotation(event)" class="p-6 space-y-4"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Pelanggan</label><select id="qtn-pelanggan" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih pelanggan</option></select></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Mobil</label><select id="qtn-mobil" required onchange="calcQtnTotal()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih mobil</option></select></div><div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal Mulai</label><input id="qtn-start" type="date" required onchange="calcQtnTotal()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal Selesai</label><input id="qtn-end" type="date" required onchange="calcQtnTotal()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div></div><div class="flex items-center gap-4"><label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Supir:</label><label class="flex items-center gap-1.5 text-sm"><input type="radio" name="qtn-driver" value="0" checked> Lepas Kunci</label><label class="flex items-center gap-1.5 text-sm"><input type="radio" name="qtn-driver" value="1"> Dengan Supir</label></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Harga/Hari</label><input id="qtn-price" type="number" readonly class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Total Estimasi</label><input id="qtn-total" type="text" readonly class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 font-bold text-amber-600"></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'quotation\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    populateQtnDropdowns();
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function populateQtnDropdowns() {
    const plgSel = document.getElementById('qtn-pelanggan');
    const mblSel = document.getElementById('qtn-mobil');
    plgSel.innerHTML =
        '<option value="">Pilih pelanggan</option>' +
        pelanggan.map((p) => '<option value="' + p.id + '">' + p.name + '</option>').join('');
    mblSel.innerHTML =
        '<option value="">Pilih mobil</option>' +
        armada
            .filter((a) => a.status === 'tersedia')
            .map(
                (a) =>
                    '<option value="' +
                    a.id +
                    '">' +
                    a.name +
                    ' - ' +
                    fmt(a.pricePerDay) +
                    '/hari</option>',
            )
            .join('');
}
function calcQtnTotal() {
    const mId = document.getElementById('qtn-mobil').value;
    const s = document.getElementById('qtn-start').value;
    const e = document.getElementById('qtn-end').value;
    const m = getMobil(mId);
    if (m && s && e) {
        const days = daysBetween(s, e);
        const total = m.pricePerDay * days;
        document.getElementById('qtn-price').value = m.pricePerDay;
        document.getElementById('qtn-total').value = fmt(total);
    }
}
function saveQuotation(e) {
    e.preventDefault();
    const mId = document.getElementById('qtn-mobil').value;
    const m = getMobil(mId);
    const s = document.getElementById('qtn-start').value;
    const en = document.getElementById('qtn-end').value;
    const d = document.querySelector('input[name="qtn-driver"]:checked').value === '1';
    const days = daysBetween(s, en);
    const total = m.pricePerDay * days + (d ? 200000 * days : 0);
    quotations.push({
        id: pid('QTN', quotations),
        number:
            'QTN/' +
            today().split('-').slice(0, 2).join('/') +
            '/' +
            String(quotations.length + 1).padStart(3, '0'),
        pelangganId: document.getElementById('qtn-pelanggan').value,
        mobilId: mId,
        startDate: s,
        endDate: en,
        withDriver: d,
        pricePerDay: m.pricePerDay,
        totalEstimate: total,
        validUntil: document.getElementById('qtn-valid')?.value || '',
        status: 'draft',
        createdAt: today(),
    });
    saveData();
    closeModal('quotation');
    renderQuotation();
    toast('Quotation berhasil dibuat', 'success');
}
function deleteQuotation(id) {
    if (!confirm('Yakin hapus quotation ini?')) return;
    quotations = quotations.filter((q) => q.id !== id);
    saveData();
    renderQuotation();
    toast('Quotation berhasil dihapus', 'success');
}
function convertQtnToBooking(qtnId) {
    const q = quotations.find((x) => x.id === qtnId);
    if (!q) return;
    const av = checkAvailability(q.mobilId, q.startDate, q.endDate, null);
    if (!av) {
        toast('Mobil tidak tersedia pada tanggal tersebut', 'error');
        return;
    }
    booking.push({
        id: pid('BKG', booking),
        number:
            'BKG/' +
            today().split('-').slice(0, 2).join('/') +
            '/' +
            String(booking.length + 1).padStart(3, '0'),
        quotationId: q.id,
        pelangganId: q.pelangganId,
        mobilId: q.mobilId,
        startDate: q.startDate,
        endDate: q.endDate,
        pickupLocation: '',
        returnLocation: '',
        withDriver: q.withDriver,
        status: 'pending',
        createdAt: today(),
    });
    q.status = 'dikonversi';
    saveData();
    renderQuotation();
    toast('Quotation berhasil dikonversi ke booking', 'success');
}
function renderBooking() {
    document.getElementById('booking-count').textContent = booking.length + ' booking';
    const tbody = document.getElementById('booking-tbody');
    if (!booking.length) {
        tbody.innerHTML =
            '<tr><td colspan="7" class="text-center py-8 text-slate-400">Tidak ada booking</td></tr>';
        return;
    }
    tbody.innerHTML = booking
        .map((b, i) => {
            const plg = getPelanggan(b.pelangganId),
                mbl = getMobil(b.mobilId);
            const eid = b.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 text-xs text-slate-400">' +
                (i + 1) +
                '</td><td class="py-2.5 px-4 font-medium">' +
                (plg ? plg.name : '-') +
                '</td><td class="py-2.5 px-4">' +
                (mbl ? mbl.name : '-') +
                '</td><td class="py-2.5 px-4 text-xs text-slate-500">' +
                fmtDateShort(b.startDate) +
                ' - ' +
                fmtDateShort(b.endDate) +
                '</td><td class="py-2.5 px-4 text-xs">' +
                (b.withDriver
                    ? '<i class="fa-solid fa-user-tie text-amber-500 mr-1"></i>Supir'
                    : '<i class="fa-solid fa-key text-slate-400 mr-1"></i>Lepas Kunci') +
                '</td><td class="py-2.5 px-4">' +
                statusBadge(b.status) +
                '</td><td class="py-2.5 px-4"><div class="flex gap-2"><button onclick="editBooking(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-pen"></i></button><button onclick="deleteBooking(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
            );
        })
        .join('');
}
function openBookingModal(editId) {
    const b = editId ? booking.find((x) => x.id === editId) : null;
    const title = b ? 'Edit Booking' : 'Buat Booking';
    const m = document.createElement('div');
    m.id = 'modal-booking';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('booking');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">' +
        title +
        '</h3><p class="text-xs text-slate-400 italic">Reservation</p></div><button onclick="closeModal(\'booking\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="saveBooking(event)" class="p-6 space-y-4">' +
        (b ? '<input type="hidden" id="bkg-edit-id" value="' + b.id + '">' : '') +
        '<div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Pelanggan</label><select id="bkg-pelanggan" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih pelanggan</option></select></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Mobil</label><select id="bkg-mobil" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih mobil</option></select></div><div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal Mulai</label><input id="bkg-start" type="date" required onchange="checkAvail()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal Selesai</label><input id="bkg-end" type="date" required onchange="checkAvail()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div></div><div id="bkg-avail"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Lokasi Ambil</label><input id="bkg-pickup" type="text" value="' +
        (b ? b.pickupLocation : '') +
        '" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Lokasi Kembali</label><input id="bkg-return" type="text" value="' +
        (b ? b.returnLocation : '') +
        '" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div class="flex items-center gap-4"><label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Supir:</label><label class="flex items-center gap-1.5 text-sm"><input type="radio" name="bkg-driver" value="0"' +
        (!b || !b.withDriver ? ' checked' : '') +
        '> Lepas Kunci</label><label class="flex items-center gap-1.5 text-sm"><input type="radio" name="bkg-driver" value="1"' +
        (b && b.withDriver ? ' checked' : '') +
        '> Dengan Supir</label></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Status</label><select id="bkg-status" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="pending"' +
        (b && b.status === 'pending' ? ' selected' : '') +
        '>Pending</option><option value="dikonfirmasi"' +
        (b && b.status === 'dikonfirmasi' ? ' selected' : '') +
        '>Dikonfirmasi</option><option value="berjalan"' +
        (b && b.status === 'berjalan' ? ' selected' : '') +
        '>Berjalan</option><option value="selesai"' +
        (b && b.status === 'selesai' ? ' selected' : '') +
        '>Selesai</option><option value="dibatalkan"' +
        (b && b.status === 'dibatalkan' ? ' selected' : '') +
        '>Dibatalkan</option></select></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'booking\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    populateBkgDropdowns();
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function populateBkgDropdowns() {
    const plgSel = document.getElementById('bkg-pelanggan');
    const mblSel = document.getElementById('bkg-mobil');
    const b = document.getElementById('bkg-edit-id');
    const editBkg = b ? booking.find((x) => x.id === b.value) : null;
    plgSel.innerHTML =
        '<option value="">Pilih pelanggan</option>' +
        pelanggan
            .map(
                (p) =>
                    '<option value="' +
                    p.id +
                    '"' +
                    (editBkg && editBkg.pelangganId === p.id ? ' selected' : '') +
                    '>' +
                    p.name +
                    '</option>',
            )
            .join('');
    const availCars = armada.filter(
        (a) => a.status === 'tersedia' || (editBkg && a.id === editBkg.mobilId),
    );
    mblSel.innerHTML =
        '<option value="">Pilih mobil</option>' +
        availCars
            .map(
                (a) =>
                    '<option value="' +
                    a.id +
                    '"' +
                    (editBkg && editBkg.mobilId === a.id ? ' selected' : '') +
                    '>' +
                    a.name +
                    ' (' +
                    a.plate +
                    ')</option>',
            )
            .join('');
}
function checkAvail() {
    const mId = document.getElementById('bkg-mobil').value;
    const s = document.getElementById('bkg-start').value;
    const e = document.getElementById('bkg-end').value;
    const el = document.getElementById('bkg-avail');
    if (!mId || !s || !e) {
        el.innerHTML = '';
        return;
    }
    const ok = checkAvailability(mId, s, e, null);
    if (ok) {
        const m = getMobil(mId);
        const days = daysBetween(s, e);
        el.innerHTML =
            '<div class="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 mt-1"><i class="fa-solid fa-circle-check"></i>Tersedia - ' +
            days +
            ' hari - ' +
            fmt(m.pricePerDay * days) +
            '</div>';
    } else {
        el.innerHTML =
            '<div class="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 rounded-lg px-3 py-2 mt-1"><i class="fa-solid fa-circle-xmark"></i>Mobil sudah dibooking pada rentang tanggal ini</div>';
    }
}
function saveBooking(e) {
    e.preventDefault();
    const editId = document.getElementById('bkg-edit-id');
    const s = document.getElementById('bkg-start').value;
    const en = document.getElementById('bkg-end').value;
    const mId = document.getElementById('bkg-mobil').value;
    if (!editId) {
        if (!checkAvailability(mId, s, en, null)) {
            toast('Mobil tidak tersedia', 'error');
            return;
        }
    } else {
        if (!checkAvailability(mId, s, en, editId.value)) {
            toast('Mobil sudah dibooking pada tanggal tersebut', 'error');
            return;
        }
    }
    const data = {
        pelangganId: document.getElementById('bkg-pelanggan').value,
        mobilId: mId,
        startDate: s,
        endDate: en,
        pickupLocation: document.getElementById('bkg-pickup').value.trim(),
        returnLocation: document.getElementById('bkg-return').value.trim(),
        withDriver: document.querySelector('input[name="bkg-driver"]:checked').value === '1',
        status: document.getElementById('bkg-status').value,
    };
    if (editId) {
        const idx = booking.findIndex((b) => b.id === editId.value);
        if (idx >= 0) booking[idx] = { ...booking[idx], ...data };
        toast('Booking berhasil diupdate', 'success');
    } else {
        booking.push({
            id: pid('BKG', booking),
            number:
                'BKG/' +
                today().split('-').slice(0, 2).join('/') +
                '/' +
                String(booking.length + 1).padStart(3, '0'),
            quotationId: null,
            ...data,
            createdAt: today(),
        });
        toast('Booking berhasil dibuat', 'success');
    }
    saveData();
    closeModal('booking');
    renderBooking();
}
function editBooking(id) {
    openBookingModal(id);
}
function deleteBooking(id) {
    if (!confirm('Yakin hapus booking ini?')) return;
    booking = booking.filter((b) => b.id !== id);
    saveData();
    renderBooking();
    toast('Booking berhasil dihapus', 'success');
}
function renderInvoice() {
    document.getElementById('invoice-count').textContent = invoice.length + ' invoice';
    const tbody = document.getElementById('invoice-tbody');
    if (!invoice.length) {
        tbody.innerHTML =
            '<tr><td colspan="8" class="text-center py-8 text-slate-400">Tidak ada invoice</td></tr>';
        return;
    }
    tbody.innerHTML = invoice
        .map((inv, i) => {
            const bkg = getBooking(inv.bookingId);
            const sisa = inv.total - inv.paid;
            const eid = inv.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 text-xs text-slate-400">' +
                (i + 1) +
                '</td><td class="py-2.5 px-4 font-medium">' +
                (bkg ? bkg.number : '-') +
                '</td><td class="py-2.5 px-4 font-semibold text-amber-600">' +
                fmt(inv.total) +
                '</td><td class="py-2.5 px-4 text-emerald-600">' +
                fmt(inv.paid) +
                '</td><td class="py-2.5 px-4 text-rose-600">' +
                fmt(sisa) +
                '</td><td class="py-2.5 px-4 text-xs text-slate-500">' +
                ((inv.denda && inv.denda > 0) ? '<span class="text-rose-500 font-medium">' + fmt(inv.denda) + '</span>' : '-') +
                '</td><td class="py-2.5 px-4">' +
                statusBadge(inv.status) +
                '</td><td class="py-2.5 px-4"><div class="flex gap-2"><button onclick="showInvoiceDetail(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-eye mr-1"></i>Detail</button><button onclick="deleteInvoice(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
            );
        })
        .join('');
}
function createInvoiceFromBooking() {
    const confirmed = booking.filter((b) => b.status === 'dikonfirmasi' || b.status === 'berjalan');
    const withoutInv = confirmed.filter((b) => !invoice.find((inv) => inv.bookingId === b.id));
    if (!withoutInv.length) {
        toast('Tidak ada booking yang bisa dibuatkan invoice', 'info');
        return;
    }
    const b = withoutInv[0];
    const m = getMobil(b.mobilId);
    const days = daysBetween(b.startDate, b.endDate);
    const total = m.pricePerDay * days + (b.withDriver ? 200000 * days : 0);
    invoice.push({
        id: pid('INV', invoice),
        number:
            'INV/' +
            today().split('-').slice(0, 2).join('/') +
            '/' +
            String(invoice.length + 1).padStart(3, '0'),
        bookingId: b.id,
        items: [
            { description: 'Sewa ' + m.name + ' x' + days + ' hari', amount: m.pricePerDay * days },
            { description: 'Biaya supir', amount: b.withDriver ? 200000 * days : 0 },
        ],
        total: total,
        paid: 0,
        denda: 0,
        status: 'belum_bayar',
        createdAt: today(),
    });
    saveData();
    renderInvoice();
    toast('Invoice berhasil dibuat dari booking ' + b.number, 'success');
}
function showInvoiceDetail(id) {
    const inv = invoice.find((x) => x.id === id);
    if (!inv) return;
    const bkg = getBooking(inv.bookingId);
    const plg = bkg ? getPelanggan(bkg.pelangganId) : null;
    const m = bkg ? getMobil(bkg.mobilId) : null;
    const sisa = inv.total - inv.paid;
    const mDiv = document.createElement('div');
    mDiv.id = 'modal-invoice';
    mDiv.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    mDiv.onclick = function (ev) {
        if (ev.target === mDiv) closeModal('invoice');
    };
    mDiv.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">Invoice ' +
        inv.number +
        '</h3><p class="text-xs text-slate-400 italic">Invoice detail</p></div><button onclick="closeModal(\'invoice\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><div class="p-6 space-y-4"><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-xs font-bold text-slate-400 uppercase">Kepada</p><p class="font-medium">' +
        (plg ? plg.name : '-') +
        '</p></div><div><p class="text-xs font-bold text-slate-400 uppercase">Booking</p><p class="font-medium">' +
        (bkg ? bkg.number : '-') +
        '</p></div><div><p class="text-xs font-bold text-slate-400 uppercase">Tanggal</p><p>' +
        fmtDate(inv.createdAt) +
        '</p></div><div><p class="text-xs font-bold text-slate-400 uppercase">Mobil</p><p>' +
        (m ? m.name : '-') +
        '</p></div></div><div class="border-t border-slate-100 pt-4"><p class="text-xs font-bold text-slate-400 uppercase mb-2">Rincian</p>' +
        inv.items
            .map(
                (it) =>
                    '<div class="flex justify-between text-sm py-1"><span class="text-slate-600">' +
                    it.description +
                    '</span><span class="font-semibold">' +
                    fmt(it.amount) +
                    '</span></div>',
            )
            .join('') +
        '</div><div class="border-t border-slate-100 pt-4 space-y-2"><div class="flex justify-between text-sm"><span class="text-slate-500">Total Tagihan</span><span class="font-bold text-lg text-amber-600">' +
        fmt(inv.total) +
        '</span></div><div class="flex justify-between text-sm"><span class="text-slate-500">Sudah Dibayar</span><span class="font-semibold text-emerald-600">' +
        fmt(inv.paid) +
        '</span></div><div class="flex justify-between text-sm"><span class="text-slate-500">Sisa Tagihan</span><span class="font-semibold text-rose-600">' +
        fmt(sisa) +
        '</span></div>' +
        (inv.denda > 0 ? '<div class="flex justify-between text-sm"><span class="text-rose-500">Denda Keterlambatan</span><span class="font-semibold text-rose-600">' + fmt(inv.denda) + '</span></div>' : '') +
        '</div>' +
        '<div class="border-t border-slate-100 pt-3"><label class="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Tambah Denda</label><div class="flex gap-2"><input id="inv-denda-input" type="number" min="0" class="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="Nominal denda"><button onclick="addDenda(\'' + eid + '\')" class="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow-md shadow-rose-500/20 transition"><i class="fa-solid fa-plus mr-1"></i>Tambah</button></div></div>' +
        '<div class="flex gap-3 pt-2"><button onclick="sendInvoice(\'' + eid + '\')" class="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transition"><i class="fa-solid fa-paper-plane mr-1"></i>Kirim</button><button onclick="closeModal(\'invoice\')" class="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Tutup</button></div></div></div>';
    document.body.appendChild(mDiv);
    requestAnimationFrame(() => mDiv.classList.remove('opacity-0'));
}
function deleteInvoice(id) {
    if (!confirm('Yakin hapus invoice ini?')) return;
    invoice = invoice.filter((inv) => inv.id !== id);
    saveData();
    renderInvoice();
    toast('Invoice berhasil dihapus', 'success');
}
function sendInvoice(invId) {
    const inv = invoice.find((x) => x.id === invId);
    if (!inv) return;
    closeModal('invoice');
    toast('Invoice ' + inv.number + ' berhasil dikirim ke konsumen (mock)', 'success');
}
function addDenda(invId) {
    const inv = invoice.find((x) => x.id === invId);
    if (!inv) return;
    const input = document.getElementById('inv-denda-input');
    const nominal = parseInt(input.value) || 0;
    if (nominal <= 0) {
        toast('Masukkan nominal denda', 'error');
        return;
    }
    inv.denda = (inv.denda || 0) + nominal;
    inv.total += nominal;
    saveData();
    closeModal('invoice');
    renderInvoice();
    showInvoiceDetail(invId);
    toast('Denda berhasil ditambahkan', 'success');
}
function renderPembayaran() {
    document.getElementById('pembayaran-count').textContent = pembayaran.length + ' pembayaran';
    const tbody = document.getElementById('pembayaran-tbody');
    if (!pembayaran.length) {
        tbody.innerHTML =
            '<tr><td colspan="6" class="text-center py-8 text-slate-400">Tidak ada pembayaran</td></tr>';
        return;
    }
    tbody.innerHTML = pembayaran
        .map((p, i) => {
            const inv = invoice.find((x) => x.id === p.invoiceId);
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 text-xs text-slate-400">' +
                (i + 1) +
                '</td><td class="py-2.5 px-4 font-medium">' +
                (inv ? inv.number : '-') +
                '</td><td class="py-2.5 px-4 font-semibold text-emerald-600">' +
                fmt(p.amount) +
                '</td><td class="py-2.5 px-4 text-xs text-slate-500">' +
                fmtDate(p.date) +
                '</td><td class="py-2.5 px-4"><span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-xs font-medium"><i class="fa-solid ' +
                (p.method === 'transfer'
                    ? 'fa-building-columns'
                    : p.method === 'qris'
                      ? 'fa-qrcode'
                      : p.method === 'tunai'
                        ? 'fa-money-bill'
                        : 'fa-credit-card') +
                ' text-slate-400"></i>' +
                methodLabel(p.method) +
                '</span></td><td class="py-2.5 px-4">' +
                statusBadge(p.status) +
                '</td></tr>'
            );
        })
        .join('');
}
function openPembayaranModal() {
    const unpaid = invoice.filter((inv) => inv.status !== 'lunas');
    if (!unpaid.length) {
        toast('Semua invoice sudah lunas', 'info');
        return;
    }
    const m = document.createElement('div');
    m.id = 'modal-pembayaran';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('pembayaran');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">Catat Pembayaran</h3><p class="text-xs text-slate-400 italic">Record payment</p></div><button onclick="closeModal(\'pembayaran\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="savePembayaran(event)" class="p-6 space-y-4"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Invoice</label><select id="pay-invoice" required onchange="populatePayDropdowns()" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih invoice</option>' +
        unpaid
            .map(
                (inv) =>
                    '<option value="' +
                    inv.id +
                    '">' +
                    inv.number +
                    ' (Sisa: ' +
                    fmt(inv.total - inv.paid) +
                    ')</option>',
            )
            .join('') +
        '</select></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Jumlah Bayar</label><input id="pay-amount" type="number" required min="1" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="500000"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal Bayar</label><input id="pay-date" type="date" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Metode Bayar</label><select id="pay-method" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="transfer">Transfer</option><option value="tunai">Tunai</option><option value="qris">QRIS</option><option value="kartu">Kartu</option></select></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'pembayaran\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function populatePayDropdowns() {}
function savePembayaran(e) {
    e.preventDefault();
    const invId = document.getElementById('pay-invoice').value;
    const amt = parseInt(document.getElementById('pay-amount').value);
    const inv = invoice.find((x) => x.id === invId);
    if (!inv) return;
    const sisa = inv.total - inv.paid;
    if (amt > sisa) {
        toast('Jumlah bayar melebihi sisa tagihan', 'error');
        return;
    }
    pembayaran.push({
        id: pid('PAY', pembayaran),
        invoiceId: invId,
        amount: amt,
        date: document.getElementById('pay-date').value,
        method: document.getElementById('pay-method').value,
        status: 'terverifikasi',
        createdAt: today(),
    });
    inv.paid += amt;
    if (inv.paid >= inv.total) inv.status = 'lunas';
    else if (inv.paid > 0) inv.status = 'sebagian';
    saveData();
    closeModal('pembayaran');
    renderPembayaran();
    renderInvoice();
    toast('Pembayaran berhasil dicatat', 'success');
}
function renderBiaya() {
    const mf = document.getElementById('biaya-mobil-filter').value;
    const tf = document.getElementById('biaya-tipe-filter').value;
    let data = biaya.filter((b) => (!mf || b.mobilId === mf) && (!tf || b.type === tf));
    document.getElementById('biaya-count').textContent = data.length + ' biaya';
    const mobFilter = document.getElementById('biaya-mobil-filter');
    if (mobFilter.options.length <= 1) {
        mobFilter.innerHTML =
            '<option value="">Semua Mobil</option>' +
            armada.map((a) => '<option value="' + a.id + '">' + a.name + '</option>').join('');
    }
    const tbody = document.getElementById('biaya-tbody');
    if (!data.length) {
        tbody.innerHTML =
            '<tr><td colspan="6" class="text-center py-8 text-slate-400">Tidak ada biaya</td></tr>';
        return;
    }
    tbody.innerHTML = data
        .map((b) => {
            const m = getMobil(b.mobilId);
            const eid = b.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 text-xs text-slate-500">' +
                fmtDate(b.date) +
                '</td><td class="py-2.5 px-4 font-medium">' +
                (m ? m.name : '-') +
                '</td><td class="py-2.5 px-4"><span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-' +
                biayaTypeColor(b.type) +
                '-50 text-xs font-medium"><i class="fa-solid ' +
                biayaTypeIcon(b.type) +
                ' text-' +
                biayaTypeColor(b.type) +
                '-500"></i>' +
                b.type.charAt(0).toUpperCase() +
                b.type.slice(1) +
                '</span></td><td class="py-2.5 px-4 font-semibold text-rose-600">' +
                fmt(b.amount) +
                '</td><td class="py-2.5 px-4 text-sm text-slate-500 max-w-[200px] truncate">' +
                b.description +
                '</td><td class="py-2.5 px-4"><button onclick="deleteBiaya(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></td></tr>'
            );
        })
        .join('');
}
function openBiayaModal() {
    const m = document.createElement('div');
    m.id = 'modal-biaya';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('biaya');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">Tambah Biaya</h3><p class="text-xs text-slate-400 italic">Operating cost</p></div><button onclick="closeModal(\'biaya\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="saveBiaya(event)" class="p-6 space-y-4"><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Mobil</label><select id="exp-mobil" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="">Pilih mobil</option>' +
        armada.map((a) => '<option value="' + a.id + '">' + a.name + '</option>').join('') +
        '</select></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tipe Biaya</label><select id="exp-type" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="bbm">BBM</option><option value="maintenance">Maintenance</option><option value="pajak">Pajak</option><option value="cuci">Cuci</option><option value="parkir">Parkir</option><option value="lainnya">Lainnya</option></select></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Jumlah (Rp)</label><input id="exp-amount" type="number" required min="1" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="250000"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Tanggal</label><input id="exp-date" type="date" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Keterangan</label><textarea id="exp-desc" rows="2" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="Isi BBM full tank"></textarea></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'biaya\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function saveBiaya(e) {
    e.preventDefault();
    biaya.push({
        id: pid('EXP', biaya),
        mobilId: document.getElementById('exp-mobil').value,
        type: document.getElementById('exp-type').value,
        amount: parseInt(document.getElementById('exp-amount').value),
        date: document.getElementById('exp-date').value,
        description: document.getElementById('exp-desc').value.trim(),
    });
    saveData();
    closeModal('biaya');
    renderBiaya();
    toast('Biaya berhasil ditambahkan', 'success');
}
function deleteBiaya(id) {
    if (!confirm('Yakin hapus biaya ini?')) return;
    biaya = biaya.filter((b) => b.id !== id);
    saveData();
    renderBiaya();
    toast('Biaya berhasil dihapus', 'success');
}
function renderLaporan() {
    const lapStart = document.getElementById('lap-start')?.value || '';
    const lapEnd = document.getElementById('lap-end')?.value || '';
    const lapMobil = document.getElementById('lap-mobil');

    if (lapMobil && lapMobil.options.length <= 1) {
        armada.forEach((a) => {
            const opt = document.createElement('option');
            opt.value = a.id;
            opt.textContent = a.name;
            lapMobil.appendChild(opt);
        });
    }
    const selectedMobil = lapMobil?.value || '';

    let filteredInvoice = invoice;
    let filteredBiaya = biaya;
    let filteredBooking = booking;

    if (lapStart) {
        filteredInvoice = filteredInvoice.filter((inv) => inv.createdAt >= lapStart);
        filteredBiaya = filteredBiaya.filter((b) => b.date >= lapStart);
        filteredBooking = filteredBooking.filter((b) => b.startDate >= lapStart);
    }
    if (lapEnd) {
        filteredInvoice = filteredInvoice.filter((inv) => inv.createdAt <= lapEnd);
        filteredBiaya = filteredBiaya.filter((b) => b.date <= lapEnd);
        filteredBooking = filteredBooking.filter((b) => b.startDate <= lapEnd);
    }
    if (selectedMobil) {
        filteredInvoice = filteredInvoice.filter((inv) => { const b = getBooking(inv.bookingId); return b && b.mobilId === selectedMobil; });
        filteredBiaya = filteredBiaya.filter((b) => b.mobilId === selectedMobil);
        filteredBooking = filteredBooking.filter((b) => b.mobilId === selectedMobil);
    }

    const totalRevenue = filteredInvoice.reduce((s, inv) => s + inv.paid, 0);
    const totalCost = filteredBiaya.reduce((s, b) => s + b.amount, 0);
    const profit = totalRevenue - totalCost;
    const totalDays = 30;
    const rentedDays = filteredBooking
        .filter((b) => ['selesai', 'berjalan', 'dikonfirmasi'].includes(b.status))
        .reduce((s, b) => s + daysBetween(b.startDate, b.endDate), 0);
    const util =
        armada.length > 0 ? Math.round((rentedDays / (armada.length * totalDays)) * 100) : 0;
    document.getElementById('l-revenue').textContent = fmt(totalRevenue);
    document.getElementById('l-cost').textContent = fmt(totalCost);
    document.getElementById('l-profit').textContent = fmt(profit);
    document.getElementById('l-util').textContent = util + '%';
    const tbody = document.getElementById('laporan-tbody');
    const armadaToList = selectedMobil ? armada.filter((a) => a.id === selectedMobil) : armada;
    tbody.innerHTML = armadaToList
        .map((a) => {
            const rev = filteredInvoice
                .filter((inv) => {
                    const b = getBooking(inv.bookingId);
                    return b && b.mobilId === a.id;
                })
                .reduce((s, inv) => s + inv.paid, 0);
            const cost = filteredBiaya.filter((b) => b.mobilId === a.id).reduce((s, b) => s + b.amount, 0);
            const laba = rev - cost;
            const bDays = filteredBooking
                .filter(
                    (b) =>
                        b.mobilId === a.id &&
                        ['selesai', 'berjalan', 'dikonfirmasi'].includes(b.status),
                )
                .reduce((s, b) => s + daysBetween(b.startDate, b.endDate), 0);
            const u = Math.round((bDays / totalDays) * 100);
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 font-medium">' +
                a.name +
                '</td><td class="py-2.5 px-4 text-emerald-600 font-semibold">' +
                fmt(rev) +
                '</td><td class="py-2.5 px-4 text-rose-600 font-semibold">' +
                fmt(cost) +
                '</td><td class="py-2.5 px-4 font-semibold ' +
                (laba >= 0 ? 'text-emerald-600' : 'text-rose-600') +
                '">' +
                fmt(laba) +
                '</td><td class="py-2.5 px-4"><div class="flex items-center gap-2"><div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" style="width:' +
                Math.min(u, 100) +
                '%"></div></div><span class="text-xs font-medium text-slate-500">' +
                u +
                '%</span></div></td></tr>'
            );
        })
        .join('');
}
function applyLaporanFilter() {
    renderLaporan();
    toast('Filter diterapkan', 'success');
}
function resetLaporanFilter() {
    document.getElementById('lap-start').value = '';
    document.getElementById('lap-end').value = '';
    document.getElementById('lap-mobil').value = '';
    renderLaporan();
    toast('Filter direset', 'info');
}
function exportLaporanCSV() {
    const lapStart = document.getElementById('lap-start')?.value || '';
    const lapEnd = document.getElementById('lap-end')?.value || '';
    const selectedMobil = document.getElementById('lap-mobil')?.value || '';
    let filteredInvoice = invoice;
    let filteredBiaya = biaya;
    if (lapStart) {
        filteredInvoice = filteredInvoice.filter((inv) => inv.createdAt >= lapStart);
        filteredBiaya = filteredBiaya.filter((b) => b.date >= lapStart);
    }
    if (lapEnd) {
        filteredInvoice = filteredInvoice.filter((inv) => inv.createdAt <= lapEnd);
        filteredBiaya = filteredBiaya.filter((b) => b.date <= lapEnd);
    }
    if (selectedMobil) {
        filteredInvoice = filteredInvoice.filter((inv) => { const b = getBooking(inv.bookingId); return b && b.mobilId === selectedMobil; });
        filteredBiaya = filteredBiaya.filter((b) => b.mobilId === selectedMobil);
    }
    const rows = [['Mobil', 'Pendapatan', 'Biaya', 'Laba', 'Utilisasi']];
    const armadaToList = selectedMobil ? armada.filter((a) => a.id === selectedMobil) : armada;
    armadaToList.forEach((a) => {
        const rev = filteredInvoice
            .filter((inv) => { const b = getBooking(inv.bookingId); return b && b.mobilId === a.id; })
            .reduce((s, inv) => s + inv.paid, 0);
        const cost = filteredBiaya.filter((b) => b.mobilId === a.id).reduce((s, b) => s + b.amount, 0);
        const laba = rev - cost;
        const totalDays = 30;
        const bDays = booking
            .filter((b) => b.mobilId === a.id && ['selesai', 'berjalan', 'dikonfirmasi'].includes(b.status))
            .reduce((s, b) => s + daysBetween(b.startDate, b.endDate), 0);
        const u = Math.round((bDays / totalDays) * 100);
        rows.push([a.name, rev, cost, laba, u + '%']);
    });
    const totalRev = filteredInvoice.reduce((s, inv) => s + inv.paid, 0);
    const totalCost = filteredBiaya.reduce((s, b) => s + b.amount, 0);
    rows.push([]);
    rows.push(['TOTAL', totalRev, totalCost, totalRev - totalCost, '']);
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-rental-' + (lapStart || 'all') + '-' + (lapEnd || 'all') + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast('CSV berhasil diunduh', 'success');
}
function renderUsers() {
    document.getElementById('users-count').textContent = users.length + ' user';
    const tbody = document.getElementById('users-tbody');
    if (!users.length) {
        tbody.innerHTML =
            '<tr><td colspan="5" class="text-center py-8 text-slate-400">Tidak ada user</td></tr>';
        return;
    }
    tbody.innerHTML = users
        .map((u) => {
            const eid = u.id.replace(/'/g, "\\'");
            return (
                '<tr class="border-b border-slate-50 hover:bg-slate-50"><td class="py-2.5 px-4 font-medium">' +
                u.name +
                '</td><td class="py-2.5 px-4 text-sm">' +
                u.email +
                '</td><td class="py-2.5 px-4"><span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg ' +
                (u.role === 'owner' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700') +
                ' text-xs font-semibold">' +
                u.role.charAt(0).toUpperCase() +
                u.role.slice(1) +
                '</span></td><td class="py-2.5 px-4">' +
                statusBadge(u.status) +
                '</td><td class="py-2.5 px-4"><div class="flex gap-2"><button onclick="editUser(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-amber-600"><i class="fa-solid fa-pen"></i></button><button onclick="deleteUser(\'' +
                eid +
                '\')" class="text-xs font-semibold text-slate-500 hover:text-rose-500"><i class="fa-solid fa-trash"></i></button></div></td></tr>'
            );
        })
        .join('');
}
function openUserModal(editId) {
    const u = editId ? users.find((x) => x.id === editId) : null;
    const title = u ? 'Edit User' : 'Tambah User';
    const m = document.createElement('div');
    m.id = 'modal-user';
    m.className =
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-opacity duration-200';
    m.onclick = function (ev) {
        if (ev.target === m) closeModal('user');
    };
    m.innerHTML =
        '<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="flex items-center justify-between px-6 py-4 border-b border-slate-100"><div><h3 class="font-bold text-slate-800">' +
        title +
        '</h3><p class="text-xs text-slate-400 italic">User account</p></div><button onclick="closeModal(\'user\')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><i class="fa-solid fa-xmark"></i></button></div><form onsubmit="saveUser(event)" class="p-6 space-y-4">' +
        (u ? '<input type="hidden" id="user-edit-id" value="' + u.id + '">' : '') +
        '<div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Nama</label><input id="user-name" type="text" value="' +
        (u ? u.name : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label><input id="user-email" type="email" value="' +
        (u ? u.email : '') +
        '" required class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Password</label><input id="user-pass" type="text" value="' +
        (u ? u.password : '') +
        '" ' +
        (u ? '' : 'required') +
        ' class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" placeholder="' +
        (u ? 'Biarkan kosong jika tidak ubah' : 'Password') +
        '"></div><div><label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Role</label><select id="user-role" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white"><option value="owner"' +
        (u && u.role === 'owner' ? ' selected' : '') +
        '>Owner</option><option value="admin"' +
        (u && u.role === 'admin' ? ' selected' : '') +
        '>Admin</option></select></div><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all"><i class="fa-solid fa-check mr-1"></i> Simpan</button><button type="button" onclick="closeModal(\'user\')" class="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Batal</button></div></form></div>';
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.remove('opacity-0'));
}
function saveUser(e) {
    e.preventDefault();
    const editId = document.getElementById('user-edit-id');
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const pass = document.getElementById('user-pass').value;
    const role = document.getElementById('user-role').value;
    if (editId) {
        const idx = users.findIndex((u) => u.id === editId.value);
        if (idx >= 0) {
            users[idx].name = name;
            users[idx].email = email;
            users[idx].role = role;
            if (pass) users[idx].password = pass;
        }
        toast('User berhasil diupdate', 'success');
    } else {
        if (!pass) {
            toast('Password wajib diisi', 'error');
            return;
        }
        if (users.find((u) => u.email === email)) {
            toast('Email sudah terdaftar', 'error');
            return;
        }
        users.push({ id: pid('USR', users), name, email, password: pass, role, status: 'active' });
        toast('User berhasil ditambahkan', 'success');
    }
    saveData();
    closeModal('user');
    renderUsers();
}
function editUser(id) {
    openUserModal(id);
}
function deleteUser(id) {
    if (!confirm('Yakin hapus user ini?')) return;
    users = users.filter((u) => u.id !== id);
    saveData();
    renderUsers();
    toast('User berhasil dihapus', 'success');
}
function checkAvailability(mobilId, start, end, excludeBookingId) {
    return !booking.some((b) => {
        if (b.id === excludeBookingId) return false;
        if (b.mobilId !== mobilId) return false;
        if (['dibatalkan', 'selesai'].includes(b.status)) return false;
        return !(end < b.startDate || start > b.endDate);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    loadData();
    const saved = localStorage.getItem(STORAGE_PREFIX + 'current_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        const found = users.find((u) => u.id === currentUser.id && u.status === 'active');
        if (found) {
            currentUser = found;
            document.getElementById('page-login').classList.add('hidden');
            document.getElementById('app-wrapper').classList.remove('hidden');
            applyRoleAccess();
            updateUserProfile();
            go('dashboard');
            startClock();
            return;
        }
    }
});
