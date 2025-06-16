/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from 'react';
import { IAddress, ISearchResult } from '@/interfaces/freight';

interface UseAddressSearchProps {
  currentAddress?: IAddress | null;
  isModalOpen?: boolean;
}

export const useAddressSearch = ({ currentAddress, isModalOpen }: UseAddressSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(currentAddress || null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(
    currentAddress ? [currentAddress.latitude, currentAddress.longitude] : null
  );

  // Referencia para el mapa de Leaflet
  const mapRef = useRef<any>(null);

  // Resetear el estado cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      // Resetear al estado inicial basado en currentAddress
      setSelectedAddress(currentAddress || null);
      setSelectedPosition(
        currentAddress ? [currentAddress.latitude, currentAddress.longitude] : null
      );
      setSearchQuery('');
      setSearchResults([]);

      // Si hay una dirección actual, centrar el mapa en ella
      if (currentAddress && mapRef.current) {
        setTimeout(() => {
          mapRef.current.setView([currentAddress.latitude, currentAddress.longitude], 16);
        }, 100); // Pequeño delay para asegurar que el mapa esté renderizado
      }
    }
  }, [isModalOpen, currentAddress]);

  // Función para buscar direcciones usando Nominatim
  const searchAddresses = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Agregar bias hacia Argentina si no se especifica país
      const searchTerm =
        query.includes('Argentina') || query.includes('ARG') ? query : `${query}, Argentina`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&accept-language=es&q=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data: ISearchResult[] = await response.json();
      setSearchResults(data.reverse().slice(0, 3)); // Invertir el orden y limitar a 3 resultados
    } catch (error) {
      console.error('Error searching addresses:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Función para obtener dirección desde coordenadas (geocodificación inversa)
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&accept-language=es&lat=${lat}&lon=${lng}`
      );
      const data: ISearchResult = await response.json();

      if (data && data.address) {
        const address: IAddress = {
          street: data.address.road || '',
          number: data.address.house_number || '',
          city: data.address.city || data.address.town || data.address.village || '',
          state: data.address.state || '',
          country: data.address.country || '',
          postalCode: data.address.postcode || '',
          latitude: parseFloat(data.lat),
          longitude: parseFloat(data.lon),
          formattedAddress: data.display_name,
          neighborhood: data.address.neighbourhood || '',
        };
        setSelectedAddress(address);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  }, []);

  // Función para centrar el mapa en una posición específica
  const centerMapOnPosition = useCallback((lat: number, lng: number, zoom: number = 16) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom);
    }
  }, []);

  // Manejar selección de resultado de búsqueda
  const handleResultSelect = useCallback(
    (result: ISearchResult) => {
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      setSelectedPosition([lat, lng]);

      const address: IAddress = {
        street: result.address.road || '',
        number: result.address.house_number || '',
        city: result.address.city || result.address.town || result.address.village || '',
        state: result.address.state || '',
        country: result.address.country || '',
        postalCode: result.address.postcode || '',
        latitude: lat,
        longitude: lng,
        formattedAddress: result.display_name,
        neighborhood: result.address.neighbourhood || '',
      };

      setSelectedAddress(address);
      setSearchResults([]);
      setSearchQuery('');

      // Centrar el mapa en la nueva posición
      centerMapOnPosition(lat, lng);
    },
    [centerMapOnPosition]
  );

  // Manejar clic en el mapa
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      setSelectedPosition([lat, lng]);
      reverseGeocode(lat, lng);
    },
    [reverseGeocode]
  );

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchAddresses(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, searchAddresses]);

  // Función para establecer la referencia del mapa
  const setMapRef = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  return {
    // Estado
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedPosition,
    selectedAddress,

    // Funciones
    handleResultSelect,
    handleMapClick,
    centerMapOnPosition,
    setMapRef,

    // Utilidades
    mapRef,
  };
};
