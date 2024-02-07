import React from 'react';
import { AppBar } from '@/src/components/core/AppBar';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <>
      <AppBar />
      <Slot />
    </>
  );
}
