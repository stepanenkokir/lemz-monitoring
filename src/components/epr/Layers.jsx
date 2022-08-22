import React from 'react'
import {useMapEvents, TileLayer, LayersControl, LayerGroup} from 'react-leaflet'
import {Positions,Positions_new, ZoneULP, ZoneULR, ZoneAG, ZoneEPR, RLS1, RLS2, RLS3, RLS4 } from './Positions';
import { Aeroports, Marines } from './Harbors';
const mTitAttrOSM='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';
const mTitAttrSat='&copy; <a href="https://www.google.com/intl/ru_ru/help/terms_maps/">GoogleMaps</a> | <a href="http://lemz.ru/автоматизированные-системы/" target="_blank">ПАО "НПО "Алмаз" НПЦ-СПб</a>';

const colors={
	clrNewPos:'#FF1111',
	clrOldPos:'purple',
	clrULP:'red',
	clrULR:'blue',
	clrAP:'gray',
	clrEPR:'#666',
	clrRLS1:'orange',
	clrRLS2:'#FFFF00'
}

const crdPos = [
	L.latLng([52.400337017,	104.369453483,	512.9]),		
	L.latLng([52.96106165,	105.21432865,	669.1]),		
	L.latLng([52.441948467,	103.194475000,	486.1]),		
	L.latLng([52.250126,		104.471124,	 	597.9]),
	L.latLng([52.789296583,	104.772496330,	496.4]),
	L.latLng([51.896046050,	103.844622267,	923.7]),		
	L.latLng([51.879028467,	104.839692167,	694.5]),		
	L.latLng([52.145502660,	104.532520990,	528.8376]),		
	L.latLng([51.966006005,	104.735353538,	601.7852]),		
	L.latLng([52.126011294,	104.326339047,	522.3721]),		
	L.latLng([52.22736887,	104.2533244,	561.3749]),		
	L.latLng([52.817661393,	104.742718888,	528.5756]),		
	L.latLng([52.003367136,	103.871025518,	897.740]),		
	L.latLng([52.385517220,	103.913287579,	524.5349]),		
	L.latLng([52.454375596,	104.461770325,	502.4761]),		
	L.latLng([52.370961301,	104.144218680,	457.3340]),		
	L.latLng([52.251971967,	104.158782936,	474.2884]),		
	L.latLng([52.272174,		104.380225,	 	490.4]),		
	L.latLng([52.259527,		104.422632,	 	521.9]),		
	L.latLng([52.274443,		104.367765,	 	478.8]),		
	L.latLng([52.273374,		104.361245,	 	496.0])
]

//const crdKRO = L.latLng([52.272185489,104.380192376,494.9948])
const crdKRO = L.latLng([52.268177889,104.367877796,490.2183])


const handleColor = (e)=>{
	console.log("Change color!!!",e)
}

const Layers = (props) => { 

	const map = useMapEvents({		
		zoomend: () => {		  
		  	localStorage.setItem('zoom', map.getZoom());		  
		},
		moveend: () => {						
			localStorage.setItem('center', JSON.stringify([map.getCenter().lat,map.getCenter().lng]));
		
			const arrD = []
			for (let i=0;i<crdPos.length;i++){
				const dist = Math.sqrt(Math.pow(crdPos[i].distanceTo(crdKRO),2)+Math.pow((crdKRO.alt - crdPos[i].alt),2))
				console.log("Kek!", crdPos[i].distanceTo(crdKRO),dist)
				arrD.push(dist)
			}

			const arrDT = []
			for (let i=0;i<arrD.length;i++){
				const arrRow=[]
				for (let j=0;j<arrD.length;j++){
					arrRow.push(arrD[i]-arrD[j])
				}
				arrDT.push(arrRow)
			}
				
			console.log(arrDT)
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
						   				
				<LayersControl.Overlay checked  name={"<span class='span_control spP_O'>Позиции (действующие)</span>"} >
					<Positions/>
				</LayersControl.Overlay>
				<LayersControl.Overlay checked  name={"<span class='span_control spP_N'>Позиции (новые)</span>"} >
					<Positions_new/>
				</LayersControl.Overlay>
				<LayersControl.Overlay   name={"<span class='span_control spULP'>Зоны запрета</span>"} >
					<ZoneULP/>
				</LayersControl.Overlay>
				<LayersControl.Overlay   name={"<span class='span_control spULR'>Зона ограничения</span>"} >
					<ZoneULR/>
				</LayersControl.Overlay>

				<LayersControl.Overlay checked  name={'АЭРОПОРТЫ'} >
					<Aeroports/>					
				</LayersControl.Overlay>

				<LayersControl.Overlay checked  name={'Морские порты'} >					
					<Marines/>
				</LayersControl.Overlay>
										 
				<LayersControl.Overlay   name={"<span class='span_control spAG'>Административные границы</span>"} >
					<ZoneAG/>					
				</LayersControl.Overlay>
				<LayersControl.Overlay checked  name={"<span class='span_control spEPR'>Граница ЭПР</span>"} >
					<ZoneEPR/>					
				</LayersControl.Overlay>								
				<LayersControl.Overlay   name={"<span class='span_control rls1'>Зона РЛС1</span>"} >
					<RLS1/>					
				</LayersControl.Overlay>
				<LayersControl.Overlay   name={"<span class='span_control rls2'>Зона РЛС2</span>"} >
					<RLS2/>					
				</LayersControl.Overlay>
				<LayersControl.Overlay   name={
					`<span class='span_control rls2'>Зона РЛС3 \
						
						</span>`} >
					<RLS3/>					
				</LayersControl.Overlay>
				<LayersControl.Overlay   name={"<span class='span_control rls2'>Зона РЛС4</span>"} >
					<RLS4/>					
				</LayersControl.Overlay>				
			</LayersControl>			
    	</>
  	)
}

export default Layers