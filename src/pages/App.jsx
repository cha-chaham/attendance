import Layout from '@/components/layout'
import React, {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, useMapEvent, Circle } from 'react-leaflet'

// function LocationMarker({ setUserLocation }) {
//   const [position, setPosition] = useState(null)

//   const maps = useMapEvents({
//     locationfound(e) {
//       const latlng = [e.latlng.lat, e.latlng.lng]
//       setPosition(e.latlng)
//       setUserLocation(latlng)

//       maps.flyTo(latlng, maps.getZoom())
//     },
//     locationerror(e) {
//       alert("Lokasi tidak bisa diakses: " + e.message)
//     }
//   })

//   const map = useMapEvents({})

//   // Trigger geolocation when the map loads
//   React.useEffect(() => {
//     map.locate()
//   }, [map])

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }

// Perlu ini agar marker muncul di React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function FlyToUserLocation({ userLocation }) {
  const map = useMap()

  React.useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, map.getZoom())
    }
  }, [userLocation, map])

  return null
}

export default function App() {
  const [userLocation, setUserLocation] = useState(null)

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
      },
      (error) => {
        alert('Unable to retrieve your location: ' + error.message)
      }
    )
  }

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
      <div className="flex justify-center">
        <img src="/logo-chafi.png" alt="Logo" className='w-75'/>
      </div>
      <div className="text-2xl pt-5 text-center font-bold text-persian-green-600 mb-5">Sistem Absensi</div>

       <button
        className="bg-persian-green-600 px-5 py-2 text-lg font-bold text-off-yellow-50 w-full justify-center flex cursor-pointer hover:bg-persian-green-700 ease-in transition"
        onClick={getUserLocation}
      >
        Refresh Lokasi Saya
      </button>

{/*
      <div className="">{userLocation && (
        <div className="bg-merah-chafi">
          <p>latitude : {userLocation[0]}</p>
          <p>longitude : {userLocation[1]}</p>
        </div>
      )}</div> */}

       <div className="mt-5">
        {userLocation ? (
          <div className='flex flex-row gap-5 text-center justify-center '>
            <p>Latitude: {userLocation[0]}</p>
            <p>Longitude: {userLocation[1]}</p>
          </div>
        ) : (
          <p className='text-gray-400 text-center'>Menunggu Lokasi... Klik Tombol Refresh Lokasi!</p>
        )}
      </div>

      <div id="map">
      <MapContainer center={[-0.8886556,119.8781443]} zoom={25} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle center={[-0.8886556,119.8781443]} radius={75} />

        {/* <LocationMarker setUserLocation={setUserLocation} /> */}

  {userLocation && (
            <>
              <Marker position={userLocation}>
                <Popup>
                  Your Location <br /> Latitude: {userLocation[0]} <br /> Longitude: {userLocation[1]}
                </Popup>
              </Marker>
              <FlyToUserLocation userLocation={userLocation} />
            </>
          )}
      </MapContainer>

      </div>
      <button className="bg-persian-green-600 px-5 text-lg font-bold text-off-yellow-50 w-full mt-12 mb-5 py-5 cursor-pointer hover:bg-persian-green-700 ease-in transition" onClick={sendLocation}>Kirim Absensi Sekarang!</button>
    </Layout>
  )
}
