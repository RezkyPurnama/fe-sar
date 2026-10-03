import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Tugas dan Fungsi Basarnas',
    description:
        'Kedudukan, tugas pokok, dan fungsi Badan Nasional Pencarian dan Pertolongan.',
}

const dataKedudukan = [
    `Kedudukan Badan Nasional Pencarian dan Pertolongan adalah lembaga pemerintah nonkementerian yang berada di bawah dan bertanggung jawab langsung kepada Presiden.`,

    `Badan Nasional Pencarian dan Pertolongan dipimpin oleh Kepala.`,
]

const dataTugasPokok = [
    `Menyusun dan menetapkan norma, standar, prosedur, kriteria serta persyaratan dan prosedur perizinan dalam penyelenggaraan pencarian dan pertolongan.`,

    `Memberikan pedoman dan pengarahan dalam penyelenggaraan pencarian dan pertolongan.`,

    `Menetapkan standardisasi dan kebutuhan penyelenggaraan pencarian dan pertolongan sesuai dengan ketentuan peraturan perundang-undangan.`,

    `Melakukan koordinasi dengan instansi terkait.`,

    `Menyelenggarakan sistem informasi dan komunikasi.`,

    `Menyampaikan informasi penyelenggaraan pencarian dan pertolongan kepada masyarakat.`,

    `Menyampaikan informasi penyelenggaraan operasi pencarian dan pertolongan secara berkala dan setiap saat pada masa penyelenggaraan operasi pencarian dan pertolongan kepada masyarakat.`,

    `Melakukan pembinaan, pemantauan, dan evaluasi terhadap penyelenggaraan pencarian dan pertolongan.`,

    `Melakukan pemasyarakatan pencarian dan pertolongan.`,
]

const dataFungsi = [
    `Perumusan dan penetapan norma, standar, prosedur, kriteria, serta persyaratan dan prosedur perizinan dan/atau rekomendasi penyelenggaraan operasi pencarian dan pertolongan.`,

    `Perumusan, penetapan, dan pelaksanaan kebijakan di bidang penyelenggaraan operasi pencarian dan pertolongan, pembinaan tenaga dan potensi, sarana dan prasarana, serta sistem komunikasi.`,

    `Perumusan, penetapan, dan pelaksanaan standardisasi siaga, latihan, dan pelaksanaan operasi pencarian dan pertolongan.`,

    `Perumusan dan penetapan kebutuhan siaga, latihan, dan pelaksanaan operasi pencarian dan pertolongan.`,

    `Koordinasi pelaksanaan penyelenggaraan operasi pencarian dan pertolongan, pembinaan tenaga dan potensi, sarana dan prasarana, serta sistem komunikasi.`,

    `Pengembangan dan pelaksanaan sistem informasi dan komunikasi pencarian dan pertolongan.`,

    `Pelayanan informasi penyelenggaraan pencarian dan pertolongan.`,

    `Pemantauan, analisis, evaluasi, dan pelaporan di bidang pencarian dan pertolongan.`,

    `Pelaksanaan bimbingan dan penyuluhan bidang pencarian dan pertolongan.`,

    `Pengelolaan barang milik atau kekayaan negara yang menjadi tanggung jawab Badan Nasional Pencarian dan Pertolongan.`,

    `Koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Badan Nasional Pencarian dan Pertolongan.`,

    `Pengawasan intern atas pelaksanaan tugas di bidangnya.`,

    `Pelaksanaan dukungan yang bersifat substantif kepada seluruh unsur organisasi di lingkungan Badan Nasional Pencarian dan Pertolongan.`,
]

function ChevronIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
            aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

function DaftarNomor({ data }) {
    return (
        <ol className="divide-y divide-slate-200">
            {data.map((isi, index) => (
                <li
                    key={`${index}-${isi.slice(0, 20)}`}
                    className="grid gap-2 py-5 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-4">
                    <span className="font-mono text-xs font-bold leading-7 text-[#ff6600]">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                        {isi}
                    </p>
                </li>
            ))}
        </ol>
    )
}

function DropdownBagian({
    bagian,
    judul,
    pengantar,
    data,
    terbuka = false,
}) {
    return (
        <details
            open={terbuka}
            className="group border-b border-slate-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 transition-colors hover:text-[#ff6600] [&::-webkit-details-marker]:hidden">
                <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#ff6600] text-sm font-bold text-white">
                        {bagian}
                    </span>

                    <h2 className="text-base font-bold text-[#0f172a] sm:text-lg">
                        {judul}
                    </h2>
                </div>

                <span className="shrink-0 text-slate-500 transition-colors group-hover:text-[#ff6600]">
                    <ChevronIcon />
                </span>
            </summary>

            <div className="pb-7 sm:pl-[52px]">
                {pengantar && (
                    <p className="border-b border-slate-200 pb-5 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                        {pengantar}
                    </p>
                )}

                <DaftarNomor data={data} />
            </div>
        </details>
    )
}

export default function TugasFungsiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Tugas dan Fungsi Basarnas
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Kedudukan, tugas pokok, dan fungsi Badan
                            Nasional Pencarian dan Pertolongan.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <div className="border-t border-slate-300">
                        <DropdownBagian
                            bagian="A"
                            judul="Kedudukan"
                            data={dataKedudukan}
                            terbuka
                        />

                        <DropdownBagian
                            bagian="B"
                            judul="Tugas Pokok"
                            pengantar="Badan Nasional Pencarian dan Pertolongan mempunyai tugas:"
                            data={dataTugasPokok}
                        />

                        <DropdownBagian
                            bagian="C"
                            judul="Fungsi"
                            pengantar="Badan Nasional Pencarian dan Pertolongan menyelenggarakan fungsi:"
                            data={dataFungsi}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}