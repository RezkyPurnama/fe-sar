'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Pagination from '@/components/ui/Pagination'
import Button from '@/components/Button'

const OperasiIndex = () => {
    const [operasiList, setOperasiList] = useState([])
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [jenisFilter, setJenisFilter] = useState('')
    const [masterData, setMasterData] = useState({ jenis_operasi: [], status_operasi: [] })
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)

    const fetchMasterData = async () => {
        try {
            const res = await axios.get('/api/public/master-data')
            setMasterData(res.data)
        } catch (err) {
            // Error master data
        }
    }

    const fetchOperasi = async (page = 1) => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            params.append('page', page)
            if (search) params.append('search', search)
            if (statusFilter) params.append('status', statusFilter)
            if (jenisFilter) params.append('jenis_operasi_id', jenisFilter)

            const res = await axios.get(`/api/admin/operasi?${params.toString()}`)
            setOperasiList(res.data?.data || [])
            setMeta({
                current_page: res.data?.current_page || 1,
                last_page: res.data?.last_page || 1,
            })
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat daftar operasi SAR' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMasterData()
    }, [])

    useEffect(() => {
        fetchOperasi(1)
    }, [statusFilter, jenisFilter])

    const handleSearch = e => {
        e.preventDefault()
        fetchOperasi(1)
    }

    const handleDelete = async id => {
        if (!confirm('Apakah Anda yakin ingin menghapus operasi ini?')) return
        try {
            await axios.delete(`/api/admin/operasi/${id}`)
            setAlert({ type: 'success', message: 'Operasi SAR berhasil dihapus' })
            fetchOperasi(meta.current_page)
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menghapus operasi' })
        }
    }

    return (
        <>
            <Header title="Kelola Data Operasi SAR" />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                {/* Header Actions & Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Daftar Kejadian & Operasi SAR</h2>
                            <p className="text-sm text-gray-500">Kelola informasi tanggap darurat dan pencarian Basarnas Padang</p>
                        </div>
                        <Link href="/admin/operasi/create">
                            <Button className="bg-orange-600 hover:bg-orange-700">
                                + Tambah Operasi Baru
                            </Button>
                        </Link>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                        <input
                            type="text"
                            placeholder="Cari kode atau nama operasi..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="">Semua Status</option>
                            {masterData.status_operasi?.map(s => (
                                <option key={s.id} value={s.kode}>{s.nama}</option>
                            ))}
                        </select>
                        <select
                            value={jenisFilter}
                            onChange={e => setJenisFilter(e.target.value)}
                            className="rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="">Semua Jenis Operasi</option>
                            {masterData.jenis_operasi?.map(j => (
                                <option key={j.id} value={j.id}>{j.nama}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700">
                            Cari
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Memuat data operasi...</div>
                    ) : operasiList.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Tidak ada data operasi SAR yang ditemukan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Kode & Nama</th>
                                        <th className="px-6 py-3 text-left">Jenis</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Lokasi</th>
                                        <th className="px-6 py-3 text-left">Mulai</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {operasiList.map(op => (
                                        <tr key={op.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{op.nama_operasi}</div>
                                                <div className="text-xs text-gray-500">{op.kode_operasi}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {op.jenis_operasi?.nama || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge>{op.status_operasi?.kode || op.status_operasi?.nama || 'SIAGA'}</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {op.nama_lokasi}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {op.tanggal_mulai ? new Date(op.tanggal_mulai).toLocaleDateString('id-ID') : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link
                                                    href={`/admin/operasi/${op.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium">
                                                    Detail
                                                </Link>
                                                <span className="text-gray-300">|</span>
                                                <Link
                                                    href={`/admin/operasi/${op.id}/edit`}
                                                    className="text-yellow-600 hover:text-yellow-900 font-medium">
                                                    Edit
                                                </Link>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                    onClick={() => handleDelete(op.id)}
                                                    className="text-red-600 hover:text-red-900 font-medium">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={meta.current_page}
                                lastPage={meta.last_page}
                                onPageChange={page => fetchOperasi(page)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default OperasiIndex
