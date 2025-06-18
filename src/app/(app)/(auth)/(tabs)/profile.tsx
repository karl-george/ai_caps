import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Profile = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button title='Logout' onPress={() => signOut} />
    </View>
  );
};

export default Profile;
