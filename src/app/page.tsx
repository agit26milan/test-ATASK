"use client"
import React from 'react'
import HomePage from "../screens/home";
import { LOADING_EVENT } from '@/constant';
import LoadingComponent from '@/components/loading/loading';
import { Suspense } from "react";

export default function Home() {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
        const handleCustomEvent = (event: CustomEvent) => {
          setIsLoading(event.detail.isLoading)
        };
        document.addEventListener(LOADING_EVENT, handleCustomEvent as EventListener);
        return () => {
          document.removeEventListener(LOADING_EVENT, handleCustomEvent as EventListener);
        };
  }, []);
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingComponent />} >
      {isLoading && <LoadingComponent />}
      <HomePage />
      </Suspense>

    </React.Fragment>
  );
}
