import FAQ from '@/components/FAQ';
import { View } from 'react-native';

const Page = () => {
  return (
    <View className='flex-1'>
      <FAQ
        dom={{
          scrollEnabled: false,
          style: {
            backgroundColor: 'black',
          },
        }}
      />
    </View>
  );
};

export default Page;
