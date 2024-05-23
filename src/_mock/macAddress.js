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