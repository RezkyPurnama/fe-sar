import Image from 'next/image'

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

function FotoProfil() {
    return (
        <figure>
            <div className="relative aspect-[4/3] overflow-hidden border-t-4 border-[#ff6600] bg-slate-100">
                <Image
                    src="/images/public/Gedung-Basarnas.png"
                    alt="Personel Kantor Pencarian dan Pertolongan Padang"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                />
            </div>

            <figcaption className="mt-3 flex items-start gap-3">
                <span className="mt-2.5 h-px w-6 shrink-0 bg-[#ff6600]" />

                <p className="text-xs leading-5 text-slate-500">
                    Personel Kantor Pencarian dan Pertolongan Padang
                    dalam pelaksanaan operasi SAR.
                </p>
            </figcaption>
        </figure>
    )
}

function RuangLingkup() {
    return (
        <div className="mt-7 border-y border-slate-300 py-5">
            <h3 className="text-sm font-bold text-[#0f172a]">
                Ruang Lingkup Pelayanan
            </h3>

            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="border-l-2 border-[#ff6600] pl-3">
                    Siaga dan operasi SAR
                </div>

                <div className="border-l-2 border-[#ff6600] pl-3">
                    Pencarian dan evakuasi
                </div>

                <div className="border-l-2 border-[#ff6600] pl-3">
                    Koordinasi potensi SAR
                </div>
            </div>
        </div>
    )
}

export default function Profil() {
    return (
        <section
            id="profil"
            className="scroll-mt-24 border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                {/* Judul bagian */}
                <header className="mb-9 border-b-2 border-[#0f172a] pb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6600]">
                        Tentang Kantor
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
                        Profil Singkat
                    </h2>
                </header>

                {/* Isi profil */}
                <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                    <FotoProfil />

                    <article className="min-w-0">
                        <h3 className="text-xl font-bold leading-8 text-[#0f172a] sm:text-2xl">
                            Kantor Pencarian dan Pertolongan Padang
                        </h3>

                        <p className="mt-5 border-l-2 border-[#ff6600] pl-5 text-base font-semibold leading-7 text-[#0f172a] sm:text-lg sm:leading-8">
                            Memberikan pelayanan pencarian dan
                            pertolongan bagi masyarakat di wilayah
                            Sumatera Barat.
                        </p>

                        <p className="mt-5 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                            Kantor Pencarian dan Pertolongan Padang
                            merupakan unit pelaksana teknis Badan Nasional
                            Pencarian dan Pertolongan yang melaksanakan
                            kesiapsiagaan, pencarian, pertolongan, dan
                            evakuasi terhadap kecelakaan, bencana, serta
                            kondisi yang membahayakan manusia.
                        </p>

                        <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                            Pelaksanaan tugas didukung oleh personel
                            terlatih, sarana dan prasarana SAR, sistem
                            komunikasi, serta koordinasi dengan instansi
                            dan potensi SAR untuk memberikan pelayanan
                            yang cepat, tepat, aman, dan terkoordinasi.
                        </p>

                        <RuangLingkup />

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href="/profil/sejarah"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] transition-colors hover:text-[#ff6600]">
                                Selengkapnya tentang BASARNAS
                                <ArrowIcon />
                            </a>

                            <p className="text-sm text-slate-500">
                                Darurat:{' '}
                                <a
                                    href="tel:115"
                                    className="font-bold text-[#ff6600]">
                                    115
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}