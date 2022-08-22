import React, {  useCallback, useEffect, useState} from 'react'
import { FeatureGroup, Polygon, Rectangle, Tooltip} from 'react-leaflet'
import {Geo2Local, calcHyperbol, distance, rot2norm,norm2rot2, HSVtoRgbHZ,HSVtoRgbH } from '../Intermediate'
import ErrorRect from './ErrorRect'
import 'leaflet-geometryutil'

const HyperLine = (props) => {    
    const {ErrorBorder, setDataBorder } = ErrorRect()
    const [curves, setCurves]= useState(<FeatureGroup></FeatureGroup>)
    
    const [loading, setLoading]= useState(false)
     
    
    const Hyperbols = useCallback(()=>{  
        if (curves){              
        return (<>
                <FeatureGroup>{curves}</FeatureGroup>
                <ErrorBorder/>
                </>
                )   
        }             
    },[curves])
   
    const calcHyper = (lastPos,cb=true)=>{                
        const myPos = JSON.parse(localStorage.getItem('positions'))        
       // const lastPos =  JSON.parse(localStorage.getItem('lastPos'))
        const avgPoint =  JSON.parse(localStorage.getItem('avgPoint'))
        const settings =  JSON.parse(localStorage.getItem('settings'));

        const arrPoint=[]        
        for (let ind1=0;ind1<myPos.length-1;ind1++){            
            for (let ind2=ind1+1;ind2<myPos.length;ind2++){                              
                const pos1 = Geo2Local(
                    L.latLng(
                        myPos[ind1].lat,
                        myPos[ind1].lon,
                        myPos[ind1].alt
                    ),
                    L.latLng(
                        avgPoint.lat,
                        avgPoint.lng,                       
                )) 

                const pos2 = Geo2Local(
                    L.latLng(
                        myPos[ind2].lat,
                        myPos[ind2].lon,
                        myPos[ind2].alt
                    ),
                    L.latLng(
                        avgPoint.lat,
                        avgPoint.lng,                        
                )) 

                const pos3 = Geo2Local(
                    L.latLng(
                        lastPos.lat,
                        lastPos.lng,
                        settings.height
                    ),
                    L.latLng(
                        avgPoint.lat,
                        avgPoint.lng,                        
                )) 
                
                const r1 = distance(pos1,pos3)
                const r2 = distance(pos2,pos3)
                const r3 = distance(pos1,pos2)

                if (r1>settings.radius || r2>settings.radius)
                    continue
                                                     
                const strSend = {
                    p1:pos1,
                    p2:pos2,                   
                    r1:r1,
                    r2:r2,
                    r3:r3
                }

                let list1=[];
                let list2=[];
                const lngth=settings.length                               
                const listHyp = calcHyperbol(strSend,settings.error);

            //LEFT
                const nXY = rot2norm(pos3,listHyp.left.alf,listHyp.left.cntr)                
                const mirror=Math.abs(nXY.y)<lngth && Math.abs(nXY.x)<listHyp.left.C+lngth              
                const minX= mirror? (-lngth/2):(-lngth)
                const maxX=-minX                               
                for (let i=minX;i<maxX;i+=1)
                {                     
                    let x=i+Math.abs(nXY.x)                   
                    if (x<0)continue                
                    let c_x = (nXY.x>0)?x:-x;                    
                    let c_y =Math.sqrt(listHyp.left.B2*(x*x-listHyp.left.A2)/listHyp.left.A2);
                    let ccc= listHyp.left.B2*(x*x-listHyp.left.A2)/listHyp.left.A2                                      
                    if ( (!c_y) || 
                        (Math.abs(c_y)<Math.abs(nXY.y)-lngth) || 
                        (Math.abs(c_y)>Math.abs(nXY.y)+lngth) ||
                        (Math.abs(c_x)>Math.abs(nXY.x)+lngth) || 
                        (Math.abs(c_x)<Math.abs(nXY.x)-lngth))                                            
                        continue ;                                                  
                    if (nXY.y<0) c_y *=-1;                                        
                    let point = norm2rot2(c_x,c_y,listHyp.left.alf,listHyp.left.cntr,L.latLng(avgPoint.lat,avgPoint.lng))                                                   
                    list1.unshift(point)                                         
                                            
                    if (mirror){                       
                        c_y = -c_y
                        if ((Math.abs(c_y)<Math.abs(nXY.y)-lngth) || 
                            (Math.abs(c_y)>Math.abs(nXY.y)+lngth) ||
                            (Math.abs(c_x)>Math.abs(nXY.x)+lngth) || 
                            (Math.abs(c_x)<Math.abs(nXY.x)-lngth))                                            
                        continue;                                                                                                                               
                        
                        point = norm2rot2(c_x,c_y,listHyp.left.alf,listHyp.left.cntr,L.latLng(avgPoint.lat,avgPoint.lng))                                                
                        list1.push(point)
                    }                    
                } 

                //RIGHT

                nXY = rot2norm(pos3,listHyp.right.alf,listHyp.right.cntr)                
                mirror=Math.abs(nXY.y)<lngth && Math.abs(nXY.x)<listHyp.right.C+lngth              
                minX= mirror? (-lngth/2):(-lngth)
                maxX=-minX                               
                for (let i=minX;i<maxX;i+=1)
                {                     
                    let x=i+Math.abs(nXY.x)                   
                    if (x<0)continue                
                    let c_x = (nXY.x>0)?x:-x;                    
                    let c_y = Math.sqrt(listHyp.right.B2*(x*x-listHyp.right.A2)/listHyp.right.A2); 
                    if ( (!c_y) || 
                        (Math.abs(c_y)<Math.abs(nXY.y)-lngth) || 
                        (Math.abs(c_y)>Math.abs(nXY.y)+lngth) ||
                        (Math.abs(c_x)>Math.abs(nXY.x)+lngth) || 
                        (Math.abs(c_x)<Math.abs(nXY.x)-lngth))                                            
                        continue ;                                                  
                    if (nXY.y<0) c_y *=-1;                                        
                    let point = norm2rot2(c_x,c_y,listHyp.right.alf,listHyp.right.cntr,L.latLng(avgPoint.lat,avgPoint.lng))                                        
                    list2.unshift(point)                                                                                   
                    if (mirror){                       
                        c_y = -c_y
                        if ((Math.abs(c_y)<Math.abs(nXY.y)-lngth) || 
                            (Math.abs(c_y)>Math.abs(nXY.y)+lngth) ||
                            (Math.abs(c_x)>Math.abs(nXY.x)+lngth) || 
                            (Math.abs(c_x)<Math.abs(nXY.x)-lngth))                                            
                        continue;                                                                                                                               
                        
                        point = norm2rot2(c_x,c_y,listHyp.right.alf,listHyp.right.cntr,L.latLng(avgPoint.lat,avgPoint.lng))                         
                        list2.push(point)
                    }                    
                } 
                   
                if ((list1.length+list2.length) >0)
                    arrPoint.push(list1.concat(list2.reverse()))                
            }
        }           
        
        
        if (cb){
             
            if (arrPoint.length>0){
            
                setDataBorder(arrPoint)

                const curve = []
                
                for (let i=0;i<arrPoint.length;i++){                                           
                    const t_poly =                            
                            <Polygon 
                                key={"polyL"+i} 
                                pathOptions={{
                                    color:HSVtoRgbHZ(i,arrPoint.length),
                                    fillColor:HSVtoRgbHZ(i,arrPoint.length),
                                    weight:5,
                                    opacity:0.6
        
                                }} 
                                positions={arrPoint[i]} 
                            />
                        
                    curve.push(t_poly)
                }                           
                setCurves(curve)
                
            }
        }
        else
            return setDataBorder(arrPoint,lastPos)
        
    }    


    const calcBounds = (data, dLat, dLon, cb)=>{
        if (!data) return;
        const res=[];
        for (let i=0;i<data.length;i++){
            const arr = calcHyper(data[i],false)
           // console.log("Calc", data[i],arr)
            res.push(
                <Rectangle 
                    key={"rc"+i}
                    bounds={[[data[i].lat-dLat/2,data[i].lng-dLon/2],[data[i].lat+dLat/2,data[i].lng+dLon/2]]} 
                    pathOptions={{ color: HSVtoRgbH(arr.xy,150) }} 
                >
                    <Tooltip key={"tltpErr"+i} direction="top" hidden >
                            {arr.xy.toFixed(2)}
                        </Tooltip>
                </Rectangle>
            )
        }

        cb(res);

    }

    
    useEffect(()=>{
        console.log("Loading = ",loading)

    },[loading])

	return { Hyperbols, calcHyper,loading, calcBounds }
}
export default HyperLine