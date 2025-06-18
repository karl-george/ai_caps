import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const passkeys = user?.passkeys ?? [];

  const createClerkPasskey = async () => {
    if (!user) return;

    try {
      await user.createPasskey();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className='items-center justify-center flex-1 bg-dark'>
      <Button title='Create Passkey' onPress={createClerkPasskey} />
      <Button title='Logout' onPress={() => signOut()} />

      <View className='gap-4 mt-8'>
        <Text className='text-2xl text-white font-Poppins_600SemiBold'>
          Passkeys
        </Text>
        {passkeys?.length === 0 && (
          <Text className='text-base text-gray-400'>No passkeys found</Text>
        )}
        {passkeys.map((passkey) => (
          <View key={passkey.id} className='p-4 bg-gray-800 rounded-lg'>
            <Text className='text-white'>
              ID: <Text className='text-gray-400'>{passkey.id}</Text>
            </Text>
            <Text className='text-white'>
              Name: <Text className='text-gray-400'>{passkey.name}</Text>
            </Text>
            <Text className='text-white'>
              Created:{' '}
              <Text className='text-gray-400'>
                {passkey.createdAt.toDateString()}
              </Text>
            </Text>
            <Text className='text-white'>
              Last Used:{' '}
              <Text className='text-gray-400'>
                {passkey.lastUsedAt?.toDateString()}
              </Text>
            </Text>
            <TouchableOpacity onPress={() => passkey.delete()} className='mt-2'>
              <Text className='text-red-500'>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Profile;
