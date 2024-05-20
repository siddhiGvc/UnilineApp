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