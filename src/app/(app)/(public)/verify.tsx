import { emailAtom } from '@/store/login';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Page = () => {
  const { isLogin } = useLocalSearchParams<{ isLogin: string }>();
  const router = useRouter();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [countdown, setCountdown] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const email = useAtomValue(emailAtom);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
