import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Hubungi Kami | BASARNAS Padang',
    description:
        'Informasi kontak, layanan darurat, dan lokasi Kantor Pencarian dan Pertolongan Padang.',
}

const lokasiKantor = {
    nama: 'Kantor Pencarian dan Pertolongan Padang',
    alamat:
        'Jl. By Pass KM 25, Batipuh Panjang, Koto Tangah, Kota Padang, Sumatera Barat',
    latitude: -0.808194,
    longitude: 100.325667,
}

const informasiKontak = [
    {
        id: 1,
        label: 'Telepon Darurat',
        nilai: '115',
        keterangan: 'Layanan darurat tersedia selama 24 jam.',
        href: 'tel:115',
        jenis: 'darurat',
        ikon: 'phone',
    },
    {
        id: 2,
        label: 'WhatsApp Darurat',
        nilai: '0813-7700-0115',
        keterangan:
            'Sampaikan lokasi dan kondisi kejadian secara jelas.',
        href: 'https://wa.me/6281377000115',
        eksternal: true,
        ikon: 'whatsapp',
    },
    {
        id: 3,
        label: 'Telepon Kantor',
        nilai: '(0751) 484534',
        keterangan: 'Informasi dan layanan administrasi kantor.',
        href: 'tel:+62751484534',
        ikon: 'phone',
    },
    {
        id: 4,
        label: 'Email',
        nilai: 'kantorsar.padang@basarnas.go.id',
        keterangan: 'Untuk informasi dan korespondensi resmi.',
        href: 'mailto:kantorsar.padang@basarnas.go.id',
        ikon: 'email',
    },
]


const openStreetMapUrl =
    `https://www.openstreetmap.org/export/embed.html?` +
    `bbox=100.3210%2C-0.8120%2C100.3306%2C-0.8041` +
    `&layer=mapnik` +
    `&marker=${lokasiKantor.latitude}%2C${lokasiKantor.longitude}`

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
            <circle cx="12" cy="10" r="2.5" />
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

function WhatsAppIcon() {
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
            <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.8Z" />
            <path d="M8.4 8.1c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.1.4 0 .6a7.2 7.2 0 0 0 3.2 2.8c.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.1.4.3.4.5 0 .4-.2 1.5-1 2.1-.7.6-1.7.8-2.7.5-1.1-.3-2.6-.9-4.4-2.5-1.4-1.2-2.4-2.8-2.7-3.8-.3-1.1 0-2.1.4-2.6.4-.4.9-.7 1.4-.2Z" />
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

function ExternalIcon() {
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
            <path d="M15 3h6v6" />
            <path d="m10 14 11-11" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
    )
}

function IkonKontak({ nama }) {
    if (nama === 'whatsapp') {
        return <WhatsAppIcon />
    }

    if (nama === 'email') {
        return <EmailIcon />
    }

    return <PhoneIcon />
}

function DaftarKontak() {
    return (
        <div className="border-t border-slate-200">
            {informasiKontak.map((kontak) => (
                <a
                    key={kontak.id}
                    href={kontak.href}
                    target={kontak.eksternal ? '_blank' : undefined}
                    rel={
                        kontak.eksternal
                            ? 'noopener noreferrer'
                            : undefined
                    }
                    className="group grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-slate-200 py-5 sm:grid-cols-[44px_minmax(0,1fr)_24px] sm:items-start">
                    <span
                        className={`flex h-10 w-10 items-center justify-center ${kontak.jenis === 'darurat'
                                ? 'bg-red-50 text-red-600'
                                : kontak.ikon === 'whatsapp'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-orange-50 text-[#ff6600]'
                            }`}>
                        <IkonKontak nama={kontak.ikon} />
                    </span>

                    <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
                            {kontak.label}
                        </p>

                        <p
                            className={`mt-1 break-words font-semibold leading-6 ${kontak.jenis === 'darurat'
                                    ? 'text-xl text-red-600'
                                    : 'text-sm text-[#0f172a] sm:text-[15px]'
                                }`}>
                            {kontak.nilai}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            {kontak.keterangan}
                        </p>
                    </div>

                    <span className="hidden pt-2 text-slate-300 transition-colors group-hover:text-[#ff6600] sm:block">
                        {kontak.eksternal ? (
                            <ExternalIcon />
                        ) : (
                            <ArrowIcon />
                        )}
                    </span>
                </a>
            ))}
        </div>
    )
}

export default function HubungiKamiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Hubungi Kami
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Informasi layanan darurat, komunikasi kantor,
                            dan lokasi Kantor Pencarian dan Pertolongan
                            Padang.
                        </p>
                    </div>
                </header>

                {/* Informasi utama */}
                <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                        {/* Kontak */}
                        <div>
                            <div className="border-b-2 border-[#0f172a] pb-4">
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff6600]">
                                    Kontak Resmi
                                </p>

                                <h2 className="mt-2 text-xl font-bold leading-8 text-[#0f172a] sm:text-2xl">
                                    Kantor Pencarian dan Pertolongan
                                    Padang
                                </h2>
                            </div>

                            {/* Alamat */}
                            <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[44px_minmax(0,1fr)]">
                                <span className="flex h-10 w-10 items-center justify-center bg-orange-50 text-[#ff6600]">
                                    <LocationIcon />
                                </span>

                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
                                        Alamat
                                    </p>

                                    <address className="mt-2 text-sm not-italic leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                                        {lokasiKantor.alamat}
                                    </address>

                                    <p className="mt-2 font-mono text-[10px] text-slate-400">
                                        {lokasiKantor.latitude},{' '}
                                        {lokasiKantor.longitude}
                                    </p>
                                </div>
                            </div>

                            <DaftarKontak />
                        </div>

                        {/* Peta */}
                        <div className="overflow-hidden border border-slate-200 bg-slate-50">
                            <iframe
                                title={`Lokasi ${lokasiKantor.nama}`}
                                src={openStreetMapUrl}
                                className="h-[390px] w-full border-0 sm:h-[460px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            <div className="border-t border-slate-200 bg-white p-5">
                                <p className="text-sm font-semibold leading-6 text-[#0f172a]">
                                    {lokasiKantor.nama}
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Batipuh Panjang, Koto Tangah, Kota
                                    Padang
                                </p>

                                <a
                                    href="https://www.google.com/maps/place/KANTOR+PENCARIAN+DAN+PERTOLONGAN+PADANG/@-0.8084797,100.3252158,19z/data=!4m12!1m5!3m4!2zMMKwNDgnMjkuNSJTIDEwMMKwMTknMzIuNCJF!8m2!3d-0.8081944!4d100.3256667!3m5!1s0x2fd4b9ab74a71211:0x57003c9f0887e19!8m2!3d-0.8080844!4d100.3258071!16s%2Fg%2F1hc1c_mnc?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6600] transition-colors hover:text-[#0f172a]">
                                    Buka petunjuk arah
                                    <ExternalIcon />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Panduan laporan darurat */}
                    <aside className="mt-12 grid overflow-hidden border border-slate-200 bg-slate-50 md:grid-cols-[6px_minmax(0,1fr)_auto]">
                        <div className="h-1.5 bg-[#ff6600] md:h-full" />

                        <div className="p-6 sm:p-7">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff6600]">
                                Saat Melaporkan Kejadian
                            </p>

                            <h2 className="mt-2 text-lg font-bold text-[#0f172a]">
                                Sampaikan informasi secara jelas
                            </h2>

                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                                Sertakan lokasi kejadian, jenis kejadian,
                                jumlah korban, kondisi terakhir, serta
                                nomor yang dapat dihubungi.
                            </p>
                        </div>

                        <div className="flex items-center px-6 pb-6 md:px-7 md:pb-0">
                            <a
                                href="tel:115"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                                <PhoneIcon />
                                Hubungi 115
                            </a>
                        </div>
                    </aside>
                </section>
            </main>

            <Footer />
        </div>
    )
}