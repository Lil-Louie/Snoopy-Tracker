import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import snoopys from '../data/snoopys.json';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.4451,
          longitude: -122.7175,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {snoopys.map((snoopy) => (
          <Marker
            key={snoopy.id}
            coordinate={{
              latitude: snoopy.latitude,
              longitude: snoopy.longitude,
            }}
            title={snoopy.name}
            description={snoopy.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
