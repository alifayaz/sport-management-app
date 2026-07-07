import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  latitude?: number;
  longitude?: number;
  editable?: boolean;
  showCurrentLocationButton?: boolean;
  onLocationChange?: (lat: number, lng: number) => void;
};

export default function LeafletMap({
  latitude,
  longitude,
  editable = true,
  showCurrentLocationButton = true,
  onLocationChange,
}: Props) {
  const webRef = useRef<WebView>(null);
  const [radius, setRadius] = useState(1000);

  const updateCurrentLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) return;

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const lat = loc.coords.latitude;
    const lng = loc.coords.longitude;

    onLocationChange?.(lat, lng);

    webRef.current?.postMessage(
      JSON.stringify({
        type: 'setLocation',
        latitude: lat,
        longitude: lng,
      }),
    );
  };

  useEffect(() => {
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== 0 &&
      longitude !== 0
    ) {
      webRef.current?.postMessage(
        JSON.stringify({
          type: 'setLocation',
          latitude,
          longitude,
        }),
      );
    } else {
      updateCurrentLocation();
    }
  }, []);

  useEffect(() => {
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== 0 &&
      longitude !== 0
    ) {
      webRef.current?.postMessage(
        JSON.stringify({
          type: 'setLocation',
          latitude,
          longitude,
        }),
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    webRef.current?.postMessage(
      JSON.stringify({
        type: 'setRadius',
        radius,
      }),
    );
  }, [radius]);

  const html = useMemo(
    () => `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8"/>

<meta
name="viewport"
content="width=device-width, initial-scale=1"/>

<link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<style>

html,
body,
#map{
margin:0;
padding:0;
height:100%;
width:100%;
}

</style>

</head>

<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>

const editable = ${editable};

const map = L.map("map",{
    zoomControl: editable
}).setView([35.6892,51.389],5);

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
maxZoom:19
}
).addTo(map);

const marker = L.marker(
[35.6892,51.389],
{
draggable:editable
}
).addTo(map);

let radius = 1000;

const circle = L.circle([35.6892, 51.389], {
    radius,
    color: "#208AEF",
    weight: 2,
    fillColor: "#208AEF",
    fillOpacity: 0.15,
}).addTo(map);

function send(lat,lng){

window.ReactNativeWebView.postMessage(
JSON.stringify({
latitude:lat,
longitude:lng
})
);

}

function update(lat,lng){

marker.setLatLng([lat,lng]);

circle.setLatLng([lat,lng]);

circle.setRadius(radius);

map.flyToBounds(circle.getBounds(), {
    padding: [20,20],
    duration: 0.5
});

if(editable){
send(lat,lng);
}

}

if(editable){

marker.on("dragend",function(e){

const p=e.target.getLatLng();
circle.setLatLng(p);

send(
p.lat,
p.lng
);

});

map.on("click",function(e){

marker.setLatLng(e.latlng);

circle.setLatLng(e.latlng);

send(
e.latlng.lat,
e.latlng.lng
);

});

}else{

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();

}

function receive(event){

const data = JSON.parse(event.data);

if(data.type==="setLocation"){

update(
data.latitude,
data.longitude
);

}

  if(data.type === "setRadius"){
        radius = data.radius;
        circle.setRadius(radius);
         map.fitBounds(circle.getBounds(), {
        padding: [20,20],
        animate: true
    });
    }

}

document.addEventListener("message",receive);

window.addEventListener("message",receive);

</script>

</body>

</html>
`,
    [editable],
  );

  if (Platform.OS === 'web') {
    return (
      <View
        style={{
          height: 220,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Map is available only on Android and iOS.</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <WebView
        ref={webRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);

          onLocationChange?.(data.latitude, data.longitude);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 30,
          padding: 3,
          alignSelf: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <Pressable
          onPress={() => setRadius((r) => Math.max(1000, r - 1000))}
          style={{
            width: 35,
            height: 35,
            borderRadius: 21,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
          }}
        >
          <MaterialIcons
            name="remove-circle-outline"
            size={24}
            color="#208AEF"
          />
        </Pressable>

        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#666',
            }}
          >
            شعاع
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#111',
            }}
          >
            {radius / 1000} km
          </Text>
        </View>

        <Pressable
          onPress={() => setRadius((r) => Math.min(20000, r + 1000))}
          style={{
            width: 35,
            height: 35,
            borderRadius: 21,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#208AEF',
          }}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      {showCurrentLocationButton && (
        <Pressable
          onPress={updateCurrentLocation}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
          }}
        >
          <MaterialIcons name="my-location" size={26} color="#208AEF" />
        </Pressable>
      )}
    </View>
  );
}
