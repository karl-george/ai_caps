import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface VideoControlsProps {
  isGenerating: boolean;
  projectStatus: string;
  onGenerateCaptions: () => void;
  onShowCaptionControls: () => void;
  onShowScriptModal: () => void;
}

const VideoControls = ({
  isGenerating,
  projectStatus,
  onGenerateCaptions,
  onShowCaptionControls,
  onShowScriptModal,
}: VideoControlsProps) => {
  return (
    <View className='absolute right-0 bottom-0 left-0 p-6 bg-[#1a1a1a]'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row'
        contentContainerClassName='px-4 gap-8'
      >
        <TouchableOpacity
          className='items-center'
          onPress={onGenerateCaptions}
          disabled={isGenerating || projectStatus === 'processing'}
        >
          <MaterialIcons
            name='auto-awesome'
            size={28}
            color={
              isGenerating || projectStatus === 'processing'
                ? '#9CA3AF'
                : '#fff'
            }
          />
          <Text
            className={`mt-1 text-sm font-Poppins_400Regular ${
              isGenerating || projectStatus === 'processing'
                ? 'text-[#9CA3AF]'
                : 'text-[#fff]'
            }`}
          >
            Generate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={onShowCaptionControls}
          disabled={isGenerating || projectStatus === 'processing'}
        >
          <MaterialIcons
            name='closed-caption'
            size={28}
            color={
              isGenerating || projectStatus === 'processing'
                ? '#9CA3AF'
                : '#fff'
            }
          />
          <Text
            className={`mt-1 text-sm font-Poppins_400Regular ${
              isGenerating || projectStatus === 'processing'
                ? 'text-[#9CA3AF]'
                : 'text-[#fff]'
            }`}
          >
            Captions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center' onPress={onShowScriptModal}>
          <MaterialIcons name='description' size={28} color='#fff' />
          <Text className='mt-1 text-sm text-white font-Poppins_400Regular'>
            Script
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center'>
          <MaterialIcons name='style' size={28} color='#fff' />
          <Text className='mt-1 text-sm text-white font-Poppins_400Regular'>
            Style
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center'>
          <MaterialIcons name='aspect-ratio' size={28} color='#fff' />
          <Text className='mt-1 text-sm text-white font-Poppins_400Regular'>
            Scale
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center'>
          <MaterialIcons name='zoom-in' size={28} color='#fff' />
          <Text className='mt-1 text-sm text-white font-Poppins_400Regular'>
            Zoom
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center'>
          <FontAwesome name='microphone' size={28} color='#fff' />
          <Text className='mt-1 text-sm text-white font-Poppins_400Regular'>
            Ai Dub
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VideoControls;
