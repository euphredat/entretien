import React from 'react';

const SearchBar = ({ value, onChange, suggestions, onSelectSuggestion }) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      type="text"
      placeholder="Rechercher un pays..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '12px',
        marginBottom: '0',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        background: '#f7f7f7'
      }}
      autoComplete="off"
    />
    {suggestions.length > 0 && (
      <ul style={{
        position: 'absolute',
        top: '46px',
        left: 0,
        right: 0,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '6px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        zIndex: 9999,
        maxHeight: '220px',
        overflowY: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        {suggestions.map(s => (
          <li
            key={s.cca3}
            style={{
              padding: '12px',
              cursor: 'pointer',
              borderBottom: '1px solid #eee'
            }}
            onClick={() => onSelectSuggestion(s.name.common)}
          >
            {s.name.common}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBar;