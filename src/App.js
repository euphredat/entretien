import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/countries';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import ListView from './components/ListView';
import SwitchViewButton from './components/SwitchViewButton';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isMapView, setIsMapView] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const paginatedCountries = countries.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    fetchCountries(search).then(data => {
      setCountries(data);
      if (search.length > 0) {
        setSuggestions(
          data.filter(c =>
            c.name.common.toLowerCase().startsWith(search.toLowerCase())
          ).slice(0, 10)
        );
      } else {
        setSuggestions([]);
      }
      setPage(1); // reset page on search
    });
  }, [search]);

  const handleSelectSuggestion = (name) => {
    setSearch(name);
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Liste des pays du monde</h1>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 24px auto' }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      </div>
      <SwitchViewButton isMapView={isMapView} onSwitch={() => setIsMapView(v => !v)} />
      <div style={{ display: 'flex', height: '600px', zIndex: 1 }}>
        <div style={{ flex: 3, marginRight: '16px' }}>
          {isMapView ? (
            <MapView countries={paginatedCountries} onSelect={setSelectedCountry} />
          ) : (
            <ListView countries={paginatedCountries} onSelect={setSelectedCountry} />
          )}
          {/* Pagination */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            {Array.from({ length: Math.ceil(countries.length / pageSize) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  margin: '0 4px',
                  padding: '6px 12px',
                  background: page === i + 1 ? '#007bff' : '#eee',
                  color: page === i + 1 ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div style={{
          flex: 1,
          background: '#f9f9f9',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 0 8px #ddd'
        }}>
          {selectedCountry ? (
            <div>
              <h2>{selectedCountry.name.common}</h2>
              <p>Capitale : {selectedCountry.capital?.[0]}</p>
              <p>Région : {selectedCountry.region}</p>
              <p>Population : {selectedCountry.population.toLocaleString()}</p>
              <p>Continent : {selectedCountry.continents?.[0]}</p>
              <img src={selectedCountry.flags?.svg} alt="drapeau" style={{ width: '100%', maxWidth: '120px', marginTop: '16px' }} />
            </div>
          ) : (
            <p>Sélectionnez un pays sur la carte ou dans la liste.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;