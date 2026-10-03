export default function JudulBagian({
    label,
    judul,
    deskripsi,
    gelap = false,
}) {
    return (
        <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ff6600]">
                {label}
            </p>

            <h2
                className={`mt-3 text-3xl font-black sm:text-4xl ${
                    gelap ? 'text-white' : 'text-[#0f172a]'
                }`}>
                {judul}
            </h2>

            {deskripsi && (
                <p
                    className={`mt-4 leading-7 ${
                        gelap ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                    {deskripsi}
                </p>
            )}
        </div>
    )
}