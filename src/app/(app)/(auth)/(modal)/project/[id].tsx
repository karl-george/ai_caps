import VideoControls from '@/components/VideoControls';
import { formatTime } from '@/utils/formatDuration';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAction, useMutation, useQuery } from 'convex/react';
import { useEvent } from 'expo';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const project = useQuery(api.projects.getProject, {
    projectId: id as Id<'projects'>,
  });

  const updateProject = useMutation(api.projects.update);
  const processVideo = useAction(api.elevenlabs.processVideo);

  const fileUrl = useQuery(
    api.projects.getFileUrl,
    project?.videoFileId ? { id: project.videoFileId } : 'skip'
  );

  const player = useVideoPlayer(fileUrl || null, (player) => {
    player.loop = false;
    player.timeUpdateEventInterval = 1;
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const update = useEvent(player, 'timeUpdate');

  // useEffect(() => {
  //   if (player) {
  //     const interval = setInterval(() => {
  //       setCurrentTime(player.currentTime);
  //     }, 10);
  //     return () => clearInterval(interval);
  //   }
  // }, [player]);

  if (project === undefined) {
    return (
      <View className='flex-1 justify-center items-center bg-dark'>
        <Text className='text-lg text-white font-Poppins_500Medium'>
          Loading project...
        </Text>
      </View>
    );
  }

  const onExportVideo = async () => {};

  const handleGenerateCaptions = async () => {
    if (!project) return;

    try {
      setIsGenerating(true);

      // Update project to processing
      await updateProject({ id: project._id, status: 'processing' });

      // Call Elevenlabs API to generate captions
      const videoId = await project.videoFileId;

      const result = await processVideo({ videoId });

      // Update project with captions
      await updateProject({
        id: project._id,
        captions: result.words,
        language: result.language_code,
        status: 'ready',
      });
    } catch (error) {
      console.log(error);
      await updateProject({
        id: project._id,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View className='flex-1 p-4 bg-dark'>
      <Stack.Screen
        options={{
          title: project.name,
          headerRight: () => (
            <TouchableOpacity
              className={`p-2 px-4 rounded-xl bg-primary ${isExporting ? 'opacity-50' : ''}`}
              disabled={isExporting}
              onPress={onExportVideo}
            >
              <Text className='text-lg text-white font-Poppins_600SemiBold'>
                Edit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Video Player */}
      <View className='items-center mt-10'>
        <VideoView
          player={player}
          style={{ width: '80%', height: '80%', borderRadius: 10 }}
        />
        <View className='flex-row justify-between items-center p-3 mt-4 bg-[#1a1a1a] rounded-full w-3/4'>
          <TouchableOpacity
            className='justify-center items-center w-10 h-10'
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color='#fff'
            />
          </TouchableOpacity>
          <Text className='text-white font-Poppins_500Medium'>
            {formatTime(update?.currentTime || 0)} /{' '}
            {formatTime(player?.duration || 0)}
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </View>
      <VideoControls
        isGenerating={isGenerating}
        projectStatus={project.status}
        onGenerateCaptions={handleGenerateCaptions}
        onShowCaptionControls={() => {}}
        onShowScriptModal={() => {}}
      />

      {isExporting && (
        <View className='absolute inset-0 justify-center items-center bg-dark/50'>
          <ActivityIndicator size='large' color='#fff' />
          <Text className='mt-4 text-lg text-white font-Poppins_500Medium'>
            Exporting video...
          </Text>
        </View>
      )}

      {isGenerating && (
        <View className='absolute inset-0 justify-center items-center bg-dark/50'>
          <ActivityIndicator size='large' color='#fff' />
          <Text className='mt-4 text-lg text-white font-Poppins_500Medium'>
            Generating captions...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Page;
