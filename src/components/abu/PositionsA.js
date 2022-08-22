import React, {useState} from 'react'
import { Marker,Tooltip,GeoJSON, Circle, Rectangle } from 'react-leaflet'
import L from 'leaflet'
import { FeatureGroup} from 'react-leaflet';
import Control from 'react-leaflet-custom-control'
import {HSVtoRgbH} from '../Intermediate'
import zoneRLS1 from '../zones/rls1A.json'
import zoneRLS2 from '../zones/rls2A.json'
import zoneRLS3 from '../zones/rls3A.json'
import positions from '../zones/PositionsA.json'
import zoneMPSN from '../zones/zonaMLAT_A.json'


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

const loadRLSJSON = (file,color='black')=>{
    const [borderData, setBorderData] = useState([file]);  
    const name = borderData[0].metadata.name?borderData[0].metadata.name:"RLS"
    const allGSN=borderData.map((data,id) => {

        const geojson0 = data.features[0].geometry;                
         const geojson1 = data.features[1].geometry;  
         const geojson2 = data.features[2].geometry; 
        
         return ( 
             <FeatureGroup key={"fg_ulp"+id}>
                <GeoJSON key={'key_ulp0'+id} data={geojson0} pathOptions={{color:color, opacity:0.5}} />               
                <GeoJSON key={'key_ulp1'+id} data={geojson1} pathOptions={{color:color, opacity:0.5}} />                   
                <Circle center={geojson2.coordinates} radius={100} /> 
                <Tooltip direction="top"  >
                    {name}
                </Tooltip>              
             </FeatureGroup> 
         )         
    })
    return allGSN;
}

export const RLS1 = ()=>loadRLSJSON(zoneRLS1,'yellow');
export const RLS2 = ()=>loadRLSJSON(zoneRLS2,'yellow');
export const RLS3 = ()=>loadRLSJSON(zoneRLS3,'yellow');

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
    //1 24.46194322158599, 54.30564097562384
    //2 24.44496131133471, 54.64945902606433
    //3 24.509359544111838, 54.39354676107512
   
   // calcRadius({lat:24.509359544111838, lon:54.39354676107512}, 15, 20);

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
    /*
    legend.onAdd = function (map) 
    {
        lDiv= L.DomUtil.create('div', 'info legend');

        lDiv.innerHTML ='<b>Легенда</b>';            
     return lDiv;
    };
*/
}


export const ZoneMPSN = () =>{        
    const pos_raw=[zoneMPSN][0]  
    
   
    let myArr=[];
    for (let i=0;i<pos_raw.length;i++){           
       if (pos_raw[i].err<150){
          
            const clr = HSVtoRgbH(pos_raw[i].err,150)           
            myArr.push(       
                <Rectangle key={i} bounds={[
                L.latLng([pos_raw[i].lat-0.0089, pos_raw[i].lon-0.0099]),
                L.latLng([pos_raw[i].lat+0.0090, pos_raw[i].lon+0.0098])]}
                pathOptions={{color:clr, opacity:0.35}}
            />        
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


