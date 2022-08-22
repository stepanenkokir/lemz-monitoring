import L from 'leaflet'
import 'leaflet-geometryutil'

export const Geo2Local = (crd1, crd2) =>{          
    const dist=L.GeometryUtil.length([crd1,crd2])    
    const bear = Math.PI*(L.GeometryUtil.bearing(crd2,crd1)-90)/180
    
    const crd ={
        x:dist*Math.cos(bear),
        y:dist*Math.sin(bear),
        alt:crd1.alt
    }    
    return crd
}

export const local2Geo = (pos, crd) =>{        
    const dist=Math.sqrt(pos.x*pos.x+pos.y*pos.y)
    const bear = 90+Math.atan2(pos.y,pos.x)*180/Math.PI
    return L.GeometryUtil.destination(crd,bear,dist)            
}

export const distance = (a,b)=>{//расстояние между 2 точками
    const s1=Math.pow((a.x-b.x),2)
    const s2=Math.pow((a.y-b.y),2)
    const s3=0;//a.alt?Math.pow((a.alt-b.alt),2):0
    return Math.sqrt(s1+s2+s3) 
}

//из повернутой (канонической) координатной системы гиперболы в прямоугольные координаты мира
export const rot2norm = (p,alf,cntr) => {     
    return {
        x:(p.x-cntr.x)*Math.cos(alf) + (p.y-cntr.y)*Math.sin(alf),
        y:(p.y-cntr.y)*Math.cos(alf) - (p.x-cntr.x)*Math.sin(alf)
    }
} 
//из координат мира в координаты повернутой (канонической) системы гиперболы 
export const norm2rot = (x,y,alf,cntr) => {
    //console.log("NORM2ROT",x,y,alf,cntr)
    return {
        x:x*Math.cos(alf) - y*Math.sin(alf) + cntr.x,
        y:x*Math.sin(alf) + y*Math.cos(alf) + cntr.y
    }
} 

export const norm2rot2 = (x,y,alf,cntr,scr_cntr) => {
    //console.log("NORM2ROT2",x,y,alf,cntr)
    const pos={
        x:x*Math.cos(alf) - y*Math.sin(alf) + cntr.x,
        y:x*Math.sin(alf) + y*Math.cos(alf) + cntr.y
    }

    return local2Geo(pos,scr_cntr)
}

const analyzHyper = (s) =>{    

    const A2 = Math.pow(Math.abs(s.r1-s.r2)/2,2)
    const C = s.r3/2    
    const B2 = C*C - A2   
    const cntr = {
        x:(s.p1.x+s.p2.x)/2,
        y:(s.p1.y+s.p2.y)/2,                
    }           
    return {        
        A2:A2, 
        B2:B2,
        C:C,
        cntr:cntr,
        alf:Math.atan2((cntr.y - s.p1.y),(cntr.x - s.p1.x))
    }        
}

const addError = (pos,error, side=1) =>{    
    const curr_err = error*side;
    return {
        x: pos.x + curr_err,
        y: pos.y + curr_err
    }
}

export const calcHyperbol = (strSend,error) =>{
    const res={left:{},right:{}}
    if (error == 0){       
        res.left  = analyzHyper(strSend)
        res.right = res.left
    }
    else{
        //---------------------
        const newStr1 = Object.assign({}, strSend);
        const newStr2 = Object.assign({}, strSend);       
        newStr1.r1+=error
        newStr2.r1-=error   
        res.left  = analyzHyper(newStr1)
        res.right = analyzHyper(newStr2)
    }
    return res
}

export const colorIicon = (color)=>{     
        const style=
            `background-color: ${color};
            width:1.5rem;
            height:1.5rem;
            display:block;
            left:-0.75rem;
            top:-0.75rem;
            opacity:0.9;
            position:relative;
            border-radius: 1rem 1.2rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF;`        
    
        return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 0],
      labelAnchor: [0, 0],
      popupAnchor: [0,0],
      html: `<span style="${style}" />`
    })
}

export const HSVtoRgbH = (e,mE)=>{
    let H=120-120*e/mE;
    let S=100;
    let V=100;

    if (H<0)
           return "#000000";

    let f , p, q , t, lH, R,G,B;
    S = (S > 1 )? S/100 : S;
    V = (V > 1)? V/100 : V;
    lH = parseInt (H / 60);
    f = H/60 - lH;
    p = V * (1 - S);
    q = V *(1 - S*f);
    t = (1 - (1-f)* S);

    switch (lH)
    {
            case 0: R = V; G = t; B = p; break;
            case 1: R = q; G = V; B = p; break;
            case 2: R = p; G = V; B = t; break;
            case 3: R = p; G = q; B = V; break;
            case 4: R = t; G = p; B = V; break;
            case 5: R = V; G = p; B = q; break;
    }
    let r = parseInt(R*255).toString(16);
    let g = parseInt(G*255).toString(16);
    let b = parseInt(B*255).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return "#"+(r + g + b).toUpperCase();
}


export const HSVtoRgbHZ  = (e,mE)=>{
    let H=360*e/mE;
    let S=100;
    let V=100;

    if (H<0)
            return "#000000";  

    let f , p, q , t, lH, R,G,B;
    S = (S > 1 )? S/100 : S;
    V = (V > 1)? V/100 : V;
    lH = parseInt (H / 60);
    f = H/60 - lH;
    p = V * (1 - S);
    q = V *(1 - S*f);
    t = (1 - (1-f)* S);

    switch (lH)
    {
            case 0: R = V; G = t; B = p; break;
            case 1: R = q; G = V; B = p; break;
            case 2: R = p; G = V; B = t; break;
            case 3: R = p; G = q; B = V; break;
            case 4: R = t; G = p; B = V; break;
            case 5: R = V; G = p; B = q; break;
    }        
    let r = parseInt(R*255).toString(16);
    let g = parseInt(G*255).toString(16);
    let b = parseInt(B*255).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return "#"+(r + g + b).toUpperCase();      
} 



