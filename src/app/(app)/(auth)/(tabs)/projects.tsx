import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from 'convex/react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { api } from '~/convex/_generated/api';

const Projects = () => {
  const projects = useQuery(api.projects.listProjects);

  if (projects === undefined) {
    return (
      <View className='flex-1 justify-center items-center bg-dark'>
        <Text className='text-lg text-white font-Poppins_500Medium'>
          Loading Projects...
        </Text>
      </View>
    );
  }

  if (!projects.length) {
    return (
      <View className='flex-1 justify-center items-center p-4 bg-dark'>
        <View className='items-center'>
          <Ionicons name='film-outline' size={48} color='#6c6c6c' />
          <Text className='mt-4 text-xl text-center text-white font-Poppins_600SemiBold'>
            No project yet
          </Text>
          <Text className='mt-2 text-base text-center text-gray-400 font-Poppins_400Regular'>
            Hit the button below to add your first projects and see some magic
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className='flex-1 pt-2 bg-dark'>
      <FlatList
        className='px-4'
        data={projects}
        contentContainerClassName='gap-4'
        renderItem={({ item: project }) => (
          <Link href={`/project/${project._id}`} asChild>
            <TouchableOpacity className='bg-[#1c1c1e] rounded-2xl p-4 flex-row items-center'>
              <View className='flex-1'>
                <Text className='text-lg text-white font-Poppins_600SemiBold'>
                  {project.name}
                </Text>
                <Text className='mt-1 text-sm text-gray-400 font-Poppins_400Regular'>
                  Last update {formatDistanceToNow(project.lastUpdate)} ago •{' '}
                  {(project.videoSize / 1024 / 1024).toFixed(1)} MB
                </Text>
              </View>
              <View className='bg-[#2c2c2e] rounded-xl w-10 h-10 items-center justify-center'>
                <Ionicons name='chevron-forward' size={24} color='#fff' />
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default Projects;
