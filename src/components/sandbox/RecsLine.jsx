import React, {  useCallback, useState} from 'react'
import {FeatureGroup,Polyline } from 'react-leaflet'
import {HSVtoRgbHZ } from '../Intermediate'

import 'leaflet-geometryutil'

const RecsLine = (props) => {          
    const [lines, setLines]= useState(<FeatureGroup></FeatureGroup>)              
    const LinesRec = useCallback(()=>{        
        return (           
                <FeatureGroup>{lines}</FeatureGroup>)
    },[lines])
    
    const showLines = ()=>{
        const myPos = JSON.parse(localStorage.getItem('positions'))         
        const lastPos =  JSON.parse(localStorage.getItem('lastPos'))
        const len =  JSON.parse(localStorage.getItem('settings')).radius;       
        const list = myPos.map((pos,id)=>{                         
            const dd = L.GeometryUtil.length([L.latLng(lastPos.lat,lastPos.lng),L.latLng(pos.lat,pos.lon,pos.alt)])                   
            if (dd < len){
                return (
                    <Polyline 
                        key={"pl"+id} 
                        pathOptions={{
                            color:HSVtoRgbHZ(id,myPos.length), 
                            weight:3, 
                        }} 
                        positions={[
                            [pos.lat, pos.lon],  
                            [lastPos.lat,lastPos.lng]
                        ]} 
                    />         
                )}            
            })                           
        setLines(list)
    }  

	return { LinesRec, showLines }
}
export default RecsLine