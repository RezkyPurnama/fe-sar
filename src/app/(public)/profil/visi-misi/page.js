import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Visi-Misi',
    description:
        'Visi dan misi Basarnas.',
}

const daftarMisi = [
    {
        nomor: '01',
        isi: `Menyelenggarakan operasi pencarian dan pertolongan yang efektif, terintegrasi, dan berstandar internasional dalam rangka memberikan rasa aman bagi seluruh warga dalam bertransportasi maupun dalam menghadapi kejadian yang membahayakan manusia.`,
    },
    {
        nomor: '02',
        isi: `Menguatkan sistem penyelenggaraan pencarian dan pertolongan melalui pemenuhan kebutuhan sumber daya manusia, sarana dan prasarana serta sistem komunikasi, pengintegrasian seluruh potensi pencarian dan pertolongan, serta penguatan kerangka regulasi dan kelembagaan.`,
    },
]

function JudulBagian({ bagian, judul, id }) {
    return (
        <div
            id={id}
            className="scroll-mt-28 border-b-2 border-[#0f172a] pb-4">
            <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#ff6600] text-sm font-bold text-white">
                    {bagian}
                </span>

                <h2 className="text-lg font-bold tracking-tight text-[#0f172a] sm:text-xl">
                    {judul}
                </h2>
            </div>
        </div>
    )
}

function BagianVisi() {
    return (
        <section>
            <JudulBagian
                bagian="A"
                judul="Visi Badan Nasional Pencarian dan Pertolongan"
                id="visi"
            />

            <div className="grid items-center gap-7 py-8 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-9">
                <div className="flex justify-center sm:justify-start">
                    <img
                        src="/images/public/Logo_Basarnas.png"
                        alt="Logo Badan Nasional Pencarian dan Pertolongan"
                        className="h-auto w-24 object-contain sm:w-28"
                    />
                </div>

                <div className="border-l-2 border-[#ff6600] pl-5 sm:pl-6">
                    <p className="text-sm font-semibold leading-7 text-[#0f172a] sm:text-[15px] sm:leading-8">
                        Terwujudnya pencarian dan pertolongan yang andal dan
                        efektif dalam mendukung pencapaian visi dan misi
                        Presiden dan Wakil Presiden:
                    </p>

                    <blockquote className="mt-4 text-base font-bold leading-7 text-[#0f172a] sm:text-lg sm:leading-8">
                        “Indonesia yang maju, berdaulat, mandiri, dan
                        berkepribadian berlandaskan gotong royong.”
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

function BagianMisi() {
    return (
        <section className="mt-8 sm:mt-10">
            <JudulBagian
                bagian="B"
                judul="Misi Badan Nasional Pencarian dan Pertolongan"
                id="misi"
            />

            <div>
                {daftarMisi.map((misi) => (
                    <div
                        key={misi.nomor}
                        className="grid gap-3 border-b border-slate-200 py-6 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-5">
                        <span className="font-mono text-sm font-bold text-[#ff6600]">
                            {misi.nomor}
                        </span>

                        <p className="text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                            {misi.isi}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default function VisiMisiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Visi dan Misi Basarnas
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Arah, tujuan, dan komitmen Badan Nasional
                            Pencarian dan Pertolongan dalam memberikan
                            pelayanan kepada masyarakat.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <article className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <BagianVisi />
                    <BagianMisi />
                </article>
            </main>

            <Footer />
        </div>
    )
}