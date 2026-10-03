import Image from 'next/image'
import Navigation from '@/components/company/layout/Navigation'
import Footer from '@/components/company/layout/Footer'

export const metadata = {
    title: 'Sejarah Basarnas',
    description:
        'Sejarah terbentuk dan berkembangnya Badan Nasional Pencarian dan Pertolongan.',
}

const masaTerbentuk = [
    {
        jenis: 'paragraf',
        isi: `Lahirnya organisasi SAR di Indonesia yang saat ini bernama BASARNAS diawali dengan adanya penyebutan “Black Area” bagi suatu negara yang tidak memiliki organisasi SAR. Dengan berbekal kemerdekaan, pada tahun 1950 Indonesia masuk menjadi anggota organisasi penerbangan internasional ICAO (International Civil Aviation Organization). Sejak saat itu Indonesia diharapkan mampu menangani musibah penerbangan dan pelayaran yang terjadi di Indonesia.`,
    },
    {
        jenis: 'paragraf',
        isi: `Sebagai konsekuensi logis atas masuknya Indonesia menjadi anggota ICAO, pemerintah menetapkan Peraturan Pemerintah Nomor 5 Tahun 1955 tentang Penetapan Dewan Penerbangan untuk membentuk panitia SAR. Panitia teknis mempunyai tugas pokok untuk membentuk Badan Gabungan SAR, menentukan pusat-pusat regional, serta mengatur anggaran pembiayaan dan material.`,
    },
    {
        jenis: 'paragraf',
        isi: `Pada tahun 1959 Indonesia menjadi anggota International Maritime Organization (IMO). Dengan masuknya Indonesia sebagai anggota ICAO dan IMO, tugas dan tanggung jawab SAR semakin mendapat perhatian. Sebagai negara yang besar dan memiliki semangat gotong royong yang tinggi, Indonesia ingin mewujudkan harapan dunia internasional, yaitu mampu menangani musibah penerbangan dan pelayaran.`,
    },
    {
        jenis: 'paragraf',
        isi: `Dari pengalaman-pengalaman tersebut, timbul pemikiran bahwa perlu dibentuk suatu organisasi SAR Nasional yang mengoordinasikan seluruh kegiatan SAR di bawah satu komando. Untuk mengantisipasi tugas-tugas SAR tersebut, pada tahun 1968 ditetapkan Keputusan Menteri Perhubungan Nomor T.20/I/2-4 mengenai pembentukan Tim SAR Lokal Jakarta. Pembentukannya diserahkan kepada Direktorat Perhubungan Udara. Tim tersebut kemudian menjadi embrio organisasi SAR Nasional di Indonesia.`,
    },
    {
        jenis: 'paragraf',
        isi: `Pada tahun 1968 juga terdapat proyek South East Asia Coordinating Committee on Transport and Communications. Indonesia menjadi proyek payung (Umbrella Project) bagi negara-negara Asia Tenggara. Proyek tersebut ditangani oleh US Coast Guard atau Badan SAR Amerika untuk memperoleh data yang diperlukan dalam pengembangan dan penyempurnaan organisasi SAR di Indonesia. Kesimpulan dari tim tersebut adalah:`,
    },
    {
        jenis: 'daftar',
        items: [
            `Perlu kesepakatan antara departemen-departemen yang memiliki fasilitas dan peralatan.`,
            `Harus ada hubungan yang cepat dan tepat antara pusat-pusat koordinasi dengan pusat fasilitas SAR.`,
            `Pengawasan lalu lintas penerbangan dan pelayaran perlu mendapatkan tambahan pendidikan SAR.`,
            `Bantuan radio navigasi yang penting diharapkan tersedia bagi pelayaran secara terus-menerus.`,
        ],
    },
    {
        jenis: 'paragraf',
        isi: `Dalam kegiatan survei tersebut, tim US Coast Guard didampingi oleh pejabat-pejabat sipil dan militer dari Indonesia. Berdasarkan kegiatan tersebut, tim dari Indonesia membuat beberapa kesimpulan:`,
    },
    {
        jenis: 'daftar',
        items: [
            `Instansi pemerintah, baik sipil maupun militer, sudah mempunyai unsur yang dapat membantu kegiatan SAR. Namun, diperlukan suatu wadah untuk menghimpun unsur-unsur tersebut dalam suatu sistem SAR yang baik. Instansi-instansi berpotensi SAR juga sudah mempunyai perangkat dan jaringan komunikasi yang memadai untuk kegiatan SAR. Namun, diperlukan pengaturan dalam pemanfaatan jaringan tersebut.`,

            `Personel dari instansi berpotensi SAR pada umumnya belum memiliki kemampuan dan keterampilan SAR yang khusus sehingga perlu dilakukan pembinaan dan latihan.`,

            `Peralatan milik instansi berpotensi SAR bukan diperuntukkan secara khusus bagi kegiatan SAR. Walaupun dapat digunakan dalam keadaan darurat, tetap diperlukan standardisasi peralatan.`,
        ],
    },
]

const perkembanganOrganisasi = [
    {
        jenis: 'paragraf',
        isi: `Berdasarkan hasil survei tersebut, pemerintah menetapkan Keputusan Presiden Nomor 11 Tahun 1972 tanggal 28 Februari 1972 tentang pembentukan Badan SAR Indonesia (BASARI). Susunan organisasi BASARI terdiri dari:`,
    },
    {
        jenis: 'daftar',
        items: [
            `Unsur Pimpinan.`,
            `Pusat SAR Nasional (Pusarnas).`,
            `Pusat-pusat Koordinasi Rescue (PKR).`,
            `Sub-sub Koordinasi Rescue (SKR).`,
            `Unsur-unsur SAR.`,
        ],
    },
    {
        jenis: 'paragraf',
        isi: `Pusarnas merupakan unit BASARI yang bertanggung jawab sebagai pelaksana operasional kegiatan SAR di Indonesia. Walaupun memiliki personel dan peralatan yang terbatas, kegiatan penanganan musibah penerbangan dan pelayaran telah dilaksanakan dengan hasil yang cukup memuaskan. Kegiatan tersebut antara lain penanganan Boeing 727 PANAM tahun 1974 di Bali dan operasi pesawat Twin Otter di Sulawesi yang dikenal sebagai Operasi Tinombala.`,
    },
    {
        jenis: 'gambar',
        src: '/images/public/sejarah/Tinombala.png',
        alt: 'Dokumentasi Operasi Tinombala tahun 1970',
        width: 900,
        height: 500,
        keterangan: 'Dokumentasi Operasi Tinombala, 1970',
        ukuran: 'max-w-2xl',
    },
    {
        jenis: 'paragraf',
        isi: `Secara perlahan Pusarnas terus berkembang di bawah pimpinan almarhum Marsma S. Dono Indarto. Dalam rangka pengembangan tersebut, pada tahun 1975 Pusarnas resmi menjadi anggota NASAR (National Association of Search and Rescue) yang bermarkas di Amerika Serikat. Dengan keanggotaan tersebut, Pusarnas secara resmi mulai terlibat dalam kegiatan SAR internasional.`,
    },
    {
        jenis: 'paragraf',
        isi: `Pada tahun berikutnya, Pusarnas turut serta dalam kelompok kerja yang melakukan penelitian mengenai penggunaan satelit untuk kepentingan kemanusiaan, yaitu Working Group on Satellite Aided Search and Rescue dari International Aeronautical Federation.`,
    },
    {
        jenis: 'paragraf',
        isi: `Untuk meningkatkan efektivitas kegiatan SAR, pada tahun 1978 Menteri Perhubungan selaku kuasa Ketua BASARI mengeluarkan Keputusan Nomor 5/K.104/Pb-78 tentang penunjukan Kepala Pusarnas sebagai Ketua BASARI dalam pelaksanaan operasi SAR di lapangan. Untuk penanganan SAR di daerah, diterbitkan Instruksi Menteri Perhubungan Nomor IM 4/KP/Phb-78 mengenai pembentukan Satuan Tugas SAR di KKR (Kantor Koordinasi Rescue).`,
    },
    {
        jenis: 'paragraf',
        isi: `Untuk meningkatkan efisiensi pelaksanaan tugas SAR di Indonesia, melalui Keputusan Presiden Nomor 47 Tahun 1979, Pusarnas yang sebelumnya berada di bawah BASARI dimasukkan ke dalam struktur organisasi Departemen Perhubungan. Nama Pusat SAR Nasional kemudian diubah menjadi Badan SAR Nasional atau BASARNAS.`,
    },
    {
        jenis: 'paragraf',
        isi: `Dengan diubahnya Pusarnas menjadi BASARNAS, Kepala Pusarnas yang sebelumnya berada pada tingkat eselon II berubah menjadi Kepala BASARNAS dengan tingkat eselon I. Struktur organisasinya juga disempurnakan dan Kepala BASARNAS membawahi tiga pejabat eselon II.`,
    },
    {
        jenis: 'paragraf',
        isi: `Dalam perkembangannya, diterbitkan Keputusan Menteri Perhubungan Nomor 80 Tahun 1998 tentang Organisasi dan Tata Kerja BASARNAS. Salah satu isinya mengatur pejabat eselon II di lingkungan BASARNAS, yaitu:`,
    },
    {
        jenis: 'daftar',
        items: [
            `Sekretaris Badan.`,
            `Kepala Pusat Bina Operasi.`,
            `Kepala Pusat Bina Potensi.`,
        ],
    },
    {
        jenis: 'paragraf',
        isi: `Keberadaan organisasi SAR memberikan rasa aman dalam kegiatan penerbangan dan pelayaran. Sejalan dengan perkembangan moda transportasi serta kemajuan ilmu pengetahuan dan teknologi di bidang transportasi, mobilitas manusia dan barang dalam lingkup nasional maupun internasional mempunyai risiko yang tinggi terhadap kemungkinan terjadinya kecelakaan yang menimpa pengguna transportasi darat, laut, dan udara.`,
    },
    {
        jenis: 'paragraf',
        isi: `Penerbangan dan pelayaran internasional yang melintasi wilayah Indonesia membutuhkan jaminan tersedianya penyelenggaraan SAR apabila mengalami musibah di wilayah Indonesia. Tanpa jaminan tersebut, Indonesia dapat dikategorikan sebagai “black area” bagi penerbangan dan pelayaran. Status tersebut dapat memberikan pengaruh negatif terhadap hubungan ekonomi dan politik Indonesia secara internasional.`,
    },
    {
        jenis: 'paragraf',
        isi: `Badan SAR Nasional sebagai instansi resmi pemerintah yang bertanggung jawab di bidang SAR mempunyai peran besar dalam menjaga citra Indonesia sebagai wilayah yang aman bagi penerbangan dan pelayaran. Dengan citra yang baik, arus transportasi diharapkan berjalan lancar dan pada akhirnya meningkatkan perekonomian nasional Indonesia.`,
    },
    {
        jenis: 'paragraf',
        isi: `Meningkatnya tuntutan masyarakat terhadap pelayanan jasa SAR, perubahan situasi dan kondisi Indonesia, serta perkembangan ilmu pengetahuan dan teknologi mendorong organisasi SAR di Indonesia untuk terus melakukan penyesuaian dari waktu ke waktu.`,
    },
    {
        jenis: 'paragraf',
        isi: `Organisasi SAR di Indonesia diatur melalui Peraturan Menteri Perhubungan Nomor KM 43 Tahun 2005 tentang Organisasi dan Tata Kerja Departemen Perhubungan serta Keputusan Menteri Perhubungan Nomor KM 79 Tahun 2002 tentang Organisasi dan Tata Kerja Kantor SAR.`,
    },
    {
        jenis: 'paragraf',
        isi: `Dalam rangka meningkatkan pelayanan SAR kepada masyarakat, pemerintah menetapkan Peraturan Pemerintah Nomor 36 Tahun 2006 tentang Pencarian dan Pertolongan. Peraturan tersebut mengatur bahwa pelaksanaan SAR meliputi usaha dan kegiatan mencari, menolong, serta menyelamatkan jiwa manusia yang hilang atau menghadapi bahaya dalam musibah pelayaran, penerbangan, bencana, maupun musibah lainnya.`,
    },
    {
        jenis: 'paragraf',
        isi: `Pelaksanaan kegiatan tersebut dikoordinasikan oleh BASARNAS yang berada di bawah dan bertanggung jawab langsung kepada Presiden. Sebagai tindak lanjut, BASARNAS berupaya mengembangkan organisasi sebagai Lembaga Pemerintah Nondepartemen agar dapat menyelenggarakan pelaksanaan SAR yang efektif, efisien, cepat, andal, dan aman.`,
    },
    {
        jenis: 'paragraf',
        isi: `Berdasarkan kajian dan analisis kelembagaan serta perkembangan tuntutan tugas yang semakin besar, pada tahun 2007 dilakukan perubahan kelembagaan dan organisasi BASARNAS menjadi Lembaga Pemerintah Nondepartemen (LPND).`,
    },
    {
        jenis: 'paragraf',
        isi: `Perubahan tersebut diatur secara resmi melalui Peraturan Presiden Republik Indonesia Nomor 99 Tahun 2007 tentang Badan SAR Nasional. Sebagai LPND, BASARNAS berada di bawah dan bertanggung jawab langsung kepada Presiden.`,
    },
    {
        jenis: 'paragraf',
        isi: `Dalam perkembangannya, sesuai dengan Peraturan Pemerintah Nomor 39 Tahun 2009, sebutan Lembaga Pemerintah Nondepartemen berubah menjadi Lembaga Pemerintah Nonkementerian (LPNK). Dengan perubahan tersebut, BASARNAS menjadi lembaga pemerintah nonkementerian.`,
    },
    {
        jenis: 'paragraf',
        isi: `Sebagai LPNK, BASARNAS secara bertahap melepaskan diri dari struktur Kementerian Perhubungan. Hingga tahun 2009, pembinaan administratif dan teknis pelaporan masih dilakukan melalui Kementerian Perhubungan. Selanjutnya, BASARNAS bertanggung jawab langsung kepada Presiden melalui Sekretariat Negara.`,
    },
    {
        jenis: 'gambar',
        src: '/images/public/sejarah/Tonggak-Sejarah.jpg',
        alt: 'Infografis tonggak sejarah berdirinya BASARNAS',
        width: 900,
        height: 1200,
        keterangan: 'Tonggak sejarah berdirinya BASARNAS',
        ukuran: 'max-w-2xl',
    },
]

function ChevronIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
            aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

function Paragraf({ children }) {
    return (
        <p className="text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
            {children}
        </p>
    )
}

function DaftarPoin({ data }) {
    return (
        <ul className="ml-4 space-y-3 border-l border-slate-200 pl-5">
            {data.map((item, index) => (
                <li
                    key={index}
                    className="relative text-justify text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    <span
                        className="absolute -left-[24px] top-3 h-1.5 w-1.5 bg-[#ff6600]"
                        aria-hidden="true"
                    />

                    {item}
                </li>
            ))}
        </ul>
    )
}

function GambarSejarah({
    src,
    alt,
    width,
    height,
    ukuran,
    keterangan,
}) {
    return (
        <figure className="my-8">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`mx-auto h-auto w-full border border-slate-300 object-contain ${ukuran}`}
            />

            <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
                {keterangan}
            </figcaption>
        </figure>
    )
}

function IsiBagian({ data }) {
    return (
        <div className="space-y-6">
            {data.map((item, index) => {
                if (item.jenis === 'daftar') {
                    return (
                        <DaftarPoin
                            key={index}
                            data={item.items}
                        />
                    )
                }

                if (item.jenis === 'gambar') {
                    return (
                        <GambarSejarah
                            key={index}
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            ukuran={item.ukuran}
                            keterangan={item.keterangan}
                        />
                    )
                }

                return (
                    <Paragraf key={index}>
                        {item.isi}
                    </Paragraf>
                )
            })}
        </div>
    )
}

function DropdownSejarah({
    bagian,
    judul,
    data,
    terbuka = false,
}) {
    return (
        <details
            open={terbuka}
            className="group border-b border-slate-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#ff6600] text-sm font-bold text-white">
                        {bagian}
                    </span>

                    <h2 className="text-base font-bold leading-6 text-[#0f172a] sm:text-xl">
                        {judul}
                    </h2>
                </div>

                <span className="shrink-0 text-slate-500 transition group-hover:text-[#ff6600]">
                    <ChevronIcon />
                </span>
            </summary>

            <div className="pb-10 pt-3 sm:pl-[52px]">
                <IsiBagian data={data} />
            </div>
        </details>
    )
}

function SumberMateri() {
    return (
        <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="text-xs leading-6 text-slate-500">
                Sumber materi:{' '}
                <a
                    href="https://www.basarnas.go.id/p/sejarah-badan-nasional-pencarian-dan-pertolongan-basarnas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#ff6600] hover:underline">
                    Badan Nasional Pencarian dan Pertolongan
                </a>
            </p>

            <p className="text-xs leading-6 text-slate-500">
                Sumber gambar:{' '}
                <a
                    href="https://indonesiabaik.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#ff6600] hover:underline">
                    Indonesia Baik
                </a>
            </p>
        </div>
    )
}

export default function SejarahBasarnasPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="min-h-screen bg-white pb-16 pt-[124px] text-[#0f172a] sm:pb-20">
                {/* Header halaman */}
                <header className="border-b border-slate-200 bg-[#0f172a] py-8 text-white">
                    <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Sejarah Basarnas
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Sejarah pembentukan dan perkembangan
                            organisasi pencarian dan pertolongan di
                            Indonesia.
                        </p>
                    </div>
                </header>

                {/* Isi halaman */}
                <article className="mx-auto max-w-6xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
                    {/* Dua dropdown utama */}
                    <div className="border-t border-slate-300">
                        <DropdownSejarah
                            bagian="A"
                            judul="Masa Terbentuknya BASARNAS"
                            data={masaTerbentuk}
                            terbuka
                        />

                        <DropdownSejarah
                            bagian="B"
                            judul="Perkembangan Organisasi BASARNAS"
                            data={perkembanganOrganisasi}
                        />
                    </div>

                    <SumberMateri />
                </article>
            </main>

            <Footer />
        </div>
    )
}