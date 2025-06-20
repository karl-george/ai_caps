import { twFullConfig } from '@/utils/twconfig';
import { useAuth } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

const Layout = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();
  const guard = isSignedIn ?? false;

  return (
    <Stack>
      <Stack.Protected guard={guard}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(modal)/create'
          options={{
            presentation: 'formSheet',
            animation: 'slide_from_bottom',
            sheetAllowedDetents: [0.3],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: false,
            sheetCornerRadius: 20,
            headerShown: false,
            contentStyle: {
              backgroundColor: (twFullConfig.theme.colors as any).dark,
            },
          }}
        />
        <Stack.Screen
          name='(modal)/filelist'
          options={{
            presentation: 'fullScreenModal',
            headerLeft: () => (
              <Pressable onPress={() => router.dismissAll()}>
                <Ionicons name='close' size={24} color='#fff' />
              </Pressable>
            ),
            headerTitle: 'File List',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Poppins_600SemiBold',
            },
            headerStyle: {
              backgroundColor: (twFullConfig.theme.colors as any).dark,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
