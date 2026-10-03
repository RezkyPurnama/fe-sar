'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const PADANG_COORDS = [-0.950767, 100.361567]
const DEFAULT_ZOOM = 11

const JENIS_ICON_MAP = {
    bencana_alam: '/images/point/bencana.webp',
    bencana: '/images/point/bencana.webp',
    kll_pesawat: '/images/point/pesawat.webp',
    pesawat: '/images/point/pesawat.webp',
    kll_kapal: '/images/point/kapal.webp',
    kapal: '/images/point/kapal.webp',
    kmm: '/images/point/kmm.webp',
    kll_khusus: '/images/point/khusus.webp',
    khusus: '/images/point/khusus.webp',
}

function getPointImage(jenis) {
    if (!jenis) return '/images/point/bencana.webp'
    const kode = (jenis.kode || '').toLowerCase()
    if (JENIS_ICON_MAP[kode]) return JENIS_ICON_MAP[kode]

    const nama = (jenis.nama || '').toLowerCase()
    if (nama.includes('pesawat') || nama.includes('udara')) return '/images/point/pesawat.webp'
    if (nama.includes('kapal') || nama.includes('laut') || nama.includes('perairan')) return '/images/point/kapal.webp'
    if (nama.includes('membahayakan') || nama.includes('kmm')) return '/images/point/kmm.webp'
    if (nama.includes('khusus')) return '/images/point/khusus.webp'
    if (nama.includes('bencana') || nama.includes('alam')) return '/images/point/bencana.webp'

    return '/images/point/bencana.webp'
}

const KAB_KOTA_SUMBAR = [
    { nama: 'Kota Padang', coords: [-0.9471, 100.36] },
    { nama: 'Kota Pariaman', coords: [-0.6264, 100.1205] },
    { nama: 'Kab. Padang Pariaman', coords: [-0.5649, 100.2829] },
    { nama: 'Kab. Pesisir Selatan', coords: [-1.3498, 100.5746] },
    { nama: 'Kota Solok', coords: [-0.7937, 100.6588] },
    { nama: 'Kab. Solok', coords: [-0.9575, 100.6277] },
    { nama: 'Kab. Solok Selatan', coords: [-1.5369, 101.2583] },
    { nama: 'Kota Bukittinggi', coords: [-0.3056, 100.3692] },
    { nama: 'Kab. Agam', coords: [-0.3015, 100.0716] },
    { nama: 'Kota Padang Panjang', coords: [-0.4646, 100.4428] },
    { nama: 'Kab. Tanah Datar', coords: [-0.4578, 100.5977] },
    { nama: 'Kota Sawahlunto', coords: [-0.6811, 100.7818] },
    { nama: 'Kab. Sijunjung', coords: [-0.6974, 100.9934] },
    { nama: 'Kab. Dharmasraya', coords: [-1.0118, 101.5204] },
    { nama: 'Kota Payakumbuh', coords: [-0.2247, 100.6315] },
    { nama: 'Kab. Lima Puluh Kota', coords: [-0.1472, 100.6653] },
    { nama: 'Kab. Pasaman', coords: [0.1458, 100.1704] },
    { nama: 'Kab. Pasaman Barat', coords: [0.0886, 99.8242] },
    { nama: 'Kab. Kepulauan Mentawai', coords: [-2.0306, 99.5934] },
]

const renderKabKotaLabels = (L, layerGroup) => {
    if (!layerGroup) return
    layerGroup.clearLayers()

    KAB_KOTA_SUMBAR.forEach((item) => {
        const icon = L.divIcon({
            className: 'custom-kabkota-label',
            html: `
                <div style="display: inline-flex; align-items: center; gap: 4px; background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 9999px; padding: 2px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.5); backdrop-filter: blur(4px); pointer-events: none; user-select: none; transform: translate(-50%, -50%); white-space: nowrap;">
                    <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 4px #38bdf8;"></span>
                    <span style="font-family: inherit; font-size: 10.5px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; text-transform: uppercase;">
                        ${item.nama}
                    </span>
                </div>
            `,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
        })

        const marker = L.marker(item.coords, {
            icon,
            interactive: false,
            keyboard: false,
        })
        layerGroup.addLayer(marker)
    })
}

export default function SarMap({ operations = [], loading = false }) {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const markersLayerRef = useRef(null)
    const tileLayerRef = useRef(null)
    const kabKotaLayerRef = useRef(null)
    const boundaryLayerRef = useRef(null)

    const [activeLayer, setActiveLayer] = useState('satelit')
    const [mapReady, setMapReady] = useState(false)

    // Inisialisasi Peta Leaflet (Hanya di Client)
    useEffect(() => {
        let isMounted = true

        const initMap = async () => {
            if (typeof window === 'undefined' || !mapRef.current) return

            try {
                const L = await import('leaflet')

                if (!isMounted || !mapRef.current) return

                // Jika sudah ada instance aktif, buang dulu
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove()
                    mapInstanceRef.current = null
                }

                // Bersihkan _leaflet_id jika masih tertinggal pada DOM container
                if (mapRef.current && mapRef.current._leaflet_id) {
                    delete mapRef.current._leaflet_id
                }

                const savedLayer = localStorage.getItem('resq_map_layer') || 'satelit'
                if (isMounted) setActiveLayer(savedLayer)

                const map = L.map(mapRef.current, {
                    center: PADANG_COORDS,
                    zoom: DEFAULT_ZOOM,
                    zoomControl: true,
                    preferCanvas: true,
                })

                if (!isMounted) {
                    map.remove()
                    return
                }

                mapInstanceRef.current = map

                const tileUrl =
                    savedLayer === 'satelit'
                        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        : 'https://tile.opentopomap.org/{z}/{x}/{y}.png'

                const tileAttr =
                    savedLayer === 'satelit'
                        ? '&copy; Esri'
                        : '&copy; OpenStreetMap'

                const tile = L.tileLayer(tileUrl, {
                    attribution: tileAttr,
                    maxZoom: savedLayer === 'satelit' ? 19 : 17,
                }).addTo(map)

                tileLayerRef.current = tile

                // Layer batas wilayah Kabupaten & Kota (GeoJSON Polygon)
                try {
                    const boundaryRes = await fetch('/data/sumbar-kabkota.geojson')
                    if (boundaryRes.ok && isMounted) {
                        const boundaryData = await boundaryRes.json()
                        const geoJsonLayer = L.geoJSON(boundaryData, {
                            style: {
                                color: savedLayer === 'satelit' ? '#ffffff' : '#334155',
                                weight: 1.5,
                                opacity: savedLayer === 'satelit' ? 0.7 : 0.45,
                                fillColor: savedLayer === 'satelit' ? '#ffffff' : '#000000',
                                fillOpacity: savedLayer === 'satelit' ? 0.04 : 0.02,
                                dashArray: '6, 5',
                            },
                            interactive: false,
                        }).addTo(map)
                        boundaryLayerRef.current = geoJsonLayer
                    }
                } catch (bErr) {
                    console.error('Gagal memuat GeoJSON batas wilayah:', bErr)
                }

                // Layer label khusus Kabupaten & Kota (tanpa kecamatan)
                kabKotaLayerRef.current = L.layerGroup().addTo(map)
                if (savedLayer === 'satelit') {
                    renderKabKotaLabels(L, kabKotaLayerRef.current)
                }

                markersLayerRef.current = L.layerGroup().addTo(map)

                // Force recalculate map container size
                setTimeout(() => {
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.invalidateSize()
                    }
                }, 150)

                if (isMounted) setMapReady(true)
            } catch (err) {
                console.error('Gagal inisialisasi peta Leaflet:', err)
            }
        }

        initMap()

        return () => {
            isMounted = false
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [])

    // Switch Tile Layer
    const handleSwitchLayer = async (layerType) => {
        if (!mapInstanceRef.current || !tileLayerRef.current) return
        const L = await import('leaflet')

        setActiveLayer(layerType)
        localStorage.setItem('resq_map_layer', layerType)

        mapInstanceRef.current.removeLayer(tileLayerRef.current)

        const tileUrl =
            layerType === 'satelit'
                ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                : 'https://tile.opentopomap.org/{z}/{x}/{y}.png'

        const tileAttr =
            layerType === 'satelit'
                ? '&copy; Esri'
                : '&copy; OpenStreetMap'

        const newTile = L.tileLayer(tileUrl, {
            attribution: tileAttr,
            maxZoom: layerType === 'satelit' ? 19 : 17,
        }).addTo(mapInstanceRef.current)

        tileLayerRef.current = newTile

        // Tampilkan label Kabupaten/Kota hanya pada mode Satelit
        if (kabKotaLayerRef.current) {
            if (layerType === 'satelit') {
                renderKabKotaLabels(L, kabKotaLayerRef.current)
            } else {
                kabKotaLayerRef.current.clearLayers()
            }
        }

        // Adaptasi style garis batas wilayah sesuai mode peta
        if (boundaryLayerRef.current && boundaryLayerRef.current.setStyle) {
            boundaryLayerRef.current.setStyle({
                color: layerType === 'satelit' ? '#ffffff' : '#334155',
                opacity: layerType === 'satelit' ? 0.7 : 0.45,
                fillColor: layerType === 'satelit' ? '#ffffff' : '#000000',
                fillOpacity: layerType === 'satelit' ? 0.04 : 0.02,
            })
        }
    }

    // Render Markers saat `operations` atau `mapReady` berubah
    useEffect(() => {
        const renderMarkers = async () => {
            if (!mapReady || !mapInstanceRef.current || !markersLayerRef.current) return
            const L = await import('leaflet')

            mapInstanceRef.current.invalidateSize()
            markersLayerRef.current.clearLayers()

            const validOps = operations.filter(
                (op) => op.latitude && op.longitude && !isNaN(parseFloat(op.latitude)) && !isNaN(parseFloat(op.longitude))
            )

            if (validOps.length === 0) return

            const bounds = []

            validOps.forEach((op) => {
                const lat = parseFloat(op.latitude)
                const lng = parseFloat(op.longitude)
                bounds.push([lat, lng])

                const color = op.jenis_operasi?.warna_label || '#FF6F00'
                const pointImage = getPointImage(op.jenis_operasi)

                // 1. Render Layer Circle Polygon (Jika tipe koordinat adalah circle)
                if (op.tipe_koordinat === 'circle') {
                    const radius = parseInt(op.radius_meter) || 1000
                    const radiusLabel = radius >= 1000 ? `${(radius / 1000).toFixed(1)} Km` : `${radius} m`

                    const circleLayer = L.circle([lat, lng], {
                        radius: radius,
                        color: color,
                        weight: 2.5,
                        opacity: 0.85,
                        fillColor: color,
                        fillOpacity: 0.22,
                        dashArray: '6, 6',
                    })

                    circleLayer.bindPopup(`
                        <div style="font-family: system-ui, sans-serif; font-size: 11px; padding: 2px;">
                            <b style="color: ${color}; font-size: 12px;">⭕ Wilayah Jangkauan Dampak</b><br>
                            <b>${op.nama_operasi}</b><br>
                            Radius Dampak: <b>${radiusLabel}</b><br>
                            Pusat: ${lat}, ${lng}
                        </div>
                    `)
                    markersLayerRef.current.addLayer(circleLayer)
                }

                // 2. Render Layer Custom Polygon (Jika tipe koordinat adalah polygon)
                if (op.tipe_koordinat === 'polygon' && Array.isArray(op.polygon_points) && op.polygon_points.length >= 3) {
                    const polyLayer = L.polygon(op.polygon_points, {
                        color: color,
                        weight: 3,
                        opacity: 0.9,
                        fillColor: color,
                        fillOpacity: 0.28,
                    })

                    polyLayer.bindPopup(`
                        <div style="font-family: system-ui, sans-serif; font-size: 11px; padding: 2px;">
                            <b style="color: ${color}; font-size: 12px;">📐 Sektor Area Pencarian SAR</b><br>
                            <b>${op.nama_operasi}</b><br>
                            Batas Area: <b>${op.polygon_points.length} Titik Koordinat</b>
                        </div>
                    `)
                    markersLayerRef.current.addLayer(polyLayer)
                }

                // 3. Custom SVG & Image Marker Icon dengan animasi ping
                const customIcon = L.divIcon({
                    className: 'custom-sar-pin',
                    html: `
                        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
                            <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; background: ${color}99; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                            <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; background: #ffffff; border: 2.5px solid ${color}; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 3px;">
                                <img src="${pointImage}" alt="icon" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" />
                            </div>
                        </div>
                    `,
                    iconSize: [44, 44],
                    iconAnchor: [22, 22],
                    popupAnchor: [0, -22],
                })

                // Badge mode koordinat untuk popup
                let modeBadge = '📍 Titik Tunggal'
                if (op.tipe_koordinat === 'circle') {
                    const r = parseInt(op.radius_meter) || 1000
                    modeBadge = `⭕ Radius: ${r >= 1000 ? (r / 1000).toFixed(1) + ' km' : r + ' m'}`
                } else if (op.tipe_koordinat === 'polygon') {
                    modeBadge = `📐 Sektor: ${op.polygon_points?.length || 0} Titik`
                }

                const popupHtml = `
                    <div style="font-family: system-ui, sans-serif; min-width: 220px; padding: 4px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                            <span style="font-family: monospace; font-weight: 700; font-size: 11px; color: #FF6F00;">
                                ${op.kode_operasi || 'OPS-SAR'}
                            </span>
                            <span style="background: ${color}20; color: ${color}; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; border: 1px solid ${color}40; max-width: 140px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${op.jenis_operasi?.nama || 'SAR'}">
                                ${op.jenis_operasi?.nama || 'SAR'}
                            </span>
                        </div>
                        <h4 style="font-weight: 700; font-size: 13px; color: #1e293b; margin: 0 0 4px 0; line-height: 1.3;">
                            ${op.nama_operasi}
                        </h4>
                        <div style="font-size: 11px; color: #64748b; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                            <span>📍</span>
                            <span>${op.nama_lokasi || 'Lokasi tidak spesifik'}</span>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <span style="background: #f1f5f9; color: #334155; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">
                                ${modeBadge}
                            </span>
                        </div>
                        <a href="/admin/operasi/${op.id}" 
                           style="display: block; text-align: center; background: #FF6F00; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; transition: background 0.15s ease;"
                           onmouseover="this.style.background='#E65100'" 
                           onmouseout="this.style.background='#FF6F00'">
                            Detail Operasi &rarr;
                        </a>
                    </div>
                `

                const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(popupHtml)
                markersLayerRef.current.addLayer(marker)
            })

            // Tetap pertahankan default view peta seluruh Kota Padang
        }

        renderMarkers()
    }, [operations, mapReady])

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Seksi Peta */}
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50">
                <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                    <div>
                        <h3 className="text-base font-bold text-gray-800">
                            Peta Geospasial Monitoring Operasi SAR
                        </h3>
                        <p className="text-xs text-gray-500">
                            Distribusi sebaran lokasi koordinat kejadian operasi aktif di wilayah Padang & sekitarnya
                        </p>
                    </div>
                </div>

                {/* Tombol Aksi Cepat */}
                <div className="flex items-center space-x-2.5">
                    <Link
                        href="/admin/operasi/create"
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold rounded-lg shadow-sm transition duration-150">
                        + Tambah Operasi Baru
                    </Link>
                    <Link
                        href="/admin/operasi"
                        className="inline-flex items-center px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold border border-orange-200 rounded-lg transition duration-150">
                        Kelola Semua Operasi &rarr;
                    </Link>
                </div>
            </div>

            {/* Container Peta Leaflet dengan Layer Switcher */}
            <div className="relative w-full h-[520px] bg-slate-900">
                {/* Layer Switcher Buttons (Pojok Kanan Atas Peta) */}
                <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm p-1 rounded-lg shadow-md border border-gray-200 flex items-center space-x-1">
                    <button
                        type="button"
                        onClick={() => handleSwitchLayer('satelit')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md transition duration-150 flex items-center space-x-1 ${
                            activeLayer === 'satelit'
                                ? 'bg-orange-600 text-white shadow-xs'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                        <span>🛰️</span>
                        <span>Satelit</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchLayer('topografi')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md transition duration-150 flex items-center space-x-1 ${
                            activeLayer === 'topografi'
                                ? 'bg-orange-600 text-white shadow-xs'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                        <span>🗺️</span>
                        <span>Topografi</span>
                    </button>
                </div>

                {/* Loading State Overlay */}
                {!mapReady && (
                    <div className="absolute inset-0 z-[999] bg-slate-800/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-xs font-semibold tracking-wider uppercase">
                            Memuat Peta Geospasial...
                        </span>
                    </div>
                )}

                {mapReady && loading && (
                    <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-200 flex items-center space-x-2 text-xs text-gray-700 font-medium">
                        <div className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span>Memperbarui lokasi...</span>
                    </div>
                )}

                {/* Div Target Leaflet */}
                <div ref={mapRef} className="w-full h-full" />
            </div>
        </div>
    )
}