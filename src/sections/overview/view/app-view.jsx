import moment from "moment";
import Select from 'react-select';
// import { faker } from '@faker-js/faker';
// import moment from "moment";
import { useState,useEffect,useCallback } from 'react';

// import "../calibration.css";

// import { useLocation } from 'react-router-dom';
// import { useState} from 'react';
// import GaugeChart from 'react-gauge-chart';
// import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';



// import Typography from '@mui/material/Typography';
// import { useRouter } from 'src/routes/hooks';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
import StatusLabel from '../statusLabel';
// import AppNewsUpdate from '../app-news-update';
// import { GetClentNameDetails } from "src/_mock/customers";

// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import {sendG3,AllMacAddress} from "../../../_mock/macAddress";
// import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";



// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------


// started function of dashboard ui here

// const UserInfo=JSON.parse(sessionStorage.getItem("userInfo")) || [] ;
export default function AppView() {
  // const [cities,setCities]=useState([]);
  const [pathName]=useState([]);
  const [options1,setOptions1]=useState([]);
  const [data,setData]=useState([])
  const [value1,setValue1]=useState({MacID:'',SNoutput:''});
  const [selectedOption1, setSelectedOption1] = useState({id:-1});
  // const [G1output,setG1Output]=useState([]);
  const [G3output,setG3Output]=useState([]);
  const G3command=useCallback(()=>{
   
    sendG3(value1.MacID,value1.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG3Output(res);
     
    })
    // sendG1('E4:65:B8:14:A4:44','GVC-CUPS-4005',sessionStorage.getItem("name")).then((res)=>{
    //   console.log(res);
    //   setG1Output(res);
    //   setTimeout(()=>{
    //        setG1Output([]);
    //   },5000)
    // })
  },[value1])

  // const G1command=useCallback(()=>{
  
  //   sendG1('E4:65:B8:14:A4:44','GVC-CUPS-4005',sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setG1Output(res);
  //     setTimeout(()=>{
  //          setG1Output([]);
  //     },5000)
  //   })
  // },[])
  // const [machineType]=useState('');

  // const [value, setValue] = useState(50); // Set default value at 50%

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };
 

  // calling for api data
  const LoadData=useCallback(()=>{
    const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
       console.log(UserInfo);

    
       AllMacAddress().then((res)=>{

        const filteredData=res.filter((elem)=> online(elem) );
        setData(filteredData);
  
        const formattedData = filteredData.map((option,i) => ({
          value: option.MacID,
          label: option.MacID,
          id:i
        }));
  
      
  
        setOptions1(formattedData);
       
        if(selectedOption1.id>=0)
          {
            // console.log(res[selectedOption1.id]);
          
            setValue1(filteredData[selectedOption1.id]);
           
          }
         
        
        
      })
  
   
  },[setOptions1,setValue1,selectedOption1])

 

  // calling loadData every 5 seconds
  useEffect(() => {
  
     LoadData();
     G3command();
    //  G1command();
    
    const interval=setInterval(()=>{
       LoadData();
       G3command();
      //  G1command();
     
    },5000)

    return(()=>{
      clearInterval(interval);
    })
  

 
   
  },[LoadData,G3command]);


  const handleSelectChange1 = (elem) => {
    setSelectedOption1(elem);
    
   
    AllMacAddress().then((res)=>{
    
      const filteredData=res.filter((m)=> online(m) )
      console.log(filteredData)
      setData(filteredData);
      console.log(data);
      // setValue1(res[elem.id]);
      
    })
  };
  
  
 
  // const theme = useTheme('...');
  // const router=useRouter();


  // filtering onlines machines
  // const filterOnline = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;
  
  // const online = m => moment().diff(moment.utc((m.lastHeartbeatTime || m.lastOnTime).replace('Z', '')), 'minute') < 5;


  // converting value in the form of lacks, thousand ,Coror
//   const amountText = amt => {
//     amt = amt || 0;
 
//     if(amt>=10000000) {
//         const cr = parseInt(amt / 100000, 10) / 100;
//         const Cr = parseFloat(cr.toFixed(2));
//         return `${Cr} Cr`;
//     } 
//     if(amt>=1000000) {
//         const l = parseInt(amt / 1000 ,10) / 100;
//         const L = parseFloat(l.toFixed(6));
//         return  `${L} L`;
//     } 
//     if(amt>=1000) {
//         const k = parseInt(amt / 10 ,10) / 100;
//         const K = parseFloat(k.toFixed(2));
//         return  `${K} K`;
//     }

//     // Remove the unnecessary else statement
//     return amt;
// }



 // calulating some of two numbers
//  const sum = (a, b) => a + b;

  
const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;

  return (
    <Container maxWidth="xxl" >
       <div className="row">
                    <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Device:</h6>
                            <Select
                                name="board1"
                                value={selectedOption1}
                                onChange={handleSelectChange1}
                                options={options1}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            />
                        
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                   
              </div>
           
        
      <Grid container spacing={3} >
        {/* total Machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage"
            text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[0]:''}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[1]:''}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[2]:''}
          />
        </Grid>
           {/* item dispensed */}
        <Grid xs={12} sm={6} md={3}>
           <AppWidgetSummary
            title="Input Frequency"
             text='Hz'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={1}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>2 && G3output[2].includes('/')?G3output.split('/')[0]:''}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>2 && G3output[2].includes('/')?G3output.split('/')[1]:''}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>2 && G3output[2].includes('/')?G3output.split('/')[2]:''}
          />
        </Grid>
        
           {/* item dispensed */}
        <Grid xs={12} sm={6} md={3}>
           <AppWidgetSummary
            title="Temperature"
             text='F'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={1}
          />
        </Grid>

       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="Not Communicating With UPS" isOn={false} /> {/* On (Green) */}
       </Grid>
       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="AC Input Normal" isOn /> {/* On (Green) */}
       </Grid>
       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="Battery Normal" isOn /> {/* On (Green) */}
       </Grid>
       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="Battery Bad" isOn /> {/* Off (Red) */}
  
       </Grid>
       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="Bypass Mode" isOn /> {/* On (Green) */}
       </Grid>
       <Grid xs={6} sm={6} md={6}>
       <StatusLabel label="UPS Self Test" isOn /> {/* On (Green) */}
       </Grid>
     
     
      
      
      
     
     

        {/* Machine Status */}
        {/* <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title="Machine Status"
            chart={{
              series: [
                { label: 'Online', value:pathName.filter(filterOnline).length||0 },
                { label: 'Offline', value:(pathName.length - pathName.filter(filterOnline).length) ||0},
             
              ],
              colors:[
                theme.palette.success.main,
                theme.palette.error.main,
              ]
            }}
          />
        </Grid> */}
       
        {/* Stcok Status */}
        {/* <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title="Stock Status"
            chart={{
              series: [
                { label: 'Ok', value: pathName.filter(filterOnline).filter(m => m.spiral_a_status === 3).length ||0},  // Example color
                { label: 'Low', value: pathName.filter(filterOnline).filter(m => m.spiral_a_status === 1).length ||0},
                { label: 'Empty', value: pathName.filter(filterOnline).filter(m => m.spiral_a_status === 0).length ||0 },
                { label: 'Unknown', value:pathName.filter(filterOnline).filter(m => m.spiral_a_status === 2).length ||0},
              ],
              colors:[
                theme.palette.success.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.info.main,
               
               
               ]
             
            }}
          />
        </Grid> */}
     {/* </Grid> */}
        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
