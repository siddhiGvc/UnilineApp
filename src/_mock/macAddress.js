// const API = import.meta.env.VITE_REACT_APP_API;

export const AllMacAddress=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`http://165.232.180.111:8080/kwikpay/getMacAddress`, { method: 'GET', headers });
      const json = await response.json();
      console.log(json)
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const sendFota=(MacID,fota,port)=>{
    const obj={
      MacId:MacID,
      outPutValue:true,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendFota`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    
  
  }
   
 export const sendReset=(MacID,port)=>{
    const obj={
      MacId:MacID,
    
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/reset`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendV=(MacID,Pin,Pulse,Port)=>{
    const obj={
      MacId:MacID,
      Pin,
      Pulse,
      socketNumber:Port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendV`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  
  export const sendFW=(MacID,port)=>{
    const obj={
      MacId:MacID,
   
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
  
 export const sendTC=(MacID,port)=>{
    const obj={
      MacId:MacID,
     
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
  
  export const sendTV=(MacID,port)=>{
    const obj={
      MacId:MacID,
     
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

  export const sendFotaUrl=(MacID,url,port)=>{
    const obj={
      MacId:MacID,
      Url:url,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendFotaUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askUrl=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askUrl`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCC=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendCC`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendLight=(MacID,light,position,port)=>{
    const obj={
      MacId:MacID,
      light,
      position,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendLight`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendHBT=(MacID,value,port)=>{
    const obj={
      MacId:MacID,
      value,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendHBT`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSIP=(MacID,ip,pin,port)=>{
    const obj={
      MacId:MacID,
      Ip:ip,
      Pin:pin,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSIP`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID=(MacID,SSID,port)=>{
    const obj={
      MacId:MacID,
      SSID,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSSID`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD=(MacID,PWD,port)=>{
    const obj={
      MacId:MacID,
      PWD,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendPWD`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendSSID1=(MacID,SSID1,port)=>{
    const obj={
      MacId:MacID,
      SSID1,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendSSID1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }
  export const sendPWD1=(MacID,PWD1,port)=>{
    const obj={
      MacId:MacID,
      PWD1,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendPWD1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const sendCA=(MacID,numValue,polarity,port)=>{
    const obj={
      MacId:MacID,
      numValue,
      polarity,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/sendCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const askCA=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/askCA`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }

  export const modeTest1=(MacID,port)=>{
    const obj={
      MacId:MacID,
      socketNumber:port
  
    }
    fetch(`http://165.232.180.111:8080/kwikpay/modeTest1`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
     
  
  }