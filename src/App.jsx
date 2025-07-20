import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/countries';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries(search).then(setCountries);
  }, [search]);

  return (
    <div>
      <h1>Liste des pays du monde</h1>
      <SearchBar value={search} onChange={setSearch} />
      <MapView countries={countries} onSelect={setSelectedCountry} />
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capitale : {selectedCountry.capital?.[0]}</p>
          <p>Région : {selectedCountry.region}</p>
          <p>Population : {selectedCountry.population}</p>
        </div>
      )}
    </div>
  );
}

export default App;