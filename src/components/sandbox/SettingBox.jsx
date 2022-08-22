import { Box, Button, Card, CardActions, CardContent, Checkbox, Divider, FormControlLabel, FormGroup, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const SettingBox = (props) => { 
	
    const mySetting = localStorage.getItem('settings')?JSON.parse(localStorage.getItem('settings')):{
        radius:10000,
        error:0,
        length:200,
        lengthImit:2000,
        height:500,
        changeRecv:false,       
    }
    
    const [settings, setSettings] = useState(mySetting)
    const [radius, setRadius] = useState(5)
    const [error, setError] = useState(0)
    const [length, setLength] = useState(200)
    const [chRecv, setChRecv] = useState(false)
    const [height, setHeight] = useState(500)
    const [lengthImit, setLengthImit] = useState(2000)    
    const [progress, setProgress]=useState(-2)   

    const handleRadius = (ev,newValue)=>{    
        setRadius(newValue)
        setSettings({...settings,radius:newValue*1000})
    }

    const handleLength = (ev,newValue)=>{        
         setLength(newValue)
         setSettings({...settings,length:newValue})
     }

    const handleLengthImit = (ev,newValue)=>{        
        setLengthImit(newValue)
        setSettings({...settings,lengthImit:newValue})
    }

    const handleHeight = (ev,newValue)=>{        
        setHeight(newValue)
        setSettings({...settings,height:newValue})
    }
    const handleError = (ev,newValue)=>{        
        setError(newValue)
        setSettings({...settings,error:newValue})
     }

    const changeRecv = (ev)=>{        
        setChRecv(ev.target.checked)
        setSettings({...settings,changeRecv:ev.target.checked})
    }

    const handleStart = () =>{
        props.onStart(true);              
    }

    useEffect(()=>{        
        if (settings.radius>0)
            props.newSettings(settings)        
    },[settings])


    useEffect(()=>{        
        setRadius( props.mySettings.radius/1000)
        setError( props.mySettings.error)
        setLength( props.mySettings.length)
        setChRecv( props.mySettings.changeRecv)
        setProgress(props.progress) 
      //  console.log("PROO = ",props.progress)      
    },[props])

	return (
    	<Box  sx={{
            display: 'flex',
            flexDirection:'column',  
            justifyContent:"space-evenly",             
            }}>                                            
            <Card sx={{flexGrow: 1}}>
                <CardContent sx={{display: 'flex'  }}>
                <Typography gutterBottom sx={{ flexGrow: 4}}>Дальность приёмника:</Typography> 
                <Typography variant="h6" sx={{ flexGrow: 1}}>
                        {radius} км                    
                </Typography> 
                
                </CardContent>
                <CardActions sx={{ml:3, mr:3, mt:-3 }}>
                <Slider
                    
                    value={radius}
                    size="small"                          
                    onChange={handleRadius}
                    min={10}
                    max={500}
                />
                </CardActions>
            
                <CardContent sx={{display: 'flex'  }}>
                <Typography sx={{ flexGrow: 4}}>Ошибка времени </Typography> 
                <Typography variant="h6" sx={{ flexGrow: 1}}>
                    {error} нс
                </Typography> 
                
                </CardContent>
                <CardActions sx={{ml:3, mr:3, mt:-3 }}>
                <Slider
                    
                    value={error}
                    size="small"                          
                    onChange={handleError}
                    min={0}
                    max={100}
                />
                </CardActions>
            
                <CardContent sx={{display: 'flex'  }}>
                <Typography sx={{ flexGrow: 4}}>Длина гиперболы:</Typography> 
                <Typography variant="h6" sx={{ flexGrow: 1}}>
                {length}                   
                </Typography> 
                
                </CardContent>
                <CardActions sx={{ml:3, mr:3, mt:-3 }}>
                <Slider
                    
                    value={length}
                    size="small"                          
                    onChange={handleLength}
                    min={10}
                    max={1000}
                />
                </CardActions>                
            </Card> 
            {/* <Divider/>
            <FormGroup>                                
                <FormControlLabel 
                    sx={{ml:3, mr:3 }}
                    control={<Checkbox checked={chRecv} onChange={changeRecv} />} 
                    label="Редактировать станции" 
                />
            </FormGroup>  
            <Divider/> */}
            <Divider/>
            <Divider/>
            <FormGroup>
                <Typography sx={{ textAlign:'center'}}><b>Расчёт зоны</b></Typography> 
                <Card sx={{flexGrow: 1}}>
                    <CardContent sx={{display: 'flex'  }}>
                    <Typography sx={{ flexGrow: 4}}>Шаг:</Typography> 
                    <Typography variant="h6" sx={{ flexGrow: 1}}>
                        {lengthImit}                   
                    </Typography> 
                
                    </CardContent>
                    <CardActions sx={{ml:3, mr:3, mt:-3 }}>
                    <Slider                    
                        value={lengthImit}
                        size="small"                          
                        onChange={handleLengthImit}
                        min={500}
                        max={10000}
                        step={500}
                    />
                    </CardActions>                
                    <CardContent sx={{display: 'flex'  }}>
                    <Typography sx={{ flexGrow: 4}}>Высота:</Typography> 
                    <Typography variant="h6" sx={{ flexGrow: 1}}>
                        {height}                   
                    </Typography> 
                
                    </CardContent>
                    <CardActions sx={{ml:3, mr:3, mt:-3 }}>
                    <Slider                    
                        value={height}
                        size="small"                          
                        onChange={handleHeight}
                        min={100}
                        max={10000}
                        step={100}
                    />
                    </CardActions>                
                    <Button 
                        variant="outlined"
                        sx={{width:"100%" }}
                        onClick={handleStart}
                        disabled={props.progress>=0}
                        >
                            Начать расчет
                            {progress>=0?"( "+progress+"% )":""}
                    </Button>
                    <Button 
                        variant="outlined"
                        sx={{width:"100%" }}
                        onClick={props.onClear}                       
                        >
                            Очистить расчет                            
                    </Button>
                </Card>                 
                
            </FormGroup>  
    	</Box>
  	)
}

export default SettingBox