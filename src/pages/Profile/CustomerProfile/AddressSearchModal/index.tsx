import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, MapPin } from 'lucide-react';
import { IAddress } from '@/interfaces/address';
import { useAddressSearch } from '@/hooks/useAddressSearch';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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
  onAddressSelect: (address: IAddress | null) => void;
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
  setMapRef: (map: unknown) => void;
}> = ({ setMapRef }) => {
  const map = useMapEvents({});

  React.useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);

  return null;
};

const AddressSearchModal = ({
  isOpen,
  onClose,
  onAddressSelect,
  currentAddress,
}: AddressSearchModalProps) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedPosition,
    selectedAddress,
    notFoundError,
    handleResultSelect,
    handleMapClick,
    setMapRef,
  } = useAddressSearch({
    currentAddress,
    isOpen,
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
      <Button
        variant="primary"
        onClick={handleConfirm}
        disabled={!selectedAddress || Boolean(notFoundError)}
      >
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

      {/* Conditional informational text based on address state */}
      {!selectedAddress ? (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p>Buscá la dirección en el campo de búsqueda o hace clic directamente en el mapa.</p>
            </div>
          </div>
        </div>
      ) : notFoundError ? (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <p>{notFoundError}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p>Dirección seleccionada:</p>
              <p className="font-medium">{selectedAddress.formattedAddress}</p>
            </div>
          </div>
        </div>
      )}

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
    </Modal>
  );
};

export default AddressSearchModal;
