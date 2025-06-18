import '@/global.css';
import {
  ClerkLoaded,
  ClerkProvider,
  useAuth,
  useUser,
} from '@clerk/clerk-expo';
import { passkeys } from '@clerk/clerk-expo/passkeys';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Sentry.init({
  dsn: 'https://34a5b09199cdb286c6153f3f17a83f52@o4508993433305088.ingest.de.sentry.io/4509518719352912',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error('Missing publishable key');
}
LogBox.ignoreLogs([
  'Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview',
]);

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const InitialLayout = () => {
  const user = useUser();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (user && user.user) {
      Sentry.setUser({
        email: user.user.emailAddresses[0].emailAddress,
        id: user.user.id,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      __experimental_passkeys={passkeys}
    >
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <InitialLayout />
            </ThemeProvider>
          </GestureHandlerRootView>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Sentry.wrap(RootLayout);
