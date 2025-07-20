import React from 'react';

const SwitchViewButton = ({ isMapView, onSwitch }) => (
  <button onClick={onSwitch} style={{ marginBottom: '16px' }}>
    {isMapView ? 'Afficher la liste' : 'Afficher la carte'}
  </button>
);

export default SwitchViewButton;