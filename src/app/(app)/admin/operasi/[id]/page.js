'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Modal from '@/components/ui/Modal'
import Button from '@/components/Button'

const OperasiShow = () => {
    const { id } = useParams()

    const [operasi, setOperasi] = useState(null)
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)
    const [activeTab, setActiveTab] = useState('ringkasan')

    // Child Data
    const [kegiatanList, setKegiatanList] = useState([])
    const [korbanList, setKorbanList] = useState([])
    const [dokList, setDokList] = useState([])

    // Master data
    const [masterData, setMasterData] = useState({
        status_operasi: [],
        status_korban: [],
        jenis_korban: [],
    })

    // Modals
    const [statusModal, setStatusModal] = useState(false)
    const [kegiatanModal, setKegiatanModal] = useState(false)
    const [korbanModal, setKorbanModal] = useState(false)
    const [uploadModal, setUploadModal] = useState(false)

    // Form states
    const [statusForm, setStatusForm] = useState({ status_operasi_id: '', catatan: '' })
    const [kegiatanForm, setKegiatanForm] = useState({
        hari_ke: 1,
        nama_kegiatan: '',
        tipe_kegiatan: 'PENCARIAN',
        waktu_mulai: new Date().toISOString().slice(0, 16),
        waktu_selesai: '',
        hasil_kegiatan: '',
    })
    const [korbanForm, setKorbanForm] = useState({
        nama: '',
        jenis_kelamin: 'LAKI-LAKI',
        umur: '',
        status_korban_id: '',
        jenis_korban_id: '',
        kondisi_terakhir: '',
    })
    const [uploadFile, setUploadFile] = useState(null)
    const [uploadTipe, setUploadTipe] = useState('FOTO')
    const [uploadCaption, setUploadCaption] = useState('')

    const [formErrors, setFormErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const fetchOperasiDetail = async () => {
        try {
            const [opRes, masterRes] = await Promise.all([
                axios.get(`/api/admin/operasi/${id}`),
                axios.get('/api/public/master-data'),
            ])
            const op = opRes.data?.data || opRes.data
            setOperasi(op)
            setMasterData(masterRes.data)
            setStatusForm({ status_operasi_id: op.status_operasi_id, catatan: '' })

            // Pemuatan child data
            fetchKegiatan()
            fetchKorban()
            fetchDokumentasi()
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat rincian operasi SAR' })
        } finally {
            setLoading(false)
        }
    }

    const fetchKegiatan = async () => {
        try {
            const res = await axios.get(`/api/admin/operasi/${id}/kegiatan`)
            setKegiatanList(res.data?.data || res.data || [])
        } catch (err) {
            // Biarkan kosong jika belum ada data kegiatan
        }
    }

    const fetchKorban = async () => {
        try {
            const res = await axios.get(`/api/admin/operasi/${id}/korban`)
            setKorbanList(res.data?.data || res.data || [])
        } catch (err) {
            // Biarkan kosong jika belum ada data korban
        }
    }

    const fetchDokumentasi = async () => {
        try {
            const res = await axios.get(`/api/admin/operasi/${id}/dokumentasi`)
            setDokList(res.data?.data || res.data || [])
        } catch (err) {
            // Biarkan kosong jika belum ada dokumentasi
        }
    }

    useEffect(() => {
        fetchOperasiDetail()
    }, [id])

    // Update Status Handler with validation
    const handleUpdateStatus = async e => {
        e.preventDefault()
        if (!statusForm.status_operasi_id) {
            setFormErrors({ status_operasi_id: 'Status operasi wajib dipilih' })
            return
        }

        setSubmitting(true)
        try {
            await axios.post(`/api/admin/operasi/${id}/status`, statusForm)
            setAlert({ type: 'success', message: 'Status operasi SAR berhasil diubah' })
            setStatusModal(false)
            fetchOperasiDetail()
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal mengubah status operasi' })
        } finally {
            setSubmitting(false)
        }
    }

    // Kegiatan (SITREP) Handler with validation
    const handleAddKegiatan = async e => {
        e.preventDefault()
        const errs = {}
        if (!kegiatanForm.hari_ke || kegiatanForm.hari_ke < 1) errs.hari_ke = 'Hari ke- harus minimal 1'
        if (!kegiatanForm.nama_kegiatan.trim()) errs.nama_kegiatan = 'Nama kegiatan wajib diisi'
        if (!kegiatanForm.waktu_mulai) errs.waktu_mulai = 'Waktu mulai kegiatan wajib diisi'

        if (Object.keys(errs).length > 0) {
            setFormErrors(errs)
            return
        }

        setSubmitting(true)
        try {
            await axios.post(`/api/admin/operasi/${id}/kegiatan`, kegiatanForm)
            setAlert({ type: 'success', message: 'Catatan kegiatan SAR (SITREP) berhasil ditambahkan' })
            setKegiatanModal(false)
            setKegiatanForm({
                hari_ke: operasi?.hari_ke || 1,
                nama_kegiatan: '',
                tipe_kegiatan: 'PENCARIAN',
                waktu_mulai: new Date().toISOString().slice(0, 16),
                waktu_selesai: '',
                hasil_kegiatan: '',
            })
            fetchKegiatan()
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menambahkan kegiatan' })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteKegiatan = async kegId => {
        if (!confirm('Hapus log kegiatan ini?')) return
        try {
            await axios.delete(`/api/admin/operasi/kegiatan/${kegId}`)
            setAlert({ type: 'success', message: 'Log kegiatan berhasil dihapus' })
            fetchKegiatan()
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal menghapus log kegiatan' })
        }
    }

    // Korban Handler with validation
    const handleAddKorban = async e => {
        e.preventDefault()
        const errs = {}
        if (!korbanForm.nama.trim()) errs.nama = 'Nama korban wajib diisi'
        if (!korbanForm.status_korban_id) errs.status_korban_id = 'Status kondisi korban wajib dipilih'

        if (Object.keys(errs).length > 0) {
            setFormErrors(errs)
            return
        }

        setSubmitting(true)
        try {
            await axios.post(`/api/admin/operasi/${id}/korban`, korbanForm)
            setAlert({ type: 'success', message: 'Data korban berhasil ditambahkan' })
            setKorbanModal(false)
            setKorbanForm({
                nama: '',
                jenis_kelamin: 'LAKI-LAKI',
                umur: '',
                status_korban_id: masterData.status_korban?.[0]?.id || '',
                jenis_korban_id: '',
                kondisi_terakhir: '',
            })
            fetchKorban()
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menambahkan korban' })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteKorban = async korId => {
        if (!confirm('Hapus data korban ini?')) return
        try {
            await axios.delete(`/api/admin/operasi/korban/${korId}`)
            setAlert({ type: 'success', message: 'Data korban berhasil dihapus' })
            fetchKorban()
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal menghapus data korban' })
        }
    }

    // Dokumentasi Upload with validation
    const handleUploadMedia = async e => {
        e.preventDefault()
        if (!uploadFile) {
            setFormErrors({ file: 'Pilih berkas media untuk diunggah' })
            return
        }

        const formData = new FormData()
        formData.append('file', uploadFile)
        formData.append('tipe', uploadTipe)
        if (uploadCaption) formData.append('caption', uploadCaption)

        setSubmitting(true)
        try {
            await axios.post(`/api/admin/operasi/${id}/dokumentasi`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setAlert({ type: 'success', message: 'Dokumentasi berhasil diunggah' })
            setUploadModal(false)
            setUploadFile(null)
            setUploadCaption('')
            fetchDokumentasi()
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal mengunggah dokumentasi' })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteDok = async docId => {
        if (!confirm('Hapus dokumentasi ini?')) return
        try {
            await axios.delete(`/api/admin/operasi/dokumentasi/${docId}`)
            setAlert({ type: 'success', message: 'Dokumentasi berhasil dihapus' })
            fetchDokumentasi()
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal menghapus dokumentasi' })
        }
    }

    if (loading) {
        return (
            <>
                <Header title="Detail Operasi SAR" />
                <div className="py-12 text-center text-gray-500">Memuat rincian operasi SAR...</div>
            </>
        )
    }

    if (!operasi) {
        return (
            <>
                <Header title="Operasi Tidak Ditemukan" />
                <div className="py-12 text-center text-gray-500">
                    Data operasi SAR tidak ditemukan.{' '}
                    <Link href="/admin/operasi" className="text-orange-600 underline">
                        Kembali ke daftar operasi
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Header title={operasi.nama_operasi} />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                {/* Header Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-orange-500">
                    <div>
                        <div className="flex items-center space-x-3">
                            <span className="text-xs font-mono bg-gray-100 px-2.5 py-1 rounded text-gray-600">
                                {operasi.kode_operasi}
                            </span>
                            <Badge>{operasi.status_operasi?.kode || operasi.status_operasi?.nama || 'SIAGA'}</Badge>
                            <span className="text-xs text-indigo-600 font-medium">
                                Hari Ke-{operasi.hari_ke || 1}
                            </span>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-gray-900">{operasi.nama_operasi}</h2>
                        <p className="text-sm text-gray-600">{operasi.nama_lokasi} &bull; Dimulai: {new Date(operasi.tanggal_mulai).toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Sembunyikan tombol Ubah Status jika operasi telah ditutup */}
                        {operasi.status_operasi?.kode === 'DITUTUP' ||
                        (operasi.status_operasi?.nama && operasi.status_operasi.nama.toUpperCase().includes('TUTUP')) ? (
                            <span
                                className="px-3 py-2 bg-gray-100 text-gray-500 border border-gray-200 rounded-md text-xs font-semibold flex items-center gap-1.5"
                                title="Operasi SAR telah ditutup dan status telah dikunci">
                                🔒 Operasi Ditutup
                            </span>
                        ) : (
                            <button
                                onClick={() => {
                                    setFormErrors({})
                                    setStatusModal(true)
                                }}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-semibold hover:bg-yellow-600 shadow-sm transition">
                                Ubah Status
                            </button>
                        )}
                        <Link
                            href={`/admin/operasi/${id}/edit`}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-200">
                            Edit Data
                        </Link>
                        <Link
                            href="/admin/operasi"
                            className="px-4 py-2 text-gray-500 hover:text-gray-800 text-sm">
                            &larr; Kembali
                        </Link>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 bg-white px-6 rounded-t-lg">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('ringkasan')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'ringkasan'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}>
                            Ringkasan & Informasi
                        </button>
                        <button
                            onClick={() => setActiveTab('sitrep')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'sitrep'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}>
                            Jurnal SITREP ({kegiatanList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('korban')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'korban'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}>
                            Data Korban ({korbanList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('dokumentasi')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'dokumentasi'
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}>
                            Dokumentasi ({dokList.length})
                        </button>
                    </nav>
                </div>

                {/* Tab 1: Ringkasan */}
                {activeTab === 'ringkasan' && (
                    <div className="bg-white p-6 rounded-b-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b pb-2">Informasi Operasi</h3>
                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Jenis Operasi</span>
                                <span className="font-medium text-gray-800">{operasi.jenis_operasi?.nama || '-'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Nomor Sprin</span>
                                <span className="font-medium text-gray-800">{operasi.nomor_sprin || 'Belum diterbitkan'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Nama SMC (Koordinator)</span>
                                <span className="font-medium text-gray-800">{operasi.nama_smc || '-'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Kontak Posko</span>
                                <span className="font-medium text-gray-800">{operasi.kontak_posko || '-'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Kondisi Cuaca Lapangan</span>
                                <span className="font-medium text-gray-800">{operasi.kondisi_cuaca || '-'}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h3 className="text-base font-bold text-gray-800">Lokasi & Geografis</h3>
                                <Link
                                    href={`/admin/operasi/${id}/edit`}
                                    className="text-xs font-semibold text-orange-600 hover:text-orange-700">
                                    Kelola Wilayah Peta &rarr;
                                </Link>
                            </div>

                            {/* Peringatan jika belum memiliki koordinat */}
                            {(!operasi.latitude || !operasi.longitude) && (
                                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-amber-900 flex items-center gap-1.5">
                                            <span>⚠️</span> Koordinat Belum Ditentukan
                                        </p>
                                        <p className="mt-1 text-amber-700 leading-relaxed">
                                            Operasi ini belum memiliki titik koordinat sehingga <strong>tidak muncul pada peta (map)</strong>. Silakan isi koordinat agar penanda operasi tampil.
                                        </p>
                                    </div>
                                    <Link
                                        href={`/admin/operasi/${id}/edit`}
                                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold text-xs whitespace-nowrap shadow-sm">
                                        Atur di Peta
                                    </Link>
                                </div>
                            )}

                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Nama Lokasi Kejadian (LKP)</span>
                                <span className="font-medium text-gray-800">{operasi.nama_lokasi}</span>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Format & Mode Geospasial</span>
                                <span className="inline-flex items-center px-2 py-0.5 mt-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800">
                                    {operasi.tipe_koordinat === 'circle'
                                        ? `⭕ Polygon Lingkaran (Jangkauan: ${operasi.radius_meter >= 1000 ? (operasi.radius_meter / 1000) + ' km' : (operasi.radius_meter || 1000) + ' m'})`
                                        : operasi.tipe_koordinat === 'polygon'
                                        ? `📐 Custom Polygon (${Array.isArray(operasi.polygon_points) ? operasi.polygon_points.length : 0} Titik Sudut Pencarian)`
                                        : '📍 Titik Koordinat Tunggal (Point)'}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Koordinat Titik Pusat</span>
                                <span className="font-medium text-gray-800 font-mono">
                                    Lat: {operasi.latitude || '-'}, Lng: {operasi.longitude || '-'}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Alamat Detail</span>
                                <span className="font-medium text-gray-800">{operasi.alamat_detail || '-'}</span>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400 block uppercase">Deskripsi Kejadian</span>
                                <p className="text-sm text-gray-700 whitespace-pre-line">{operasi.deskripsi || '-'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Jurnal SITREP */}
                {activeTab === 'sitrep' && (
                    <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">Catatan Kronologis Kegiatan Harian (SITREP)</h3>
                                <p className="text-xs text-gray-500">Log laporan situasi lapangan untuk pertanggungjawaban SMC</p>
                            </div>
                            <Button
                                onClick={() => {
                                    setFormErrors({})
                                    setKegiatanModal(true)
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-xs">
                                + Tambah Catatan Kegiatan
                            </Button>
                        </div>

                        {kegiatanList.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">Belum ada catatan kegiatan SAR untuk operasi ini.</div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {kegiatanList.map(keg => (
                                    <div key={keg.id} className="py-4 flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                                                    Hari Ke-{keg.hari_ke}
                                                </span>
                                                <span className="text-xs font-medium text-gray-500 uppercase">
                                                    [{keg.tipe_kegiatan || 'KEGIATAN'}]
                                                </span>
                                                <span className="text-sm font-semibold text-gray-900">{keg.nama_kegiatan}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Mulai: {new Date(keg.waktu_mulai).toLocaleString('id-ID')}
                                                {keg.waktu_selesai && ` &bull; Selesai: ${new Date(keg.waktu_selesai).toLocaleString('id-ID')}`}
                                            </div>
                                            {keg.hasil_kegiatan && (
                                                <div className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                                                    <strong>Hasil:</strong> {keg.hasil_kegiatan}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteKegiatan(keg.id)}
                                            className="text-xs text-red-600 hover:text-red-800 font-medium">
                                            Hapus
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 3: Korban */}
                {activeTab === 'korban' && (
                    <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">Daftar Korban Musibah</h3>
                                <p className="text-xs text-gray-500">Pencatatan korban terdampak serta status penyelamatan</p>
                            </div>
                            <Button
                                onClick={() => {
                                    setFormErrors({})
                                    setKorbanModal(true)
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-xs">
                                + Tambah Data Korban
                            </Button>
                        </div>

                        {korbanList.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">Belum ada data korban tercatat.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Nama Korban</th>
                                            <th className="px-4 py-2 text-left">Gender / Umur</th>
                                            <th className="px-4 py-2 text-left">Jenis Korban</th>
                                            <th className="px-4 py-2 text-left">Status Kondisi</th>
                                            <th className="px-4 py-2 text-left">Keterangan</th>
                                            <th className="px-4 py-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {korbanList.map(kor => (
                                            <tr key={kor.id}>
                                                <td className="px-4 py-3 font-semibold text-gray-900">{kor.nama}</td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {kor.jenis_kelamin} {kor.umur ? `(${kor.umur} thn)` : ''}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{kor.jenis_korban?.nama || '-'}</td>
                                                <td className="px-4 py-3">
                                                    <Badge>{kor.status_korban?.nama || kor.status_korban?.kode || 'DALAM_PENCARIAN'}</Badge>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{kor.kondisi_terakhir || '-'}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => handleDeleteKorban(kor.id)}
                                                        className="text-xs text-red-600 hover:text-red-900 font-medium">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 4: Dokumentasi */}
                {activeTab === 'dokumentasi' && (
                    <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">Dokumentasi Foto & Berkas</h3>
                                <p className="text-xs text-gray-500">Bukti visual penanganan kejadian di lapangan</p>
                            </div>
                            <Button
                                onClick={() => {
                                    setFormErrors({})
                                    setUploadModal(true)
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-xs">
                                + Unggah Media
                            </Button>
                        </div>

                        {dokList.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">Belum ada dokumentasi terunggah.</div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {dokList.map(doc => (
                                    <div key={doc.id} className="border rounded-lg p-2 relative group bg-gray-50">
                                        <div className="text-xs font-semibold text-gray-700 truncate">{doc.nama_file}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase">{doc.tipe}</div>
                                        {doc.caption && <p className="text-xs text-gray-600 mt-1 italic line-clamp-2">{doc.caption}</p>}
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                onClick={() => handleDeleteDok(doc.id)}
                                                className="text-xs text-red-600 hover:text-red-800 font-medium">
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal Ubah Status */}
            <Modal isOpen={statusModal} onClose={() => setStatusModal(false)} title="Ubah Status Operasi SAR">
                <form onSubmit={handleUpdateStatus} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pilih Status Baru *</label>
                        <select
                            value={statusForm.status_operasi_id}
                            onChange={e => setStatusForm({ ...statusForm, status_operasi_id: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            {masterData.status_operasi?.map(s => (
                                <option key={s.id} value={s.id}>{s.nama}</option>
                            ))}
                        </select>
                        {formErrors.status_operasi_id && (
                            <p className="mt-1 text-xs text-red-600">{formErrors.status_operasi_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catatan Perubahan Status</label>
                        <textarea
                            rows={3}
                            placeholder="Alasan perubahan status operasi..."
                            value={statusForm.catatan}
                            onChange={e => setStatusForm({ ...statusForm, catatan: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setStatusModal(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-yellow-600 hover:bg-yellow-700">
                            {submitting ? 'Menyimpan...' : 'Perbarui Status'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Tambah Kegiatan */}
            <Modal isOpen={kegiatanModal} onClose={() => setKegiatanModal(false)} title="Tambah Catatan Kegiatan (SITREP)">
                <form onSubmit={handleAddKegiatan} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hari Operasi Ke- *</label>
                        <input
                            type="number"
                            min="1"
                            value={kegiatanForm.hari_ke}
                            onChange={e => setKegiatanForm({ ...kegiatanForm, hari_ke: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.hari_ke && <p className="mt-1 text-xs text-red-600">{formErrors.hari_ke}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Kegiatan / Agenda *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Penyisiran Sektor A LKP"
                            value={kegiatanForm.nama_kegiatan}
                            onChange={e => setKegiatanForm({ ...kegiatanForm, nama_kegiatan: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.nama_kegiatan && <p className="mt-1 text-xs text-red-600">{formErrors.nama_kegiatan}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipe Kegiatan</label>
                        <select
                            value={kegiatanForm.tipe_kegiatan}
                            onChange={e => setKegiatanForm({ ...kegiatanForm, tipe_kegiatan: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="PENCARIAN">Pencarian (Search)</option>
                            <option value="PERTOLONGAN">Pertolongan (Rescue)</option>
                            <option value="BRIEFING">Briefing Tim</option>
                            <option value="DEBRIEFING">Debriefing / Evaluasi</option>
                            <option value="LOGISTIK">Distribusi Logistik</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Waktu Mulai *</label>
                        <input
                            type="datetime-local"
                            value={kegiatanForm.waktu_mulai}
                            onChange={e => setKegiatanForm({ ...kegiatanForm, waktu_mulai: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.waktu_mulai && <p className="mt-1 text-xs text-red-600">{formErrors.waktu_mulai}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hasil / Progres Lapangan</label>
                        <textarea
                            rows={3}
                            placeholder="Hasil penyisiran dan temuan..."
                            value={kegiatanForm.hasil_kegiatan}
                            onChange={e => setKegiatanForm({ ...kegiatanForm, hasil_kegiatan: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setKegiatanModal(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Menyimpan...' : 'Simpan Kegiatan'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Tambah Korban */}
            <Modal isOpen={korbanModal} onClose={() => setKorbanModal(false)} title="Tambah Data Korban">
                <form onSubmit={handleAddKorban} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Korban *</label>
                        <input
                            type="text"
                            placeholder="Nama lengkap korban"
                            value={korbanForm.nama}
                            onChange={e => setKorbanForm({ ...korbanForm, nama: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.nama && <p className="mt-1 text-xs text-red-600">{formErrors.nama}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin *</label>
                            <select
                                value={korbanForm.jenis_kelamin}
                                onChange={e => setKorbanForm({ ...korbanForm, jenis_kelamin: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                                <option value="LAKI-LAKI">Laki-Laki</option>
                                <option value="PEREMPUAN">Perempuan</option>
                                <option value="TIDAK_DIKETAHUI">Tidak Diketahui</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Umur (Tahun)</label>
                            <input
                                type="number"
                                min="0"
                                max="120"
                                value={korbanForm.umur}
                                onChange={e => setKorbanForm({ ...korbanForm, umur: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status Kondisi Korban *</label>
                        <select
                            value={korbanForm.status_korban_id}
                            onChange={e => setKorbanForm({ ...korbanForm, status_korban_id: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="">Pilih Status Kondisi</option>
                            {masterData.status_korban?.map(s => (
                                <option key={s.id} value={s.id}>{s.nama}</option>
                            ))}
                        </select>
                        {formErrors.status_korban_id && <p className="mt-1 text-xs text-red-600">{formErrors.status_korban_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jenis Korban</label>
                        <select
                            value={korbanForm.jenis_korban_id}
                            onChange={e => setKorbanForm({ ...korbanForm, jenis_korban_id: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="">Pilih Kategori</option>
                            {masterData.jenis_korban?.map(j => (
                                <option key={j.id} value={j.id}>{j.nama}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keterangan / Kondisi Terakhir</label>
                        <input
                            type="text"
                            placeholder="Contoh: Ditemukan selamat di muara sungai"
                            value={korbanForm.kondisi_terakhir}
                            onChange={e => setKorbanForm({ ...korbanForm, kondisi_terakhir: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setKorbanModal(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Menyimpan...' : 'Simpan Korban'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Upload Media */}
            <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Unggah Dokumentasi Media">
                <form onSubmit={handleUploadMedia} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pilih Berkas *</label>
                        <input
                            type="file"
                            accept="image/*,video/*,application/pdf"
                            onChange={e => {
                                setUploadFile(e.target.files[0])
                                if (formErrors.file) setFormErrors({ ...formErrors, file: null })
                            }}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        />
                        {formErrors.file && <p className="mt-1 text-xs text-red-600">{formErrors.file}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipe Media</label>
                        <select
                            value={uploadTipe}
                            onChange={e => setUploadTipe(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="FOTO">Foto Dokumentasi</option>
                            <option value="VIDEO">Video Rekaman</option>
                            <option value="DOKUMEN_SITREP">Dokumen SITREP (PDF)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keterangan / Caption</label>
                        <input
                            type="text"
                            placeholder="Deskripsi berkas media..."
                            value={uploadCaption}
                            onChange={e => setUploadCaption(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setUploadModal(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Mengunggah...' : 'Unggah Sekarang'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default OperasiShow
