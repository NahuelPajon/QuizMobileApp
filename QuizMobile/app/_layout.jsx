import { Stack } from 'expo-router';
import { View } from 'react-native';
import { AuthProvider, AuthContext } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Stack />
      </View>
    </AuthProvider>
    
  );
}

  