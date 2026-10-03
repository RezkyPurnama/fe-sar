'use client'

import { useEffect, useRef, useState } from 'react'

const PADANG_COORDS = [-0.950767, 100.361567]

export default function CoordinateModeSelector({
    tipeKoordinat = 'point',
    onTipeChange,
    latitude,
    longitude,
    onCoordinateChange,
    radiusMeter = 1000,
    onRadiusChange,
    polygonPoints = [],
    onPolygonPointsChange,
    jenisColor = '#FF6600',
    errors = {},
}) {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const activeLayerGroupRef = useRef(null)

    const [activeLayer, setActiveLayer] = useState('satelit')
    const [mapReady, setMapReady] = useState(false)

    // Unit toggle untuk radius (meter atau km)
    const [radiusUnit, setRadiusUnit] = useState(radiusMeter >= 1000 ? 'km' : 'm')
    const [radiusInputValue, setRadiusInputValue] = useState(
        radiusMeter >= 1000 ? (radiusMeter / 1000).toString() : (radiusMeter || 50).toString()
    )

    // Inisialisasi peta Leaflet
    useEffect(() => {
        let isMounted = true

        const initMap = async () => {
            if (typeof window === 'undefined' || !mapRef.current) return

            try {
                const L = await import('leaflet')
                if (!isMounted || !mapRef.current) return

                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove()
                    mapInstanceRef.current = null
                }

                if (mapRef.current._leaflet_id) {
                    delete mapRef.current._leaflet_id
                }

                const initialCenter =
                    latitude && longitude && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))
                        ? [parseFloat(latitude), parseFloat(longitude)]
                        : PADANG_COORDS

                const map = L.map(mapRef.current, {
                    center: initialCenter,
                    zoom: 12,
                    zoomControl: true,
                })

                if (!isMounted) {
                    map.remove()
                    return
                }

                mapInstanceRef.current = map

                // Tile Layer Satelit Esri default
                const tileUrl =
                    activeLayer === 'satelit'
                        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        : 'https://tile.opentopomap.org/{z}/{x}/{y}.png'

                L.tileLayer(tileUrl, {
                    maxZoom: 19,
                    attribution: '&copy; Basarnas Padang Geospasial',
                }).addTo(map)

                const layerGroup = L.layerGroup().addTo(map)
                activeLayerGroupRef.current = layerGroup

                setMapReady(true)
            } catch (err) {
                console.error('Gagal inisialisasi peta interaktif:', err)
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

    // Handler Switch Tile Layer
    const handleSwitchLayer = async (layerType) => {
        if (!mapInstanceRef.current) return
        const L = await import('leaflet')

        setActiveLayer(layerType)
        const tileUrl =
            layerType === 'satelit'
                ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                : 'https://tile.opentopomap.org/{z}/{x}/{y}.png'

        // Buang layer tile lama
        mapInstanceRef.current.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
                mapInstanceRef.current.removeLayer(layer)
            }
        })

        L.tileLayer(tileUrl, {
            maxZoom: layerType === 'satelit' ? 19 : 17,
            attribution: '&copy; Basarnas Padang Geospasial',
        }).addTo(mapInstanceRef.current)
    }

    // Klik pada peta untuk interaksi input koordinat
    useEffect(() => {
        if (!mapReady || !mapInstanceRef.current) return

        const map = mapInstanceRef.current

        const onMapClick = (e) => {
            const lat = parseFloat(e.latlng.lat.toFixed(7))
            const lng = parseFloat(e.latlng.lng.toFixed(7))

            if (tipeKoordinat === 'point') {
                onCoordinateChange(lat, lng)
            } else if (tipeKoordinat === 'circle') {
                onCoordinateChange(lat, lng)
            } else if (tipeKoordinat === 'polygon') {
                const updated = [...(polygonPoints || []), [lat, lng]]
                onPolygonPointsChange(updated)
                if (!latitude || !longitude) {
                    onCoordinateChange(lat, lng)
                }
            }
        }

        map.on('click', onMapClick)

        return () => {
            map.off('click', onMapClick)
        }
    }, [mapReady, tipeKoordinat, latitude, longitude, polygonPoints, onCoordinateChange, onPolygonPointsChange])

    // Render ulang geometri pada layer group saat state koordinat berubah
    useEffect(() => {
        const drawGeometry = async () => {
            if (!mapReady || !mapInstanceRef.current || !activeLayerGroupRef.current) return
            const L = await import('leaflet')

            const group = activeLayerGroupRef.current
            group.clearLayers()

            const hasCoord =
                latitude &&
                longitude &&
                !isNaN(parseFloat(latitude)) &&
                !isNaN(parseFloat(longitude)) &&
                parseFloat(latitude) !== 0 &&
                parseFloat(longitude) !== 0

            const latNum = hasCoord ? parseFloat(latitude) : null
            const lngNum = hasCoord ? parseFloat(longitude) : null

            // 1. Mode Point
            if (tipeKoordinat === 'point') {
                if (hasCoord) {
                    const markerIcon = L.divIcon({
                        className: 'point-marker',
                        html: `
                            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
                                <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: ${jenisColor}88; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                                <div style="position: relative; width: 22px; height: 22px; border-radius: 50%; background: #ffffff; border: 3px solid ${jenisColor}; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: ${jenisColor};"></div>
                                </div>
                            </div>
                        `,
                        iconSize: [34, 34],
                        iconAnchor: [17, 17],
                    })

                    const marker = L.marker([latNum, lngNum], {
                        icon: markerIcon,
                        draggable: true,
                    })

                    marker.on('dragend', (e) => {
                        const newPos = e.target.getLatLng()
                        onCoordinateChange(parseFloat(newPos.lat.toFixed(7)), parseFloat(newPos.lng.toFixed(7)))
                    })

                    marker.bindPopup(`<b>Titik Operasi (LKP)</b><br>Lat: ${latNum}<br>Lng: ${lngNum}`).openPopup()
                    group.addLayer(marker)
                }
            }

            // 2. Mode Circle (Polygon Lingkaran / Radius Dampak)
            else if (tipeKoordinat === 'circle') {
                if (hasCoord) {
                    const rad = parseInt(radiusMeter) || 1000

                    // Marker Pusat
                    const centerIcon = L.divIcon({
                        className: 'center-marker',
                        html: `
                            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;">
                                <div style="position: relative; width: 20px; height: 20px; border-radius: 50%; background: #ffffff; border: 3px solid ${jenisColor}; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: ${jenisColor};"></div>
                                </div>
                            </div>
                        `,
                        iconSize: [30, 30],
                        iconAnchor: [15, 15],
                    })

                    const centerMarker = L.marker([latNum, lngNum], { icon: centerIcon, draggable: true })
                    centerMarker.on('dragend', (e) => {
                        const newPos = e.target.getLatLng()
                        onCoordinateChange(parseFloat(newPos.lat.toFixed(7)), parseFloat(newPos.lng.toFixed(7)))
                    })
                    group.addLayer(centerMarker)

                    // Lingkaran Jangkauan
                    const circle = L.circle([latNum, lngNum], {
                        radius: rad,
                        color: jenisColor,
                        weight: 2.5,
                        opacity: 0.9,
                        fillColor: jenisColor,
                        fillOpacity: 0.22,
                        dashArray: '6, 6',
                    })

                    const radiusLabel = rad >= 1000 ? `${(rad / 1000).toFixed(1)} Kilometer` : `${rad} Meter`
                    circle.bindPopup(`<b>Wilayah Jangkauan Dampak</b><br>Radius: <b>${radiusLabel}</b><br>Pusat: ${latNum}, ${lngNum}`)
                    group.addLayer(circle)
                }
            }

            // 3. Mode Custom Polygon (Area Pencarian SAR)
            else if (tipeKoordinat === 'polygon') {
                if (polygonPoints && polygonPoints.length > 0) {
                    // Gambar pin di setiap titik sudut
                    polygonPoints.forEach((pt, idx) => {
                        const dotIcon = L.divIcon({
                            className: 'vertex-dot',
                            html: `
                                <div style="background: #ffffff; border: 2px solid #000; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: #000; box-shadow: 0 1px 4px rgba(0,0,0,0.5);">
                                    ${idx + 1}
                                </div>
                            `,
                            iconSize: [18, 18],
                            iconAnchor: [9, 9],
                        })
                        const dotMarker = L.marker(pt, { icon: dotIcon })
                        dotMarker.bindPopup(`<b>Titik Sudut #${idx + 1}</b><br>Lat: ${pt[0]}<br>Lng: ${pt[1]}`)
                        group.addLayer(dotMarker)
                    })

                    // Jika minimal 2 titik, buat garis polyline/polygon
                    if (polygonPoints.length >= 3) {
                        const poly = L.polygon(polygonPoints, {
                            color: jenisColor,
                            weight: 3,
                            fillColor: jenisColor,
                            fillOpacity: 0.28,
                        })
                        poly.bindPopup(`<b>Area Sektor Pencarian SAR</b><br>Total Titik Sudut: <b>${polygonPoints.length} Titik</b>`)
                        group.addLayer(poly)
                    } else if (polygonPoints.length === 2) {
                        const line = L.polyline(polygonPoints, {
                            color: jenisColor,
                            weight: 2.5,
                            dashArray: '5, 5',
                        })
                        group.addLayer(line)
                    }
                }
            }
        }

        drawGeometry()
    }, [mapReady, tipeKoordinat, latitude, longitude, radiusMeter, polygonPoints, jenisColor, onCoordinateChange])

    // Handle Perubahan Radius
    const handleRadiusValueChange = (val) => {
        setRadiusInputValue(val)
        const numericVal = parseFloat(val)
        if (!isNaN(numericVal) && numericVal > 0) {
            const finalMeters = radiusUnit === 'km' ? Math.round(numericVal * 1000) : Math.round(numericVal)
            onRadiusChange(finalMeters)
        }
    }

    const handleRadiusUnitChange = (newUnit) => {
        setRadiusUnit(newUnit)
        const numericVal = parseFloat(radiusInputValue)
        if (!isNaN(numericVal) && numericVal > 0) {
            let finalMeters = numericVal
            if (newUnit === 'km') {
                finalMeters = Math.round(numericVal * 1000)
            } else {
                finalMeters = Math.round(numericVal)
            }
            onRadiusChange(finalMeters)
        }
    }

    // Set Preset Radius Cepat
    const setPresetRadius = (meters, label, unit) => {
        onRadiusChange(meters)
        setRadiusUnit(unit)
        setRadiusInputValue(unit === 'km' ? (meters / 1000).toString() : meters.toString())
    }

    // Undo Titik Terakhir Polygon
    const handleUndoPoint = () => {
        if (!polygonPoints || polygonPoints.length === 0) return
        const updated = polygonPoints.slice(0, -1)
        onPolygonPointsChange(updated)
    }

    // Reset Semua Titik Polygon
    const handleClearPolygon = () => {
        onPolygonPointsChange([])
    }

    return (
        <div className="space-y-4">
            {/* 1. Pemilih Tab 3 Mode */}
            <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                    Format & Mode Wilayah Operasi SAR <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Mode 1: Titik Koordinat Tunggal */}
                    <button
                        type="button"
                        onClick={() => onTipeChange('point')}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                            tipeKoordinat === 'point'
                                ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-200'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">📍</span>
                            <span className="font-bold text-sm text-gray-900">Titik Koordinat (Point)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                            Penanda titik tunggal (Last Known Position / LKP) dengan Lat & Lng.
                        </p>
                    </button>

                    {/* Mode 2: Circle Polygon (Radius Dampak) */}
                    <button
                        type="button"
                        onClick={() => onTipeChange('circle')}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                            tipeKoordinat === 'circle'
                                ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-200'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">⭕</span>
                            <span className="font-bold text-sm text-gray-900">Polygon Lingkaran (Circle)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                            Pusat koordinat + luas jangkauan dampak (Banjir 50m, Erupsi 10km).
                        </p>
                    </button>

                    {/* Mode 3: Costume / Custom Polygon (Area Pencarian SAR) */}
                    <button
                        type="button"
                        onClick={() => onTipeChange('polygon')}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                            tipeKoordinat === 'polygon'
                                ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-200'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">📐</span>
                            <span className="font-bold text-sm text-gray-900">Custom Polygon (Peta)</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                            Tentukan area pencarian orang hilang dengan mengklik titik-titik pada peta.
                        </p>
                    </button>
                </div>
            </div>

            {/* 2. Peta Interaktif Editor */}
            <div className="relative border border-gray-300 rounded-xl overflow-hidden shadow-inner">
                {/* Switcher Layer Peta */}
                <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm p-1 rounded-lg shadow-md border border-gray-200 flex space-x-1">
                    <button
                        type="button"
                        onClick={() => handleSwitchLayer('satelit')}
                        className={`px-2.5 py-1 text-xs font-bold rounded ${
                            activeLayer === 'satelit'
                                ? 'bg-orange-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}>
                        🛰️ Satelit
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchLayer('topo')}
                        className={`px-2.5 py-1 text-xs font-bold rounded ${
                            activeLayer === 'topo'
                                ? 'bg-orange-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}>
                        🗺️ Topografi
                    </button>
                </div>

                {/* Banner Panduan Interaktif Sesuai Mode */}
                <div className="absolute top-3 left-3 z-[1000] max-w-sm bg-slate-900/85 text-white backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs">
                    {tipeKoordinat === 'point' && (
                        <p>💡 <b>Klik peta</b> atau geser pin untuk menentukan titik koordinat (LKP).</p>
                    )}
                    {tipeKoordinat === 'circle' && (
                        <p>💡 <b>Klik peta</b> untuk menaruh titik pusat, lalu sesuaikan radius dampak di bawah.</p>
                    )}
                    {tipeKoordinat === 'polygon' && (
                        <div>
                            <p>💡 <b>Klik pada peta</b> untuk membentuk area pencarian SAR (minimal 3 titik).</p>
                            <div className="mt-1 flex items-center space-x-2">
                                <span className="bg-orange-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
                                    {polygonPoints?.length || 0} Titik Sudut
                                </span>
                                {polygonPoints?.length >= 3 ? (
                                    <span className="text-emerald-300 text-[10px] font-semibold">Area Sektor Lengkap</span>
                                ) : (
                                    <span className="text-amber-300 text-[10px]">Klik minimal 3 titik</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Wadah Peta */}
                <div ref={mapRef} className="h-80 w-full bg-slate-100 cursor-crosshair" />

                {/* Action Bar untuk Mode Custom Polygon */}
                {tipeKoordinat === 'polygon' && (
                    <div className="p-2.5 bg-slate-800 text-white flex items-center justify-between text-xs border-t border-slate-700">
                        <div className="flex items-center space-x-2">
                            <span>Sektor Pencarian Orang Hilang:</span>
                            <span className="font-mono font-bold bg-slate-700 px-2 py-0.5 rounded">
                                {polygonPoints?.length || 0} Titik Terpasang
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={handleUndoPoint}
                                disabled={!polygonPoints || polygonPoints.length === 0}
                                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded text-xs font-semibold">
                                ↩️ Batalkan Titik Terakhir
                            </button>
                            <button
                                type="button"
                                onClick={handleClearPolygon}
                                disabled={!polygonPoints || polygonPoints.length === 0}
                                className="px-2.5 py-1 bg-red-600/80 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed rounded text-xs font-semibold">
                                🗑️ Bersihkan Area
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Panel Input Data Tambahan Sesuai Mode */}
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 space-y-4">
                {/* Input Lat & Lng (Dipakai di Mode Point & Circle) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {tipeKoordinat === 'circle' ? 'Latitude Titik Pusat Kejadian' : 'Latitude (Garis Lintang)'}
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: -0.9471000"
                            value={latitude || ''}
                            onChange={(e) => onCoordinateChange(e.target.value, longitude)}
                            className="block w-full rounded-md text-sm font-mono border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        />
                        {errors.latitude && <p className="mt-1 text-xs text-red-600">{errors.latitude}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            {tipeKoordinat === 'circle' ? 'Longitude Titik Pusat Kejadian' : 'Longitude (Garis Bujur)'}
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: 100.4172000"
                            value={longitude || ''}
                            onChange={(e) => onCoordinateChange(latitude, e.target.value)}
                            className="block w-full rounded-md text-sm font-mono border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        />
                        {errors.longitude && <p className="mt-1 text-xs text-red-600">{errors.longitude}</p>}
                    </div>
                </div>

                {/* Input Radius Khusus Mode Circle */}
                {tipeKoordinat === 'circle' && (
                    <div className="border-t border-gray-200 pt-3 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                                    Luas Jangkauan Dampak Kejadian <span className="text-red-500">*</span>
                                </label>
                                <p className="text-[11px] text-gray-500">
                                    Tentukan radius dampak insiden (Polygon Lingkaran)
                                </p>
                            </div>

                            {/* Input Nilai + Satuan */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min="1"
                                    step="any"
                                    value={radiusInputValue}
                                    onChange={(e) => handleRadiusValueChange(e.target.value)}
                                    className="w-28 rounded-md text-sm font-bold border-gray-300 focus:border-orange-500 focus:ring-orange-200 text-right"
                                />
                                <div className="inline-flex rounded-md shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => handleRadiusUnitChange('m')}
                                        className={`px-3 py-2 text-xs font-bold rounded-l-md border ${
                                            radiusUnit === 'm'
                                                ? 'bg-orange-600 text-white border-orange-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        Meter
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRadiusUnitChange('km')}
                                        className={`px-3 py-2 text-xs font-bold rounded-r-md border ${
                                            radiusUnit === 'km'
                                                ? 'bg-orange-600 text-white border-orange-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        Kilometer
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Preset Cepat */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="text-[11px] text-gray-500 font-semibold">Preset Cepat:</span>
                            <button
                                type="button"
                                onClick={() => setPresetRadius(50, '50 Meter', 'm')}
                                className="px-2.5 py-1 text-xs bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600 rounded-md">
                                🌊 Banjir (50 Meter)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPresetRadius(200, '200 Meter', 'm')}
                                className="px-2.5 py-1 text-xs bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600 rounded-md">
                                ⛰️ Longsor (200 Meter)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPresetRadius(5000, '5 Km', 'km')}
                                className="px-2.5 py-1 text-xs bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600 rounded-md">
                                🚢 Laut (5 Km)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPresetRadius(10000, '10 Km', 'km')}
                                className="px-2.5 py-1 text-xs bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600 rounded-md">
                                🌋 Gunung Marapi (10 Km)
                            </button>
                        </div>
                    </div>
                )}

                {/* Keterangan Titik Sudut Mode Custom Polygon */}
                {tipeKoordinat === 'polygon' && (
                    <div className="border-t border-gray-200 pt-3">
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                            Daftar Titik Koordinat Sektor Pencarian SAR:
                        </span>
                        {polygonPoints && polygonPoints.length > 0 ? (
                            <div className="max-h-32 overflow-y-auto space-y-1.5 pr-2 font-mono text-[11px]">
                                {polygonPoints.map((pt, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between bg-white px-2.5 py-1 rounded border border-gray-200">
                                        <span className="font-semibold text-gray-700">Titik #{i + 1}:</span>
                                        <span className="text-gray-600">Lat: {pt[0]}, Lng: {pt[1]}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400 italic">
                                Belum ada titik sudut yang diklik pada peta. Silakan klik pada peta di atas untuk menandai batas area.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
