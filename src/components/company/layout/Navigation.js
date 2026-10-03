'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { menu } from '@/data/companyData'

function RadioIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true">
            <circle cx="12" cy="12" r="2" />
            <path d="M8.5 8.5a5 5 0 0 0 0 7" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M5.5 5.5a9 9 0 0 0 0 13" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    )
}

function PhoneIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
    )
}

function MenuIcon({ terbuka }) {
    if (terbuka) {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
                aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        )
    }

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden="true">
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
        </svg>
    )
}

function ChevronIcon({ terbuka = false }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`h-4 w-4 transition-transform duration-300 ${terbuka ? 'rotate-180' : ''
                }`}
            aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

function Logo() {
    return (
        <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Kembali ke Beranda">
            <Image
                src="/images/public/Logo_Basarnas.png"
                alt="Logo BASARNAS"
                width={58}
                height={58}
                priority
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />

            <div className="min-w-0">
                <p className="text-lg font-extrabold leading-tight tracking-[0.04em] text-[#0f172a] sm:text-xl">
                    BASARNAS
                </p>

                <p className="mt-0.5 text-[10px] font-medium leading-snug tracking-[0.04em] text-slate-600 sm:text-[11px]">
                    Kantor Pencarian dan Pertolongan Padang
                </p>
            </div>
        </Link>
    )
}

export default function Navigation() {
    const pathname = usePathname()

    const [menuTerbuka, setMenuTerbuka] = useState(false)
    const [dropdownTerbuka, setDropdownTerbuka] = useState(null)
    const [infoTerlihat, setInfoTerlihat] = useState(true)

    // Hilangkan informasi atas ketika halaman di-scroll
    useEffect(() => {
        function tanganiScroll() {
            setInfoTerlihat(window.scrollY < 60)
        }

        tanganiScroll()

        window.addEventListener('scroll', tanganiScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener('scroll', tanganiScroll)
        }
    }, [])

    // Tutup menu HP setelah URL berubah
    useEffect(() => {
        setMenuTerbuka(false)
        setDropdownTerbuka(null)
    }, [pathname])

    function tutupMenu() {
        setMenuTerbuka(false)
        setDropdownTerbuka(null)
    }

    function linkAktif(link) {
        if (!link) {
            return false
        }

        if (link === '/') {
            return pathname === '/'
        }

        return pathname === link || pathname.startsWith(`${link}/`)
    }

    function submenuAktif(submenu) {
        if (!submenu) {
            return false
        }

        return submenu.some((item) => linkAktif(item.link))
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 shadow-md">
            {/* INFORMASI PALING ATAS */}
            <div
                className={`overflow-hidden bg-[#07101f] text-white transition-all duration-300 ease-in-out ${infoTerlihat
                        ? 'h-11 border-b border-white/10 opacity-100'
                        : 'h-0 border-b-0 opacity-0'
                    }`}>
                <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
                    {/* Identitas layanan */}
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#ff6600]/15 text-[#ff8533]"
                            aria-hidden="true">
                            <RadioIcon />
                        </span>

                        <span className="truncate text-xs font-semibold text-white sm:text-[13px]">
                            <span className="sm:hidden">Siaga SAR Padang</span>
                            <span className="hidden sm:inline">
                                Siaga Pencarian dan Pertolongan
                            </span>
                        </span>
                    </div>

                    {/* Wilayah dan jam siaga */}
                    <div className="flex shrink-0 items-center gap-4 text-xs text-slate-300">
                        <span className="hidden md:inline">Sumatera Barat</span>

                        <span className="hidden h-3 w-px bg-white/25 md:block" />

                        <span className="hidden lg:inline">18 Kabupaten / Kota</span>

                        <span className="hidden h-3 w-px bg-white/25 lg:block" />

                        <span className="flex items-center gap-1.5 font-semibold text-white">
                            <span className="text-[#ff8533]" aria-hidden="true">
                                <ClockIcon />
                            </span>
                            <span>24/7</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* NAVIGASI UTAMA */}
            <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                    <Logo />

                    {/* MENU DESKTOP */}
                    <nav
                        className="hidden h-full items-center gap-5 lg:flex xl:gap-7"
                        aria-label="Navigasi utama">
                        {menu.map((item) => {
                            const punyaSubmenu =
                                item.submenu &&
                                item.submenu.length > 0

                            const aktif =
                                linkAktif(item.link) ||
                                submenuAktif(item.submenu)

                            if (punyaSubmenu) {
                                return (
                                    <div
                                        key={item.nama}
                                        className="group relative flex h-full items-center">
                                        <button
                                            type="button"
                                            className={`flex h-full items-center gap-1.5 border-b-2 text-sm font-black uppercase tracking-wide transition ${aktif
                                                    ? 'border-[#ff6600] text-[#ff6600]'
                                                    : 'border-transparent text-slate-600 group-hover:border-[#ff6600] group-hover:text-[#ff6600]'
                                                }`}>
                                            {item.nama}

                                            <span className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
                                                <ChevronIcon />
                                            </span>
                                        </button>

                                        {/* DROPDOWN DESKTOP */}
                                        <div className="invisible absolute left-0 top-full w-72 translate-y-3 border-t-4 border-[#ff6600] bg-[#171717]/95 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                            {item.submenu.map(
                                                (subitem) => {
                                                    const subAktif =
                                                        linkAktif(
                                                            subitem.link,
                                                        )

                                                    return (
                                                        <Link
                                                            key={
                                                                subitem.link
                                                            }
                                                            href={
                                                                subitem.link
                                                            }
                                                            className={`block border-b border-white/10 px-6 py-4 text-sm font-semibold transition last:border-0 hover:bg-[#ff6600] hover:pl-8 hover:text-white ${subAktif
                                                                    ? 'bg-[#ff6600] text-white'
                                                                    : 'text-slate-200'
                                                                }`}>
                                                            {
                                                                subitem.nama
                                                            }
                                                        </Link>
                                                    )
                                                },
                                            )}
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <Link
                                    key={item.link}
                                    href={item.link}
                                    className={`flex h-full items-center border-b-2 text-sm font-black uppercase tracking-wide transition ${aktif
                                            ? 'border-[#ff6600] text-[#ff6600]'
                                            : 'border-transparent text-slate-600 hover:border-[#ff6600] hover:text-[#ff6600]'
                                        }`}>
                                    {item.nama}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* TOMBOL DARURAT DESKTOP */}
                    <a
                        href="tel:115"
                        className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700 lg:flex">
                        <PhoneIcon />
                        Darurat 115
                    </a>

                    {/* TOMBOL MENU HP */}
                    <button
                        type="button"
                        onClick={() =>
                            setMenuTerbuka(
                                (sebelumnya) => !sebelumnya,
                            )
                        }
                        className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-[#0f172a] transition hover:bg-slate-200 lg:hidden"
                        aria-label={
                            menuTerbuka
                                ? 'Tutup menu'
                                : 'Buka menu'
                        }
                        aria-expanded={menuTerbuka}
                        aria-controls="menu-mobile">
                        <MenuIcon terbuka={menuTerbuka} />
                    </button>
                </div>
            </div>

            {/* MENU MOBILE */}
            <div
                id="menu-mobile"
                className={`overflow-hidden bg-white shadow-xl transition-all duration-300 lg:hidden ${menuTerbuka
                        ? 'max-h-[80vh] border-t border-slate-200 opacity-100'
                        : 'max-h-0 border-t-0 opacity-0'
                    }`}>
                <div className="max-h-[calc(80vh-1rem)] overflow-y-auto px-5 pb-6">
                    {menu.map((item) => {
                        const punyaSubmenu =
                            item.submenu &&
                            item.submenu.length > 0

                        const sedangTerbuka =
                            dropdownTerbuka === item.nama

                        const aktif =
                            linkAktif(item.link) ||
                            submenuAktif(item.submenu)

                        if (punyaSubmenu) {
                            return (
                                <div
                                    key={item.nama}
                                    className="border-b border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDropdownTerbuka(
                                                sedangTerbuka
                                                    ? null
                                                    : item.nama,
                                            )
                                        }
                                        className={`flex w-full items-center justify-between py-4 text-left text-sm font-black uppercase tracking-wide transition ${aktif ||
                                                sedangTerbuka
                                                ? 'text-[#ff6600]'
                                                : 'text-slate-700 hover:text-[#ff6600]'
                                            }`}>
                                        {item.nama}

                                        <ChevronIcon
                                            terbuka={
                                                sedangTerbuka
                                            }
                                        />
                                    </button>

                                    {/* SUBMENU MOBILE */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${sedangTerbuka
                                                ? 'max-h-96 pb-3 opacity-100'
                                                : 'max-h-0 opacity-0'
                                            }`}>
                                        <div className="overflow-hidden rounded-xl bg-[#0f172a]">
                                            {item.submenu.map(
                                                (subitem) => {
                                                    const subAktif =
                                                        linkAktif(
                                                            subitem.link,
                                                        )

                                                    return (
                                                        <Link
                                                            key={
                                                                subitem.link
                                                            }
                                                            href={
                                                                subitem.link
                                                            }
                                                            onClick={
                                                                tutupMenu
                                                            }
                                                            className={`block border-b border-white/10 px-5 py-3 text-sm font-semibold transition last:border-0 hover:bg-[#ff6600] hover:text-white ${subAktif
                                                                    ? 'bg-[#ff6600] text-white'
                                                                    : 'text-slate-200'
                                                                }`}>
                                                            {
                                                                subitem.nama
                                                            }
                                                        </Link>
                                                    )
                                                },
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <Link
                                key={item.link}
                                href={item.link}
                                onClick={tutupMenu}
                                className={`block border-b border-slate-100 py-4 text-sm font-black uppercase tracking-wide transition ${aktif
                                        ? 'text-[#ff6600]'
                                        : 'text-slate-700 hover:text-[#ff6600]'
                                    }`}>
                                {item.nama}
                            </Link>
                        )
                    })}

                    {/* DARURAT MOBILE */}
                    <a
                        href="tel:115"
                        onClick={tutupMenu}
                        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-600 p-4 font-black text-white transition hover:bg-red-700">
                        <PhoneIcon />
                        Kontak Darurat 115
                    </a>
                </div>
            </div>
        </header>
    )
}