import {useState, useEffect, useCallback, useMemo} from 'react'
import {FeatureGroup, Rectangle} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-geometryutil'
import HyperLine from '../components/sandbox/HyperLine'


export const useZone = () =>{            

    const [zone, setZone]=useState([])    
    const [progress, setProgress]=useState(-1)    
    const {calcBounds } = HyperLine()
    
    const ZoneMPSN =  useCallback(() => {        
        return (
            <FeatureGroup>
                {zone}
            </FeatureGroup>
          )
    },[zone])            

    const prepareCalcMLAT = () => { 
        
        const positions = JSON.parse(localStorage.getItem('positions'))
        const props = JSON.parse(localStorage.getItem('settings'))            
        const bound={minLat:90, minLon:360, maxLat:0, maxLon:0}

        const checkDist = (crd,radius) =>{
            let cntVis = 0;
            for (let i=0;i<positions.length;i++){
                const rad =  L.GeometryUtil.length([crd,L.latLng(positions[i].lat,positions[i].lon)])                        
                if (rad<radius) 
                    cntVis++;
                if (cntVis>3)
                    return true
            }            
            return false
        }
        
        for (let i=0;i<positions.length;i++){           
            if (positions[i].lat<bound.minLat) bound.minLat=positions[i].lat
            if (positions[i].lat>bound.maxLat) bound.maxLat=positions[i].lat
            if (positions[i].lon<bound.minLon) bound.minLon=positions[i].lon
            if (positions[i].lon>bound.maxLon) bound.maxLon=positions[i].lon
        }        
        //const recc = rectData(bound,props.lengthImit, props.height, props.radius, positions ); 
        
        const resRec=[];   

        bound.minLon = L.GeometryUtil.destination({lat:bound.minLat,lng:bound.minLon},270,props.radius).lng
        bound.maxLon = L.GeometryUtil.destination({lat:bound.maxLat,lng:bound.maxLon},90,props.radius).lng
        bound.minLat = L.GeometryUtil.destination({lat:bound.minLat,lng:bound.minLon},180,props.radius).lat
        bound.maxLat = L.GeometryUtil.destination({lat:bound.maxLat,lng:bound.maxLon},0,props.radius).lat
        
        let currLat = bound.minLat;
        let currLon = bound.minLon;
        console.log("currLat",currLat, currLon,props)
        console.log("c",L.GeometryUtil.destination({lat:currLat,lng:currLon},0,props.lengthImit))
        const dLat = L.GeometryUtil.destination({lat:currLat,lng:currLon},0,props.lengthImit).lat - currLat;
        const dLon = L.GeometryUtil.destination({lat:currLat,lng:currLon},90,props.lengthImit).lng - currLon; 
        const maxLen = bound.maxLat - bound.minLat;      
        
        const arrCrd=[]
        while (currLat <= bound.maxLat){

            const pr=100*(currLat - bound.minLat)/maxLen;
            setProgress(pr);
            while (currLon < bound.maxLon){

                const cd = checkDist(L.latLng(currLat,currLon), props.radius)
              //  console.log(currLat, currLon,cd)
                if (cd){
                    arrCrd.push({lat:currLat,lng:currLon})
                    
                    // resRec.push(<Rectangle 
                    //     key={"rc"+pr+currLon}
                    //     bounds={[[currLat-dLat/2,currLon-dLon/2],[currLat+dLat/2,currLon+dLon/2]]} 
                    //     pathOptions={{ color: 'black' }} 
                    //     />)
                    }

                currLon = L.GeometryUtil.destination({lat:currLat,lng:currLon},90,props.lengthImit).lng
            }
            currLat = L.GeometryUtil.destination({lat:currLat,lng:currLon},0,props.lengthImit).lat
            currLon = bound.minLon
        }    


        calcBounds(arrCrd,dLat,dLon,resCB)
        //console.log(arrCrd)

        //setProgress(-1);
        //setZone(resRec)                              
    }    

    const resCB = (res)=>{
        console.log("CALLBACK ",res)
        setProgress(-1);
        setZone(res)
        
    }

    const clearCalcMLAT = () => {                 
        setProgress(-1);
        setZone([])
    }  

    return {ZoneMPSN, prepareCalcMLAT,progress,clearCalcMLAT}
}