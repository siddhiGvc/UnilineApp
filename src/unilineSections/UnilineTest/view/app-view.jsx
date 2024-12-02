import $ from 'jquery';
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
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
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
import {AllMacAddress} from "../../../_mock/macAddress";
// import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";



// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------


// started function of dashboard ui here

// const UserInfo=JSON.parse(sessionStorage.getItem("userInfo")) || [] ;


const ERROR1 = import.meta.env.VITE_REACT_APP_ERROR1;
const ERROR2 = import.meta.env.VITE_REACT_APP_ERROR2;
const ERROR3 = import.meta.env.VITE_REACT_APP_ERROR3;
const ERROR4 = import.meta.env.VITE_REACT_APP_ERROR4;
const ERROR5 = import.meta.env.VITE_REACT_APP_ERROR5;

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AppView() {
  // const [cities,setCities]=useState([]);
  const [pathName]=useState([]);
  const [options1,setOptions1]=useState([]);
  const [row,setRow]=useState({});
  const [data,setData]=useState([])
  const [value]=useState(0);
 
  // const [setValue1]=useState({MacID:'',SNoutput:''});
  const [selectedOption1, setSelectedOption1] = useState({id:-1});
  // const [data,setData]=useState([]);
  const [G1output,setG1Output]=useState([]);
  const [G2output,setG2Output]=useState([]);
  const [G3output]=useState([]);
  
  const [GFoutput,setGFOutput]=useState([]);

  const [openModal,setOpenModal] = useState(false);


  

  const handleModalOpen = () => {
   
      setOpenModal(true);
  
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setTimeout(()=>{
      $('[name="machine"]').val('').trigger('change');
      $('[name="uid"]').val('').trigger('change');
      $('[name="city"]').val('Mumbai').trigger('change');
      $('[name="installedOn"]').val('').trigger('change');
    },200)
  };
  


  const max=100;
  // const command=useCallback(async(MacID,SNoutput)=>{
  //   await sendG1(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setG1Output(res);
    
  //   })
  //   await sendG2(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setG2Output(res);
    
  //   })
   
  //   await sendG3(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setG3Output(res);
     
  //   })

  //   await sendI(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setIOutput(res);
     
  //   })

  //   await sendGF(MacID,SNoutput,sessionStorage.getItem("name")).then((res)=>{
  //     console.log(res);
  //     setGFOutput(res);
     
  //   })
 
     
    
  // },[])

  

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
          
            // setValue1(res[selectedOption1.id]);
            console.log(res[selectedOption1.id]);
            setRow(res[selectedOption1.id]);
            setG1Output(res[selectedOption1.id].G1.toString().split(','))
            setG2Output(res[selectedOption1.id].G2.toString().split(','))
            // setG3Output(res[selectedOption1.id].G3.toString().split(','))
            // setIOutput(res[selectedOption1.id].I.toString().split(','))
            setGFOutput(res[selectedOption1.id].GF.toString().split(','))
           
          }
         
        
        
      })
  
   
  },[selectedOption1.id])


  useEffect(()=>{
    LoadData();
   const interval= setInterval(()=>{
      //  LoadData();
     LoadData();
      //  G1command();
     
    },2000)

    return ()=>clearInterval(interval);

  },[LoadData])

  // useEffect(()=>{
  //   let Interval;
  //   if(value1.MacID && value1.SNoutput) 
  //     {
  //   command(value1.MacID,value1.SNoutput);
  //  //  G1command();
   
  //  Interval=setInterval(()=>{
  //    //  LoadData();
  //     command(value1.MacID,value1.SNoutput);
  //    //  G1command();
    
  //  },15000)
  //  }

  //  return ()=>clearInterval(Interval)
  // },[value1.MacID,value1.SNoutput,command])

 
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
  
 

const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 1;

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
             
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          

<Typography variant="h5">
  <Box component="span" sx={{ fontWeight: '400', fontSize: '1em', color: '#333' }}>
    Company:
  </Box> 
  <Box component="span" sx={{ marginLeft: 1 }}>
    {row?.Company}
  </Box>
  <Box component="span" sx={{ fontWeight: '400', fontSize: '1em', color: '#333', marginLeft: 2 }}>
    Model:
  </Box> 
  <Box component="span" sx={{ marginLeft: 1 }}>
    {row?.Model}
  </Box>
  <Box component="span" sx={{ fontWeight: '400', fontSize: '1em', color: '#333', marginLeft: 2 }}>
    Version:
  </Box> 
  <Box component="span" sx={{ marginLeft: 1 }}>
    {row?.Version}
  </Box>
</Typography>



         <button type='button' className="btn btn-sm btn-success mx-2 text-white float-right" id="btn-mapping" onClick={handleModalOpen}>About Device</button>

        {/* <Button variant="contained" color="inherit"  onClick={handleOpenMenu} startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>
      <Grid container spacing={3} >
        {/* total Machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage 1"
            text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.IpVoltage1}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage 2"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.IpVoltage2}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Input Voltage 3"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.IpVoltage3}
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
            value={row?.IpFrequency}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage 1"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.OpVoltage1}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage 2"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.OpVoltage2}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Output Voltage 3"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.OpVoltage3}
          />
        </Grid>
        
           {/* item dispensed */}
        <Grid xs={12} sm={6} md={3}>
           <AppWidgetSummary
            title="Output Frequency"
             text='Hz'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.OpFrequency}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Load 1"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.Load1}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Load 2"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.Load2}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
        <AppWidgetSummary
            title="Load 3"
             text='Vsc'
            total={pathName.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
            value={row?.Load3}
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
        {G2output.length>2 && G2output[0].split('')[6] === '1'? 
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
  {(() => {
    const errorChecks = {
      1: ERROR1,
      2: ERROR2,
      4: ERROR3,
      6: ERROR4,
      7: ERROR5,
    };

    const errorLabel = Object.entries(errorChecks).find(
      ([position]) => G2output.length > 2 && G2output[2].split('')[position] === '1'
    );

    return errorLabel 
      ? <StatusLabel label={errorLabel[1]} isOn={false} color="red" />
      : <StatusLabel label="Okay" isOn={false} color="green" />;
  })()}
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
    
     
     

      </Grid>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">ABOUT DEVICE</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <table className="table" style={{fontSize:'14px'}}>
                            <tbody> 
                                
                             

                                <tr><th style={{color: '#444'}}>Rectiier - Phase 2 Neutral</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[0].includes('/')?GFoutput[0].split('!')[1].split('/')[0]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Rectiier - Phase 2 Phase</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[0].includes('/')?GFoutput[0].split('!')[1].split('/')[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Rectifier Topology</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Rectifier Frequency</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[2]:''}</td></tr>
                               
                                <tr><th style={{color: '#444'}}>Bypass - Phase 2 Neutral</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[3].includes('/')?GFoutput[3].split('/')[0]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Bypass - Phase 2 Phase</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[3].includes('/')?GFoutput[3].split('/')[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Bypass Topology</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[4]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Bypass Frequency</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[5]:''}</td></tr>

                                <tr><th style={{color: '#444'}}>Output - Phase 2 Neutral</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[6].includes('/')?GFoutput[6].split('/')[0]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Output - Phase 2 Phase</th><td style={{color: '#444'}}>{GFoutput.length>2 && GFoutput[6].includes('/')?GFoutput[6].split('/')[1]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Output Topology</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[7]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>UPS Output Frequency</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[8]:''}</td></tr>
                             
                                <tr><th style={{color: '#444'}}>UPS Battery Voltage</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[9]:''}</td></tr>
                                <tr><th style={{color: '#444'}}>Power Rating</th><td style={{color: '#444'}}>{GFoutput.length>2 ?GFoutput[10]:''}</td></tr>
                            </tbody>
              </table>
              
            </div>
          
        </div>
    </div>
    

        </Box>
        </Modal>
    </Container>
  );
}
