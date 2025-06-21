import { useState, useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';
import { IAddress } from '@/interfaces/address';
import { useAddressSearch } from '@/hooks/useAddressSearch';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface AddressSelectorProps {
  value: IAddress | null;
  onChange: (address: IAddress | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const AddressSelector = ({
  value,
  onChange,
  placeholder = 'Buscar dirección...',
  disabled = false,
  error,
}: AddressSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const clearingRef = useRef(false);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedAddress,
    notFoundError,
    handleResultSelect,
  } = useAddressSearch({
    currentAddress: value,
    isOpen,
  });

  // Sincronizar dirección seleccionada del hook con el componente padre
  useEffect(() => {
    if (clearingRef.current) {
      clearingRef.current = false;
      return;
    }

    if (selectedAddress && selectedAddress !== value) onChange(selectedAddress);
  }, [selectedAddress, onChange, value]);

  const handleClearAddress = () => {
    clearingRef.current = true;
    onChange(null);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSelectAddress = (address: IAddress) => {
    handleResultSelect({
      lat: address.latitude.toString(),
      lon: address.longitude.toString(),
      display_name: address.formattedAddress,
      address: {
        road: address.street,
        house_number: address.number,
        city: address.city,
        town: address.city,
        village: address.city,
        state: address.state,
        country: address.country,
        postcode: address.postalCode,
        neighbourhood: address.neighborhood,
      },
    });
    setIsOpen(false);
  };

  const displayValue = value?.formattedAddress || '';
  const hasError = error || notFoundError;

  return (
    <div className="relative w-full">
      {/* Input principal */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          className={`
            block w-full pl-10 pr-10 py-3 border rounded-lg
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${
              hasError
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            transition-colors duration-200
          `}
          placeholder={placeholder}
          value={isOpen ? searchQuery : displayValue}
          onChange={e => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />

        {displayValue && !disabled && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
            onClick={handleClearAddress}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Error message */}
      {hasError && <p className="mt-1 text-sm text-red-600">{error || notFoundError}</p>}

      {/* Dropdown de sugerencias */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-72 overflow-auto"
        >
          {isSearching && (
            <div className="px-3 py-2 text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600 mr-2"></div>
              Buscando direcciones...
            </div>
          )}

          {!isSearching && searchQuery.length > 0 && searchQuery.length < 3 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              Escribe al menos 3 caracteres para buscar
            </div>
          )}

          {!isSearching && searchResults.length === 0 && searchQuery.length >= 3 && (
            <div className="px-3 py-2 text-sm text-gray-500">No se encontraron direcciones</div>
          )}

          {!isSearching &&
            searchResults.map((result, index) => {
              const address: IAddress = {
                street: result.address.road || '',
                number: result.address.house_number || '',
                city: result.address.city || result.address.town || result.address.village || '',
                state: result.address.state || '',
                country: result.address.country || '',
                postalCode: result.address.postcode || '',
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon),
                formattedAddress: result.display_name,
                neighborhood: result.address.neighbourhood || '',
              };

              return (
                <button
                  key={index}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectAddress(address)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {address.street} {address.number}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {address.neighborhood && `${address.neighborhood}, `}
                        {address.city}, {address.state}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
