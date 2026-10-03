'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import Badge from '@/components/ui/Badge'
import FilterBar from '@/components/dashboard/FilterBar'
import StatCards from '@/components/dashboard/StatCards'

const SarMap = dynamic(() => import('@/components/dashboard/SarMap'), {
    ssr: false,
    loading: () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[580px] flex flex-col items-center justify-center text-gray-400">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-semibold tracking-wider uppercase">Memuat Peta Geospasial...</span>
        </div>
    ),
})

const Dashboard = () => {
    // Filter states
    const [filterTahun, setFilterTahun] = useState('')
    const [filterBulan, setFilterBulan] = useState('')
    const [filterJenis, setFilterJenis] = useState('')

    // Master data
    const [tahunList, setTahunList] = useState([2026, 2025, 2024])
    const [jenisList, setJenisList] = useState([])

    // Data states
    const [stats, setStats] = useState(null)
    const [activeOperations, setActiveOperations] = useState([])
    const [mapOperations, setMapOperations] = useState([])
    const [loading, setLoading] = useState(true)

    // 1. Ambil data master jenis operasi & opsi tahun awal
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const res = await axios.get('/api/public/master-data')
                if (res.data?.jenis_operasi) {
                    setJenisList(res.data.jenis_operasi)
                }
            } catch {
                // Gunakan fallback default jika endpoint gagal
                setJenisList([
                    { kode: 'BENCANA_ALAM', nama: 'Bencana Alam' },
                    { kode: 'KLL_PESAWAT', nama: 'Kecelakaan Pesawat' },
                    { kode: 'KLL_KAPAL', nama: 'Kecelakaan Kapal' },
                    { kode: 'KMM', nama: 'Kondisi Membahayakan Manusia' },
                    { kode: 'KLL_KHUSUS', nama: 'Kecelakaan dengan penanganan khusus' },
                ])
            }
        }
        fetchMasterData()
    }, [])

    // 2. Fetch data dashboard berdasarkan filter
    const fetchDashboardData = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filterTahun) params.set('tahun', filterTahun)
            if (filterBulan) params.set('bulan', filterBulan)
            if (filterJenis) params.set('jenis', filterJenis)

            const queryString = params.toString() ? `?${params.toString()}` : ''

            const [statsRes, tableOpsRes, mapOpsRes] = await Promise.all([
                axios.get(`/api/admin/umum/statistik${queryString}`).catch(() => ({ data: {} })),
                axios.get(`/api/admin/operasi${queryString}${queryString ? '&' : '?'}per_page=5`).catch(() => ({ data: { data: [] } })),
                axios.get(`/api/admin/operasi${queryString}${queryString ? '&' : '?'}per_page=all`).catch(() => ({ data: { data: [] } })),
            ])

            const statsData = statsRes.data || {}

            // Data untuk sebaran peta & kalkulasi (unpaginated)
            const mapData = Array.isArray(mapOpsRes.data?.data)
                ? mapOpsRes.data.data
                : Array.isArray(mapOpsRes.data)
                ? mapOpsRes.data
                : []
            setMapOperations(mapData)

            // Hitung kalkulasi kategori dari seluruh data operasi aktif
            const computedKategori = {
                bencana_alam: 0,
                kll_pesawat: 0,
                kll_kapal: 0,
                kmm: 0,
                kll_khusus: 0,
            }

            mapData.forEach(op => {
                const kode = (op.jenis_operasi?.kode || '').toUpperCase()
                const nama = (op.jenis_operasi?.nama || '').toLowerCase()

                if (kode === 'BENCANA_ALAM' || nama.includes('bencana')) {
                    computedKategori.bencana_alam++
                } else if (kode === 'KLL_PESAWAT' || nama.includes('pesawat') || nama.includes('udara')) {
                    computedKategori.kll_pesawat++
                } else if (kode === 'KLL_KAPAL' || nama.includes('kapal') || nama.includes('laut') || nama.includes('perairan')) {
                    computedKategori.kll_kapal++
                } else if (kode === 'KMM' || nama.includes('membahayakan') || nama.includes('kmm')) {
                    computedKategori.kmm++
                } else if (kode === 'KLL_KHUSUS' || nama.includes('khusus')) {
                    computedKategori.kll_khusus++
                }
            })

            const mergedStats = {
                ...statsData,
                kategori: {
                    bencana_alam: statsData.kategori?.bencana_alam ?? computedKategori.bencana_alam,
                    kll_pesawat: statsData.kategori?.kll_pesawat ?? computedKategori.kll_pesawat,
                    kll_kapal: statsData.kategori?.kll_kapal ?? computedKategori.kll_kapal,
                    kmm: statsData.kategori?.kmm ?? computedKategori.kmm,
                    kll_khusus: statsData.kategori?.kll_khusus ?? computedKategori.kll_khusus,
                },
            }
            setStats(mergedStats)

            if (Array.isArray(statsData.tahun_tersedia) && statsData.tahun_tersedia.length > 0) {
                setTahunList(statsData.tahun_tersedia)
            }

            // Data untuk tabel
            const tableData = Array.isArray(tableOpsRes.data?.data)
                ? tableOpsRes.data.data
                : Array.isArray(tableOpsRes.data)
                ? tableOpsRes.data
                : mapData.slice(0, 5)
            setActiveOperations(tableData)
        } catch (err) {
            // Gagal memuat data
        } finally {
            setLoading(false)
        }
    }, [filterTahun, filterBulan, filterJenis])

    useEffect(() => {
        fetchDashboardData()
    }, [fetchDashboardData])

    // Reset Filter
    const handleResetFilter = () => {
        setFilterTahun('')
        setFilterBulan('')
        setFilterJenis('')
    }

    return (
        <>
            <Header title="Dashboard Basarnas-Padang" />

            <div className="py-8 bg-slate-50/50 min-h-[calc(100vh-64px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
                    {/* Seksi 1: Filter Bar */}
                    <FilterBar
                        filterTahun={filterTahun}
                        setFilterTahun={setFilterTahun}
                        filterBulan={filterBulan}
                        setFilterBulan={setFilterBulan}
                        filterJenis={filterJenis}
                        setFilterJenis={setFilterJenis}
                        tahunList={tahunList}
                        jenisList={jenisList}
                        onReset={handleResetFilter}
                        isLoading={loading}
                    />

                    {/* Seksi 2: 5 Kartu Statistik Kategori SAR */}
                    <StatCards stats={stats} loading={loading} />

                    {/* Seksi 3: Peta Geospasial Leaflet */}
                    <SarMap operations={mapOperations} loading={loading} />

                    {/* Seksi 4: Tabel Operasi Terkini */}
                    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">
                                    Daftar Operasi SAR Terkini
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Ringkasan operasi pencarian dan pertolongan berdasarkan filter aktif
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-gray-400 text-sm">
                                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                Memuat data operasi...
                            </div>
                        ) : activeOperations.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 text-sm">
                                Tidak ada data operasi SAR yang sesuai dengan kriteria filter saat ini.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left">Kode & Nama Operasi</th>
                                            <th className="px-6 py-3.5 text-left">Kategori</th>
                                            <th className="px-6 py-3.5 text-left">Status</th>
                                            <th className="px-6 py-3.5 text-left">Lokasi</th>
                                            <th className="px-6 py-3.5 text-left">Tanggal Mulai</th>
                                            <th className="px-6 py-3.5 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {activeOperations.map((op) => (
                                            <tr key={op.id} className="hover:bg-orange-50/40 transition duration-150">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{op.nama_operasi}</div>
                                                    <div className="text-xs font-mono text-orange-600 font-medium">
                                                        {op.kode_operasi}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center text-xs font-medium text-gray-700">
                                                        {op.jenis_operasi?.nama || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge>
                                                        {op.status_operasi?.kode || op.status_operasi?.nama || 'AKTIF'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-600">
                                                     {op.nama_lokasi || op.kabupaten?.nama || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-600">
                                                    {op.tanggal_mulai
                                                        ? new Date(op.tanggal_mulai).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/admin/operasi/${op.id}`}
                                                        className="text-xs font-bold text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-md px-3 py-1.5 transition duration-150">
                                                        Detail &rarr;
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard