import React, { useEffect, useState } from 'react'
import {useMapEvents, TileLayer, LayersControl} from 'react-leaflet'

const mTitAttrOSM='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';
const mTitAttrSat='&copy; <a href="https://www.google.com/intl/ru_ru/help/terms_maps/">GoogleMaps</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';

const LayersSB = (props) => { 

	const [zoneMPSN, setZone] = useState([]);
	const [linesRec, setLinesRec] = useState([]);
	const [linesHyp, setLinesHyp] = useState([]);
	const [positions, setPositions] = useState([]);

	const mapE = useMapEvents({		
	 	zoomend: () => {		  
	 	  	localStorage.setItem('zoomSB', mapE.getZoom());		  
	 	},
	 	moveend: () => {						
	 		localStorage.setItem('centerSB', JSON.stringify([mapE.getCenter().lat,mapE.getCenter().lng]));	
        }
	})

	useEffect(()=>{
		if (props.zone){							
				setZone(props.zone)			
		}
		if (props.lines){	
			setLinesRec(props.lines)			
		}
		if (props.hyp){	
			setLinesHyp(props.hyp)			
		}
		if (props.pos){	
			setPositions(props.pos)			
		}
	},[props])
	
	return (
    	<>
      		<LayersControl  position="topright">          		
				<LayersControl.BaseLayer checked name="OpenStreet">
					<TileLayer			  	
						attribution={mTitAttrOSM}
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>   
				</LayersControl.BaseLayer>
				  
				<LayersControl.BaseLayer name="Google">
					<TileLayer
						attribution={mTitAttrSat}
						url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"				  		
						subdomains={['mt1','mt2','mt3']}
					/>   
				</LayersControl.BaseLayer>  
  
				<LayersControl.BaseLayer name="Satellite">
					<TileLayer
						attribution={mTitAttrSat}
						url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"				  		
						subdomains={['mt1','mt2','mt3']}
					/>   
				</LayersControl.BaseLayer> 	
				<LayersControl.Overlay checked  name={"ЗОНА МПСН"} >
					{zoneMPSN}
				</LayersControl.Overlay>
				<LayersControl.Overlay checked  name={"Позиции"} >
					{positions}
				</LayersControl.Overlay>
				<LayersControl.Overlay checked  name={"Линии приёмников"} >
					{linesRec}
				</LayersControl.Overlay>
				<LayersControl.Overlay checked  name={"Линии гипербол"} >
					{linesHyp}
				</LayersControl.Overlay>								
			</LayersControl>		
    	</>
  	)
}

export default LayersSB