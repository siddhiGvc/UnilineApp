
// const API = import.meta.env.VITE_REACT_APP_API;

const API='http://165.232.180.111:8080'

export const getCustomerData=async()=> {
  
    try {
       
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/getAllCustomerData`, { method: 'GET', headers  });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const getAllCustomerInfo=async()=> {
  
    try {
      
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/getAllCustomerInfo`, { method: 'GET', headers });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const updateData=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/unilineCustomers/postCustomerData`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }

  export const updateInfo=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/unilineCustomers/postCustomerInfo`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }


  export const deleteCustomerData=async(id)=>{

    console.log(id);
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/deleteCustomerData?id=${id}`,{ method: 'GET', headers });
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const EditCustomerData=async(obj,id)=>{
  
    
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/updateCustomerData?id=${id}`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const deleteCustomerInfo=async(id)=>{

    console.log(id);
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/unilineCustomers/deleteCustomerInfo?id=${id}`,{ method: 'GET', headers });
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const EditCustomerInfo=async(obj,id)=>{
  
    
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/updateCustomerData?id=${id}`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }

  export const GetClentNameDetails=async(obj)=>{

     
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/getCustomerDataByName`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  export const GetClentInfoDetails=async(obj)=>{

     
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/unilineCustomers/getCustomerInfoByName`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  
  
  