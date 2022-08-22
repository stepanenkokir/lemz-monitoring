import React, {useState} from 'react'
import { Marker,Tooltip,GeoJSON, Rectangle } from 'react-leaflet'
import L from 'leaflet'
import { FeatureGroup } from 'react-leaflet';
import Control from 'react-leaflet-custom-control'
import {HSVtoRgbH} from '../Intermediate'
import zoneSkolkovo from '../zones/skolkovo.json'
import positions from '../zones/PositionsS.json'
import zoneMPSN from '../zones/zonaMLAT_S.json'

const calcRadius = (crd,rad,num=10)=>{
    const coeff=0.01*rad;
    let str="";
    for (let i=0;i<360/num;i++)
    {
        const alf = Math.PI*num*i/180;
        const lon=crd.lon+coeff*Math.cos(alf);
        const lat=crd.lat+coeff*Math.sin(alf);
        str+="["+lon+","+lat+"],\n";
    }

    console.log(str)
}

const loadJSON = (file,color='black')=>{
    const [borderData, setBorderData] = useState([file]);  
    const allGSN=borderData.map((data,id) => {
        const geojson = data.features[0].geometry;        
        return (                        
            <GeoJSON key={'ulr'} data={geojson} pathOptions={{color:color}} />
        )
    })
    return allGSN;
}


const loadGeoJSON = (file,color='black')=>{
    const [borderData, setBorderData] = useState([file]);  
    const allGSN=borderData.map((data,id) => {

        const gjs = [data.features].map((geom,id) =>{            
            return (                        
                <GeoJSON key={"gs"+id} data={geom} pathOptions={{color:color}} />
            )
        })
        return gjs        
    })
    return allGSN;
}

export const ZoneSkolkovo = ()=>loadGeoJSON(zoneSkolkovo,'red');

const colorIicon = (color)=>{     
    const style=
        `background-color: hsl(${color},100%,40%);
        width:0.8rem;
        height:0.8rem;
        display:block;
        left:-0.4rem;
        top:-0.4rem;
        opacity:0.7;
        position:relative;
        border-radius: 1rem 1.2rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF;`        

    return L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 0],
  labelAnchor: [0, 0],
  popupAnchor: [0,0],
  html: `<span style="${style}" />`
})}

export const Positions = () =>{        
    const pos_raw=[positions][0].positions       
    let myArr=[];
    for (let i=0;i<pos_raw.length;i++){
        myArr.push(
            <Marker 
                key={pos_raw[i].n+i} 
                position={L.latLng([
                    pos_raw[i].lat,
                    pos_raw[i].lon
                ])}
                icon={colorIicon(260)}> 
                <Tooltip direction="top"  >
                    {pos_raw[i].n}
                </Tooltip>
            </Marker>  
        )
    }        
    return (        
        <>         
            <FeatureGroup>
                {myArr}      
            </FeatureGroup>         
        </>
    )
}

export const  MyLegend = ()=>{    
    return (
        <>
            <Control position='bottomleft'>
              <div id='legend' className='legend hide'></div>
            </Control>
        </>
    )
}


export const ZoneMPSN = () =>{        
    const pos_raw=[zoneMPSN][0]  
    let myArr=[];
    for (let i=0;i<pos_raw.length;i++){           
       if (pos_raw[i].err<150){
          
            const clr = HSVtoRgbH(pos_raw[i].err,150)           
            myArr.push(       
                <Rectangle key={i} bounds={[
                L.latLng([pos_raw[i].lat-0.00089, pos_raw[i].lon-0.00099]),
                L.latLng([pos_raw[i].lat+0.00190, pos_raw[i].lon+0.004])]}
                pathOptions={{color:clr, opacity:0.5}}>
                <Tooltip direction="top"  >
                    {pos_raw[i].err}
                </Tooltip>
                </Rectangle>        
         )
        }
    }        

    return (        
        <>             
            <FeatureGroup>
                <MyLegend/>
                {myArr}      
            </FeatureGroup>         
        </>
    )
}


