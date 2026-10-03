'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Modal from '@/components/ui/Modal'
import Button from '@/components/Button'

const TimPage = () => {
    const [timList, setTimList] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [form, setForm] = useState({
        kode_tim: `TIM-${Date.now().toString().slice(-4)}`,
        nama_tim: '',
        jenis_tim: 'RESCUE_TEAM',
        instansi: 'Kansar Padang',
        kategori_potensi: 'BASARNAS',
        kontak: '',
        keterangan: '',
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const fetchTim = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/admin/sumber-daya/tim')
            setTimList(res.data?.data || res.data || [])
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat daftar Tim SAR' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTim()
    }, [])

    const validate = () => {
        const errs = {}
        if (!form.kode_tim.trim()) errs.kode_tim = 'Kode tim wajib diisi'
        if (!form.nama_tim.trim()) errs.nama_tim = 'Nama tim SAR wajib diisi'
        if (!form.jenis_tim.trim()) errs.jenis_tim = 'Jenis tim wajib diisi'
        if (!form.instansi.trim()) errs.instansi = 'Instansi asal tim wajib diisi'
        if (!form.kategori_potensi) errs.kategori_potensi = 'Kategori potensi SAR wajib dipilih'

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validate()) return

        setSubmitting(true)
        try {
            await axios.post('/api/admin/sumber-daya/tim', form)
            setAlert({ type: 'success', message: 'Tim SAR berhasil ditambahkan' })
            setIsModalOpen(false)
            setForm({
                kode_tim: `TIM-${Date.now().toString().slice(-4)}`,
                nama_tim: '',
                jenis_tim: 'RESCUE_TEAM',
                instansi: 'Kansar Padang',
                kategori_potensi: 'BASARNAS',
                kontak: '',
                keterangan: '',
            })
            fetchTim()
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menyimpan Tim SAR' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Header title="Manajemen Tim SAR & Potensi" />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Daftar Tim SAR & SRU</h2>
                        <p className="text-sm text-gray-500">Regu penyelamat dan unsur potensi gabungan di Padang</p>
                    </div>
                    <Button
                        onClick={() => {
                            setErrors({})
                            setIsModalOpen(true)
                        }}
                        className="bg-orange-600 hover:bg-orange-700">
                        + Tambah Tim SAR
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Memuat data tim SAR...</div>
                    ) : timList.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Belum ada tim SAR yang terdaftar.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Kode Tim</th>
                                        <th className="px-6 py-3 text-left">Nama Tim</th>
                                        <th className="px-6 py-3 text-left">Instansi</th>
                                        <th className="px-6 py-3 text-left">Kategori Potensi</th>
                                        <th className="px-6 py-3 text-left">Kontak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {timList.map(tim => (
                                        <tr key={tim.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono font-medium text-gray-900">{tim.kode_tim}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{tim.nama_tim}</td>
                                            <td className="px-6 py-4 text-gray-600">{tim.instansi}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                                                    {tim.kategori_potensi}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{tim.kontak || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Tim SAR / SRU Baru">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kode Tim *</label>
                        <input
                            type="text"
                            value={form.kode_tim}
                            onChange={e => setForm({ ...form, kode_tim: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.kode_tim && <p className="mt-1 text-xs text-red-600">{errors.kode_tim}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Tim SAR *</label>
                        <input
                            type="text"
                            placeholder="Contoh: SRU Alpha Air"
                            value={form.nama_tim}
                            onChange={e => setForm({ ...form, nama_tim: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.nama_tim && <p className="mt-1 text-xs text-red-600">{errors.nama_tim}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instansi / Organisasi *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Basarnas Padang, BPBD, TNI-AL"
                            value={form.instansi}
                            onChange={e => setForm({ ...form, instansi: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.instansi && <p className="mt-1 text-xs text-red-600">{errors.instansi}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jenis Tim *</label>
                            <input
                                type="text"
                                placeholder="Contoh: RESCUE_TEAM"
                                value={form.jenis_tim}
                                onChange={e => setForm({ ...form, jenis_tim: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.jenis_tim && <p className="mt-1 text-xs text-red-600">{errors.jenis_tim}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kategori Potensi *</label>
                            <select
                                value={form.kategori_potensi}
                                onChange={e => setForm({ ...form, kategori_potensi: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                                <option value="BASARNAS">BASARNAS</option>
                                <option value="TNI">TNI</option>
                                <option value="POLRI">POLRI</option>
                                <option value="BPBD">BPBD</option>
                                <option value="PMI">PMI</option>
                                <option value="RELAWAN">RELAWAN</option>
                                <option value="LAINNYA">LAINNYA</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kontak Tim</label>
                        <input
                            type="text"
                            placeholder="Nomor telepon / frekuensi radio"
                            value={form.kontak}
                            onChange={e => setForm({ ...form, kontak: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Menyimpan...' : 'Simpan Tim SAR'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default TimPage
