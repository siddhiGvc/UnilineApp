

import { store } from "../Redux/store";
import { saveData } from "../Redux/action";

// const API = import.meta.env.VITE_REACT_SERVER_API;

export const AllMacAddress=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });

      const response = await fetch(`http://165.232.180.111:8080/testingBoard/getMacAddress`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const ReportData=async(city,zone,ward,beat,serialNumbers,startDate,endDate)=> {
  
    try {
        const obj={
            city:city.join(),
            zone:zone.join(),
            ward:ward.join(),
            beat:beat.join(),
            devices:serialNumbers.join(),
            startDate,
            endDate,
        }
        console.log(obj);
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`http://165.232.180.111:8080/testingBoard/report`, { method: 'POST', headers ,body:JSON.stringify(obj) });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const getData=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const city=JSON.parse(sessionStorage.getItem("cities"));

      const response = await fetch(`http://165.232.180.111:8080/kwikpay/getData?city=${city.join()}`, { method: 'GET', headers });
      const json = await response.json();

      store.dispatch(saveData(json.data));
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const getTestMode=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`http://165.232.180.111:8080/kwikpay/getTestMode`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const setTestMode=()=>{
  
    fetch(`http://165.232.180.111:8080/kwikpay/setTestMode`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      }
    })
    
  
  }


  export const sendFota=(MacID,fota,port,name,type)=>{
    const obj={
      MacId:MacID,
      outPutValue:true,
      socketNumber:port,
      UserName:name,
      type
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendFota`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }
   
 export const sendReset=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port,
      
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/reset`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendV=(MacID,Pin,Pulse,Port,name)=>{
    const obj={
      MacId:MacID,
      Pin,
      Pulse,
      socketNumber:Port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendV`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendFW=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendFW`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
 export const sendTC=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendTC`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendTV=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      UserName:name,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendTV`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendFotaUrl=(MacID,url,port,name)=>{
    const obj={
      MacId:MacID,
      Url:url,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendFotaUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askUrl=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCC=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendCC`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setSN=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      SerialNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/setSN`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendPassThru=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      PassThru:SN
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendPassThru`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkPassThru=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/checkPassThru`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setErase=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      Erase:SN
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/setErase`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setL=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      LNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/setL`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkErase=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/checkErase`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  

  export const checkSN=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/checkSN`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const setPair=(MacID,port,name,SN)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name,
      PairNumber:SN
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/setPair`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const checkPair=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
    
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/checkPair`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  

  export const sendLight=(MacID,light,position,port,name)=>{
    const obj={
      MacId:MacID,
      light,
      position,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendLight`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendHBT=(MacID,value,port,name)=>{
    const obj={
      MacId:MacID,
      value,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendHBT`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSIP=(MacID,ip,pin,port,name)=>{
    const obj={
      MacId:MacID,
      Ip:ip,
      Pin:pin,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSIP`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID=(MacID,SSID,port,name)=>{
    const obj={
      MacId:MacID,
      SSID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSSID`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const askSSID=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
   
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askSSID`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD=(MacID,PWD,port,name)=>{
    const obj={
      MacId:MacID,
      PWD,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendPWD`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID1=(MacID,SSID1,port,name)=>{
    const obj={
      MacId:MacID,
      SSID1,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSSID1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD1=(MacID,PWD1,port,name)=>{
    const obj={
      MacId:MacID,
      PWD1,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendPWD1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCA=(MacID,numValue,polarity,port,name)=>{
    const obj={
      MacId:MacID,
      numValue,
      polarity,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askCA=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askSIP=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askSIP`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest1=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/modeTest1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest2=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/modeTest2`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest3=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/modeTest3`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeNone=(MacID,port,name)=>{
    const obj={
      MacId:MacID,
      socketNumber:port,
      UserName:name
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/modeNone`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }



  export const getAllOutputs=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });

      const response = await fetch(`http://165.232.180.111:8080/kwikpayTesting/getOutPuts`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const sendG1=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendG1`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }

  export const sendG2=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendG2`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }
  export const sendG3=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendG3`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }

  export const sendI=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendI`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }

  export const sendGF=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendGF`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }

  export const sendQ=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendQ`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }

  export const sendQ1=async(MacID,SN,name)=>{
    const obj={
      MacId:MacID,
      serialNumber:SN,
      UserName:name,
      
  
    }
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`http://165.232.180.111:8080/testingBoard/sendQ1`, { method: 'POST', headers,body:JSON.stringify(obj) });
    const json = await response.json();
    // console.log(json)
    return json.data;
     
  
  }