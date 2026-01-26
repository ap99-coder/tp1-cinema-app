import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
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
        name="movies/index" 
        options={{ title: 'Now Showing' }} 
      />
      <Stack.Screen 
        name="movies/[id]" 
        options={{ title: 'Movie Details' }} 
      />
    </Stack>
  );
}