import React from "react";
import "./App.css";
import {CssBaseline,Box } from "@mui/material";
import {BrowserRouter} from "react-router-dom"
import { useRoutes } from "./routes";
import Navbar from "./components/AppBar";

export default function App() {  
	
	const myroute =  useRoutes()
	return (		
		<BrowserRouter>		
			<CssBaseline /> 
			<Navbar/>             
            <Box sx={{ bgcolor: '#cfe8fc', height: '92vh' }}>									
				{myroute}
			</Box>	
		</BrowserRouter>
	)
}

