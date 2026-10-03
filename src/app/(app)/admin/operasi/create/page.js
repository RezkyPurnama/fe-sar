'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/Button'

const OperasiCreate = () => {
    const router = useRouter()
    const tanggalMulaiPickerRef = useRef(null)
    const tanggalSelesaiPickerRef = useRef(null)

    const openDatePicker = (ref) => {
        if (!ref?.current) return
        if (typeof ref.current.showPicker === 'function') {
            try {
                ref.current.showPicker()
            } catch {
                ref.current.focus()
            }
        } else {
            ref.current.focus()
        }
    }

    const [form, setForm] = useState({
        kode_operasi: '',
        nama_operasi: '',
        nama_lokasi: '',
        jenis_operasi_id: '',
        tanggal_mulai: '',
        jam_mulai: '08:00',
        tanggal_selesai: '',
        jam_selesai: '',
    })

    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [jenisInsidenList, setJenisInsidenList] = useState([])

    // Ambil 5 jenis insiden resmi dari master data
    useEffect(() => {
        const loadJenisInsiden = async () => {
            try {
                const res = await axios.get('/api/public/master-data')
                const jenisList = res.data?.jenis_operasi || []
                setJenisInsidenList(jenisList)
                if (jenisList.length > 0) {
                    setForm(f => ({ ...f, jenis_operasi_id: jenisList[0].id }))
                }
            } catch (err) {
                // Fallback jika API bermasalah
            }
        }
        loadJenisInsiden()
    }, [])

    // Helper validasi format tanggal DD-MM-YYYY
    const isValidIndonesianDate = dateStr => {
        if (!dateStr) return false
        const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
        if (!regex.test(dateStr)) return false

        const [day, month, year] = dateStr.split('-').map(Number)
        const dateObj = new Date(year, month - 1, day)
        return (
            dateObj.getFullYear() === year &&
            dateObj.getMonth() === month - 1 &&
            dateObj.getDate() === day
        )
    }

    // Helper untuk mengonversi DD-MM-YYYY ke Date Object untuk komparasi
    const parseIndonesianDate = dateStr => {
        if (!dateStr) return null
        const [day, month, year] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day)
    }

    // Helper mengubah input type=date (YYYY-MM-DD) menjadi DD-MM-YYYY
    const handleDatePickerChange = (field, isoDate) => {
        if (!isoDate) return
        const [year, month, day] = isoDate.split('-')
        const indoDate = `${day}-${month}-${year}`
        setForm(f => ({ ...f, [field]: indoDate }))
        if (errors[field]) {
            setErrors(errs => ({ ...errs, [field]: null }))
        }
    }

    // Konversi DD-MM-YYYY ke YYYY-MM-DD untuk input date picker
    const toIsoDate = dateStr => {
        if (!isValidIndonesianDate(dateStr)) return ''
        const [day, month, year] = dateStr.split('-')
        return `${year}-${month}-${day}`
    }

    const validate = () => {
        const errs = {}

        // 1. Kode Operasi
        if (!form.kode_operasi.trim()) {
            errs.kode_operasi = 'Kode operasi wajib diisi (Contoh: OPS-2026-001)'
        }

        // 2. Nama Operasi
        if (!form.nama_operasi.trim()) {
            errs.nama_operasi = 'Nama operasi wajib diisi (Contoh: Operasi Penyelamatan Nelayan di Pantai Muaro)'
        } else if (form.nama_operasi.trim().length < 3) {
            errs.nama_operasi = 'Nama operasi minimal 3 karakter'
        }

        // 3. Lokasi
        if (!form.nama_lokasi.trim()) {
            errs.nama_lokasi = 'Lokasi kejadian wajib diisi (Contoh: Koto tangah, Kota Padang.)'
        }

        // 4. Jenis Insiden
        if (!form.jenis_operasi_id) {
            errs.jenis_operasi_id = 'Jenis insiden wajib dipilih dari 5 opsi resmi'
        }

        // 5. Tanggal & Jam Mulai
        if (!form.tanggal_mulai.trim()) {
            errs.tanggal_mulai = 'Tanggal mulai wajib diisi dengan format DD-MM-YYYY (Contoh: 07-09-2026)'
        } else if (!isValidIndonesianDate(form.tanggal_mulai.trim())) {
            errs.tanggal_mulai = 'Format tanggal mulai tidak valid. Gunakan format DD-MM-YYYY (Contoh: 07-09-2026)'
        }

        if (!form.jam_mulai || !form.jam_mulai.trim()) {
            errs.jam_mulai = 'Jam mulai operasi wajib diisi (Contoh: 08:00)'
        }

        // 6. Tanggal Selesai (Tidak wajib, tapi jika diisi harus valid & >= tanggal mulai)
        if (form.tanggal_selesai && form.tanggal_selesai.trim() !== '') {
            if (!isValidIndonesianDate(form.tanggal_selesai.trim())) {
                errs.tanggal_selesai = 'Format tanggal selesai tidak valid. Gunakan format DD-MM-YYYY (Contoh: 10-09-2026)'
            } else if (isValidIndonesianDate(form.tanggal_mulai.trim())) {
                const startDate = parseIndonesianDate(form.tanggal_mulai.trim())
                const endDate = parseIndonesianDate(form.tanggal_selesai.trim())
                if (endDate < startDate) {
                    errs.tanggal_selesai = 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai'
                }
            }
        }

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleChange = e => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        if (errors[name]) {
            setErrors(errs => ({ ...errs, [name]: null }))
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!validate()) {
            setAlert({
                type: 'error',
                message: 'Mohon lengkapi dan periksa kembali data yang bertanda bintang (*).',
            })
            return
        }

        setSubmitting(true)
        setAlert(null)

        try {
            // Format tanggal & jam mulai
            let tglMulaiFormatted = form.tanggal_mulai.trim()
            if (isValidIndonesianDate(tglMulaiFormatted)) {
                const [day, month, year] = tglMulaiFormatted.split('-')
                const jam = form.jam_mulai?.trim() || '08:00'
                tglMulaiFormatted = `${year}-${month}-${day} ${jam}:00`
            }

            const payload = {
                kode_operasi: form.kode_operasi.trim(),
                nama_operasi: form.nama_operasi.trim(),
                nama_lokasi: form.nama_lokasi.trim(),
                jenis_operasi_id: form.jenis_operasi_id,
                tanggal_mulai: tglMulaiFormatted,
            }

            if (form.tanggal_selesai && form.tanggal_selesai.trim() !== '') {
                let tglSelesaiFormatted = form.tanggal_selesai.trim()
                if (isValidIndonesianDate(tglSelesaiFormatted)) {
                    const [day, month, year] = tglSelesaiFormatted.split('-')
                    const jam = form.jam_selesai?.trim() || '23:59'
                    tglSelesaiFormatted = `${year}-${month}-${day} ${jam}:00`
                }
                payload.tanggal_selesai = tglSelesaiFormatted
            }

            const res = await axios.post('/api/admin/operasi', payload)
            const newId = res.data?.data?.id || res.data?.id
            if (newId) {
                router.push(`/admin/operasi/${newId}`)
            } else {
                router.push('/admin/operasi')
            }
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
                setAlert({
                    type: 'error',
                    message: err.response.data?.message || 'Validasi server gagal. Silakan periksa kembali isian Anda.',
                })
            } else {
                setAlert({
                    type: 'error',
                    message: err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data operasi baru.',
                })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Header title="Tambah Operasi Baru" />
            <div className="py-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
                    {/* Form Header */}
                    <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Formulir Tambah Operasi SAR</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Masukkan data insiden dan informasi awal operasi lapangan
                            </p>
                        </div>
                        <Link
                            href="/admin/operasi"
                            className="text-xs font-semibold text-gray-600 hover:text-gray-900 border px-3 py-1.5 rounded-md hover:bg-gray-50">
                            &larr; Kembali
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* 1. Kode Operasi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Kode Operasi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="kode_operasi"
                                placeholder="Contoh: OPS-2026-001"
                                value={form.kode_operasi}
                                onChange={handleChange}
                                className={`mt-1.5 block w-full rounded-md text-sm ${
                                    errors.kode_operasi
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                }`}
                            />
                            {errors.kode_operasi ? (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.kode_operasi}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-400">Format kode rujukan operasi, contoh: OPS-2026-001</p>
                            )}
                        </div>

                        {/* 2. Nama Operasi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Nama Operasi <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nama_operasi"
                                placeholder="Contoh: Operasi Penyelamatan Nelayan di Pantai Muaro"
                                value={form.nama_operasi}
                                onChange={handleChange}
                                className={`mt-1.5 block w-full rounded-md text-sm ${
                                    errors.nama_operasi
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                }`}
                            />
                            {errors.nama_operasi ? (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.nama_operasi}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-400">Deskripsi singkat nama kejadian atau misi SAR</p>
                            )}
                        </div>

                        {/* 3. Lokasi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Lokasi Kejadian <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nama_lokasi"
                                placeholder="Contoh: Koto tangah, Kota Padang."
                                value={form.nama_lokasi}
                                onChange={handleChange}
                                className={`mt-1.5 block w-full rounded-md text-sm ${
                                    errors.nama_lokasi
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                }`}
                            />
                            {errors.nama_lokasi ? (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.nama_lokasi}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-400">Tempat musibah atau titik Last Known Position (LKP)</p>
                            )}
                        </div>

                        {/* 4. Jenis Insiden */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800">
                                Jenis Insiden <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="jenis_operasi_id"
                                value={form.jenis_operasi_id}
                                onChange={handleChange}
                                className={`mt-1.5 block w-full rounded-md text-sm ${
                                    errors.jenis_operasi_id
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                }`}>
                                <option value="">-- Pilih Salah Satu dari 5 Jenis Insiden --</option>
                                {jenisInsidenList.map(j => (
                                    <option key={j.id} value={j.id}>
                                        {j.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.jenis_operasi_id ? (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.jenis_operasi_id}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-400">
                                    Pilihan kategori insiden: Bencana alam, Kecelakaan pesawat, Kecelakaan kapal, Kondisi Membahayakan Manusia, atau Kecelakaan dengan penanganan khusus
                                </p>
                            )}
                        </div>

                        {/* 5. Tanggal & Jam Mulai */}
                        <div className="bg-orange-50/40 p-4 rounded-lg border border-orange-100 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-800">
                                Waktu Mulai Operasi SAR <span className="text-red-500">*</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Tanggal Mulai */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            name="tanggal_mulai"
                                            placeholder="DD-MM-YYYY (07-09-2026)"
                                            value={form.tanggal_mulai}
                                            onChange={handleChange}
                                            className={`block w-full rounded-md text-sm pr-10 font-mono ${
                                                errors.tanggal_mulai
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => openDatePicker(tanggalMulaiPickerRef)}
                                            className="absolute right-2.5 text-gray-400 hover:text-orange-600 transition-colors p-1 flex items-center justify-center cursor-pointer text-sm"
                                            tabIndex={-1}
                                            title="Buka kalender tanggal mulai">
                                            📅
                                        </button>
                                        <input
                                            ref={tanggalMulaiPickerRef}
                                            type="date"
                                            value={toIsoDate(form.tanggal_mulai)}
                                            onChange={e => handleDatePickerChange('tanggal_mulai', e.target.value)}
                                            className="sr-only"
                                            tabIndex={-1}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {errors.tanggal_mulai ? (
                                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.tanggal_mulai}</p>
                                    ) : (
                                        <p className="mt-1 text-[11px] text-gray-400">Format: DD-MM-YYYY</p>
                                    )}
                                </div>

                                {/* Jam Mulai */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Jam / Waktu Mulai (WIB) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="time"
                                            name="jam_mulai"
                                            value={form.jam_mulai}
                                            onChange={handleChange}
                                            className={`block w-full rounded-md text-sm font-mono ${
                                                errors.jam_mulai
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.jam_mulai ? (
                                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.jam_mulai}</p>
                                    ) : (
                                        <p className="mt-1 text-[11px] text-gray-400">Jam dimulainya operasi di lapangan (WIB)</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 6. Tanggal & Jam Selesai (Opsional) */}
                        <div className="bg-gray-50/60 p-4 rounded-lg border border-gray-200 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                Waktu Selesai Operasi <span className="text-gray-400 font-normal">(Tidak wajib / jika sudah ditutup)</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Tanggal Selesai */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Tanggal Selesai
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            name="tanggal_selesai"
                                            placeholder="DD-MM-YYYY (10-09-2026)"
                                            value={form.tanggal_selesai}
                                            onChange={handleChange}
                                            className={`block w-full rounded-md text-sm pr-10 font-mono ${
                                                errors.tanggal_selesai
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => openDatePicker(tanggalSelesaiPickerRef)}
                                            className="absolute right-2.5 text-gray-400 hover:text-orange-600 transition-colors p-1 flex items-center justify-center cursor-pointer text-sm"
                                            tabIndex={-1}
                                            title="Buka kalender tanggal selesai">
                                            📅
                                        </button>
                                        <input
                                            ref={tanggalSelesaiPickerRef}
                                            type="date"
                                            value={toIsoDate(form.tanggal_selesai)}
                                            onChange={e => handleDatePickerChange('tanggal_selesai', e.target.value)}
                                            className="sr-only"
                                            tabIndex={-1}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {errors.tanggal_selesai ? (
                                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.tanggal_selesai}</p>
                                    ) : (
                                        <p className="mt-1 text-[11px] text-gray-400">Kosongkan jika operasi masih aktif</p>
                                    )}
                                </div>

                                {/* Jam Selesai */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Jam Selesai (WIB)
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="time"
                                            name="jam_selesai"
                                            value={form.jam_selesai}
                                            onChange={handleChange}
                                            className="block w-full rounded-md text-sm font-mono border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                                        />
                                    </div>
                                    <p className="mt-1 text-[11px] text-gray-400">Kosongkan jika operasi masih aktif</p>
                                </div>
                            </div>
                        </div>

                        {/* Catatan Info Geospasial */}
                        <div className="flex items-start gap-2.5 p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-800">
                            <span className="text-base flex-shrink-0">📍</span>
                            <div>
                                <p className="font-semibold text-blue-900">Penentuan Titik Koordinat & Wilayah Geospasial</p>
                                <p className="mt-0.5 text-blue-700 leading-relaxed">
                                    Titik operasi <strong>tidak akan langsung muncul pada peta (map)</strong> sampai Anda melengkapi titik koordinat (Point, Circle Radius Dampak, atau Area Pencarian Kustom) pada detail rincian operasi.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                            <Link
                                href="/admin/operasi"
                                className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                                Batal
                            </Link>
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-6">
                                {submitting ? 'Menyimpan Operasi...' : 'Simpan Operasi SAR'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OperasiCreate
