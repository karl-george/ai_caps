import { formatDuration } from '@/utils/formatDuration';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

const Page = () => {
  const [videos, setVideos] = useState<MediaLibrary.Asset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (!permission.granted) return;

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'video',
          sortBy: ['creationTime'],
        });

        setVideos(media.assets);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSelectVideo = async (video: MediaLibrary.Asset) => {};

  return (
    <View className='flex-1 bg-dark'>
      <ScrollView className='flex-1'>
        <View className='flex-row flex-wrap p-1'>
          {videos.map((video) => (
            <Pressable
              key={video.id}
              className='w-1/3 aspect-square p-0.5 relative'
              onPress={() => onSelectVideo(video)}
            >
              <Image
                source={{ uri: video.uri }}
                className='flex-1 rounded-lg'
                resizeMode='cover'
              />
              <View className='absolute right-2 bottom-2 p-1 rounded-md bg-black/60'>
                <Text className='text-xs text-white'>
                  {formatDuration(video.duration)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
