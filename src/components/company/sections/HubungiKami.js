function LocationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
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

function PhoneIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
    )
}

function EmailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true">
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
            />
            <path d="m3 7 9 6 9-6" />
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true">
            <circle
                cx="12"
                cy="12"
                r="9"
            />
            <path d="M12 7v5l3 2" />
        </svg>
    )
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    )
}

function InformasiKontak({ ikon, judul, children }) {
    return (
        <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-slate-200 py-5 first:pt-0 last:border-b-0 last:pb-0">
            <span className="flex h-10 w-10 items-center justify-center bg-orange-50 text-[#ff6600]">
                {ikon}
            </span>

            <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    {judul}
                </p>

                <div className="mt-1.5 text-sm leading-7 text-slate-600">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function HubungiKami() {
    // const latitude = '-0.80818'
    // const longitude = '100.325657'

    return (
        <section
            id="kontak"
            className="scroll-mt-24 bg-[#0f172a] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                {/* Judul bagian */}
                <header className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6600]">
                        Hubungi Kami
                    </p>

                    <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Informasi kontak dan lokasi.
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8">
                        Laporkan kondisi darurat dengan menyampaikan
                        lokasi, keadaan korban, dan informasi kejadian
                        secara jelas agar tim dapat merespons dengan
                        cepat.
                    </p>
                </header>

                {/* Konten kontak dan peta */}
                <div className="mt-10 grid overflow-hidden rounded-lg border border-white/10 bg-white lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Informasi kontak */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="border-b border-slate-200 pb-6">
                            <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#ff6600]">
                                Kantor BASARNAS Padang
                            </p>

                            <h3 className="mt-2 text-xl font-bold leading-8 text-[#0f172a] sm:text-2xl">
                                Kantor Pencarian dan Pertolongan Padang
                            </h3>
                        </div>

                        <div className="mt-6">
                            <InformasiKontak
                                ikon={<LocationIcon />}
                                judul="Alamat">
                                <address className="not-italic">
                                    Jl. By Pass KM 25, Batipuh Panjang,
                                    Koto Tangah, Kota Padang, Sumatera
                                    Barat
                                </address>
                            </InformasiKontak>

                            <InformasiKontak
                                ikon={<PhoneIcon />}
                                judul="Telepon Darurat">
                                <a
                                    href="tel:115"
                                    className="text-2xl font-bold text-red-600 transition-colors hover:text-red-700">
                                    115
                                </a>
                            </InformasiKontak>

                            <InformasiKontak
                                ikon={<EmailIcon />}
                                judul="Email">
                                <a
                                    href="mailto:kantorsar.padang@basarnas.go.id"
                                    className="break-all transition-colors hover:text-[#ff6600]">
                                    kantorsar.padang@basarnas.go.id
                                </a>
                            </InformasiKontak>

                            <InformasiKontak
                                ikon={<ClockIcon />}
                                judul="Layanan Darurat">
                                Pusat komando dan layanan darurat tersedia
                                selama 24 jam setiap hari.
                            </InformasiKontak>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="tel:115"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                                <PhoneIcon />
                                Hubungi 115
                            </a>

                            <a
                                href= "https://www.google.com/maps/place/KANTOR+PENCARIAN+DAN+PERTOLONGAN+PADANG/@-0.8084797,100.3252158,19z/data=!4m12!1m5!3m4!2zMMKwNDgnMjkuNSJTIDEwMMKwMTknMzIuNCJF!8m2!3d-0.8081944!4d100.3256667!3m5!1s0x2fd4b9ab74a71211:0x57003c9f0887e19!8m2!3d-0.8080844!4d100.3258071!16s%2Fg%2F1hc1c_mnc?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#0f172a] px-5 py-3 text-sm font-semibold text-[#0f172a] transition-colors hover:border-[#ff6600] hover:text-[#ff6600]">
                                Buka petunjuk arah
                                <ArrowIcon />
                            </a>
                        </div>
                    </div>

                    {/* Peta */}
                    <div className="relative min-h-[380px] border-t border-slate-200 lg:min-h-full lg:border-l lg:border-t-0">
                        <iframe
                            title="Peta Kantor Pencarian dan Pertolongan Padang"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=100.305%2C-0.828%2C100.346%2C-0.788&layer=mapnik&marker=-0.80818%2C100.325657"
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="pointer-events-none absolute bottom-4 left-4 right-4 bg-[#0f172a]/95 px-4 py-3 text-white sm:right-auto sm:max-w-xs">
                            <p className="text-xs font-semibold">
                                Kantor Pencarian dan Pertolongan Padang
                            </p>

                            <p className="mt-1 text-[11px] leading-5 text-slate-300">
                                Batipuh Panjang, Koto Tangah, Kota Padang
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}