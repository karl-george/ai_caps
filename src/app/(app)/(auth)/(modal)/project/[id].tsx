import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className='flex-1 p-4 bg-dark'>
      <Text>Project: {id}</Text>
    </View>
  );
};

export default Page;
