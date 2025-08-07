import Layout from '@/components/layout'
import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, Circle } from 'react-leaflet'

function LocationMarker({ setUserLocation }) {
  const [position, setPosition] = useState(null)

  const maps = useMapEvents({
    locationfound(e) {
      const latlng = [e.latlng.lat, e.latlng.lng]
      setPosition(e.latlng)
      setUserLocation(latlng)

      maps.flyTo(latlng, maps.getZoom())
    },
    locationerror(e) {
      alert("Lokasi tidak bisa diakses: " + e.message)
    }
  })

  const map = useMapEvents({})

  // Trigger geolocation when the map loads
  React.useEffect(() => {
    map.locate()
  }, [map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default function App() {
  const [userLocation, setUserLocation] = useState(null)

  const sendLocation = () => {
    if(!userLocation) {
      alert("Lokasi Masih Kosong")
    } else {
      const center = L.latLng(-0.8886556,119.8781443)
      const userLatLng = L.latLng(userLocation)
      const distance = userLatLng.distanceTo(center)

      if (distance >= 150) {
        console.log(userLocation)
        alert("Anda Jauh Dari Lokasi Kedai!. Klik Map Untuk Refresh Lokasi")
      } else {
        alert("Lokasi Terkirim")
      }
    }
  }

  return (
    <Layout>
      <div className="text-xl">User Get Location</div>
      <button className="bg-ijo-chafi px-5 text-lg font-bold text-cream-chafi m-5 w-max" onClick={sendLocation}>Get my Location</button>

      <div className="">{userLocation && (
        <div className="bg-merah-chafi">
          <p>latitude : {userLocation[0]}</p>
          <p>longitude : {userLocation[1]}</p>
        </div>
      )}</div>

      <div id="map">
      <MapContainer center={[-0.8886556,119.8781443]} zoom={25} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle center={[-0.8886556,119.8781443]} radius={75} />

        <LocationMarker setUserLocation={setUserLocation} />

        {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                Your Location <br /> Latitude: {userLocation[0]} <br /> Longitude: {userLocation[1]}
              </Popup>
            </Marker>
          )}
      </MapContainer>
      </div>
    </Layout>
  )
}
