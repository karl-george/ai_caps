import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';
import { Text, TouchableOpacity } from 'react-native';

cssInterop(LinearGradient, {
  className: {
    target: 'style',
  },
});

const CreateButton = () => {
  const router = useRouter();

  const handleCreate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(app)/(auth)/(modal)/create');
  };

  return (
    <TouchableOpacity
      onPress={handleCreate}
      className='items-center justify-center flex-1 rounded-xl'
    >
      <LinearGradient
        colors={['#F3B01C', '#4ECDC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className='items-center justify-center px-6 py-1 rounded-xl'
      >
        <Text className='p-2 text-lg text-white font-Poppins_600SemiBold'>
          Create
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CreateButton;
