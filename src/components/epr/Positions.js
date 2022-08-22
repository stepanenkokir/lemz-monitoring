import React, {useEffect, useState} from 'react'
import { Marker,Tooltip,GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import { FeatureGroup } from 'react-leaflet';
import zoneULP from '../zones/ulp10-12.json'
import zoneULR from '../zones/ulr1.json'
import zoneAG from '../zones/rangeAGSPB.json'
import zoneEPR from '../zones/rangeEPR.json'
import zoneRLS1 from '../zones/rls1.json'
import zoneRLS2 from '../zones/rls2.json'
import zoneRLS3 from '../zones/rls3.json'
import zoneRLS4 from '../zones/rls4.json'
import positions_o from '../zones/Positions_o.json'
import positions_n from '../zones/Positions_n.json'



const calcRadius = (crd,rad,num=10)=>{
    const coeff=0.01*rad;
    let str="";
    for (let i=0;i<360/num;i++)
    {
        const alf = Math.PI*num*i/180;
        const lon=crd.lon+2*coeff*Math.cos(alf);
        const lat=crd.lat+coeff*Math.sin(alf);
        str+="["+lon+","+lat+"],\n";
    }

    console.log(str)
}

// export const ZoneULP = ()=>{
//     const [borderData, setBorderData] = useState([zoneULP]);  
//     const allGSN=borderData.map((data,id) => {        
//         const geojson0 = data.features[0].geometry;                
//         const geojson1 = data.features[1].geometry;  
//         const geojson2 = data.features[2].geometry;  
//         return ( 
//             <FeatureGroup key={"fg_ulp"+id}>
//                 <GeoJSON key={'key_ulp0'+id} data={geojson0} pathOptions={{color:'red'}} />               
//                 <GeoJSON key={'key_ulp1'+id} data={geojson1} pathOptions={{color:'red'}} />               
//                 <GeoJSON key={'key_ulp2'+id} data={geojson2} pathOptions={{color:'red'}} />               
//             </FeatureGroup>                       
//         )
//     })
//     return allGSN;
// }

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
                {/*<Circle center={geojson2.coordinates} radius={100} /> */}
                <Tooltip direction="top"  >
                    {name}
                </Tooltip>              
             </FeatureGroup> 
         )         
    })
    return allGSN;
}



export const ZoneULP = ()=>loadGeoJSON(zoneULP,'red');
export const ZoneULR = ()=>loadJSON(zoneULR,'blue');
export const ZoneAG = ()=>loadJSON(zoneAG,'gray');
export const ZoneEPR = ()=>loadJSON(zoneEPR,'#666');
export const RLS1 = ()=>loadRLSJSON(zoneRLS1,'orange');
export const RLS2 = ()=>loadRLSJSON(zoneRLS2,'yellow');
export const RLS3 = ()=>loadRLSJSON(zoneRLS3,'yellow');
export const RLS4 = ()=>loadRLSJSON(zoneRLS4,'yellow');


const colorIicon = (color)=>{     
    const style=
        `background-color: ${color};
        width:0.8rem;
        height:0.8rem;
        display:block;
        left:-0.4rem;
        top:-0.4rem;
        position:relative;
        opacity:0.8;
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


const triangleIcon = (color)=>{
         
    const style=
        `position:absolute;
        border-color: transparent transparent ${color} transparent;
        border-style: solid;
        border-width: 0px 0.5rem 1rem 0.5rem;
        height: 0px;
        width: 0px;        
        left: -0.5rem;
        top: -0.5rem`

    return L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 0],
  labelAnchor: [0, 0],
  popupAnchor: [0,0],
  html: `<span style="${style}" />`
})}


export const Positions = () =>{        
    const pos_raw=[positions_o][0].positions    
    //1 59.85777088020852, 30.488789245249983
    //2 60.01492701296968, 29.707762780460286
    //3 60.09059596781296, 30.195753274699587
    //4 59.877078677427235, 30.230796548538088
    //calcRadius({lat:60.01492701296968, lon:29.707762780460286}, 15, 20);

    let myArr=[];
    for (let i=0;i<pos_raw.length;i++){
        myArr.push(
            <Marker 
                key={pos_raw[i].n+i} 
                position={L.latLng([
                    pos_raw[i].lat,
                    pos_raw[i].lon
                ])}
                icon={colorIicon("purple")}> 
                <Tooltip direction="top"  >
                    {pos_raw[i].n}
                </Tooltip>
            </Marker>  
        )
    }        

    myArr.push(
        <Marker   key={"rlk_main"}               
                position={L.latLng([59.85777088020852, 30.488789245249983])}
                icon={triangleIcon("purple")}> 
                <Tooltip direction="top"  >
                    РЛК-1
                </Tooltip>
            </Marker>  
    )

    return (        
        <>         
            <FeatureGroup>
                {myArr}      
            </FeatureGroup>         
        </>
    )
}


export const Positions_new = () =>{  
    
    const clr_posN="#FF1111"
    const pos_raw_o=[positions_n][0].positions           
    let myArr_o=[];
    for (let i=0;i<pos_raw_o.length;i++){
        myArr_o.push(
            <Marker 
                key={pos_raw_o[i].n+i} 
                position={L.latLng([
                    pos_raw_o[i].lat,
                    pos_raw_o[i].lon
                ])}
                icon={colorIicon(clr_posN)}> 
                <Tooltip direction="top"  >
                    {pos_raw_o[i].n}
                </Tooltip>
            </Marker>  
        )
    }     
    

    const bounds = [
        [60.01692701296968, 29.700762780460286],
        [60.01292701296968, 29.714762780460286],
      ]
    
    myArr_o.push(
        <Marker key={"rls1"}
                position={L.latLng([60.01572701296968, 29.708562780460286])}
                icon={triangleIcon(clr_posN)}> 
                <Tooltip direction="top"  >
                    РЛС-2
                </Tooltip>
            </Marker>  
    )

    myArr_o.push(
        <Marker key={"rls2"}     
                position={L.latLng([60.09059596781296, 30.195753274699587])}
                icon={triangleIcon(clr_posN)}> 
                <Tooltip direction="top"  >
                    РЛС-3
                </Tooltip>
            </Marker>  
    )

    myArr_o.push(
        <Marker key={"rls3"}       
                position={L.latLng([59.877078677427235, 30.230796548538088])}
                icon={triangleIcon(clr_posN)}> 
                <Tooltip direction="top"  >
                    РЛС-4
                </Tooltip>
            </Marker>  
    )
    return (        
        <>         
            <FeatureGroup>
                {myArr_o}      
            </FeatureGroup>         
        </>
    )
}
