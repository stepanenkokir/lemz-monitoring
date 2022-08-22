import React, { useState} from 'react'
import { Marker,Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { FeatureGroup } from 'react-leaflet';
import aeroports from '../zones/aeroports.json'
import marines from '../zones/marines.json'

const svgMarkerAero = () =>{       
    return L.divIcon({
        html: `
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 395 395" style="enable-background:new 0 0 395 395;" xml:space="preserve">
   <g>
       <g>
           <path d="M313.002,395H82c-45.215,0-82-36.789-82-82.009V81.998C0,36.784,36.785,0,82,0h231.002C358.216,0,395,36.784,395,81.998
               v230.993C395,358.211,358.216,395,313.002,395z M82,15c-36.944,0-67,30.055-67,66.998v230.993C15,349.94,45.056,380,82,380
               h231.002C349.944,380,380,349.94,380,312.991V81.998C380,45.055,349.944,15,313.002,15H82z"/>
       </g>
       <g>
           <path d="M334.63,61.532c-10.354-10.354-27.141-10.354-37.494,0l-65.926,65.926L121.19,98.275
               c-2.048-0.542-4.229,0.045-5.726,1.542l-26.498,26.501c-1.408,1.408-2.018,3.428-1.622,5.38c0.395,1.952,1.741,3.576,3.586,4.327
               l93.632,38.08l-57.235,57.236l-51.311-18.175c-1.192-0.424-2.52-0.122-3.412,0.772l-19.039,19.04
               c-0.75,0.749-1.091,1.816-0.915,2.861c0.176,1.045,0.847,1.941,1.801,2.405l51.7,25.101c-0.04,6.837,2.545,13.688,7.762,18.904
               c5.177,5.177,11.962,7.766,18.747,7.766c0.053,0,0.105-0.003,0.158-0.004l25.102,51.699c0.463,0.954,1.358,1.625,2.404,1.801
               c0.182,0.03,0.363,0.045,0.544,0.045c0.862,0,1.698-0.34,2.317-0.96l19.037-19.038c0.893-0.893,1.194-2.221,0.772-3.412
               l-18.175-51.31l57.237-57.238l38.081,93.635c0.751,1.845,2.375,3.191,4.327,3.586c0.392,0.079,0.786,0.118,1.178,0.118
               c1.561,0,3.077-0.615,4.202-1.741l26.499-26.501c1.497-1.497,2.085-3.678,1.542-5.725l-29.182-110.019l65.925-65.925
               C344.983,88.672,344.983,71.885,334.63,61.532z"/>
       </g>
   </g>
   </svg>`,
        className: "",
        iconSize: [15, 15],
        iconAnchor: [0, 0],
        labelAnchor: [0, 0],
        popupAnchor: [0,0],
      })    
}


const svgMarkerMarine = () =>{       
    return L.divIcon({
        html: `
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 602.194 602.194" style="enable-background:new 0 0 602.194 602.194;" xml:space="preserve">

			<path style="fill:#010002;" d="M301.087,42.901c80.946,0,146.816,65.851,146.816,146.797s-65.87,146.777-146.816,146.777
				c-80.926,0-146.777-65.841-146.777-146.777C154.31,108.752,220.151,42.901,301.087,42.901 M301.087,0
				C196.312,0,111.39,84.932,111.39,189.707c0,104.765,189.698,412.487,189.698,412.487s189.717-307.721,189.717-412.487
				C490.804,84.922,405.892,0,301.087,0z M403.889,197.944l-9.409,64.122l-19.081-18.524c-13.229,10.884-25.1,38.612-76.618,39.911
				c-40.976,0-58.054-25.178-73.12-37.351l-17.43,16.883l-9.907-63.535l65.47,9.643l-18.046,17.498c0,0,15.476,25.744,42.207,27.542
				l-0.107-104.638c-14.44-5.022-24.846-18.319-24.846-34.059c0-20.068,16.746-36.325,37.43-36.325
				c20.664,0,37.439,16.258,37.439,36.325c0,15.984-10.747,29.428-25.5,34.244c0.078,20.439,0.42,104.844-0.039,104.844
				c22.129-0.616,42.852-30.571,42.852-30.571l-16.893-16.385C338.302,207.557,403.889,197.944,403.889,197.944z M319.758,114.868
				c0-10.327-8.666-18.71-19.325-18.71c-10.64,0-19.277,8.383-19.277,18.71c0,10.347,8.637,18.749,19.277,18.749
				C311.102,133.607,319.758,125.214,319.758,114.868z"/>		
</svg>`,
        className: "",
        iconSize: [25, 25],
    
        labelAnchor: [0, 0],
        popupAnchor: [0,0],
      })    
}


export const Aeroports = ()=>{
    
    const [borderData, setBorderData] = useState([aeroports]);  
    const allGSN=borderData.map((data) => {                
        const gjs = data.features.map((geom,id) =>{                        
            return (                        
                <Marker key={"aeroIcons"+id}
                    position={L.latLng(geom.geometry.coordinates)}
                    icon={svgMarkerAero()}> 
                    <Tooltip direction="top"  >
                        {geom.properties.name}
                    </Tooltip>
                </Marker> 
            )
        })
        return gjs        
    })
    return (
        <>         
            <FeatureGroup>
                {allGSN} 
            </FeatureGroup>         
        </>)     
}


export const Marines = ()=>{
    
    const [borderData, setBorderData] = useState([marines]);  
    const allGSN=borderData.map((data) => {                
        const gjs = data.features.map((geom,id) =>{                        
            return (                        
                <Marker key={"aeroIcons"+id}
                    position={L.latLng(geom.geometry.coordinates)}
                    icon={svgMarkerMarine()}> 
                    <Tooltip direction="top"  >
                        {geom.properties.name}
                    </Tooltip>
                </Marker> 
            )
        })
        return gjs        
    })
    return (
        <>         
            <FeatureGroup>
                {allGSN} 
            </FeatureGroup>         
        </>)     
}
