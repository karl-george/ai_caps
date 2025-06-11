import { emailAtom } from '@/store/login';
import { useSignIn, useSignUp, useSSO } from '@clerk/clerk-expo';
import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
  const [loading, setLoading] = useState(false);
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
          <Image
            source={require('@/assets/images/convex.png')}
            className='w-40 h-40'
          />
          <Text className='text-center text-gray-400 font-Poppins_400Regular text-md'>
            AI-Powered Captions Editor
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Page;
