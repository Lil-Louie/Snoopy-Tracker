import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (err) {
      console.log('❌ Login failed', err);
      Alert.alert('Login Failed', 'Check your email and password.');
    }
  };

  const handleSignUp = async () => {
    try {
      console.log('🆕 Creating account for:', email);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Sign up successful!');
      router.replace('/(tabs)');
    } catch (err) {
      console.error('❌ Sign up error:', err.code, err.message);
      Alert.alert('Sign Up Failed', err.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snoopy Tracker 🐾</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.signupText}>Don’t have an account?</Text>
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 6
  },
  signupText: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666'
  }
});
