import { useRouter } from 'src/routes/hooks';

import { store } from "../Redux/store";
import { saveData } from "../Redux/action";


const API = 'http://localhost:8080';


export const getAllData = async () => {
    try {
      
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const city=JSON.parse(sessionStorage.getItem("cities"));
      const zone=JSON.parse(sessionStorage.getItem("zones"));
      const ward=JSON.parse(sessionStorage.getItem("wards"));
      const beat=JSON.parse(sessionStorage.getItem("beats"))
      const machineStatus=JSON.parse(sessionStorage.getItem("machineStatus"));
      // const stockStatus=JSON.parse(sessionStorage.getItem('stockStatus'));
      // const burn_status=JSON.parse(sessionStorage.getItem('burnStatus'))
  
      const response = await fetch(`${API}/testingBoard/getData?city=${city.join()}&zone=${zone.join()}&ward=${ward.join()}&beat=${beat.join()}&status=${machineStatus.join()}`, { method: 'GET', headers });
      const json = await response.json();
      // console.log(json.data);

      // storing response data in Redux/store
      store.dispatch(saveData(json.data));
  
      // Return the data or another value if needed
      return json.data;
    } catch (error) {
    
      console.error('Error fetching data:', error);
      return [];
    }
  };

 
 
  

export const zoneData=async(city)=> {

  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/testingBoard/getZones?city=${city}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
     
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

 export const wardData=async(city,zone)=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/testingBoard/getWards?city=${city}&zone=${zone}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
    
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const beatData=async(city,zone,ward)=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/testingBoard/getBeats?city=${city}&zone=${zone}&ward=${ward}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    
      return [];
    }
  }


  export const Machines=async(city,zone,ward,beat)=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/master/machine?city=${city}&zone=${zone}&ward=${ward}&beat=${beat}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    
      return [];
    }
  }


  
  export const useDataFetching = () => {
    const router = useRouter();
  
    const fetchDataWithRouter = async () => {
      try {
        const data = await getAllData();
        // Process the data or update the state as needed
        console.log('Data:', data);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        router.push('/');
      }
    };
  
    return { fetchDataWithRouter };
  };