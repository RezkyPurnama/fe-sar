const dataKegiatan = [
    {
        tanggal: '18',
        bulan: 'SEP',
        nama: 'Latihan SAR Air',
        lokasi: 'Pantai Padang',
        waktu: '08.00 WIB',
    },
    {
        tanggal: '21',
        bulan: 'SEP',
        nama: 'Pelatihan Pertolongan Pertama',
        lokasi: 'Kantor SAR Padang',
        waktu: '08.00 WIB',
    },
    {
        tanggal: '25',
        bulan: 'SEP',
        nama: 'Siaga Cuaca Ekstrem',
        lokasi: 'Sumatera Barat',
        waktu: '08.00 WIB',
    },
]

export default function Kegiatan() {
    return (
        <section id="kegiatan" className="scroll-mt-20 py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
                <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ff6600]">
                        Agenda
                    </p>

                    <h2 className="mt-4 text-4xl font-black text-[#0f172a]">
                        Kegiatan Terbaru
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                        Agenda pelatihan, sosialisasi, dan kesiapsiagaan SAR di
                        wilayah Padang dan Sumatera Barat.
                    </p>
                </div>

                <div className="space-y-4">
                    {dataKegiatan.map(item => (
                        <div
                            key={item.nama}
                            className="flex items-center gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-[#ff6600]">
                            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-orange-50 text-center">
                                <span>
                                    <strong className="block text-3xl leading-none text-[#ff6600]">
                                        {item.tanggal}
                                    </strong>

                                    <small className="font-black">
                                        {item.bulan}
                                    </small>
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-[#0f172a]">
                                    {item.nama}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {item.lokasi} • {item.waktu}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}