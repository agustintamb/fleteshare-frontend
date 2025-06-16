/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, MapPin } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { IAddress } from '@/interfaces/freight';
import { useAddressSearch } from './useAddressSearch';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
delete (Icon.Default.prototype as typeof Icon.Default.prototype & { _getIconUrl?: unknown })
  ._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: IAddress) => void;
  currentAddress?: IAddress | null;
}

// Componente para manejar clics en el mapa
const MapClickHandler: React.FC<{
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ onLocationSelect }) => {
  useMapEvents({
    click: e => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Componente para establecer la referencia del mapa
const MapRefSetter: React.FC<{
  setMapRef: (map: any) => void;
}> = ({ setMapRef }) => {
  const map = useMapEvents({});

  React.useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);

  return null;
};

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
  currentAddress,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedPosition,
    selectedAddress,
    handleResultSelect,
    handleMapClick,
    setMapRef,
  } = useAddressSearch({
    currentAddress,
    isModalOpen: isOpen, // Pasar el estado del modal al hook
  });

  // Confirmar selección de dirección
  const handleConfirm = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
    }
  };

  // Renderizar las acciones del modal
  const modalActions = (
    <>
      <Button variant="outline" onClick={onClose}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={!selectedAddress}>
        Aceptar
      </Button>
    </>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Seleccionar Dirección"
      size="xl"
      actions={modalActions}
    >
      {/* Texto informativo */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p>Buscá la dirección en el campo de búsqueda o hace clic directamente en el mapa.</p>
          </div>
        </div>
      </div>

      {/* Mapa más grande */}
      <div className="mb-4 h-80 border border-gray-200 rounded-md overflow-hidden">
        <MapContainer
          center={selectedPosition || [-34.6118, -58.396]} // Buenos Aires por defecto
          zoom={selectedPosition ? 16 : 12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onLocationSelect={handleMapClick} />
          <MapRefSetter setMapRef={setMapRef} />
          {selectedPosition && <Marker position={selectedPosition} />}
        </MapContainer>
      </div>

      {/* Buscador */}
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Buscar dirección (ej: Av. Corrientes 1234, CABA)"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          icon={<Search size={18} />}
          fullWidth
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="mb-4 max-h-32 overflow-y-auto border border-gray-200 rounded-md">
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultSelect(result)}
              className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-900">{result.display_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Información de la dirección seleccionada */}
      {selectedAddress && (
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">Dirección Seleccionada:</h3>
            <a
              href={`https://www.google.com/maps?q=${selectedAddress.latitude},${selectedAddress.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Ver en Google Maps
            </a>
          </div>
          <p className="text-sm text-gray-700 mb-2">{selectedAddress.formattedAddress}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500 block">Latitud:</span>
              <span className="font-mono text-gray-900">{selectedAddress.latitude.toFixed(6)}</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500 block">Longitud:</span>
              <span className="font-mono text-gray-900">
                {selectedAddress.longitude.toFixed(6)}
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            💡 Tip: Hacé click en "Ver en Google Maps" para verificar por medio de una segunda
            fuente que la dirección es la correcta.
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddressSearchModal;
