import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  const { isSignedIn } = useAuth();
  const guard = isSignedIn ?? false;

  return (
    <Stack>
      <Stack.Protected guard={guard}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(modal)/create'
          options={{ presentation: 'modal' }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
