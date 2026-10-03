'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Button from '@/components/Button'

const AlatPage = () => {
    const [alatList, setAlatList] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [form, setForm] = useState({
        kode_alat: `ALT-${Date.now().toString().slice(-4)}`,
        nama_alat: '',
        kategori: 'LOGISTIK_AIR',
        jumlah_total: 1,
        jumlah_tersedia: 1,
        satuan: 'UNIT',
        kondisi: 'BAIK',
        keterangan: '',
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const fetchAlat = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/admin/sumber-daya/alat')
            setAlatList(res.data?.data || res.data || [])
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat daftar alat SAR' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAlat()
    }, [])

    const validate = () => {
        const errs = {}
        if (!form.kode_alat.trim()) errs.kode_alat = 'Kode alat wajib diisi'
        if (!form.nama_alat.trim()) errs.nama_alat = 'Nama alat wajib diisi'
        if (!form.kategori.trim()) errs.kategori = 'Kategori wajib diisi'
        if (Number(form.jumlah_total) < 1) errs.jumlah_total = 'Jumlah total minimal 1'

        if (Number(form.jumlah_tersedia) < 0) {
            errs.jumlah_tersedia = 'Jumlah tersedia tidak boleh negatif'
        } else if (Number(form.jumlah_tersedia) > Number(form.jumlah_total)) {
            errs.jumlah_tersedia = 'Jumlah tersedia tidak boleh melebihi jumlah total'
        }

        if (!form.satuan.trim()) errs.satuan = 'Satuan alat wajib diisi'

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validate()) return

        setSubmitting(true)
        try {
            await axios.post('/api/admin/sumber-daya/alat', {
                ...form,
                jumlah_total: Number(form.jumlah_total),
                jumlah_tersedia: Number(form.jumlah_tersedia),
            })
            setAlert({ type: 'success', message: 'Alat SAR / Logistik berhasil didaftarkan' })
            setIsModalOpen(false)
            setForm({
                kode_alat: `ALT-${Date.now().toString().slice(-4)}`,
                nama_alat: '',
                kategori: 'LOGISTIK_AIR',
                jumlah_total: 1,
                jumlah_tersedia: 1,
                satuan: 'UNIT',
                kondisi: 'BAIK',
                keterangan: '',
            })
            fetchAlat()
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menyimpan alat SAR' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Header title="Inventaris Alat & Logistik SAR" />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Inventaris Alat, Alut & Peralatan Operasi</h2>
                        <p className="text-sm text-gray-500">Pemantauan stok dan kesiapan sarana penyelamatan SAR Padang</p>
                    </div>
                    <Button
                        onClick={() => {
                            setErrors({})
                            setIsModalOpen(true)
                        }}
                        className="bg-orange-600 hover:bg-orange-700">
                        + Tambah Alat SAR
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Memuat inventaris alat...</div>
                    ) : alatList.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Belum ada inventaris alat tercatat.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Kode</th>
                                        <th className="px-6 py-3 text-left">Nama Alat & Logistik</th>
                                        <th className="px-6 py-3 text-left">Kategori</th>
                                        <th className="px-6 py-3 text-center">Stok Total</th>
                                        <th className="px-6 py-3 text-center">Tersedia</th>
                                        <th className="px-6 py-3 text-left">Kondisi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {alatList.map(a => (
                                        <tr key={a.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-gray-700">{a.kode_alat}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{a.nama_alat}</td>
                                            <td className="px-6 py-4 text-gray-600">{a.kategori}</td>
                                            <td className="px-6 py-4 text-center font-medium text-gray-800">
                                                {a.jumlah_total} {a.satuan}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                                                    a.jumlah_tersedia > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {a.jumlah_tersedia} {a.satuan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge>{a.kondisi}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pendaftaran Alat & Logistik SAR">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kode Alat *</label>
                            <input
                                type="text"
                                value={form.kode_alat}
                                onChange={e => setForm({ ...form, kode_alat: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.kode_alat && <p className="mt-1 text-xs text-red-600">{errors.kode_alat}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kategori Alat *</label>
                            <input
                                type="text"
                                placeholder="Contoh: ALUT_AIR, KOMUNIKASI, EVAKUASI"
                                value={form.kategori}
                                onChange={e => setForm({ ...form, kategori: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.kategori && <p className="mt-1 text-xs text-red-600">{errors.kategori}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Alat / Perlengkapan *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Perahu Karet RIB 01"
                            value={form.nama_alat}
                            onChange={e => setForm({ ...form, nama_alat: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.nama_alat && <p className="mt-1 text-xs text-red-600">{errors.nama_alat}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jumlah Total *</label>
                            <input
                                type="number"
                                min="1"
                                value={form.jumlah_total}
                                onChange={e => setForm({ ...form, jumlah_total: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.jumlah_total && <p className="mt-1 text-xs text-red-600">{errors.jumlah_total}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jumlah Tersedia *</label>
                            <input
                                type="number"
                                min="0"
                                value={form.jumlah_tersedia}
                                onChange={e => setForm({ ...form, jumlah_tersedia: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.jumlah_tersedia && <p className="mt-1 text-xs text-red-600">{errors.jumlah_tersedia}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Satuan *</label>
                            <input
                                type="text"
                                placeholder="UNIT / SET"
                                value={form.satuan}
                                onChange={e => setForm({ ...form, satuan: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.satuan && <p className="mt-1 text-xs text-red-600">{errors.satuan}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kondisi Alat *</label>
                        <select
                            value={form.kondisi}
                            onChange={e => setForm({ ...form, kondisi: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="BAIK">Baik / Siap Pakai</option>
                            <option value="RUSAK_RINGAN">Rusak Ringan</option>
                            <option value="RUSAK_BERAT">Rusak Berat</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Menyimpan...' : 'Simpan Alat SAR'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AlatPage
