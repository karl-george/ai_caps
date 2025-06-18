import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Projects = () => {
  return (
    <View>
      <Link href='/create' asChild>
        <Text>Create</Text>
      </Link>
    </View>
  );
};

export default Projects;
