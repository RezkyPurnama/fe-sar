'use client'

const BULAN_OPTIONS = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
]

const FilterBar = ({
    filterTahun,
    setFilterTahun,
    filterBulan,
    setFilterBulan,
    filterJenis,
    setFilterJenis,
    tahunList = [],
    jenisList = [],
    onReset,
    isLoading = false,
}) => {
    const hasActiveFilter = Boolean(filterTahun || filterBulan || filterJenis)

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-4">
                        {/* <span className="text-orange-600 text-xl">🔽</span> */}
                        <img src="/images/search.webp" alt="Gambar Filter" className="w-10 h-10" />
                        <h3 className="text-2xl font-bold text-gray-800">
                            Filter Data Operasi SAR
                        </h3>
                    </div>
                    {/* <p className="text-xs text-gray-500 mt-0.5">
                        Filter statistik kejadian & sebaran titik peta berdasarkan periode dan jenis operasi
                    </p> */}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Filter Tahun */}
                    <div className="w-full sm:w-auto">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Tahun
                        </label>
                        <select
                            value={filterTahun}
                            onChange={e => setFilterTahun(e.target.value)}
                            disabled={isLoading}
                            className="w-full sm:w-36 text-sm rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 py-1.5 px-3">
                            <option value="">Semua Tahun</option>
                            {tahunList.map(thn => (
                                <option key={thn} value={thn}>
                                    Tahun {thn}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filter Bulan */}
                    <div className="w-full sm:w-auto">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Bulan
                        </label>
                        <select
                            value={filterBulan}
                            onChange={e => setFilterBulan(e.target.value)}
                            disabled={isLoading}
                            className="w-full sm:w-36 text-sm rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 py-1.5 px-3">
                            <option value="">Semua Bulan</option>
                            {BULAN_OPTIONS.map(b => (
                                <option key={b.value} value={b.value}>
                                    {b.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filter Jenis Operasi */}
                    <div className="w-full sm:w-auto">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Jenis Operasi
                        </label>
                        <select
                            value={filterJenis}
                            onChange={e => setFilterJenis(e.target.value)}
                            disabled={isLoading}
                            className="w-full sm:w-52 text-sm rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 py-1.5 px-3">
                            <option value="">Semua Jenis Operasi</option>
                            {jenisList.map(j => (
                                <option key={j.kode || j.id} value={j.kode || j.id}>
                                    {j.nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reset Button */}
                    {hasActiveFilter && (
                        <div className="w-full sm:w-auto self-end">
                            <button
                                type="button"
                                onClick={onReset}
                                className="inline-flex items-center text-xs font-semibold text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg px-3 py-2 transition duration-150">
                                ✕ Reset Filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilterBar
