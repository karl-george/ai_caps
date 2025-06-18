import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Projects = () => {
  return (
    <View className='flex-1 bg-dark'>
      <Link href='/create' asChild>
        <Text className='text-white'>Create</Text>
      </Link>
    </View>
  );
};

export default Projects;
