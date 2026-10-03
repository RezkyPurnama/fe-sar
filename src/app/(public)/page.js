import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'
import Beranda from '@/components/company/sections/Beranda'
import Profil from '@/components/company/sections/Profil'
import Statistik from '@/components/company/sections/Statistik'
import Berita from '@/components/company/sections/Berita'
import Kegiatan from '@/components/company/sections/Kegiatan'
import Tim from '@/components/company/sections/Personel'
import Galeri from '@/components/company/sections/Galeri'
import Hubungi from '@/components/company/sections/HubungiKami'

export const metadata = {
    title: 'Beranda',
}

export default function HomePage() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-white text-slate-700">
            <Navigation />
            <Beranda />
            <Profil />
            <Statistik />
            <Berita />
            <Kegiatan />
            <Tim />
            <Galeri />
            <Hubungi />
            <Footer />
        </main>
    )
}