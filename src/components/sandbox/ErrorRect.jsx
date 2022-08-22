import React, {  useCallback, useState} from 'react'
import {Rectangle, FeatureGroup} from 'react-leaflet'
import {HSVtoRgbH} from '../Intermediate'

import 'leaflet-geometryutil'

const maxErr=100

const isPointInsidePolygon = (x,y, poly)=> {    
    var polyPoints = poly;       
    
    let inside = false;
    for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        const xi = polyPoints[i].lat, yi = polyPoints[i].lng;
        const xj = polyPoints[j].lat, yj = polyPoints[j].lng;

        const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

const ErrorRect = (props) => {    
      
    const [border, setBorder]= useState(<FeatureGroup></FeatureGroup>)
   
        
    const ErrorBorder = useCallback(()=>{
        return (           
                <FeatureGroup>{border}</FeatureGroup>)
    },[border])
   
    
    const setDataBorder = (data, lp=false)=>{ 
       // console.log("DATA = ",data)     
        if (data.length<4){
            setBorder([])
            return ;
        }
            

        const lastPos =  lp?lp:JSON.parse(localStorage.getItem('lastPos'))    
        
        const errC1 = L.GeometryUtil.destination(lastPos,225,maxErr*Math.sqrt(2)) 
        const errC2 = L.GeometryUtil.destination(lastPos,45,maxErr*Math.sqrt(2)) 
        const dLat = (errC2.lat - errC1.lat)/(maxErr)
        const dLng = (errC2.lng - errC1.lng)/(maxErr)       

        const arrPoint=[]  
        const arrMask=[]
        const numPointMask= new Array(data.length)


        for (let c=0;c<data.length;c++){
            arrMask[c] = []
            numPointMask[c]=0
            for (let x=0;x<maxErr;x++){
                arrMask[c][x]= []
                for (let y=0;y<maxErr;y++)
                    arrMask[c][x][y]=0
            }                                       
        }

        let ii=0
        let jj=0
        for (let lat=errC1.lat;lat<errC2.lat;lat+=dLat){                                            
            jj=0
            for (let lng=errC1.lng;lng<errC2.lng;lng+=dLng){                                                
                    for (let c=0;c<data.length;c++){
                        const nn = isPointInsidePolygon(lat,lng,data[c])
                        if (nn){
                            arrMask[c][ii][jj]=nn
                            numPointMask[c]++
                        }
                        
                    }                        
                jj++
            }
            ii++
            
        }

        let mainIndex=0
        for (let c=1;c<data.length;c++)
            if (numPointMask[c]>numPointMask[mainIndex])
                mainIndex=c

        const errXY={
            minX:maxErr,
            minY:maxErr,
            maxX:-1,
            maxY:-1
        }
                 
        for (let x=0;x<maxErr;x++)                
            for (let y=0;y<maxErr;y++){

                    for (let c=0;c<data.length;c++){
                
                        if (c==mainIndex || numPointMask[c]<10) continue

                        arrMask[mainIndex][x][y]&=arrMask[c][x][y]                                                                   
                    }
                    if (arrMask[mainIndex][x][y]){
                        const lat = errC1.lat+dLat*x
                        const lng = errC1.lng+dLng*y
                        arrPoint.push(<Rectangle key={"lt"+x+"ln"+y}
                            bounds={[[lat-0.00001,lng-0.00002],[lat+0.00001,lng+0.00002]]} 
                            pathOptions={{color: "black", fillColor:"black" }} />)
                        if (x<errXY.minX) errXY.minX=x
                        if (x>errXY.maxX) errXY.maxX=x
                        if (y<errXY.minY) errXY.minY=y
                        if (y>errXY.maxY) errXY.maxY=y                        
                }
        }       
        setBorder(arrPoint)
        const eX = errXY.maxX - errXY.minX
        const eY = errXY.maxY - errXY.minY
        const eXY = Math.sqrt(eX*eX+eY*eY)

//        console.log("RERERE",eX, eY, eXY)

        return {x:eX,y:eY,xy:eXY} 
    }


    
    
	return { ErrorBorder, setDataBorder }
}
export default ErrorRect