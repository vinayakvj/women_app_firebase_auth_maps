import React from 'react';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import PubNubReact from 'pubnub-react';

const LATITUDE = 10.2315;
const LONGITUDE = 76.4088;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      errorMsg:"",
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };

    // Replace "X" with your PubNub Keys
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-28fb07f4-4b2e-48af-be8e-1f496fc4a2fc',
      subscribeKey: 'sub-c-189f2e2a-062e-11ec-b49f-62dfa3a98328',
    });
    this.pubnub.init(this);
  }

  // code to receive messages sent in a channel
  async componentDidMount() {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      {Location.hasServicesEnabledAsync ? this.subscribeToPubNub() :
        this.setState({errorMsg: 'Permission to access location was denied'})}
      } 
    )();
  };
  async subscribeToPubNub () {
    console.log("Everythings fine");
    this.pubnub.subscribe({
      channels: ['location'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      const { coordinate } = this.state;
      const { latitude, longitude } = msg.message;
      console.log("Latitude is" +latitude);
      const newCoordinate = { latitude, longitude };

      if (Platform.OS === 'android') {
          coordinate.timing(newCoordinate).start();
      } 

      this.setState({
        latitude,
        longitude,
      });
    });
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            ref={c => (this.mapView = c)}
            region={this.state.latitude ? this.getMapRegion() : null}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 250,
    borderWidth: 170
  },
});

export default Tracker;