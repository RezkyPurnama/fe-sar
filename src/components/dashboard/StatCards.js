'use client'

import Image from 'next/image'

const CATEGORIES = [
    {
        key: 'bencana_alam',
        label: 'Bencana Alam',
        emoji: '',
        image: '/images/cards/bencana.webp',
        gradientFrom: 'from-amber-900/40',
        accentColor: 'text-amber-300',
        badgeBg: 'bg-amber-500/30 text-white ring-amber-400/30',
        borderColor: 'border-amber-500',
    },
    {
        key: 'kll_pesawat',
        label: 'Kecelakaan Pesawat',
        emoji: '',
        image: '/images/cards/pesawat.jpg',
        gradientFrom: 'from-blue-900/40',
        accentColor: 'text-blue-300',
        badgeBg: 'bg-blue-500/30 text-white ring-blue-400/30',
        borderColor: 'border-blue-500',
    },
    {
        key: 'kll_kapal',
        label: 'Kecelakaan Kapal',
        emoji: '',
        image: '/images/cards/kapal.webp',
        gradientFrom: 'from-sky-900/40',
        accentColor: 'text-sky-300',
        badgeBg: 'bg-sky-500/30 text-white  ring-sky-400/30',
        borderColor: 'border-sky-500',
    },
    {
        key: 'kmm',
        label: 'Kondisi Membahayakan Manusia',
        emoji: '',
        image: '/images/cards/kmm.webp',
        gradientFrom: 'from-red-900/40',
        accentColor: 'text-red-300',
        badgeBg: 'bg-red-500/30 text-white ring-red-400/30',
        borderColor: 'border-red-500',
    },
    {
        key: 'kll_khusus',
        label: 'Kecelakaan dengan Penanganan Khusus',
        emoji: '',
        image: '/images/cards/khusus.webp',
        gradientFrom: 'from-orange-950/40',
        accentColor: 'text-orange-300',
        badgeBg: 'bg-orange-500/30 text-white ring-orange-400/30',
        borderColor: 'border-[#FF6600]',
    },
]

const StatCards = ({ stats = {}, loading = false }) => {
    const kategoriStats = stats?.kategori || {}

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold uppercase tracking-wider text-gray-700">
                    Jenis-Jenis Operasi SAR
                </h3>
                <span className="text-xs text-gray-400">Total 5 Kategori Standar Basarnas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {CATEGORIES.map(cat => {
                    const count = kategoriStats[cat.key] ?? 0

                    return (
                        <div
                            key={cat.key}
                            className={`relative overflow-hidden rounded-xl shadow-md border-l-4 ${cat.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-default`}
                            style={{ minHeight: '160px' }}>
                            {/* Background Image */}
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t ${cat.gradientFrom} ${cat.gradientTo} transition-opacity duration-300 group-hover:opacity-90`}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-4 flex flex-col justify-between h-full" style={{ minHeight: '160px' }}>
                                {/* Top: Badge & Emoji */}
                                <div className="flex items-start justify-between">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ${cat.badgeBg} backdrop-blur-sm`}>
                                        <span className="line-clamp-2 leading-tight">{cat.label}</span>
                                    </span>
                                </div>

                                {/* Bottom: Count & Sublabel */}
                                <div className="mt-auto">
                                    <div className="flex items-baseline space-x-2">
                                        <span className={`text-4xl font-extrabold text-white tracking-tight drop-shadow-lg`}>
                                            {loading ? (
                                                <span className="inline-block w-10 h-9 bg-white/20 animate-pulse rounded-md" />
                                            ) : (
                                                count
                                            )}
                                        </span>
                                        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                                            Kasus
                                        </span>
                                    </div>
                                    <p className={`mt-1 text-[11px] font-medium ${cat.accentColor} truncate`}>
                                        {cat.sublabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatCards
