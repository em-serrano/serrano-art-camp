import React from 'react';

export function SectionHeader({ icon, title, description }) {
  return (
    <div className="section-header">
      <h1>
        <span className="header-icon">{icon}</span>
        {title}
      </h1>
      <p className="section-description">{description}</p>
    </div>
  );
}