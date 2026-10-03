const Badge = ({ children, color, className = '' }) => {
    let colorClass = 'bg-gray-100 text-gray-800 border-gray-200'
    const text = String(children || '').toUpperCase()

    if (
        color === 'green' ||
        text === 'BERLANGSUNG' ||
        text === 'SELAMAT' ||
        text === 'AKTIF' ||
        text === 'BAIK'
    ) {
        colorClass = 'bg-green-100 text-green-800 border-green-200'
    } else if (
        color === 'yellow' ||
        text === 'SIAGA' ||
        text === 'LUKA_RINGAN' ||
        text === 'RUSAK_RINGAN' ||
        text === 'DIPINJAM'
    ) {
        colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200'
    } else if (
        color === 'red' ||
        text === 'MENINGGAL' ||
        text === 'LUKA_BERAT' ||
        text === 'RUSAK_BERAT' ||
        text === 'NONAKTIF' ||
        text === 'HILANG'
    ) {
        colorClass = 'bg-red-100 text-red-800 border-red-200'
    } else if (
        color === 'blue' ||
        text === 'DALAM_PENCARIAN' ||
        text === 'KEMBALI' ||
        text === 'DITUTUP'
    ) {
        colorClass = 'bg-blue-100 text-blue-800 border-blue-200'
    } else if (color === 'purple') {
        colorClass = 'bg-purple-100 text-purple-800 border-purple-200'
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
            {children}
        </span>
    )
}

export default Badge
