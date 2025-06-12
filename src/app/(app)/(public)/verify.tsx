import { emailAtom } from '@/store/login';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const { signUp, setActive } = useSignUp();
  const { signIn, setActive: setSignInActive } = useSignIn();

  const email = useAtomValue(emailAtom);

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setCountdown(60);
    setIsTimerRunning(true);

    try {
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const result = await signUp!.attemptEmailAddressVerification({
        code: code.join(''),
      });
      await setActive!({ session: result.createdSessionId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'email_code',
        code: code.join(''),
      });

      await setSignInActive!({ session: result.createdSessionId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const isCodeComplete = code.every((code) => code !== '');

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isCodeComplete) {
      Keyboard.dismiss();
    }
  }, [isCodeComplete]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [countdown, isTimerRunning]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1'
    >
      <View className='flex-1 px-6 bg-black pt-safe'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='justify-center w-10 h-10 bg-gray-800 rounded-xl'
        >
          <MaterialCommunityIcon name='chevron-left' size={32} color={'#fff'} />
        </TouchableOpacity>

        <Text className='mt-20 text-xl text-white font-Poppins_600SemiBold'>
          Enter code
        </Text>
        <Text className='mt-2 text-gray-400 font-Poppins_400Regular'>
          Check your email and enter the code sent to {'\n'}
          <Text className='text-white'>{email}</Text>
        </Text>

        {/* Code Input */}
        <View className='flex-row justify-between mt-8'>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className={`w-[52px] h-[52px] text-xl text-center text-white bg-gray-800 rounded-lg font-Poppins_600SemiBold ${!code[index] && index === code.findIndex((c) => !c) ? 'border-2 border-primary' : ''}`}
              maxLength={1}
              keyboardType='number-pad'
              value={code[index]}
              caretHidden
              onChangeText={(text) => {
                handleCodeChangeText(text, index);
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  const newCode = [...code];
                  newCode[index] = '';
                  setCode(newCode);
                  if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }
              }}
            />
          ))}
        </View>

        {/* Resend Code */}
        <TouchableOpacity onPress={handleResendCode} className='mt-8'>
          <Text
            className={`font-Poppins_500Medium ${countdown > 0 ? 'text-gray-400' : 'text-primary'}`}
          >
            Resend code {countdown > 0 && `(${countdown}s)`}
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          disabled={!isCodeComplete}
          onPress={isLogin ? handleSignIn : handleCreateAccount}
          className={`py-4 mt-auto mb-8 rounded-lg ${isCodeComplete ? 'bg-primary' : 'bg-gray-800'}`}
        >
          <Text
            className={`text-center text-lg font-Poppins_600SemiBold ${isCodeComplete ? 'text-white' : 'text-gray-400'}`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
