const API = 'http://165.232.180.111:8080';

export const AllMachines=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/testingBoard/getMacAddress`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const mapping=async(obj)=>{
    try {
      const headers = new Headers({
        'Content-type':'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/testingBoard/addDevice`, { method: 'POST', headers ,body:JSON.stringify(obj)});
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }

  }