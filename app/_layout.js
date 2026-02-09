import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
        headerTintColor: theme.headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'Cinema Home' }} 
      />
      <Stack.Screen 
        name="form" 
        options={{ title: 'Book Tickets' }} 
      />
      <Stack.Screen 
        name="api-movies/index" 
        options={{ title: 'Popular Movies' }} 
      />
      <Stack.Screen 
        name="api-movies/[id]" 
        options={{ title: 'Movie Info' }} 
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}