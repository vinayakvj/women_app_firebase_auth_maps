import React from "react";
import { StyleSheet, View, Platform, SafeAreaView } from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import PubNubReact from "pubnub-react";

const LATITUDE = 9.4927;
const LONGITUDE = 76.7084;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.pubnub = new PubNubReact({
      publishKey: "pub-c-b2f6c7f7-69d6-45ca-aa3b-f4baa8c3a987",
      subscribeKey: "sub-c-90ba6a68-c5f2-11eb-9292-4e51a9db8267",
    });

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      errorMsg: "",
      coordinate: new AnimatedRegion({
        latitude: 9.4927,
        longitude: 76.7084,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };

    this.pubnub.init(this);
  }

  // code to receive messages sent in a channel
  async componentDidMount() {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      {
        Location.hasServicesEnabledAsync
          ? this.watchLocation()
          : this.setState({
              errorMsg: "Permission to access location was denied",
            });
      }
    })();
  }

  componentDidUpdate(prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        channel: "location",
      });
    }
  }

  async watchLocation() {
    this.watchID = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        distanceInterval: 10,
      },
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Position is" + position.coords.latitude);

        this.setState({
          latitude,
          longitude,
        });
        console.log(position);
      }
    );
  }

  componentWillUnmount() {
    this.watchID.remove();
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      //<SafeAreaView style={{ flex: 1 }}>
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          //ref={c => (this.map = c)}
          region={this.getMapRegion()}
        >
          <Marker.Animated coordinate={this.state} />
        </MapView>
      </View>
      //</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 250,
    borderWidth: 170,
  },
});

export default Map;

//this.state.latitude ? : null
