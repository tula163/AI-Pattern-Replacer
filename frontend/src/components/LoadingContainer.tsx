// src/components/LoadingContainer.tsx
import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  loading = false,
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`relative ${className}`} {...rest}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-10 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default LoadingContainer;
