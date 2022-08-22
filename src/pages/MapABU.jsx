import React, { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import LayersA from '../components/abu/Layers'

const MapABU = () => { 
    const mapCenter = localStorage.getItem('centerA')?JSON.parse(localStorage.getItem('centerA')):[24.471945327483617, 54.39821502624685]           
    const zoom= localStorage.getItem('zoomA')?localStorage.getItem('zoomA'):9            

    useEffect(() => {
        document.title = "Абу-Даби"
     }, []);

    return  (                
        <MapContainer            
            center={mapCenter}                                  
            zoom={zoom}             
            style={{ height: '100%', width: '100%' }}           
        >                               
            <LayersA />                         
        </MapContainer>
    )
}
export default MapABU