import React from 'react';

const Logo = ({ type = "default" }) => {
  const logoSrc = type === 'muted' ? '/images/logo-muted.svg' : '/images/logo.svg';

  return <img src={logoSrc} alt="Logo" />;
};

export default Logo;
