import Image from 'next/image'
import Link from 'next/link'

const dataTimRescue = [
    {
        id: 1,
        kode: '01',
        nama: 'Tim Rescue Alpha',
        fokus: 'Operasi Darat dan Perkotaan',
        deskripsi:
            'Menangani pencarian dan pertolongan pada kecelakaan darat, bangunan runtuh, serta kondisi yang membahayakan manusia.',
        fotoTim: '/images/public/TIM.jpg',
        posisiFoto: 'object-center',
        jumlahPersonel: 3,
        url: '/tim-rescue/tim-alpha',
    },
    {
        id: 2,
        kode: '02',
        nama: 'Tim Rescue Bravo',
        fokus: 'Operasi Perairan',
        deskripsi:
            'Menangani pencarian, pertolongan, dan evakuasi pada kecelakaan kapal serta kondisi darurat di perairan.',
        fotoTim: '/images/public/TIM.jpg',
        posisiFoto: 'object-center',
        jumlahPersonel: 3,
        url: '/tim-rescue/tim-bravo',
    },
    {
        id: 3,
        kode: '03',
        nama: 'Tim Rescue Charlie',
        fokus: 'Gunung, Hutan, dan Ketinggian',
        deskripsi:
            'Menangani pencarian dan evakuasi pada medan gunung, hutan, jurang, serta medan vertikal.',
        fotoTim: '/images/public/TIM.jpg',
        posisiFoto: 'object-center',
        jumlahPersonel: 3,
        url: '/tim-rescue/tim-charlie',
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
            className="h-4 w-4"
            aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
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
            className="h-4 w-4"
            aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function KartuTim({ tim }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
            {/* Foto bersama tim */}
            <Link
                href={tim.url}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                aria-label={`Lihat personel ${tim.nama}`}>
                <Image
                    src={tim.fotoTim}
                    alt={`Foto bersama ${tim.nama} BASARNAS Padang`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover ${tim.posisiFoto} transition-transform duration-500 group-hover:scale-[1.03]`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 bg-[#ff6600] px-3 py-1.5 font-mono text-xs font-bold text-white">
                    {tim.kode}
                </span>

                <p className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                    Kantor Pencarian dan Pertolongan Padang
                </p>
            </Link>

            {/* Informasi tim */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#ff6600]">
                    {tim.fokus}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7 text-[#0f172a]">
                    <Link
                        href={tim.url}
                        className="transition-colors hover:text-[#ff6600]">
                        {tim.nama}
                    </Link>
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tim.deskripsi}
                </p>

                <div className="mt-5 flex items-center border-t border-slate-200 pt-4">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                        <UsersIcon />
                        {tim.jumlahPersonel} personel
                    </span>

                    <Link
                        href={tim.url}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] transition-colors hover:text-[#ff6600]">
                        Lihat personel
                        <ArrowIcon />
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default function Personel() {
    return (
        <section
            id="tim"
            className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                {/* Judul bagian */}
                <header className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6600]">
                        Personel Rescue
                    </p>

                    <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#0f172a] sm:text-4xl lg:text-5xl">
                        Tim Rescue Basarnas Padang
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                        Tim rescue dengan kemampuan dan bidang penanganan
                        yang disiapkan untuk mendukung pelaksanaan
                        operasi pencarian, pertolongan, dan evakuasi di
                        wilayah Sumatera Barat.
                    </p>
                </header>

                {/* Daftar tim */}
                <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {dataTimRescue.map((tim) => (
                        <KartuTim
                            key={tim.id}
                            tim={tim}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}