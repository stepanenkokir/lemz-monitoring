import React, {  useEffect, useState} from 'react'
import {FeatureGroup, Rectangle} from 'react-leaflet'
import {HSVtoRgbHZ } from './Intermediate'
import L from 'leaflet'
import 'leaflet-geometryutil'


const rectangle = [
    [[60,30],
    [60.5, 30.6]],
    [[60.5,30.5],
    [60.8, 30.8]],
    [[59.5,30],
    [60.3, 30.2]],
    [[60.7,30.2],
    [60.1, 30.7]],
  ]

const rectData = (n)=>{

    const resRec=[];
    for (let i=0;i<n;i++)
    {
        console.log(rectangle[i])
        resRec.push(<Rectangle 
                        key={"rc"+i}
                        bounds={rectangle[i]} 
                        pathOptions={{ color: 'black' }} 
                        />)
    }

    return resRec;
}



export const ZoneMPSN = (props) => { 
    
   



    useEffect(()=>{          
        console.log("change props zone",props)
        const recc = rectData(2);
        console.log(recc)
        setZone(recc)
    },[])

	return (
    	<FeatureGroup>
            {zone}
        </FeatureGroup>
  	)
}

export const PrepareCalcMLAT = (props) => { 
    const myPos = localStorage.getItem('positions');

    console.log("Render zone",myPos)    

    const [zone, setZone]=useState()



    useEffect(()=>{          
        console.log("change props zone",props)
    },[])

	return (
    	<FeatureGroup>
            {zone}
        </FeatureGroup>
  	)
}

