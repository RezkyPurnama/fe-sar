import { Plus_Jakarta_Sans } from 'next/font/google'
import '@/app/global.css'

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-plus-jakarta-sans',
})

export const metadata = {
    title: {
        default: 'Kantor Pencarian dan Pertolongan Padang',
        template: '%s | Kantor Pencarian dan Pertolongan Padang',
    },

    description:
        'Website Kantor Pencarian dan Pertolongan Padang untuk informasi pelayanan, operasi SAR, berita, kegiatan, dan kontak darurat.',

    keywords: [
        'BASARNAS',
        'BASARNAS Padang',
        'Kantor SAR Padang',
        'Pencarian dan Pertolongan Padang',
        'Operasi SAR',
        'Kontak Darurat 115',
    ],

    icons: {
        icon: [
            {
                url: '/images/public/Logo_Basarnas.png',
                type: 'image/png',
            },
        ],
        shortcut: '/images/public/Logo_Basarnas.png',
        apple: '/images/public/Logo_Basarnas.png',
    },

    openGraph: {
        title: 'Kantor Pencarian dan Pertolongan Padang',
        description:
            'Siaga 24 jam memberikan pelayanan pencarian dan pertolongan kepada masyarakat.',
        siteName: 'Kantor Pencarian dan Pertolongan Padang',
        locale: 'id_ID',
        type: 'website',
        images: [
            {
                url: '/images/public/Logo_Basarnas.png',
                width: 512,
                height: 512,
                alt: 'Logo BASARNAS',
            },
        ],
    },
}

export default function RootLayout({ children }) {
    return (
        <html
            lang="id"
            className={`${plusJakartaSans.variable} ${plusJakartaSans.className}`}>
            <body className="bg-white antialiased">{children}</body>
        </html>
    )
}