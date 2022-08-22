import React from "react"
import { Navigate, Route, Routes } from 'react-router-dom';
import Map from "./pages/Map";
import MapABU from "./pages/MapABU";
import MapSkolkovo from "./pages/MapSkolkovo";
import MapSandbox from "./pages/MapSandbox";

export const useRoutes = () =>{		    						
    return( 		    			
	    <Routes>
		    <Route path="/" element={<Map />} /> 
			<Route path="/abu" element={<MapABU /> } />														
			<Route path="/skolkovo" element={<MapSkolkovo /> } />
			<Route path="/sandbox" element={<MapSandbox /> } />
			<Route
			    path="*"
				element={<Navigate to="/" />}
	    	/>
		</Routes> 			
    )
}   

