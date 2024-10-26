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
// import {Card} from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';




// import Typography from '@mui/material/Typography';
// import { useRouter } from 'src/routes/hooks';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import Barchart from '../barchart'
import BoosterBar from '../booster';
import StatusLabel from '../statusLabel';
// import AppNewsUpdate from '../app-news-update';
// import { GetClentNameDetails } from "src/_mock/customers";

// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import {sendG1,sendG2,sendG3,AllMacAddress} from "../../../_mock/macAddress";
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
  const [value]=useState(0);
 
  const [value1,setValue1]=useState({MacID:'',SNoutput:''});
  const [selectedOption1, setSelectedOption1] = useState({id:-1});
  const [G1output,setG1Output]=useState([]);
  const [G2output,setG2Output]=useState([]);
  const [G3output,setG3Output]=useState([]);


  const max=100;
  const G3command=useCallback(async(MacID,SNoutput)=>{
    await sendG1(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG1Output(res);
    
    })
    await sendG2(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG2Output(res);
    
    })
   
    await sendG3(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG3Output(res);
     
    })
 
     
    
  },[])

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

        // const filteredData=res.filter((elem)=> online(elem) );
        // setData(filteredData);
  
        const formattedData = res.map((option,i) => ({
          value: option.MacID,
          label: option.MacID,
          id:i
        }));
  
      
  
        setOptions1(formattedData);
       
        if(selectedOption1.id>=0)
          {
            // console.log(res[selectedOption1.id]);
          
            setValue1(res[selectedOption1.id]);
           
          }
         
        
        
      })
  
   
  },[selectedOption1.id])


  useEffect(()=>{
    LoadData();
   const interval= setInterval(()=>{
      //  LoadData();
     LoadData();
      //  G1command();
     
    },10000)

    return ()=>clearInterval(interval);

  },[LoadData])

  useEffect(()=>{
    let Interval;
    if(value1.MacID && value1.SNoutput) 
      {
    G3command(value1.MacID,value1.SNoutput);
   //  G1command();
   
   Interval=setInterval(()=>{
     //  LoadData();
      G3command(value1.MacID,value1.SNoutput);
     //  G1command();
    
   },15000)
   }

   return ()=>clearInterval(Interval)
  },[value1.MacID,value1.SNoutput,G3command])

 
  useEffect(()=>{
    console.log(G2output.length>2 && G2output[2].split('')[0]);
  },[G2output])


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
  

  const thirdChar = G2output.length > 2 ? G2output[0].split('')[3] : null;
const fourthChar = G2output.length > 2 ? G2output[0].split('')[4] : null;

let statusLabel;
if (G2output.length > 2  && thirdChar === fourthChar) {
  statusLabel = <StatusLabel label="Battery Okay" isOn color='green' />; // On (Green)
} else if (G2output.length > 2  && thirdChar === '0' && fourthChar === '1') {
  statusLabel = <StatusLabel label="Battery Low" isOn color='orange'/>; // On (Green)
} else if(G2output.length > 2 && (thirdChar === '1' && fourthChar==='0') || (thirdChar === '1' && fourthChar==='1')) {
  statusLabel = <StatusLabel label="Low Battery Shutdown" isOn={false} color='red' />; // Off
}
else{
  statusLabel = <StatusLabel label="Battery Off" isOn={false} color='red' />;
}
  
 

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
            value={G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[0]:''}
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
            value={G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[1]:''}
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
            value={G3output.length>2 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[2]:''}
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
            value={G1output.length>2 ? G1output[5]:''}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[0]:''}
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
            value={G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[1]:''}
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
            value={G3output.length>2 && G3output[2].includes('/')?G3output[2].split('/')[2]:''}
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
            value={G1output.length>2 ? G1output[4]:''}
          />
        </Grid>


        <Grid container xs={6} sm={6} md={7}>
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output.length>2 && G3output.length>2 ?
       <StatusLabel label="Communicating With UPS" isOn={false} color='green' /> :<StatusLabel label="Not Communicating With UPS" isOn={false} color='red' />
        }
       </Grid>

       <Grid xs={4} sm={4} md={4}>
        {statusLabel}
      </Grid>
 
      <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[0].split('')[6] === '0'? 
       <StatusLabel label="Inverter On" isOn color='green' /> :  <StatusLabel label="Inverter Bad" isOn color='red' />}
     
      </Grid>
     
      <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[0].split('')[6] === '1' && G2output[1].split('')[7]==='1'? 
       <StatusLabel label="Mains On" isOn color='green' /> :  <StatusLabel label="Mains Off" isOn color='red' />}
     
      </Grid>
      {G2output.length>2 && G2output[0].split('')[6] === '1'  && G2output[1].split('')[7]==='0' && 
      <Grid xs={4} sm={4} md={4}>
       
       <StatusLabel label="Mains On-Inverter Bad" isOn color='orange' /> 
     
      </Grid>
        }
     
 
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[2].split('')[1] ==='1' ?
      <StatusLabel label="Unit Running" isOn={false} color='green' />:  <StatusLabel label="Emergency Stop" isOn={false} color='red' /> 
        }
       </Grid>
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[2].split('')[2] ==='1' ?
        <StatusLabel label="DC Okay" isOn={false} color='green' />:<StatusLabel label="High DC" isOn={false} color='red' /> 
        }
       </Grid>
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[2].split('')[4] ==='0' ?
       <StatusLabel label="No Overload" isOn={false} color='green' />: <StatusLabel label="Show Overload" isOn={false} color='red' /> 
        }
       </Grid>
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[2].split('')[6] ==='0' ?
       <StatusLabel label="Temperature Okay" isOn={false} color='green' />: <StatusLabel label="Over Temperature" isOn={false} color='red' /> 
        }
       </Grid>
       <Grid xs={4} sm={4} md={4}>
        {G2output.length>2 && G2output[2].split('')[7] ==='0' ?
        <StatusLabel label="Working" isOn={false} color='green' /> :<StatusLabel label="Short Circuit" isOn={false} color='red' />
        }
       </Grid>
        
       </Grid>

   
      
     
     
      
       
      <Grid container spacing={4} xs={5} sm={5} md={5}>
      
          <Grid xs={6} sm={6} md={6}>
         <BoosterBar value={G2output.length>2 && G2output[2].split('')[0]==='1' ? 100:0} max={max} title='Battery Charge'/>
         </Grid>
          <Grid xs={6} sm={6} md={6}>
         <BoosterBar value={value} max={max} title='UPS Load'/>
         {/* <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
        <button type="button" onClick={() => setValue(value + 10)} style={{ marginBottom: '10px' }}>Boost</button>
        <button type="button" onClick={() => setValue(value - 10)}>Reduce</button>
        </div> */}
           </Grid>
         
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
