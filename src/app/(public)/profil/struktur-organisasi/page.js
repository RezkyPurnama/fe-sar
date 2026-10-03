import Image from 'next/image'
import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Struktur Organisasi Basarnas Padang',
    description:
        'Struktur organisasi Kantor Pencarian dan Pertolongan Padang.',
}

const kepalaKantor = {
    nama: 'Abdul Malik, S.Sos',
    jabatan: 'Kepala Kantor Pencarian dan Pertolongan',
    foto: '/images/public/pejabat/Abdul-Malik.jpg',
}

const kepalaSeksi = [
    {
        nama: 'Hendri, S.Sos',
        jabatan:
            'Kepala Seksi Operasi dan Siaga Pencarian dan Pertolongan',
        foto: '/images/public/pejabat/hendri.webp',
    },
    {
        nama: 'Inarwan, S.Sos',
        jabatan: 'Kepala Seksi Sumber Daya',
        foto: '/images/public/pejabat/Inarwan.jpg',
    },
    {
        nama: 'Alvizan Z, S.H.',
        jabatan: 'Kepala Bagian Umum',
        foto: '/images/public/pejabat/alvizan-z.webp',
    },
]

function FotoPejabat({ src, nama, utama = false }) {
    return (
        <div
            className={`relative shrink-0 overflow-hidden border border-slate-300 bg-slate-100 ${utama ? 'h-28 w-24' : 'h-24 w-20'
                }`}>
            <Image
                src={src}
                alt={`Foto ${nama}`}
                fill
                sizes={utama ? '96px' : '80px'}
                className="object-cover object-top"
            />
        </div>
    )
}

function KepalaKantor() {
    return (
        <article className="relative z-10 w-full max-w-md border border-slate-300 bg-white">
            <div className="h-1.5 bg-[#ff6600]" />

            <div className="flex items-center gap-5 p-5 sm:p-6">
                <FotoPejabat
                    src={kepalaKantor.foto}
                    nama={kepalaKantor.nama}
                    utama
                />

                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase leading-5 tracking-[0.08em] text-slate-500">
                        {kepalaKantor.jabatan}
                    </p>

                    <h2 className="mt-3 text-lg font-bold leading-6 text-[#0f172a]">
                        {kepalaKantor.nama}
                    </h2>
                </div>
            </div>
        </article>
    )
}

function KartuPejabat({ pejabat }) {
    return (
        <article className="relative z-10 h-full border border-slate-300 bg-white">
            <div className="h-1 bg-[#ff6600]" />

            <div className="flex flex-col items-center px-5 py-6 text-center">
                <FotoPejabat
                    src={pejabat.foto}
                    nama={pejabat.nama}
                />

                <h3 className="mt-4 text-base font-bold leading-6 text-[#0f172a]">
                    {pejabat.nama}
                </h3>

                <p className="mt-2 text-[11px] font-medium uppercase leading-5 tracking-[0.05em] text-slate-500">
                    {pejabat.jabatan}
                </p>
            </div>
        </article>
    )
}

function GarisOrganisasiDesktop() {
    return (
        <div
            className="relative h-20"
            aria-hidden="true">
            {/* Garis dari kepala kantor */}
            <div className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-slate-400" />

            {/* Garis horizontal */}
            <div className="absolute left-[16.666%] right-[16.666%] top-10 h-px bg-slate-400" />

            {/* Cabang kiri */}
            <div className="absolute left-[16.666%] top-10 h-10 w-px bg-slate-400" />

            {/* Cabang tengah */}
            <div className="absolute left-1/2 top-10 h-10 w-px -translate-x-1/2 bg-slate-400" />

            {/* Cabang kanan */}
            <div className="absolute right-[16.666%] top-10 h-10 w-px bg-slate-400" />

            {/* Titik tengah */}
            <div className="absolute left-1/2 top-[36px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[#ff6600] bg-white" />
        </div>
    )
}

function BaganDesktop() {
    return (
        <div className="hidden lg:block">
            <div className="flex justify-center">
                <KepalaKantor />
            </div> 

            <GarisOrganisasiDesktop />

            <div className="grid grid-cols-3 gap-7">
                {kepalaSeksi.map((pejabat) => (
                    <KartuPejabat
                        key={pejabat.nama}
                        pejabat={pejabat}
                    />
                ))}
            </div>
        </div>
    )
}

function BaganMobile() {
    return (
        <div className="lg:hidden">
            <KepalaKantor />

            <div className="ml-6 h-8 w-px bg-slate-400 sm:mx-auto" />

            <div className="relative space-y-5 border-l border-slate-300 pl-7 sm:border-l-0 sm:pl-0">
                {kepalaSeksi.map((pejabat) => (
                    <div
                        key={pejabat.nama}
                        className="relative">
                        <div
                            className="absolute -left-7 top-10 h-px w-7 bg-slate-300 sm:hidden"
                            aria-hidden="true"
                        />

                        <div
                            className="absolute -left-[31px] top-[36px] h-2 w-2 rounded-full border border-[#ff6600] bg-white sm:hidden"
                            aria-hidden="true"
                        />

                        <KartuPejabat pejabat={pejabat} />
                    </div>
                ))}
            </div>
        </div>
    )
}

function BaganOrganisasi() {
    return (
        <div className="border border-slate-200 bg-[#f8fafc] p-5 sm:p-8 lg:p-10">
            <BaganDesktop />
            <BaganMobile />
        </div>
    )
}

export default function StrukturOrganisasiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Struktur Organisasi
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Struktur pejabat Kantor Pencarian dan
                            Pertolongan Padang.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <div className="mb-7 border-b-2 border-[#0f172a] pb-4">
                        <h2 className="text-lg font-bold tracking-tight text-[#0f172a] sm:text-xl">
                            Bagan Struktur Organisasi
                        </h2>
                    </div>

                    <BaganOrganisasi />
                </section>
            </main>

            <Footer />
        </div>
    )
}