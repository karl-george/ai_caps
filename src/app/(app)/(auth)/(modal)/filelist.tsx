import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatDuration } from '@/utils/formatDuration';
import { useMutation } from 'convex/react';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function FileList() {
  const [videos, setVideos] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
  const createProject = useMutation(api.projects.createProject);

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
        console.error('Error loading videos:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const selectVideo = async (video: MediaLibrary.Asset) => {
    try {
      setIsUploading(true);

      // Get the upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Get the video file
      const fileInfo = await MediaLibrary.getAssetInfoAsync(video.id);

      const videoUri = fileInfo.uri;

      if (!videoUri) {
        throw new Error('Video URI not found');
      }

      // Convert URI to blob
      const videoResponse = await fetch(videoUri);
      const blob = await videoResponse.blob();

      // Upload the video file
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': blob!.type },
        body: blob,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const { storageId } = await response.json();

      if (!storageId) {
        throw new Error('No storage ID returned from upload');
      }

      // Create the project with the uploaded video
      const projectId = await createProject({
        name: video.filename || 'Untitled Video',
        videoSize: blob.size,
        videoFileId: storageId as Id<'_storage'>,
      });

      // Navigate to the project page
      router.push(`/project/${projectId}`);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View className='flex-1 bg-[#1c1c1e]'>
      <ScrollView className='flex-1'>
        <View className='flex-row flex-wrap p-1'>
          {videos.map((video) => (
            <Pressable
              key={video.id}
              className='w-1/3 aspect-square p-0.5 relative'
              onPress={() => selectVideo(video)}
              disabled={isUploading}
            >
              <Image
                source={{ uri: video.uri }}
                className='flex-1 rounded-lg bg-[#2c2c2e]'
                resizeMode='cover'
              />
              <View className='absolute right-2 bottom-2 p-1 rounded bg-black/60'>
                <Text className='text-xs text-white'>
                  {formatDuration(video.duration)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {/* Loading Overlay */}
      {(isUploading || isLoading) && (
        <View className='absolute inset-0 z-50 justify-center items-center bg-black/70'>
          <ActivityIndicator size='large' color='#ffffff' />
          <Text className='mt-3 text-base text-white'>Loading...</Text>
        </View>
      )}
    </View>
  );
}
