import React, { useEffect } from 'react'
import {useMapEvents, TileLayer, LayersControl} from 'react-leaflet'
import {Positions, ZoneMPSN,ZoneSkolkovo} from './PositionsS';
import {HSVtoRgbH} from '../Intermediate'
const mTitAttrOSM='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';
const mTitAttrSat='&copy; <a href="https://www.google.com/intl/ru_ru/help/terms_maps/">GoogleMaps</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';

const LayersS = (props) => { 

	const mapE = useMapEvents({		
	 	zoomend: () => {		  
	 	  	localStorage.setItem('zoomS', mapE.getZoom());		  
	 	},
	 	moveend: () => {						
	 		localStorage.setItem('centerS', JSON.stringify([mapE.getCenter().lat,mapE.getCenter().lng]));
	 	},
		overlayadd: (e)=>{
			if (e.name.includes("Зона МПСН")){

                // console.log("ADD DIV!!!");
				const myDiv = document.getElementById("legend");
				const err=150

				let strHTML="<b>Легенда</b><br>";				
				for (var ii=0;ii<5;ii++)
				{
					const er1=(ii+1)*err/6;
			
					strHTML+="<div class=\"legend_bar\" style=\"background-color:"+HSVtoRgbH (er1,err)+
					"; color: blue\" ><b> < "+Math.floor(er1)+"</b> м.</div>";
				}
				 strHTML+="<div class=\"legend_bar\" style=\"color: blue; background-color:red;\"> <b> < "+Math.floor(err)+"</b> м.</div>";
				
				myDiv.classList.remove("hide")
				myDiv.classList.add("show");
				myDiv.innerHTML=strHTML
			}			
		},
		overlayremove: (e)=>{
			if (e.name.includes("Зона МПСН")){				
				document.getElementById("legend").innerHTML=""
				document.getElementById("legend").classList.remove("show")
				document.getElementById("legend").classList.add("hide")
			}
			
		}
	})

	
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
				    
				<LayersControl.Overlay checked  name={"<span class='span_control spP_O'>Позиции</span>"} >
					<Positions/>
				</LayersControl.Overlay>				
				<LayersControl.Overlay   name={"<span class='span_control sp_mpsn'>Зона МПСН</span>"} >					
					<ZoneMPSN/>																			
				</LayersControl.Overlay>				
				<LayersControl.Overlay checked  name={"<span class='span_control spULP'>Граница зоны</span>"} >
					<ZoneSkolkovo/>					
				</LayersControl.Overlay>							
			</LayersControl>
           			
    	</>
  	)
}

export default LayersS