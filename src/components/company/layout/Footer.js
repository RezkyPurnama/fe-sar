import Link from 'next/link'
import { menu } from '@/data/companyData'

export default function Footer() {
    const tautanCepat = menu.flatMap((item) => {
        // Jika memiliki submenu, ambil semua isi submenu
        if (item.submenu && item.submenu.length > 0) {
            return item.submenu
        }

        // Jika menu biasa dan memiliki link
        if (item.link) {
            return [item]
        }

        return []
    })

    return (
        <footer className="bg-[#09111f] py-12 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
                {/* Identitas */}
                <div>
                    <Link
                        href="/"
                        className="inline-block text-2xl font-black text-[#ff6600] transition hover:text-orange-400">
                        BASARNAS
                    </Link>

                    <p className="mt-2 text-sm font-bold uppercase tracking-wider text-white">
                        Kantor SAR Padang
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                        Avignam Jagat Samagram — Semoga Selamatlah Alam
                        Semesta.
                    </p>
                </div>

                {/* Tautan cepat */}
                <div>
                    <strong className="text-base font-black uppercase tracking-wide">
                        Tautan Cepat
                    </strong>

                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-400 sm:grid-cols-2">
                        {tautanCepat.map((item) => (
                            <Link
                                key={`${item.nama}-${item.link}`}
                                href={item.link}
                                className="transition hover:translate-x-1 hover:text-[#ff6600]">
                                {item.nama}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Informasi */}
                <div>
                    <strong className="text-base font-black uppercase tracking-wide">
                        Informasi
                    </strong>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                        Layanan darurat tersedia selama 24 jam melalui nomor
                        darurat nasional 115.
                    </p>

                    <a
                        href="tel:115"
                        className="mt-5 inline-flex rounded-full bg-[#ff6600] px-5 py-3 text-sm font-black text-white transition hover:bg-orange-700">
                        Hubungi Darurat 115
                    </a>

                    <p className="mt-6 text-xs text-slate-500">
                        © 2026 Kantor Pencarian dan Pertolongan Padang.
                    </p>
                </div>
            </div>
        </footer>
    )
}