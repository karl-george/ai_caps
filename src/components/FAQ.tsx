'use dom';
import '@/global.css';
import { useRouter } from 'expo-router';
import React from 'react';

interface FAQProps {
  dom: import('expo/dom').DOMProps; // Keeping dom prop for now, might remove later if unused
}

// Hardcoded FAQ data based on the image
const faqData = [
  { icon: '📖', text: 'Help Center' },
  { icon: '🔍', text: 'Search for an answer' },
  { icon: '💳', text: 'Subscriptions & Plans' }, // Using credit card icon based on image
  { icon: '👤', text: 'AI Creator' }, // Using person silhouette icon based on image
  { icon: '✨', text: 'AI Edit' },
  { icon: '💬', text: 'Caption & Dub' },
];

export default function FAQ({ dom }: FAQProps) {
  const router = useRouter();

  const handleItemClick = (item: { icon: string; text: string }) => {
    console.log(`Clicked: ${item.text}`);
  };

  return (
    <div className='w-full font-sans bg-gradient-to-b from-black to-white'>
      <div className='p-4 pt-8 text-white'>
        <div className='flex items-center justify-end mb-4'>
          <div className='flex items-center space-x-1'>
            <button
              className='ml-2 text-2xl font-light'
              onClick={() => router.dismiss()}
            >
              X
            </button>
          </div>
        </div>
        <h1 className='text-3xl font-semibold'>Hi 👋</h1>
        <h2 className='mb-4 text-3xl font-semibold'>How can we help?</h2>
      </div>

      <div className='bg-white rounded-lg m-2.5 p-2.5 shadow-md'>
        <div className='bg-white rounded-md p-4 mb-2.5 flex justify-between items-center shadow-sm border border-gray-200'>
          <span className='text-base font-medium text-black'>Messages</span>
          <span className='text-base'>💬</span>
        </div>
        <div className='p-0 bg-white border border-gray-200 rounded-md shadow-sm'>
          {faqData.map((item, index) => (
            <div
              key={index}
              className='flex items-center p-4 border-b border-gray-200 cursor-pointer last:border-b-0'
              onClick={() => handleItemClick(item)}
              role='button'
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item);
                }
              }}
            >
              <span className='mr-2.5 text-lg'>{item.icon}</span>
              <span className='flex-grow text-base text-gray-700'>
                {item.text}
              </span>
              <span className='text-base text-gray-400'>↗</span>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-white rounded-md m-2.5 p-4 h-24 shadow-md border border-gray-200 flex flex-col items-center justify-center'>
        <span className='mb-2 text-base text-gray-700'>
          Have a feature request?
        </span>
        <button className='bg-black text-white text-sm font-semibold py-1.5 px-4 rounded-lg w-full'>
          Submit Feature Request
        </button>
      </div>
    </div>
  );
}
