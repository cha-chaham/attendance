import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, useMapEvent, Circle } from 'react-leaflet'

export default function Card(props) {
    const {tanggal, nearLocation, userLocation, id} = props
  return (
    <div className="" onClick={()=>document.getElementById(`my_modal_${id}`).showModal()}>
        <div className={`p-5 ${nearLocation ? "bg-persian-green-600-main" : "bg-mona-lisa-400-main"} rounded-lg font-bold text-xl mb-3`}>{tanggal}</div>
         <dialog id={`my_modal_${id}`} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-5">{tanggal}</h3>
                <MapContainer center={userLocation} zoom={25} scrollWheelZoom={false}>
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
                            </>
                          )}
                      </MapContainer>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
    </div>


  )
}
