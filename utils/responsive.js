import { useWindowDimensions } from 'react-native';

export function useBp() {
  const { width } = useWindowDimensions();
  if (width < 480) return 'SM';
  if (width < 900) return 'MD';
  return 'LG';
}

export function sizes(bp) {
  if (bp === 'SM') return { title: 20, text: 14, pad: 12, gap: 12 };
  if (bp === 'MD') return { title: 22, text: 15, pad: 14, gap: 14 };
  return { title: 26, text: 16, pad: 16, gap: 16 };
}