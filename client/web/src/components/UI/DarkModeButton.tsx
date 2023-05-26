// "use client";
import { useTheme } from 'next-themes';
import { useState, useEffect, memo } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  //if theme is "dark or light" then set it to "theme" otherwise 'system"
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      {currentTheme === 'dark' ? (
        <SunIcon
          className='h-4 w-4 sm:h-6 sm:w-6 cursor-pointer text-yellow-500'
          onClick={() => setTheme('light')}
        />
      ) : (
        <MoonIcon
          className='h-4 w-4 sm:h-6 sm:w-6 cursor-pointer text-gray-900'
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  );
};

export default memo(DarkModeButton);
