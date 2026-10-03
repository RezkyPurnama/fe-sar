const dataOperasi = [
    {
        id: 1,
        status: 'Berlangsung',
        kategori: 'Kecelakaan Kapal',
        judul: 'Pencarian Nelayan Hilang',
        lokasi: 'Perairan Bungus, Padang',
        tanggal: '12 Juni 2026',
        personel: '15 personel',
        gambar:
            'https://commons.wikimedia.org/wiki/Special:FilePath/Falmouth%20irb%2002.jpg',
        gambarAlt:
            'Ilustrasi operasi pencarian menggunakan perahu penyelamat',
        kredit: 'Foto ilustrasi: Dave Taskis/Wikimedia Commons',
        sumber:
            'https://commons.wikimedia.org/wiki/File:Falmouth_irb_02.jpg',
    },
    {
        id: 2,
        status: 'Selesai',
        kategori: 'Kondisi Membahayakan Manusia',
        judul: 'Evakuasi Pendaki Gunung Marapi',
        lokasi: 'Kabupaten Agam, Sumatera Barat',
        tanggal: '8 Juni 2026',
        personel: '12 personel',
        gambar:
            'https://commons.wikimedia.org/wiki/Special:FilePath/Gebirgstrage02%20Patient%20Seilsicherung-2.jpg',
        gambarAlt:
            'Ilustrasi evakuasi korban menggunakan tandu gunung',
        kredit: 'Foto ilustrasi: René Kieselmann/Wikimedia Commons',
        sumber:
            'https://commons.wikimedia.org/wiki/File:Gebirgstrage02_Patient_Seilsicherung-2.jpg',
    },
    {
        id: 3,
        status: 'Selesai',
        kategori: 'Bencana Alam',
        judul: 'Penanganan Banjir Pesisir Selatan',
        lokasi: 'Kecamatan Bayang, Pesisir Selatan',
        tanggal: '2 Juni 2026',
        personel: '24 personel',
        gambar:
            'https://commons.wikimedia.org/wiki/Special:FilePath/NDRF%20in%20Bihar%20Flood.jpg',
        gambarAlt:
            'Ilustrasi operasi pertolongan saat bencana banjir',
        kredit: 'Foto ilustrasi: Kumarrakajee/Wikimedia Commons',
        sumber:
            'https://commons.wikimedia.org/wiki/File:NDRF_in_Bihar_Flood.jpg',
    },
]

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    )
}

function LocationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
            aria-hidden="true">
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle
                cx="12"
                cy="10"
                r="2.5"
            />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
            aria-hidden="true">
            <rect
                width="18"
                height="18"
                x="3"
                y="4"
                rx="2"
            />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
        </svg>
    )
}

function UsersIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
            aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle
                cx="9"
                cy="7"
                r="4"
            />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function InformasiOperasi({ ikon, children }) {
    return (
        <div className="flex items-start gap-2 text-sm leading-6 text-slate-500">
            <span className="mt-1 text-slate-500">{ikon}</span>
            <span>{children}</span>
        </div>
    )
}

function KartuOperasi({ operasi }) {
    const sedangBerlangsung = operasi.status === 'Berlangsung'

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
            {/* Foto operasi */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                    src={operasi.gambar}
                    alt={operasi.gambarAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />

                <span
                    className={`absolute left-4 top-4 px-3 py-2 text-xs font-bold text-white ${sedangBerlangsung
                            ? 'bg-[#ff6600]'
                            : 'bg-emerald-600'
                        }`}>
                    {operasi.status}
                </span>
            </div>

            {/* Informasi operasi */}
            <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#ff6600]">
                    {operasi.kategori}
                </p>

                <h3 className="mt-3 text-lg font-semibold leading-7 text-[#0f172a]">
                    {operasi.judul}
                </h3>

                <div className="mt-5 space-y-1.5">
                    <InformasiOperasi ikon={<LocationIcon />}>
                        {operasi.lokasi}
                    </InformasiOperasi>

                    <InformasiOperasi ikon={<CalendarIcon />}>
                        {operasi.tanggal}
                    </InformasiOperasi>

                    <InformasiOperasi ikon={<UsersIcon />}>
                        {operasi.personel}
                    </InformasiOperasi>
                </div>

                {/* Sumber foto */}
                <a
                    href={operasi.sumber}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block border-t border-slate-200 pt-4 text-[10px] leading-5 text-slate-400 transition-colors hover:text-[#ff6600]">
                    {operasi.kredit}
                </a>
            </div>
        </article>
    )
}

export default function Kegiatan() {
    return (
        <section
            id="kegiatan"
            className="scroll-mt-24 border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                {/* Judul bagian */}
                <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6600]">
                            Operasi Terkini
                        </p>

                        <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#0f172a] sm:text-4xl lg:text-5xl">
                            Di lapangan, kami hadir.
                        </h2>
                    </div>

                    <a
                        href="/operasi"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#ff6600] transition-colors hover:text-[#0f172a]">
                        Semua operasi
                        <ArrowIcon />
                    </a>
                </header>

                {/* Daftar operasi */}
                <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {dataOperasi.map((operasi) => (
                        <KartuOperasi
                            key={operasi.id}
                            operasi={operasi}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}