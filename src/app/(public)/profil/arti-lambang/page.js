import Image from 'next/image'
import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Arti Lambang Basarnas',
    description:
        'Arti dan makna lambang Badan Nasional Pencarian dan Pertolongan.',
}

const artiLambang = [
    {
        judul: 'Delapan Penjuru Mata Angin',
        isi: `Delapan penjuru mata angin dengan warna merah putih mengandung arti dan makna bahwa Badan SAR Nasional dalam mengemban tugas di bidang kemanusiaan senantiasa menitikberatkan pada kecepatan dan ketepatan serta dilaksanakan dengan penuh ketulusan (warna putih) dan keberanian (warna merah).`,
    },
    {
        judul: 'Awan, Gunung, dan Lima Ombak di Laut',
        isi: `Awan, gunung, dan lima ombak di laut mengandung arti dan makna bahwa dalam menjalankan tugasnya Badan SAR Nasional melingkupi segala medan tugas. Awan menggambarkan lingkup medan tugas udara, gunung menggambarkan lingkup medan tugas darat, sedangkan ombak di laut menggambarkan lingkup medan tugas di air yang dilandasi dengan kelima sila dalam Pancasila.`,
    },
    {
        judul: 'Pita Bertuliskan Indonesia',
        isi: `Pita bertuliskan “INDONESIA” mempunyai arti bahwa Badan SAR Nasional merupakan lembaga pemerintah Indonesia yang melaksanakan tugas pencarian dan pertolongan.`,
    },
]

const artiLogo = [
    {
        judul: 'Dasar',
        isi: `Warna kuning hijau adalah warna “pare anom” yang menurut sejarah dan tradisi bangsa Indonesia menandakan kesuburan tanah air yang diperuntukkan bagi kesejahteraan rakyat. Wilayah Indonesia dari Sabang hingga Merauke terdiri dari 13.677 pulau atau kepulauan pada posisi silang antara dua benua dan dua samudra, serta mengandung kekayaan bumi dan air.`,
    },
    {
        judul: 'Bintang',
        isi: `Jumlah bintang sebanyak lima buah menggambarkan bahwa Pancasila merupakan falsafah Negara Republik Indonesia dan sebagai pandangan hidup bangsa Indonesia. Sila kedua, yaitu “Kemanusiaan yang Adil dan Beradab”, merupakan ciri khas tugas SAR Nasional yang selalu berkaitan dengan keempat sila lainnya.`,
    },
    {
        judul: 'SAR Nasional',
        isi: `Tulisan SAR Nasional dengan warna merah menggambarkan ketegasan dalam melaksanakan tugas kemanusiaan yang meliputi seluruh wilayah, dengan tekad para petugas untuk bertindak dengan cepat, tepat, dan berani setiap saat diperlukan.`,
    },
    {
        judul: 'Avignam Jagat Samagram',
        isi: `Sila pertama Pancasila menjadi suatu keyakinan bagi setiap petugas SAR bahwa seluruh tugas ini diridai oleh Tuhan Yang Maha Esa dengan tetap berdoa, “Semoga Selamatlah Alam Semesta”.`,
    },
]

function JudulIdentitas({ judul, deskripsi }) {
    return (
        <header className="border-b border-slate-300 pb-5">
            <h2 className="text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
                {judul}
            </h2>

            <div className="mt-3 h-0.5 w-12 bg-[#ff6600]" />

            <p className="mt-4 max-w-2xl text-justify text-sm leading-7 text-slate-600 sm:text-[15px]">
                {deskripsi}
            </p>
        </header>
    )
}

function GambarIdentitas({
    src,
    alt,
    keterangan,
    ukuran = 'max-w-[250px]',
}) {
    return (
        <figure>
            <div className="flex min-h-[300px] items-center justify-center border border-slate-200 bg-slate-50 px-7 py-8">
                <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={400}
                    priority
                    className={`h-auto w-full object-contain ${ukuran}`}
                />
            </div>

            <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
                {keterangan}
            </figcaption>
        </figure>
    )
}

function DaftarMakna({ data }) {
    return (
        <dl className="mt-6">
            {data.map((item, index) => {
                const bukanTerakhir = index !== data.length - 1

                return (
                    <div
                        key={item.judul}
                        className={`py-5 ${bukanTerakhir
                                ? 'border-b border-slate-200'
                                : ''
                            }`}>
                        <dt className="text-sm font-bold leading-6 text-[#0f172a] sm:text-[15px]">
                            {item.judul}
                        </dt>

                        <dd className="mt-2 text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                            {item.isi}
                        </dd>
                    </div>
                )
            })}
        </dl>
    )
}

function BagianLambang() {
    return (
        <section className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
            {/* Gambar lambang di sebelah kiri */}
            <GambarIdentitas
                src="/images/public/Lambang-Basarnas.png"
                alt="Lambang Badan Nasional Pencarian dan Pertolongan"
                keterangan="Lambang Badan Nasional Pencarian dan Pertolongan"
                ukuran="max-w-[255px]"
            />

            {/* Penjelasan lambang di sebelah kanan */}
            <div className="min-w-0">
                <JudulIdentitas
                    judul="Lambang BASARNAS"
                    deskripsi="Lambang BASARNAS menggambarkan ruang lingkup tugas pencarian dan pertolongan yang dilaksanakan di darat, laut, dan udara."
                />

                <DaftarMakna data={artiLambang} />
            </div>
        </section>
    )
}

function BagianLogo() {
    return (
        <section className="mt-14 border-t border-slate-300 pt-12 sm:mt-16 sm:pt-14">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
                {/* Gambar tampil di atas pada HP dan kanan pada desktop */}
                <div className="order-1 lg:order-2">
                    <GambarIdentitas
                        src="/images/public/Logo_Basarnas.png"
                        alt="Logo Badan Nasional Pencarian dan Pertolongan"
                        keterangan="Logo Badan Nasional Pencarian dan Pertolongan"
                        ukuran="max-w-[220px]"
                    />
                </div>

                {/* Penjelasan tampil di bawah pada HP dan kiri pada desktop */}
                <div className="order-2 min-w-0 lg:order-1">
                    <JudulIdentitas
                        judul="Logo BASARNAS"
                        deskripsi="Setiap warna, bentuk, tulisan, dan simbol pada logo BASARNAS memiliki makna yang berkaitan dengan tugas kemanusiaan dan nilai-nilai Pancasila."
                    />

                    <DaftarMakna data={artiLogo} />
                </div>
            </div>
        </section>
    )
}

export default function ArtiLambangPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Arti Lambang Basarnas
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Mengenal arti dan makna yang terdapat pada
                            identitas Badan Nasional Pencarian dan
                            Pertolongan.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <article className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    <BagianLambang />
                    <BagianLogo />
                </article>
            </main>

            <Footer />
        </div>
    )
}