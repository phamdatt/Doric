import React from 'react';

export interface FullscreenLoadingContextInterface {
  isShowFullscreenLoading: boolean;
  setIsShowFullscreenLoading: (data: boolean) => void;
}

export const FullscreenLoadingContext =
  React.createContext<FullscreenLoadingContextInterface>({
    isShowFullscreenLoading: false,
    setIsShowFullscreenLoading: () => {},
  });
