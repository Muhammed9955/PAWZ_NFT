import './Button.css';
import { Button as BootstrapButton, Image } from 'react-bootstrap';
import { ButtonProps } from '../../Type';
import { useState } from 'react';
import Loader from 'components/Loader';

export const Button = ({
  type,
  variant,
  isLoading,
  img,
  label,
  loadingMessage,
  className,
  gradientDir,
  onClick,
  saveChanges,
}: ButtonProps) => {
  return (
    <BootstrapButton
      disabled={isLoading}
      className={`${saveChanges && 'save-changes-btn'} button click-effect ${className} ${
        gradientDir ? gradientDir + '-gradient' : ''
      }`}
      type={type}
      variant={variant}
      onClick={() => onClick && onClick()}
    >
      {isLoading && <Loader message={loadingMessage || 'Saving...'} />}
      {!isLoading && img && <Image src={img} />}
      {!isLoading && label}
    </BootstrapButton>
  );
};
