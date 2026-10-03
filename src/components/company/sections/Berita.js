import JudulBagian from '@/components/company/shared/JudulBagian'
import { berita } from '@/data/companyData'

export default function Berita() {
    return (
        <section
            id="berita"
            className="scroll-mt-20 bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <JudulBagian
                    label="Informasi"
                    judul="Berita Terbaru"
                    deskripsi="Informasi operasi, kesiapsiagaan, dan kegiatan Kantor Pencarian dan Pertolongan Padang."
                />

                <div className="grid gap-7 lg:grid-cols-3">
                    {berita.map((item, index) => (
                        <article
                            key={item.judul}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={item.gambar}
                                    alt={item.judul}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <span className="absolute left-5 top-5 rounded-full bg-[#ff6600] px-4 py-2 text-xs font-black text-white">
                                    {item.kategori}
                                </span>
                            </div>

                            <div className="p-6">
                                <p className="text-xs font-bold text-slate-400">
                                    {item.tanggal}
                                </p>

                                <h3 className="mt-3 text-xl font-black leading-snug text-[#0f172a]">
                                    {item.judul}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Pelaksanaan kegiatan dilakukan secara cepat
                                    dengan melibatkan unsur SAR terkait.
                                </p>

                                <a
                                    href={`/berita/${index + 1}`}
                                    className="mt-5 inline-block font-black text-[#ff6600]">
                                    Baca selengkapnya →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}