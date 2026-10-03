import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const isSuperadmin = user?.roles?.includes('superadmin')

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard" className="flex items-center space-x-2">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-orange-600" />
                                <span className="font-bold text-gray-800 text-lg tracking-wide hidden md:inline">
                                    ResQ-Padang
                                </span>
                            </Link>
                        </div>

                        <div className="hidden space-x-6 sm:-my-px sm:ml-8 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={pathname === '/dashboard'}>
                                Dashboard
                            </NavLink>
                            <NavLink
                                href="/admin/operasi"
                                active={pathname?.startsWith('/admin/operasi')}>
                                Operasi SAR
                            </NavLink>
                            <NavLink
                                href="/admin/sumber-daya/tim"
                                active={pathname === '/admin/sumber-daya/tim'}>
                                Tim SAR
                            </NavLink>
                            <NavLink
                                href="/admin/sumber-daya/personel"
                                active={pathname === '/admin/sumber-daya/personel'}>
                                Personel
                            </NavLink>
                            <NavLink
                                href="/admin/sumber-daya/alat"
                                active={pathname === '/admin/sumber-daya/alat'}>
                                Alat & Logistik
                            </NavLink>
                            {isSuperadmin && (
                                <NavLink
                                    href="/admin/users"
                                    active={pathname === '/admin/users'}>
                                    Pengguna
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="mr-3 text-right">
                            <div className="text-xs text-gray-400 uppercase tracking-wider">
                                {user?.roles?.[0] || 'Petugas'}
                            </div>
                        </div>
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none transition duration-150 ease-in-out">
                                    <div>{user?.name}</div>
                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            <DropdownButton onClick={logout}>
                                Keluar
                            </DropdownButton>
                        </Dropdown>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="block sm:hidden border-t border-gray-200 bg-white">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/admin/operasi"
                            active={pathname?.startsWith('/admin/operasi')}>
                            Operasi SAR
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/admin/sumber-daya/tim"
                            active={pathname === '/admin/sumber-daya/tim'}>
                            Tim SAR
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/admin/sumber-daya/personel"
                            active={pathname === '/admin/sumber-daya/personel'}>
                            Personel
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/admin/sumber-daya/alat"
                            active={pathname === '/admin/sumber-daya/alat'}>
                            Alat & Logistik
                        </ResponsiveNavLink>
                        {isSuperadmin && (
                            <ResponsiveNavLink
                                href="/admin/users"
                                active={pathname === '/admin/users'}>
                                Pengguna
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200 px-4">
                        <div className="font-medium text-base text-gray-800">{user?.name}</div>
                        <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                        <div className="mt-2">
                            <ResponsiveNavButton onClick={logout}>
                                Keluar
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
