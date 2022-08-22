import React, {  useEffect,useState , useCallback} from 'react'
import { Marker, Tooltip, FeatureGroup} from 'react-leaflet'
import {HSVtoRgbHZ,colorIicon } from '../Intermediate'
import L from 'leaflet'
import 'leaflet-geometryutil'

export const Positions = (props) => {        
        
    const [pos_raw,setPosRaw] = useState()
    const [positions, setPositions] = useState()
    
    const СurrPos = useCallback(()=>{
        return (           
            <FeatureGroup>{positions}</FeatureGroup>)

    },[positions])



        /*
    const evHandl = (i,e)=>{         
        const copy  = Object.assign([], pos_raw);               
        copy[i].lat = e.target.dragging._marker._latlng.lat
        copy[i].lon = e.target.dragging._marker._latlng.lng  
        console.log("RRRRRRR")                             
        props.showLines({pos:lastPos,dist:props.settings.radius})             
    }

    const evHandlSave = (i,e)=>{               
        const copy  = Object.assign([], pos_raw);               
        copy[i].lat = e.target.dragging._marker._latlng.lat
        copy[i].lon = e.target.dragging._marker._latlng.lng 
        setPosRaw(copy)                                 
    }
    
    const addNewPos = (ev)=>{
        
        console.log("ADD NEW POSITION:",ev.latlng)
        

        const copy  = Object.assign([], pos_raw);               
        copy.push(  {
            name:"Rx",
            lat:ev.latlng.lat,
            lon:ev.latlng.lng,
            alt:25,
            head:0,
            angle:360
        })

        for (let i=0;i<copy.length;i++)
            copy[i].name="Rx_"+(i+1)

        setNoClick({use:true,indx:-1})
        setPosRaw(copy)       

    }

    const deletePos = (ev)=>{  
        //const mrk = markersRef.current[ev]
        //console.log("Marker = ",mrk)

        const copy  = Object.assign([], pos_raw);               
        
        copy.splice(ev,1)

        // for (let i=0;i<copy.length;i++)
        //     copy[i].name="Rx_"+(i+1)

        // setNoClick({use:true,indx:-1})
        setPosRaw(copy)               
    }
*/





    const СurrCrdPos = useCallback(()=>{
        console.log("Return crd")
        return pos_raw
    },[pos_raw])
    

    const loadPos = ()=>{
        console.log("LoadPos!!")
        const myPos = localStorage.getItem('positions')?
            JSON.parse(localStorage.getItem('positions')):
            [                
                {name:"78-12_АТС-592                  ",lat:60.049311, lon:30.323608, alt:25, head:0, angle:360},
                {name:"78-1066_Совинтел               ",lat:59.956370, lon:30.304189, alt:25, head:0, angle:360},
                {name:"78-4183_Нефтяная дорога        ",lat:59.904531, lon:30.372958, alt:25, head:0, angle:360},
                {name:"78-4031_Огнева                 ",lat:59.899653, lon:30.462158, alt:25, head:0, angle:360},
                {name:"78-6894_Гаккелевская_22        ",lat:60.000913, lon:30.256446, alt:25, head:0, angle:360},
                {name:"78-6914_Ржевка-2               ",lat:59.974985, lon:30.482421, alt:25, head:0, angle:360},
                {name:"78-45_Океан                    ",lat:59.948417, lon:30.384139, alt:25, head:0, angle:360},
                {name:"78-883_Труд                    ",lat:59.943889, lon:30.441389, alt:25, head:0, angle:360},
                {name:"78-514_АТС-323                 ",lat:59.942123, lon:30.278922, alt:25, head:0, angle:360},
                {name:"78-15_АТС-168                  ",lat:59.910833, lon:30.340000, alt:25, head:0, angle:360},
                {name:"47-905_Колтуши                 ",lat:59.940556, lon:30.651389, alt:25, head:0, angle:360},
                {name:"78-1758_Цветочная              ",lat:59.893361, lon:30.329667, alt:25, head:0, angle:360},
                {name:"78-11645_ПлатформаУниверситет  ",lat:59.884658, lon:29.833772, alt:25, head:0, angle:360},
                {name:"47-34462_Володарский           ",lat:59.809133, lon:30.069722, alt:25, head:0, angle:360}                
            ]                    
        setPosRaw(myPos.map((ps,id)=>ps))  
    }

    const savePos = ()=>{
        localStorage.setItem('positions', JSON.stringify(pos_raw));
    }

    useEffect(()=>{              
        loadPos()   
    },[])


    useEffect(()=>{     
        if (pos_raw){
            console.log("Make markers!!"); 
            let init_sr={lat:0,lng:0,alt:0}
            let sr = pos_raw.reduce(function (acc, curr){
                return {lat:acc.lat+curr.lat, lng:acc.lng+curr.lon, alt: acc.alt + curr.alt}
            },init_sr)
    
            const avgPoint = {
                lat:sr.lat/pos_raw.length,
                lng:sr.lng/pos_raw.length,
                alt:sr.alt/pos_raw.length,
            }
            localStorage.setItem('avgPoint', JSON.stringify(avgPoint));	
            
            let myArr=[];                
            for (let i=0;i<pos_raw.length;i++){                         
                myArr.push(
                    <Marker                     
                        // eventHandlers={{                       
                        //     mousedown: () => {setDrag(true) },
                        //     mouseup: () => {setDrag(false); },
                        //     tooltipopen: () => {setNoClick({use:false,indx:i})},
                        //     tooltipclose: () => {setNoClick({use:true,indx:i})},
                        //     drag: (e) => evHandl(i,e),
                        //     dragend: (e) =>evHandlSave(i,e)                        
                        // }}
                        //draggable={props.settings.changeRecv}                   
                        key={pos_raw[i].name}                      
                        position={L.latLng([pos_raw[i].lat,pos_raw[i].lon])}                    
                        icon={colorIicon(HSVtoRgbHZ(i,pos_raw.length))}> 
                        <Tooltip key={"tltp"+i} direction="top" myInd={i} hidden >
                            {pos_raw[i].name}
                        </Tooltip>
                    </Marker>  
                )
            }
            setPositions (myArr)        
        } 
        savePos()           
    },[pos_raw])

	return {СurrPos, СurrCrdPos, loadPos, savePos}  	  	
}

export default Positions