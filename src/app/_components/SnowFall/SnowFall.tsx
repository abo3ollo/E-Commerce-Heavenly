// components/SnowfallBackground.tsx
"use client"
import React from 'react';
import Snowfall from 'react-snowfall';

const SnowfallBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -99, // Ensures the snow is in the background
    }}>
      <Snowfall
        // Optional: Customize the snow effect
        color="black"
        snowflakeCount={250}
        speed={[0.5, 3.0]} // Min and max speed
        wind={[-0.5, 2.0]} // Min and max horizontal wind
        radius={[0.5, 3.0]} // Min and max snowflake radius
      />
    </div>
  );
};

export default SnowfallBackground;
