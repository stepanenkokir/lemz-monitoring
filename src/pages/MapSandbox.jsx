import React, { useEffect, useState } from 'react'
import {  Box, SwipeableDrawer} from '@mui/material'
import { MapContainer } from 'react-leaflet'
import LayersSB from '../components/sandbox/LayersSB'
import SandBox from '../components/sandbox/SandBox'
import SettingsIcon from '@mui/icons-material/Settings';
import SettingBox from '../components/sandbox/SettingBox'
import {useZone} from '../hooks/zone.hook'
import RecsLine from '../components/sandbox/RecsLine'
import HyperLine from '../components/sandbox/HyperLine'
import Positions from '../components/sandbox/Positions'

const mySetting = localStorage.getItem('settings')?JSON.parse(localStorage.getItem('settings')):{
    radius:10000,
    error:10,
    length:200,
    lengthImit:2000,
    height:500,
    changeRecv:false}


const MapSandbox  = () => { 
    const mapCenter = localStorage.getItem('centerSB')?JSON.parse(localStorage.getItem('centerSB')):[59.926944213339944,30.572204589843754]
    const zoom= localStorage.getItem('zoomSB')?localStorage.getItem('zoomSB'):9

    const {prepareCalcMLAT, ZoneMPSN,progress, clearCalcMLAT} = useZone();
    const {LinesRec, showLines } = RecsLine()
    const { Hyperbols,calcHyper,loading } = HyperLine()
    const { СurrPos, СurrCrdPos, loadPos, savePos } = Positions()


    const [settings,setSettings]=useState(mySetting)  
    const [open_dr, setOpen_dr]=useState(false)
    //const [progress, setProgress]=useState(-2)    

    useEffect(()=>{       
        localStorage.setItem('settings',JSON.stringify(settings))
    },[settings])

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }    
        setOpen_dr(open );
      };

    const handleMenu = ()=>{
        setOpen_dr(true );
    }

    const handleSettings = (newSett)=>{
        if (newSett){
           // localStorage.setItem('settings',JSON.stringify(newSett))
            //setSettings(newSett);
            const oldS = JSON.stringify(settings)
            const newS = JSON.stringify(newSett)
            if (oldS!==newS)
            {
               // console.log("New Settings = ",newS)                
                setSettings(newSett)
            }                            
        }
    }

    const handleStart = () =>
    {                
        setOpen_dr(false);               
        prepareCalcMLAT()      
    }

    const DivSett = () =>{    
        return (
            <div className='divSett' onClick={handleMenu}>            
                    <SettingsIcon sx={{fontSize:40}} />            
            </div>)
    }

    useEffect(() => {
        document.title = "Принцип МПСН (c)";
     }, []);

     

    return  (     
        <Box sx={{ flexGrow:1, height:"90vh"}}>        
            <MapContainer                         
                center={mapCenter}                                  
                zoom={zoom}                                 
                style={{ height: '100%', width: '100%' }}           
               
            >                               
                <SandBox 
                    settings={settings} 
                    showLines={showLines}
                    calcHyper={calcHyper}
                />

                <LayersSB 
                    zone={<ZoneMPSN/>} 
                    lines={<LinesRec/>} 
                    hyp={<Hyperbols/>}
                    pos={<СurrPos />}                    
                />   
             
                <DivSett/>                
                <SwipeableDrawer                   
                    anchor='right'
                    open={open_dr}                    
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <SettingBox 
                        mySettings={settings} 
                        newSettings={handleSettings} 
                        onStart={handleStart}
                        onClear={clearCalcMLAT}
                        progress={progress}
                    />
                </SwipeableDrawer>                   
            </MapContainer>                          
        </Box>   
    )
}
export default MapSandbox

