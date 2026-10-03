'use client'

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import Button from '@/components/Button'

const UsersPage = () => {
    const { user: currentUser } = useAuth()

    const [users, setUsers] = useState([])
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)

    // Modal Add & Edit
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const [addForm, setAddForm] = useState({
        name: '',
        email: '',
        nip: '',
        phone: '',
        password: '',
        role: 'operator',
    })

    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        nip: '',
        phone: '',
        password: '',
        role: 'operator',
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const isSuperadmin = currentUser?.roles?.includes('superadmin')

    const fetchUsers = async (page = 1) => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            params.append('page', page)
            if (search) params.append('search', search)
            if (roleFilter) params.append('role', roleFilter)

            const res = await axios.get(`/api/admin/users?${params.toString()}`)
            const data = res.data?.data
            setUsers(data?.data || [])
            setMeta({
                current_page: data?.current_page || 1,
                last_page: data?.last_page || 1,
            })
        } catch (err) {
            setAlert({ type: 'error', message: 'Gagal memuat daftar pengguna' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSuperadmin) {
            fetchUsers(1)
        } else {
            setLoading(false)
        }
    }, [isSuperadmin, roleFilter])

    // Validation for Add
    const validateAdd = () => {
        const errs = {}
        if (!addForm.name.trim()) errs.name = 'Nama lengkap wajib diisi'
        if (!addForm.email.trim()) errs.email = 'Alamat email wajib diisi'
        else if (!/\S+@\S+\.\S+/.test(addForm.email)) errs.email = 'Format email tidak valid'

        if (!addForm.password) errs.password = 'Password wajib diisi'
        else if (addForm.password.length < 8) errs.password = 'Password minimal 8 karakter'

        if (!addForm.role) errs.role = 'Role hak akses wajib dipilih'

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    // Validation for Edit
    const validateEdit = () => {
        const errs = {}
        if (!editForm.name.trim()) errs.name = 'Nama lengkap wajib diisi'
        if (!editForm.email.trim()) errs.email = 'Alamat email wajib diisi'
        else if (!/\S+@\S+\.\S+/.test(editForm.email)) errs.email = 'Format email tidak valid'

        if (editForm.password && editForm.password.length < 8) {
            errs.password = 'Password baru minimal 8 karakter jika diubah'
        }

        if (!editForm.role) errs.role = 'Role hak akses wajib dipilih'

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleAddUser = async e => {
        e.preventDefault()
        if (!validateAdd()) return

        setSubmitting(true)
        try {
            await axios.post('/api/admin/users', addForm)
            setAlert({ type: 'success', message: 'Akun petugas baru berhasil didaftarkan' })
            setIsAddModalOpen(false)
            setAddForm({
                name: '',
                email: '',
                nip: '',
                phone: '',
                password: '',
                role: 'operator',
            })
            fetchUsers(meta.current_page)
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal mendaftarkan user baru' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    const openEditModal = u => {
        setSelectedUser(u)
        setEditForm({
            name: u.name || '',
            email: u.email || '',
            nip: u.nip || '',
            phone: u.phone || '',
            password: '',
            role: u.roles?.[0]?.name || 'operator',
        })
        setErrors({})
        setIsEditModalOpen(true)
    }

    const handleEditUser = async e => {
        e.preventDefault()
        if (!validateEdit()) return

        setSubmitting(true)
        try {
            const payload = { ...editForm }
            if (!payload.password) delete payload.password

            await axios.put(`/api/admin/users/${selectedUser.id}`, payload)
            setAlert({ type: 'success', message: 'Data akun petugas berhasil diperbarui' })
            setIsEditModalOpen(false)
            fetchUsers(meta.current_page)
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal memperbarui user' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    const handleToggleStatus = async u => {
        if (u.id === currentUser?.id) {
            alert('Anda tidak dapat menonaktifkan akun Anda sendiri.')
            return
        }

        try {
            await axios.patch(`/api/admin/users/${u.id}/toggle-status`)
            setAlert({ type: 'success', message: `Status akun ${u.name} berhasil diubah` })
            fetchUsers(meta.current_page)
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal mengubah status akun' })
        }
    }

    const handleDeleteUser = async u => {
        if (u.id === currentUser?.id) {
            alert('Anda tidak dapat menghapus akun Anda sendiri.')
            return
        }

        if (!confirm(`Apakah Anda yakin ingin menghapus akun ${u.name}?`)) return

        try {
            await axios.delete(`/api/admin/users/${u.id}`)
            setAlert({ type: 'success', message: `Akun ${u.name} berhasil dihapus` })
            fetchUsers(meta.current_page)
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal menghapus user' })
        }
    }

    if (!isSuperadmin) {
        return (
            <>
                <Header title="Akses Ditolak" />
                <div className="py-12 max-w-3xl mx-auto px-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
                        <h3 className="text-lg font-bold text-red-800">Akses Terbatas (Khusus Superadmin)</h3>
                        <p className="mt-2 text-sm text-red-700">
                            Anda tidak memiliki izin untuk mengelola data akun pengguna. Halaman ini hanya dapat diakses oleh pengguna dengan role <strong>superadmin</strong>.
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header title="Manajemen Pengguna & Petugas" />
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Daftar Akun Petugas & Hak Akses</h2>
                        <p className="text-sm text-gray-500">Kelola akun internal Basarnas, role otorisasi, dan status aktif</p>
                    </div>
                    <Button
                        onClick={() => {
                            setErrors({})
                            setIsAddModalOpen(true)
                        }}
                        className="bg-orange-600 hover:bg-orange-700">
                        + Tambah Petugas Baru
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Cari nama, NIP, atau email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500 flex-1"
                    />
                    <select
                        value={roleFilter}
                        onChange={e => setRoleFilter(e.target.value)}
                        className="rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                        <option value="">Semua Role</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="operator">Operator</option>
                        <option value="admin_operasi">Admin Operasi</option>
                        <option value="admin_sumber_daya">Admin Sumber Daya</option>
                        <option value="admin_umum">Admin Umum</option>
                        <option value="pimpinan">Pimpinan</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => fetchUsers(1)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700">
                        Cari
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Memuat data pengguna...</div>
                    ) : users.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Tidak ada akun petugas yang ditemukan.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Nama & NIP</th>
                                        <th className="px-6 py-3 text-left">Email & Kontak</th>
                                        <th className="px-6 py-3 text-left">Role Akses</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.map(u => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{u.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">{u.nip || 'Tanpa NIP'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900">{u.email}</div>
                                                <div className="text-xs text-gray-500">{u.phone || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-50 text-indigo-700">
                                                    {u.roles?.[0]?.name || 'Tanpa Role'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge>{u.is_active ? 'AKTIF' : 'NONAKTIF'}</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(u)}
                                                    className="text-xs font-semibold text-yellow-600 hover:text-yellow-800">
                                                    Edit
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                    onClick={() => handleToggleStatus(u)}
                                                    disabled={u.id === currentUser?.id}
                                                    className={`text-xs font-semibold ${
                                                        u.is_active ? 'text-gray-600 hover:text-gray-900' : 'text-green-600 hover:text-green-800'
                                                    } disabled:opacity-30`}>
                                                    {u.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                    onClick={() => handleDeleteUser(u)}
                                                    disabled={u.id === currentUser?.id}
                                                    className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-30">
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
                                onPageChange={page => fetchUsers(page)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Tambah User */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Akun Petugas Baru">
                <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Ahmad Erlan, S.Kom."
                            value={addForm.name}
                            onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Login *</label>
                            <input
                                type="email"
                                placeholder="nama@basarnas.go.id"
                                value={addForm.email}
                                onChange={e => setAddForm({ ...addForm, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password Awal *</label>
                            <input
                                type="password"
                                placeholder="Minimal 8 karakter"
                                value={addForm.password}
                                onChange={e => setAddForm({ ...addForm, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NIP</label>
                            <input
                                type="text"
                                placeholder="1995..."
                                value={addForm.nip}
                                onChange={e => setAddForm({ ...addForm, nip: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.nip && <p className="mt-1 text-xs text-red-600">{errors.nip}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                            <input
                                type="text"
                                placeholder="08..."
                                value={addForm.phone}
                                onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role / Hak Akses *</label>
                        <select
                            value={addForm.role}
                            onChange={e => setAddForm({ ...addForm, role: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="operator">Operator (Input Operasi Harian & SITREP)</option>
                            <option value="admin_operasi">Admin Operasi (Kelola Operasi SAR Lengkap)</option>
                            <option value="admin_sumber_daya">Admin Sumber Daya (Tim, Personel, Alat)</option>
                            <option value="admin_umum">Admin Umum (Wilayah & Fasilitas)</option>
                            <option value="pimpinan">Pimpinan (Monitoring & Laporan SITREP)</option>
                            <option value="superadmin">Superadmin (Akses Penuh Semua Modul)</option>
                        </select>
                        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-orange-600 hover:bg-orange-700">
                            {submitting ? 'Mendaftarkan...' : 'Daftarkan Akun'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Modal Edit User */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Data Akun Petugas">
                <form onSubmit={handleEditUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap *</label>
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email *</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ganti Password (Opsional)</label>
                            <input
                                type="password"
                                placeholder="Kosongkan jika tidak diubah"
                                value={editForm.password}
                                onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NIP</label>
                            <input
                                type="text"
                                value={editForm.nip}
                                onChange={e => setEditForm({ ...editForm, nip: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                            <input
                                type="text"
                                value={editForm.phone}
                                onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role / Hak Akses *</label>
                        <select
                            value={editForm.role}
                            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option value="operator">Operator</option>
                            <option value="admin_operasi">Admin Operasi</option>
                            <option value="admin_sumber_daya">Admin Sumber Daya</option>
                            <option value="admin_umum">Admin Umum</option>
                            <option value="pimpinan">Pimpinan</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Batal
                        </button>
                        <Button type="submit" disabled={submitting} className="bg-yellow-600 hover:bg-yellow-700">
                            {submitting ? 'Menyimpan...' : 'Perbarui Akun'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default UsersPage
