import React, {  useEffect,useState } from 'react'
import {useMapEvents, useMap,  Marker, Tooltip, FeatureGroup, Polyline,Circle, Polygon, Rectangle} from 'react-leaflet'
import {HSVtoRgbHZ,colorIicon, calcHyper,rot2norm,norm2rot2,Geo2Local } from '../Intermediate'
import L from 'leaflet'
import 'leaflet-geometryutil'


const SandBox = (props) => {       
    
       
    const [lineOfHyperbol, setLineOfHyperbol] = useState()  
    const [lastPos, setLastPos] = useState()  
    const [leftBtn, setLeftBtn] = useState(false)   	

    
    const mapE = useMapEvents({		
        mousemove:(ev)=>{                          
            // if (leftBtn){
            //     setLastPos(ev.latlng)               
            // }                        
        },        
        mousedown:(ev)=> {           
            if (ev.originalEvent.button==0){
                setLeftBtn(true)
                mapE.dragging.disable()                             
                if (ev.originalEvent.clientX<ev.originalEvent.view.parent.document.documentElement.clientWidth-100) 
                    setLastPos(ev.latlng)                 
            }                                                                            
        },
        mouseup:(ev)=>{                    
            if (ev.originalEvent.button==0){
                setLeftBtn(false)
            }            
            mapE.dragging.enable()            
        }        
	})
    // 
    const createArray = (poly)=>{      
       // setDataBorder({poly:poly,lastPos:lastPos})               
    }
   
    useEffect(()=>{       
        if (lastPos){                       
            localStorage.setItem('lastPos', JSON.stringify(lastPos))
            props.showLines()
            props.calcHyper(lastPos)
            //showHyperbol()
        }
    },[lastPos])

	return (
    	<>                              
           {/* <FeatureGroup>{positions}</FeatureGroup>            */}
            {/*<FeatureGroup>{lineOfHyperbol}</FeatureGroup> */ }
                               
    	</>
  	)
}

export default SandBox