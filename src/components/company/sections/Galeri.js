'use client'

import { useState } from 'react'
import JudulBagian from '@/components/company/shared/JudulBagian'
import { galeri } from '@/data/companyData'

export default function Galeri() {
    const [fotoAktif, setFotoAktif] = useState(null)

    return (
        <>
            <section id="galeri" className="scroll-mt-20 py-24">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <JudulBagian
                        label="Dokumentasi"
                        judul="Galeri Kegiatan"
                        deskripsi="Dokumentasi kesiapsiagaan, latihan, dan pelaksanaan operasi SAR."
                    />

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {galeri.map((gambar, index) => (
                            <button
                                key={gambar}
                                type="button"
                                onClick={() => setFotoAktif(index)}
                                className="group h-56 overflow-hidden rounded-2xl">
                                <img
                                    src={gambar}
                                    alt={`Kegiatan SAR ${index + 1}`}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {fotoAktif !== null && (
                <div
                    onClick={() => setFotoAktif(null)}
                    className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-5">
                    <button
                        type="button"
                        onClick={() => setFotoAktif(null)}
                        className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-2xl font-black text-black"
                        aria-label="Tutup galeri">
                        ×
                    </button>

                    <img
                        onClick={event => event.stopPropagation()}
                        src={galeri[fotoAktif]}
                        alt="Dokumentasi kegiatan SAR"
                        className="max-h-[85vh] max-w-5xl rounded-2xl object-contain"
                    />
                </div>
            )}
        </>
    )
}