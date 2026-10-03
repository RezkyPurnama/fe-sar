import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Peraturan dan Hukum Basarnas',
    description:
        'Landasan hukum penyelenggaraan pencarian dan pertolongan nasional.',
}

const daftarPeraturan = [
    `Undang-Undang Nomor 29 Tahun 2014 tentang Pencarian dan Pertolongan.`,

    `Undang-Undang Nomor 24 Tahun 2007 tentang Penanggulangan Bencana.`,

    `Undang-Undang Nomor 17 Tahun 2008 tentang Pelayaran.`,

    `Undang-Undang Nomor 1 Tahun 2009 tentang Penerbangan.`,

    `Peraturan Pemerintah Nomor 36 Tahun 2006 tentang Pencarian dan Pertolongan.`,

    `Peraturan Pemerintah Nomor 37 Tahun 2002 tentang Hak dan Kewajiban Kapal dan Pesawat Udara Asing dalam Melaksanakan Hak Lintas Alur Laut Kepulauan melalui Alur Laut Kepulauan yang Ditetapkan (hasil ratifikasi UNCLOS-82).`,

    `Peraturan Presiden Nomor 99 Tahun 2007 tentang Badan SAR Nasional.`,

    `Peraturan Kepala Badan SAR Nasional Nomor PK.14 Tahun 2012 tentang Standardisasi Sarana SAR di Lingkungan Badan SAR Nasional.`,

    `Peraturan Kepala Badan SAR Nasional Nomor PER.KBSN-01/2008 tentang Organisasi dan Tata Laksana Badan SAR Nasional sebagaimana telah beberapa kali diubah, terakhir dengan Peraturan Kepala Badan SAR Nasional Nomor PK.15 Tahun 2014.`,

    `Peraturan Kepala Badan SAR Nasional Nomor PK.08 Tahun 2010 tentang Organisasi dan Tata Kerja Kantor SAR sebagaimana diubah dengan Peraturan Kepala Badan SAR Nasional Nomor PK.20 Tahun 2014.`,

    `The Convention on International Civil Aviation, 1944.`,

    `International Convention for the Safety of Life at Sea (SOLAS), 1974.`,

    `International Aeronautical and Maritime Search and Rescue (IAMSAR) Manual, 1998 serta International Search and Rescue Advisory Group (INSARAG) Guidelines and Methodology, 2002.`,
]

function ExternalLinkIcon() {
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

function JudulBagian() {
    return (
        <div className="border-b-2 border-[#0f172a] pb-4">
            <h2 className="text-lg font-bold tracking-tight text-[#0f172a] sm:text-xl">
                Landasan Hukum
            </h2>
        </div>
    )
}

function Pengantar() {
    return (
        <div className="border-b border-slate-200 py-6">
            <p className="text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                Beberapa peraturan perundang-undangan berikut menjadi
                landasan eksistensi Badan Nasional Pencarian dan
                Pertolongan dalam melaksanakan tugas pencarian dan
                pertolongan.
            </p>

            <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                Penyelenggaraan pencarian dan pertolongan nasional
                dilaksanakan berdasarkan ketentuan hukum nasional,
                peraturan kelembagaan, serta ketentuan internasional
                berikut:
            </p>
        </div>
    )
}

function DaftarPeraturan() {
    return (
        <ol>
            {daftarPeraturan.map((peraturan, index) => (
                <li
                    key={`${index}-${peraturan.slice(0, 30)}`}
                    className="grid gap-3 border-b border-slate-200 py-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-5">
                    <span className="font-mono text-sm font-bold leading-7 text-[#ff6600]">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                        {peraturan}
                    </p>
                </li>
            ))}
        </ol>
    )
}

function InformasiJDIH() {
    return (
        <section className="mt-10 border-l-2 border-[#ff6600] bg-slate-50 px-5 py-6 sm:px-6">
            <h2 className="text-base font-bold text-[#0f172a] sm:text-lg">
                JDIH BASARNAS
            </h2>

            <p className="mt-3 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                Dokumen peraturan yang berlaku di lingkungan Badan
                Nasional Pencarian dan Pertolongan dapat dilihat dan
                diunduh melalui situs resmi Jaringan Dokumentasi dan
                Informasi Hukum BASARNAS.
            </p>

            <a
                href="https://jdih.basarnas.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff6600] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2">
                Kunjungi JDIH BASARNAS
                <ExternalLinkIcon />
            </a>
        </section>
    )
}

export default function PeraturanHukumPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Peraturan dan Hukum Basarnas
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Landasan hukum penyelenggaraan pencarian dan
                            pertolongan nasional.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <article className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <JudulBagian />

                    <Pengantar />

                    <DaftarPeraturan />

                    <InformasiJDIH />
                </article>
            </main>

            <Footer />
        </div>
    )
}