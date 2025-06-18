import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Slot, useSegments } from 'expo-router';

const Layout = () => {
  const segment = useSegments();
  const inAuthGroup = segment[1] === '(auth)';
  const { isSignedIn } = useAuth();

  // If user is not signed in and trying to access an authed page redirect
  if (!isSignedIn && inAuthGroup) {
    return <Redirect href='/login' />;
  }

  // If user is signed in but not in the auth group redirect to auth group
  if (isSignedIn && !inAuthGroup) {
    return <Redirect href='/projects' />;
  }

  return <Slot />;
};

export default Layout;
