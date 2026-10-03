'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/Button'
import CoordinateModeSelector from '@/components/operasi/CoordinateModeSelector'

const OperasiEdit = () => {
    const router = useRouter()
    const { id } = useParams()

    const [form, setForm] = useState({
        nama_operasi: '',
        nomor_sprin: '',
        jenis_operasi_id: '',
        nama_lokasi: '',
        alamat_detail: '',
        latitude: '',
        longitude: '',
        tipe_koordinat: 'point',
        radius_meter: 1000,
        polygon_points: [],
        nama_smc: '',
        kontak_posko: '',
        kondisi_cuaca: '',
        deskripsi: '',
        is_public: true,
        tanggal_mulai: '',
    })

    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [masterData, setMasterData] = useState({ jenis_operasi: [] })

    useEffect(() => {
        const loadData = async () => {
            try {
                const [masterRes, opRes] = await Promise.all([
                    axios.get('/api/public/master-data'),
                    axios.get(`/api/admin/operasi/${id}`),
                ])
                setMasterData(masterRes.data)
                const op = opRes.data?.data || opRes.data
                if (op) {
                    setForm({
                        nama_operasi: op.nama_operasi || '',
                        nomor_sprin: op.nomor_sprin || '',
                        jenis_operasi_id: op.jenis_operasi_id || '',
                        nama_lokasi: op.nama_lokasi || '',
                        alamat_detail: op.alamat_detail || '',
                        latitude: op.latitude || '',
                        longitude: op.longitude || '',
                        tipe_koordinat: op.tipe_koordinat || 'point',
                        radius_meter: op.radius_meter || 1000,
                        polygon_points: Array.isArray(op.polygon_points) ? op.polygon_points : [],
                        nama_smc: op.nama_smc || '',
                        kontak_posko: op.kontak_posko || '',
                        kondisi_cuaca: op.kondisi_cuaca || '',
                        deskripsi: op.deskripsi || '',
                        is_public: Boolean(op.is_public),
                        tanggal_mulai: op.tanggal_mulai ? op.tanggal_mulai.slice(0, 16) : '',
                    })
                }
            } catch (err) {
                setAlert({ type: 'error', message: 'Gagal memuat data operasi SAR' })
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [id])

    const validate = () => {
        const errs = {}
        if (!form.nama_operasi.trim()) errs.nama_operasi = 'Nama operasi wajib diisi'
        if (!form.jenis_operasi_id) errs.jenis_operasi_id = 'Jenis operasi wajib dipilih'
        if (!form.nama_lokasi.trim()) errs.nama_lokasi = 'Nama lokasi kejadian wajib diisi'
        if (!form.tanggal_mulai) errs.tanggal_mulai = 'Tanggal mulai operasi wajib diisi'

        if (form.latitude && (isNaN(form.latitude) || Number(form.latitude) < -90 || Number(form.latitude) > 90)) {
            errs.latitude = 'Latitude harus di antara -90 dan 90'
        }

        if (form.longitude && (isNaN(form.longitude) || Number(form.longitude) < -180 || Number(form.longitude) > 180)) {
            errs.longitude = 'Longitude harus di antara -180 dan 180'
        }

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
        }))
        if (errors[name]) {
            setErrors(errs => ({ ...errs, [name]: null }))
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validate()) {
            setAlert({ type: 'error', message: 'Mohon periksa kembali formulir Anda.' })
            return
        }

        setSubmitting(true)
        setAlert(null)
        try {
            await axios.put(`/api/admin/operasi/${id}`, form)
            router.push(`/admin/operasi/${id}`)
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
                setAlert({ type: 'error', message: 'Validasi server gagal.' })
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal memperbarui operasi SAR.' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <>
                <Header title="Edit Operasi SAR" />
                <div className="py-12 text-center text-gray-500">Memuat data operasi...</div>
            </>
        )
    }

    return (
        <>
            <Header title="Edit Operasi SAR" />
            <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Edit Data Operasi SAR</h3>
                            <p className="text-sm text-gray-500">Perbarui rincian operasional dan informasi lapangan</p>
                        </div>
                        <Link href={`/admin/operasi/${id}`} className="text-sm text-gray-600 hover:text-gray-900">
                            &larr; Batal & Kembali
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Nama Operasi SAR *</label>
                            <input
                                type="text"
                                name="nama_operasi"
                                value={form.nama_operasi}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.nama_operasi && <p className="mt-1 text-xs text-red-600">{errors.nama_operasi}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Sprin</label>
                            <input
                                type="text"
                                name="nomor_sprin"
                                value={form.nomor_sprin}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jenis Musibah/Operasi *</label>
                            <select
                                name="jenis_operasi_id"
                                value={form.jenis_operasi_id}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                                <option value="">Pilih Jenis</option>
                                {masterData.jenis_operasi?.map(j => (
                                    <option key={j.id} value={j.id}>{j.nama}</option>
                                ))}
                            </select>
                            {errors.jenis_operasi_id && <p className="mt-1 text-xs text-red-600">{errors.jenis_operasi_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tanggal & Waktu Mulai *</label>
                            <input
                                type="datetime-local"
                                name="tanggal_mulai"
                                value={form.tanggal_mulai}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.tanggal_mulai && <p className="mt-1 text-xs text-red-600">{errors.tanggal_mulai}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Nama Lokasi Kejadian (LKP) *</label>
                            <input
                                type="text"
                                name="nama_lokasi"
                                value={form.nama_lokasi}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.nama_lokasi && <p className="mt-1 text-xs text-red-600">{errors.nama_lokasi}</p>}
                        </div>

                        {/* Pengaturan 3 Mode Koordinat & Wilayah Geospasial */}
                        <div className="md:col-span-2 border-t border-gray-200 pt-5">
                            <CoordinateModeSelector
                                tipeKoordinat={form.tipe_koordinat}
                                onTipeChange={(tipe) => setForm(f => ({ ...f, tipe_koordinat: tipe }))}
                                latitude={form.latitude}
                                longitude={form.longitude}
                                onCoordinateChange={(lat, lng) => setForm(f => ({ ...f, latitude: lat, longitude: lng }))}
                                radiusMeter={form.radius_meter}
                                onRadiusChange={(rad) => setForm(f => ({ ...f, radius_meter: rad }))}
                                polygonPoints={form.polygon_points}
                                onPolygonPointsChange={(pts) => setForm(f => ({ ...f, polygon_points: pts }))}
                                jenisColor={masterData.jenis_operasi?.find(j => j.id == form.jenis_operasi_id)?.warna_label || '#FF6600'}
                                errors={errors}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama SMC</label>
                            <input
                                type="text"
                                name="nama_smc"
                                value={form.nama_smc}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kontak Posko</label>
                            <input
                                type="text"
                                name="kontak_posko"
                                value={form.kontak_posko}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Kondisi Cuaca</label>
                            <input
                                type="text"
                                name="kondisi_cuaca"
                                value={form.kondisi_cuaca}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Deskripsi & Kronologi</label>
                            <textarea
                                name="deskripsi"
                                rows={3}
                                value={form.deskripsi}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                id="is_public"
                                name="is_public"
                                checked={form.is_public}
                                onChange={handleChange}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
                                Tampilkan di Portal Publik
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Link
                            href={`/admin/operasi/${id}`}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Batal
                        </Link>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-yellow-600 hover:bg-yellow-700">
                            {submitting ? 'Menyimpan...' : 'Perbarui Operasi SAR'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default OperasiEdit
