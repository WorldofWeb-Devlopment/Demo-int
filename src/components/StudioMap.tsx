import { useCallback, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps';
import { Compass, Layers, LocateFixed, MapPin, Minus, Plus } from 'lucide-react';
import { STUDIO_CONTACT } from '../data/studioData';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  isValidMapsApiKey,
} from '../utils/studioLogic';

function InteractiveMapContent({
  zoom,
  mapType,
  onZoomChange,
}: {
  zoom: number;
  mapType: 'roadmap' | 'satellite';
  onZoomChange: (nextZoom: number) => void;
}) {
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(STUDIO_CONTACT.coordinates);
      map.setZoom(15);
    }
    onZoomChange(15);
  }, [map, onZoomChange]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={STUDIO_CONTACT.coordinates}
        title={STUDIO_CONTACT.brandName}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <div className="flex flex-col items-center cursor-pointer select-none">
          <div className="px-3 py-1.5 rounded-sm bg-[#1C1C1C] text-[#FFF8E6] border border-[#F5B700] shadow-md flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F5B700]" aria-hidden="true" />
            <span className="font-serif text-xs tracking-[0.06em] whitespace-nowrap">
              {STUDIO_CONTACT.brandName}
            </span>
          </div>
          <div className="w-4 h-4 rotate-45 bg-[#F5B700] border-2 border-[#1C1C1C] shadow-sm" />
        </div>
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)} maxWidth={260}>
          <div className="p-1 text-[#1C1C1C] font-sans">
            <p className="font-serif text-base font-medium mb-1">
              {STUDIO_CONTACT.brandName}
            </p>
            <p className="text-xs text-[#555555] leading-relaxed">
              {STUDIO_CONTACT.addressLine1}
              <br />
              {STUDIO_CONTACT.addressLine2}
            </p>
          </div>
        </InfoWindow>
      )}

      {/* Custom Architectural Map Controls */}
      <div className="absolute bottom-8 right-4 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => {
            const next = Math.min(20, zoom + 1);
            map?.setZoom(next);
            onZoomChange(next);
          }}
          aria-label="Zoom in map"
          className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const next = Math.max(3, zoom - 1);
            map?.setZoom(next);
            onZoomChange(next);
          }}
          aria-label="Zoom out map"
          className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Center map on studio location"
          className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
        >
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>

      {/* Map / Satellite Indicator */}
      <span className="sr-only">Current map type: {mapType}</span>
    </>
  );
}

export function StudioMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const mapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined) || 'DEMO_MAP_ID';
  const hasApiKey = isValidMapsApiKey(apiKey);

  const [zoom, setZoom] = useState(15);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [embedVersion, setEmbedVersion] = useState(0);

  const directionsUrl = buildGoogleMapsDirectionsUrl({
    addressQuery: STUDIO_CONTACT.isPlaceholderAddress
      ? STUDIO_CONTACT.mapQuery
      : `${STUDIO_CONTACT.addressLine1}, ${STUDIO_CONTACT.addressLine2}`,
    lat: STUDIO_CONTACT.coordinates.lat,
    lng: STUDIO_CONTACT.coordinates.lng,
  });

  const embedUrl = buildGoogleMapsEmbedUrl({
    apiKey: hasApiKey ? apiKey : undefined,
    query: STUDIO_CONTACT.mapQuery,
    lat: STUDIO_CONTACT.coordinates.lat,
    lng: STUDIO_CONTACT.coordinates.lng,
    zoom,
    mapType,
  });

  const handleZoomIn = () => setZoom((z) => Math.min(20, z + 1));
  const handleZoomOut = () => setZoom((z) => Math.max(3, z - 1));
  const handleReset = () => {
    setZoom(15);
    setMapType('roadmap');
    setEmbedVersion((v) => v + 1);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-lg overflow-hidden border border-[#1C1C1C]/15 bg-[#1C1C1C]/5">
        {hasApiKey ? (
          <APIProvider apiKey={apiKey} language="en" region="US">
            <GoogleMap
              mapId={mapId}
              defaultCenter={STUDIO_CONTACT.coordinates}
              center={STUDIO_CONTACT.coordinates}
              zoom={zoom}
              mapTypeId={mapType}
              gestureHandling="cooperative"
              disableDefaultUI
              zoomControl={false}
              onZoomChanged={(ev) => {
                if (typeof ev.detail.zoom === 'number') {
                  setZoom(Math.round(ev.detail.zoom));
                }
              }}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="w-full h-full"
            >
              <InteractiveMapContent
                zoom={zoom}
                mapType={mapType}
                onZoomChange={setZoom}
              />
            </GoogleMap>
          </APIProvider>
        ) : (
          <>
            <iframe
              key={`${zoom}-${mapType}-${embedVersion}`}
              title={`${STUDIO_CONTACT.brandName} Studio Location Map`}
              src={embedUrl}
              className="w-full h-full border-0 filter contrast-[0.96] saturate-[0.82]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            {/* Custom Luxury Studio Pin Overlay Badge */}
            <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-[280px]">
              <div className="pointer-events-auto rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/15 px-3.5 py-2.5 shadow-sm flex items-start gap-2.5">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-[#1C1C1C] text-[#F5B700] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-sm font-medium text-[#1C1C1C] leading-tight">
                    {STUDIO_CONTACT.brandName}
                  </p>
                  <p className="text-[11px] text-[#555555] leading-snug mt-0.5">
                    {STUDIO_CONTACT.isPlaceholderAddress
                      ? 'Studio Address Placeholder'
                      : STUDIO_CONTACT.addressLine1}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Navigation & Zoom Controls (Embed Mode) */}
            <div className="absolute bottom-8 right-4 z-10 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom in map"
                className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom out map"
                className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Center map on studio location"
                className="w-10 h-10 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
              >
                <LocateFixed className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Map View Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={() =>
              setMapType((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))
            }
            aria-label={`Switch map view to ${mapType === 'roadmap' ? 'satellite' : 'roadmap'}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#FFF8E6]/95 backdrop-blur-sm border border-[#1C1C1C]/20 text-xs font-semibold text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FFF8E6] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-[#F5B700]" />
            <span>{mapType === 'roadmap' ? 'Satellite' : 'Map View'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Map Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <p className="text-xs text-[#555555] leading-relaxed">
          {STUDIO_CONTACT.isPlaceholderAddress
            ? 'Placeholder studio coordinates shown. Configure VITE_STUDIO_ADDRESS_LINE1 and VITE_GOOGLE_MAPS_API_KEY to lock your exact studio pin.'
            : `${STUDIO_CONTACT.addressLine1} · ${STUDIO_CONTACT.addressLine2}`}
        </p>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-md bg-[#1C1C1C] text-[#FFF8E6] text-xs tracking-[0.08em] font-semibold hover:bg-[#F5B700] hover:text-[#1C1C1C] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <Compass className="w-4 h-4 text-[#F5B700]" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
}
