import React from 'react';

const ListView = ({ countries, onSelect }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Capitale</th>
        <th>Région</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody>
      {countries.map(country => (
        <tr key={country.cca3} onClick={() => onSelect(country)} style={{ cursor: 'pointer' }}>
          <td>{country.name.common}</td>
          <td>{country.capital?.[0]}</td>
          <td>{country.region}</td>
          <td>{country.population.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListView;