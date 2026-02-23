// components/Brand.jsx
import React from 'react';
import Logo from '/paintbrush.svg';

export default function Brand() {
  return (
    <div className="flex items-center whitespace-nowrap">
      <img
        src={Logo}
        alt="Serrano Art Camp Logo"
        className="h-16 w-16 sm:h-20 sm:w-20 mr-4 shrink-0"
      />
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight">
        Serrano Art Camp
      </h1>
    </div>
  );
}