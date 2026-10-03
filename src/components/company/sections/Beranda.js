function SirenIcon({ className = 'h-5 w-5' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true">
            <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
            <path d="M5 18h14" />
            <path d="M4 22h16" />
            <path d="M12 2v2" />
            <path d="m4.9 4.9 1.4 1.4" />
            <path d="M2 12h2" />
            <path d="m19.1 4.9-1.4 1.4" />
            <path d="M20 12h2" />
        </svg>
    )
}

export default function Beranda() {
    return (
        <section
            id="beranda"
            className="relative isolate flex min-h-[700px] items-center overflow-hidden bg-[#0f172a] pt-[124px] text-white lg:min-h-screen">
            <img
                src="/images/public/hero-basarnas-padang.png"
                alt="Gambar tim penyelamat membawa tandu di kawasan pesisir"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_center] lg:object-center"
            />

            {/* Menjaga keterbacaan teks di atas foto */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f172a]/50 via-[#0f172a]/20 to-transparent lg:from-[#0f172a]/55 lg:via-[#0f172a]/10" />

            <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
                <div className="max-w-xl">
                    <p className="mb-5 text-sm font-medium leading-6 text-slate-200 sm:text-base">
                        Kantor Pencarian dan Pertolongan Padang
                    </p>

                    <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                        Saat bantuan dibutuhkan,
                        <br />
                        kami bergerak.
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">
                        Untuk keadaan darurat, hubungi 115. Sampaikan lokasi
                        dan kondisi kejadian agar laporan Anda dapat diterima
                        dengan jelas.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href="tel:115"
                            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#ff6600] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e65c00]">
                            <SirenIcon />
                            Hubungi Darurat 115
                        </a>

                        <a
                            href="#kontak"
                            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0f172a]">
                            Informasi Kontak
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}