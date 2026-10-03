'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Modal from '@/components/ui/Modal'
import Button from '@/components/Button'

const PersonelPage = () => {
    const [personelList, setPersonelList] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [form, setForm] = useState({
        nomor_identitas: '',
        nama: '',
        jabatan: 'Rescuer Terampil',
        pangkat: 'Pengatur Muda (II/a)',
        instansi: 'Basarnas Padang',
        kontak: '',
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const fetchPersonel = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/admin/sumber-daya/personel')
            setPersonelList(res.data?.data || res.data || [])
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat daftar personel' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPersonel()
    }, [])

    const validate = () => {
        const errs = {}
        if (!form.nomor_identitas.trim()) errs.nomor_identitas = 'Nomor identitas/NIP wajib diisi'
        if (!form.nama.trim()) errs.nama = 'Nama personel wajib diisi'
        if (!form.jabatan.trim()) errs.jabatan = 'Jabatan personel wajib diisi'
        if (!form.instansi.trim()) errs.instansi = 'Instansi asal wajib diisi'

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validate()) return

        setSubmitting(true)
        try {
            await axios.post('/api/admin/sumber-daya/personel', form)
            setAlert({ type: 'success', message: 'Personel SAR berhasil ditambahkan' })
            setIsModalOpen(false)
            setForm({
                nomor_identitas: '',
                nama: '',
                jabatan: 'Rescuer Terampil',
                pangkat: 'Pengatur Muda (II/a)',
                instansi: 'Basarnas Padang',
                kontak: '',
            })
            fetchPersonel()
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menyimpan personel' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Header title="Manajemen Personel & Rescuer" />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Daftar Anggota Personel / Rescuer</h2>
                        <p className="text-sm text-gray-500">Pencatatan data rescuer dan petugas operasional SAR</p>
                    </div>
                    <Button
                        onClick={() => {
                            setErrors({})
                            setIsModalOpen(true)
                        }}
                        className="bg-orange-600 hover:bg-orange-700">
                        + Tambah Personel
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Memuat data personel...</div>
                    ) : personelList.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Belum ada personel yang terdaftar.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">No. Identitas / NIP</th>
                                        <th className="px-6 py-3 text-left">Nama Personel</th>
                                        <th className="px-6 py-3 text-left">Jabatan</th>
                                        <th className="px-6 py-3 text-left">Pangkat</th>
                                        <th className="px-6 py-3 text-left">Instansi</th>
                                        <th className="px-6 py-3 text-left">Kontak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {personelList.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-gray-700">{p.nomor_identitas}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{p.nama}</td>
                                            <td className="px-6 py-4 text-gray-600">{p.jabatan}</td>
                                            <td className="px-6 py-4 text-gray-600">{p.pangkat || '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{p.instansi}</td>
                                            <td className="px-6 py-4 text-gray-600">{p.kontak || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Personel SAR Baru">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Identitas / NIP *</label>
                        <input
                            type="text"
                            placeholder="Contoh: 199001012020011001"
                            value={form.nomor_identitas}
                            onChange={e => setForm({ ...form, nomor_identitas: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.nomor_identitas && <p className="mt-1 text-xs text-red-600">{errors.nomor_identitas}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Budi Santoso, S.T."
                            value={form.nama}
                            onChange={e => setForm({ ...form, nama: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.nama && <p className="mt-1 text-xs text-red-600">{errors.nama}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jabatan *</label>
                            <input
                                type="text"
                                value={form.jabatan}
                                onChange={e => setForm({ ...form, jabatan: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.jabatan && <p className="mt-1 text-xs text-red-600">{errors.jabatan}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pangkat / Golongan</label>
                            <input
                                type="text"
                                value={form.pangkat}
                                onChange={e => setForm({ ...form, pangkat: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instansi Asal *</label>
                        <input
                            type="text"
                            value={form.instansi}
                            onChange={e => setForm({ ...form, instansi: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.instansi && <p className="mt-1 text-xs text-red-600">{errors.instansi}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Telepon / Kontak</label>
                        <input
                            type="text"
                            placeholder="Contoh: 081234567890"
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
                            {submitting ? 'Menyimpan...' : 'Simpan Personel'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PersonelPage
