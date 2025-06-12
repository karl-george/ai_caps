import { emailAtom } from '@/store/login';
import { twFullConfig } from '@/utils/twconfig';
import { useSignIn, useSignUp, useSSO } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Checkbox } from 'expo-checkbox';
import { Link, useRouter } from 'expo-router';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Page = () => {
  const [loading, setLoading] = useState<'google' | 'apple' | 'email' | false>(
    false
  );
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [email, setEmail] = useState('test@email.com');
  const setEmailAtom = useSetAtom(emailAtom);

  const { startSSOFlow } = useSSO();
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSignInWithSSO = async (
    strategy: 'oauth_google' | 'oauth_apple'
  ) => {};

  const handleEmailOTP = async () => {};

  const signInWithEmail = async () => {};

  const handleLinkPress = (linkType: 'terms' | 'privacy') => {
    Linking.openURL(linkType === 'terms' ? 'google.com' : 'google.com');
  };

  return (
    <View className='flex-1 bg-black pt-safe'>
      <View className='flex-1 p-6'>
        <View className='flex-row justify-end'>
          <Link href='/faq' asChild>
            <TouchableOpacity className='p-2 bg-gray-700 rounded-xl'>
              <Feather name='help-circle' size={28} color='white' />
            </TouchableOpacity>
          </Link>
        </View>

        <View className='items-center py-8'>
          <View className='flex-row'>
            <Image
              source={require('@/assets/images/convex.png')}
              className='w-40 h-40'
            />
          </View>
          <Text className='mt-2 text-gray-400 font-Poppins_400Regular text-md'>
            AI-Powered Captions Editor
          </Text>
        </View>

        <TextInput
          className='p-4 my-8 text-gray-300 bg-gray-800 rounded-xl'
          placeholder='Email'
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <View className='flex-row items-center'>
          <Checkbox
            className='mr-4'
            value={isTermsChecked}
            onValueChange={setIsTermsChecked}
            color={
              isTermsChecked
                ? (twFullConfig.theme.colors as any).primary
                : undefined
            }
          />
          <Text className='flex-wrap flex-1 text-gray-400 text-md font-Poppins_500Medium'>
            I agree to the{' '}
            <Text
              className='text-white underline'
              onPress={() => handleLinkPress('terms')}
            >
              Terms of Service
            </Text>{' '}
            and acknowledge Captions&apos;{' '}
            <Text
              className='text-white underline'
              onPress={() => handleLinkPress('privacy')}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={signInWithEmail}
          disabled={!email || !isTermsChecked || loading === 'email'}
          className={`w-full py-4 rounded-lg mt-10 mb-14 ${
            !email || !isTermsChecked || loading === 'email'
              ? 'bg-gray-800'
              : 'bg-primary'
          }`}
        >
          {loading === 'email' ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text className='text-lg text-center text-white font-Poppins_600SemiBold'>
              Continue
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSignInWithSSO('oauth_apple')}
          disabled={!!loading}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center bg-gray-800`}
        >
          {loading === 'apple' ? (
            <ActivityIndicator color='white' />
          ) : (
            <>
              <Ionicons name='logo-apple' size={28} color='white' />
              <Text className='ml-3 text-base text-center text-white font-Poppins_600SemiBold'>
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSignInWithSSO('oauth_google')}
          disabled={!!loading}
          className={`w-full py-4 mt-4 rounded-lg flex-row justify-center items-center bg-gray-800`}
        >
          {loading === 'google' ? (
            <ActivityIndicator color='white' />
          ) : (
            <>
              <Image
                source={require('@/assets/images/google.webp')}
                className='w-6 h-6'
              />
              <Text className='ml-3 text-base text-center text-white font-Poppins_600SemiBold'>
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
