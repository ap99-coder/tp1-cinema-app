import { SafeAreaView, StyleSheet, useWindowDimensions, Platform, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Screen({ children, style }) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web' && width > 768;
  const maxWidth = isWeb ? 800 : '100%';

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }, style]}>
      {Platform.OS === 'web' ? (
        <div style={{ width: '100%', maxWidth, margin: '0 auto', flex: 1 }}>
          {children}
        </div>
      ) : (
        <View style={{ flex: 1 }}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
