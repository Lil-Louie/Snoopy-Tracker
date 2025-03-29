import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  Alert
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { router } from 'expo-router';

const userData = {
  name: 'Lil Louie',
  profilePic: 'https://i.imgur.com/VnJ5lXO.png', // Replace with your own
  visitedCount: 7,
  friends: ['xander.eth', 'galvez.codes', 'christian.js'],
  photos: [
    'https://i.imgur.com/ZsZz2fC.jpg',
    'https://i.imgur.com/mnUjeMf.jpeg',
    'https://i.imgur.com/1tRxIcg.jpeg'
  ]
};

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.profilePic }} style={styles.avatar} />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.visited}>
        Snoopys Visited: {userData.visitedCount}
      </Text>

      <Text style={styles.subheading}>Friends</Text>
      <FlatList
        horizontal
        data={userData.friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.friendBubble}>
            <Text style={styles.friendName}>{item}</Text>
          </View>
        )}
        style={styles.friendsList}
      />

      <Text style={styles.subheading}>Photos</Text>
      <FlatList
        horizontal
        data={userData.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
        style={styles.photoGallery}
      />

      <View style={styles.logoutBtn}>
        <Button title="Log Out" onPress={handleLogout} color="#d33" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: '600', marginBottom: 5 },
  visited: { fontSize: 16, color: '#888', marginBottom: 20 },
  subheading: { fontSize: 18, fontWeight: '600', alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 },
  friendsList: { marginBottom: 20 },
  friendBubble: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 5,
    marginTop: 10
  },
  friendName: { fontSize: 14 },
  photoGallery: { paddingHorizontal: 10 },
  photo: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8
  },
  logoutBtn: {
    marginTop: 40,
    paddingHorizontal: 20,
    width: '100%'
  }
});
