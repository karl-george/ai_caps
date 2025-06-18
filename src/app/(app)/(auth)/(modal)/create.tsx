import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const TopCreateOption = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className='items-center flex-1 p-4 bg-neutral-800 rounded-2xl'
    onPress={onPress}
  >
    <View className='mb-3'>{icon}</View>
    <Text className='text-lg text-white font-Poppins_600SemiBold'>{title}</Text>
    <Text className='text-sm text-gray-400 font-Poppins_400Regular'>
      {subtitle}
    </Text>
  </TouchableOpacity>
);

const Page = () => {
  const router = useRouter();

  const onImportVideo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(app)/(auth)/(modal)/filelist');
  };

  const onRecordVideo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(app)/(auth)/(modal)/filelist');
  };

  return (
    <View className='flex-1 px-4 pt-4 bg-dark'>
      <View className='flex-row gap-3 mb-3'>
        <TopCreateOption
          icon={<Ionicons name='download-outline' size={24} color={'#fff'} />}
          title='Caption Video'
          subtitle='Import footage'
          onPress={onImportVideo}
        />
        <TopCreateOption
          icon={<Ionicons name='videocam-outline' size={24} color={'#fff'} />}
          title='Record Video'
          subtitle='Use your camera'
          onPress={onRecordVideo}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className='w-full py-4 mb-8 bg-zinc-800 rounded-2xl'
      >
        <Text className='text-lg text-center text-gray-400 font-Poppins_600SemiBold'>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
