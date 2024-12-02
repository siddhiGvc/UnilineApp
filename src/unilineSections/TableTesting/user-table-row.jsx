import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{useState,useEffect, useCallback} from 'react';
// import SwitchButton from 'bootstrap-switch-button-react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
// import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import { SaveFaultReport } from 'src/_mock/faultReportData';
import {sendI,sendQ,sendQ1,sendGF,sendG1,sendG2,sendG3} from 'src/_mock/macAddress';

import Label from 'src/components/label';
// import { Table } from '@mui/material';
// import { Y } from 'dist/assets/index-8d78d312';



const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

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


function Component1 ({m,board}){
  const [G1output,setG1Output]=useState([]);
  const G1command=useCallback(()=>{
    console.log(m.SNoutput);
    sendG1(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
  
      setG1Output(res);
      setTimeout(()=>{
           setG1Output([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

   useEffect(()=>{
    if(m.MacID)
    {
       G1command();
    }
   },[G1command,m.MacID])

    return <>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button  type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G1command()} >
                                              G1/r/n
                                            </button>
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <td >
                              <Typography>
                                {G1output[0]==='D'? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables' >
                                     
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>G1</td>
                                      </tr>
                                      <tr>
                                          <th>Start Byte</th>
                                          <td>{G1output.length>1 && G1output[0].includes('!')? '!':''}</td>
                                      </tr>
                                      <tr>
                                          <th>Battery Voltage</th>
                                          <td>{G1output.length>1 && G1output[0].split('!')[1]}</td>
                                      </tr>
                                      <tr>
                                          <th>Battery Capacity</th>
                                          <td>{G1output[1]}</td>
                                      </tr>
                                      <tr>
                                          <th>Remaining Time</th>
                                          <td>{G1output[2]}</td>
                                       </tr>
                                       <tr>
                                          <th>Battery Mode</th>
                                          <td>{G1output[3]}</td>
                                        </tr>
                                        <tr>
                                          <th>Temperature</th>
                                          <td>{G1output[4]}</td>
                                         </tr>
                                         <tr>
                                          <th>IP Frequency</th>
                                          <td>{G1output[5]}</td>
                                          </tr>
                                          <tr>
                                          <th>Bypass Frequency</th>
                                          <td>{G1output[6]}</td>
                                          </tr>
                                          <tr>
                                          <th>Output Frequency</th>
                                          <td>{G1output[7]}</td>
                                          </tr>
                                          <tr>
                                          <th>Stop Byte</th>
                                          <td>{G1output[8]}</td>
                                          </tr>
                                          {/* <td>{G1output[9]}</td> */}
                                          {/* <td>{G1output[10]}</td> */}
                                          {/* <td>{G1output[11]}</td> */}
                                        
                                  
                                      </tbody>
                                  </table>
                                  }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </>  
      
}



function Component2({m,board}){
  const [G2output,setG2Output]=useState([]);

  const G2command=useCallback(()=>{
    console.log(m.SNoutput);
    sendG2(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG2Output(res);
      setTimeout(()=>{
           setG2Output([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
    G2command()
    }
  },[G2command,m.MacID])

   return <>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G2command()} >
                                              G2/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {G2output[0]==='D' ? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables' >
                                     
                                      <tbody>
                                          <tr>
                                              <th>Command</th>
                                              <td>G2</td>
                                          </tr>
                                       
                                          <tr>
                                            <th>Low Battery Shut Down</th>
                                            <td>{G2output.length>1 && G2output[0].includes('!')? '!':''}</td>
                                          </tr>
                                          <tr>
                                            <th>Low Battery</th>
                                            <td>{G2output.length>1 && G2output[0].split('!')[1]}</td>
                                          </tr>
                                          <tr>
                                             <th>Topology</th>
                                             <td>{G2output[1]}</td>
                                          </tr>
                                          <tr>
                                            <th>Backup/AC Normal</th>
                                            <td>{G2output[2]}</td>
                                          </tr>
                                          <tr>
                                            <th>BoostT/Float Chanrging</th>
                                             <td>{G2output[3]}</td>
                                          </tr>
                                          <tr>
                                            <th>Rectifier Operating</th>
                                            <td>{G2output[4]}</td>
                                          </tr>
                                          <tr>
                                             <th>Bypass Frequency Fail</th>
                                             <td>{G2output[5]}</td>
                                          </tr>
                                          <tr>
                                             <th>Manual Bypass Breaker</th>
                                             <td>{G2output[6]}</td>
                                          </tr>
                                          <tr>
                                             <th>Bypass AC</th>
                                             <td>{G2output[7]}</td>
                                          </tr>
                                          <tr>
                                             <th>Static Switch</th>
                                             <td>{G2output[8]}</td>
                                          </tr>
                                         <tr>
                                           <th>Inverter Operating</th>
                                            <td>{G2output[9]}</td>
                                         </tr>
                                         <tr>
                                           <th>Emergency Stop</th>
                                           <td>{G2output[10]}</td>
                                         </tr>
                                         <tr>
                                           <th>High DC Shut Down</th>
                                           <td>{G2output[11]}</td>
                                         </tr>
                                         <tr>
                                           <th>Manual Bypass Breaker Shut Down</th>
                                           <td>{G2output[12]}</td>
                                         </tr>
                                         <tr>
                                           <th>Overload Shutdown</th>
                                           <td>{G2output[13]}</td>
                                         </tr>
                                         <tr>
                                          <th>Shot Circuit Shut Down</th>
                                          <td>{G2output[14]}</td>
                                         </tr>
                                        
                                          
                                         
                                         
                                          
                                        
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </> 

   
}

function Component3({m,board}){
  const [G3output,setG3Output]=useState([]);
  const G3command=useCallback(()=>{
    console.log(m.SNoutput);
    sendG3(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setG3Output(res);
      setTimeout(()=>{
           setG3Output([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
      G3command()
    }
   
  },[G3command,m.MacID])
  
  return <>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button  type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>G3command()} >
                                              G3/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  { G3output[0]==='D' ?<h5>Device Is Not Responding</h5>:
                                  <table className='AllTables' >
                                      <thead>
                                        <th />
                                        <th>Phase 1</th>
                                        <th>Phase 2</th>
                                        <th>Phase 3</th>
                                        
                                      </thead>
                                      <tbody>
                                       <tr>
                                          <th>Input</th>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[0]:''}</td>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[1]:''}</td>
                                          <td>{G3output.length>1 && G3output[0].includes('!')?  G3output[0].split('!')[1].split('/')[2]:''}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Bypass</th>
                                          <td>{G3output.length>1 && G3output[1].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[1].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[1].split('/')[2]}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Output</th>
                                          <td>{G3output.length>1 && G3output[2].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[2].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[2].split('/')[2]}</td>
                                        
                                        </tr>
                                        <tr>
                                          <th>Load %</th>
                                          <td>{G3output.length>1 && G3output[3].split('/')[0]}</td>
                                          <td>{G3output.length>1 && G3output[3].split('/')[1]}</td>
                                          <td>{G3output.length>1 && G3output[3].split('/')[2]}</td>
                                        
                                        </tr>
                                      </tbody>
                                  </table>
                                   }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </>   


}
function Component4({m,board}){
  const [Ioutput,setIOutput]=useState([]);
  const Icommand=useCallback(()=>{
    console.log(m.SNoutput);
    sendI(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setIOutput(res);
      setTimeout(()=>{
           setIOutput([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
    Icommand()
    }
  },[Icommand,m.MacID])
  
  return  <>
                                  <th style={{display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-5 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Icommand()} >
                                              I/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {Ioutput[0]==='G'? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables' >
                                     
                                      <tbody>
                                        <tr>
                                          <th>Command</th>
                                          <td>I</td>
                                        </tr>
                                        <tr>
                                          <th>Company</th>
                                          <td>{Ioutput.length>1 && Ioutput[1] }</td>
                                        </tr>
                                        <tr>
                                        <th>Model</th>
                                         <td>{Ioutput.length>1 && Ioutput[2]}</td>
                                        </tr>
                                         <tr>
                                         <th>Version</th>
                                         <td>{Ioutput.length>1 && Ioutput[3]}</td>
                                          </tr>
                                 
                                       
                                         
                                      </tbody>
                                  </table>
                                 }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
                              </>   

  
}
function Component5({m,board}){
  const [GFoutput,setGFOutput]=useState([]);
  

  const GFcommand=useCallback(()=>{
    console.log(m.SNoutput);
    sendGF(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setGFOutput(res);
      setTimeout(()=>{
          setGFOutput([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
       GFcommand();
    }
  },[GFcommand,m.MacID])
  
  return <> <th style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>GFcommand()} >
                                              GF/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {GFoutput[0]==='D' ? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables'>
                                  
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>GF</td>
                                        </tr>
                                       <tr>
                                          <th>Rectifier -Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[0].split('!')[1].split('/')[0] }</td>
                                       </tr>
                                       <tr>
                                         <th>Rectifier - Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[0].split('!')[1].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Rectifier Frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[2] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[3].split('/')[0] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[3].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Bypass Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[4] }</td>
                                        </tr>
                                        <tr>
                                           
                                          <th>Bypass frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[5] }</td>
                                        </tr>
                                        <tr>
                                          
                                          <th>Ouput voltage Phase 2 Neutral</th>
                                          <td>{GFoutput.length>1 && GFoutput[6].split('/')[0] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Phase 2 Phase</th>
                                          <td>{GFoutput.length>1 && GFoutput[6].split('/')[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Topology</th>
                                          <td>{GFoutput.length>1 && GFoutput[7]}</td>
                                        </tr>
                                        <tr>
                                          <th>Output Frequency</th>
                                          <td>{GFoutput.length>1 && GFoutput[8]}</td>
                                        </tr>
                                        <tr>
                                          <th>Battery Voltage</th>
                                          <td>{GFoutput.length>1 && GFoutput[9]}</td>
                                        </tr>
                                        <tr>
                                          <th>Power Rating</th>
                                          <td>{GFoutput.length>1 && GFoutput[10] }</td>
                                        </tr>
                                         
    
                                       
                                         
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
         
  </>

}

function Component6({m,board}){
  const [Qoutput,setQOutput]=useState([]);
  

  const Qcommand=useCallback(()=>{
    console.log(m.SNoutput);
    sendQ(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setQOutput(res);
      setTimeout(()=>{
          setQOutput([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
       Qcommand();
    }
  },[Qcommand,m.MacID])
  
  return <> <th style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Qcommand()} >
                                              Q/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {Qoutput[0]==='D' ? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables'>
                                  
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>Q</td>
                                        </tr>
                                       <tr>
                                          <th>Start Byte</th>
                                          <td>{Qoutput.length>1 && Qoutput[0] }</td>
                                       </tr>
                                       <tr>
                                         <th>I/P Voltage</th>
                                          <td>{Qoutput.length>1 && Qoutput[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>I/P Fault Voltage</th>
                                          <td>{Qoutput.length>1 && Qoutput[2] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Voltage</th>
                                          <td>{Qoutput.length>1 && Qoutput[3] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Current</th>
                                          <td>{Qoutput.length>1 && Qoutput[4] }</td>
                                        </tr>
                                        <tr>
                                          <th>Input Frequence</th>
                                          <td>{Qoutput.length>1 && Qoutput[5]}</td>
                                        </tr>
                                        <tr>
                                          <th>Battery voltage</th>
                                          <td>{Qoutput.length>1 && Qoutput[7] }</td>
                                        </tr>
                                        <tr>
                                           
                                          <th>Temperature</th>
                                          <td>{Qoutput.length>1 && Qoutput[8] }</td>
                                        </tr>
                                        <tr>
                                          
                                          <th>Status</th>
                                          <td>{Qoutput.length>1 && Qoutput[9]}</td>
                                        </tr>
                                        <tr>
                                          <th>B7</th>
                                          <td>{Qoutput.length>1 && Qoutput[10]}</td>
                                        </tr>
                                        <tr>
                                          <th>B6</th>
                                          <td>{Qoutput.length>1 && Qoutput[11]}</td>
                                        </tr>
                                        <tr>
                                          <th>B5</th>
                                          <td>{Qoutput.length>1 && Qoutput[12]}</td>
                                        </tr>
                                        <tr>
                                          <th>B4</th>
                                          <td>{Qoutput.length>1 && Qoutput[13]}</td>
                                        </tr>
                                        <tr>
                                          <th>B3</th>
                                          <td>{Qoutput.length>1 && Qoutput[14] }</td>
                                        </tr>
                                        <tr>
                                          <th>B2</th>
                                          <td>{Qoutput.length>1 && Qoutput[15] }</td>
                                        </tr>
                                        <tr>
                                          <th>B1</th>
                                          <td>{Qoutput.length>1 && Qoutput[16] }</td>
                                        </tr>
                                        <tr>
                                          <th>B0</th>
                                          <td>{Qoutput.length>1 && Qoutput[17] }</td>
                                        </tr>
                                         
                                         
    
                                       
                                         
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
         
  </>

}

function Component7({m,board}){
  const [Q1output,setQ1Output]=useState([]);
  

  const Q1command=useCallback(()=>{
    console.log(m.SNoutput);
    sendQ1(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setQ1Output(res);
      setTimeout(()=>{
          setQ1Output([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
       Q1command();
    }
  },[Q1command,m.MacID])
  
  return <> <th style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Q1command()} >
                                              Q1/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {Q1output[0]==='D' ? <h5>Device Is Not Responding</h5>:
                                  <table className='AllTables'>
                                  
                                      <tbody>
                                      <tr>
                                          <th>Command</th>
                                          <td>Q1</td>
                                        </tr>
                                       <tr>
                                          <th>Start Byte</th>
                                          <td>{Q1output.length>1 && Q1output[0] }</td>
                                       </tr>
                                       <tr>
                                         <th>I/P Voltage</th>
                                          <td>{Q1output.length>1 && Q1output[1] }</td>
                                        </tr>
                                        <tr>
                                          <th>I/P Fault Voltage</th>
                                          <td>{Q1output.length>1 && Q1output[2] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Voltage</th>
                                          <td>{Q1output.length>1 && Q1output[3] }</td>
                                        </tr>
                                        <tr>
                                          <th>Output Current</th>
                                          <td>{Q1output.length>1 && Q1output[4] }</td>
                                        </tr>
                                        <tr>
                                          <th>Input Frequence</th>
                                          <td>{Q1output.length>1 && Q1output[5]}</td>
                                        </tr>
                                        <tr>
                                          <th>Battery voltage</th>
                                          <td>{Q1output.length>1 && Q1output[7] }</td>
                                        </tr>
                                        <tr>
                                           
                                          <th>Temperature</th>
                                          <td>{Q1output.length>1 && Q1output[8] }</td>
                                        </tr>
                                        <tr>
                                          
                                          <th>Status</th>
                                          <td>{Q1output.length>1 && Q1output[9]}</td>
                                        </tr>
                                        <tr>
                                          <th>B7</th>
                                          <td>{Q1output.length>1 && Q1output[10]}</td>
                                        </tr>
                                        <tr>
                                          <th>B6</th>
                                          <td>{Q1output.length>1 && Q1output[11]}</td>
                                        </tr>
                                        <tr>
                                          <th>B5</th>
                                          <td>{Q1output.length>1 && Q1output[12]}</td>
                                        </tr>
                                        <tr>
                                          <th>B4</th>
                                          <td>{Q1output.length>1 && Q1output[13]}</td>
                                        </tr>
                                        <tr>
                                          <th>B3</th>
                                          <td>{Q1output.length>1 && Q1output[14] }</td>
                                        </tr>
                                        <tr>
                                          <th>B2</th>
                                          <td>{Q1output.length>1 && Q1output[15] }</td>
                                        </tr>
                                        <tr>
                                          <th>B1</th>
                                          <td>{Q1output.length>1 && Q1output[16] }</td>
                                        </tr>
                                        <tr>
                                          <th>B0</th>
                                          <td>{Q1output.length>1 && Q1output[17] }</td>
                                        </tr>
                                         
                                         
    
                                       
                                         
                                      </tbody>
                                  </table>
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
         
  </>

}

function Component8({m,board}){
  const [Toutput,setTOutput]=useState([]);
  

  const Tcommand=useCallback(()=>{
    console.log(m.SNoutput);
    sendQ1(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
      console.log(res);
      setTOutput(res);
      setTimeout(()=>{
          setTOutput([]);
      },5000)
    })
  },[m.MacID,m.SNoutput])

  useEffect(()=>{
    if(m.MacID)
    {
       Tcommand();
    }
  },[Tcommand,m.MacID])
  
  return <> <th style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>   
                                    <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
                                        <div className="row">
                                         
                                            <div className="col-12 sw-parent">
                                              
                                            <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Tcommand()} >
                                              T/r/n
                                          </button>
                                            </div>
                                        </div>
                                    </div>
                                    <td>
                              <Typography>
                                  {Toutput[0]==='D' ? <h5>Device Is Not Responding</h5>:
                                     ''
                                    }
                              </Typography>
                                </td>
                          
                              </th>
                              <td /> 
        
         
  </>

}

// function Component9({m,board}){
//   const [TLoutput,setTLOutput]=useState([]);
  

//   const TLcommand=useCallback(()=>{
//     console.log(m.SNoutput);
//     sendQ1(m.MacID,m.SNoutput,sessionStorage.getItem("name")).then((res)=>{
//       console.log(res);
//       setTOutput(res);
//       setTimeout(()=>{
//           setTOutput([]);
//       },5000)
//     })
//   },[m.MacID,m.SNoutput])

//   useEffect(()=>{
//     if(m.MacID)
//     {
//        Tcommand();
//     }
//   },[Tcommand,m.MacID])
  
//   return <> <th style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>   
//                                     <div className="col-xl-2 col-lg-6 col-md-7 col-12 col-12 my-3 mx-1">
                                      
//                                         <div className="row">
                                         
//                                             <div className="col-12 sw-parent">
                                              
//                                             <button type="button" className={`btn  btn-${board===2 || board===3? m.Color:''} btn-primary text-white`}  onClick={()=>Tcommand()} >
//                                               T/r/n
//                                           </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <td>
//                               <Typography>
//                                   {Toutput[0]==='D' ? <h5>Device Is Not Responding</h5>:
//                                      ''
//                                     }
//                               </Typography>
//                                 </td>
                          
//                               </th>
//                               <td /> 
        
         
//   </>

// }





export default function UserTableRow({
  m,
  testMode,
  board,
  sr,
  key,
  handleClick,
  
}) {
 
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Array of components to paginate
  const components = [<Component1 m={m} board={board}/>, <Component2 m={m} board={board}/>, <Component3 m={m} board={board}/>, <Component4 m={m} board={board}/>,<Component5 m={m} board={board}/>,<Component6 m={m} board={board}/>,<Component7 m={m} board={board}/>];

  // Calculate total number of pages
  const totalPages = 7;

  // Get the current components for the current page
  const indexOfLastComponent = currentPage * 1;
  const indexOfFirstComponent = indexOfLastComponent - 1;
  const currentComponents = components.slice(indexOfFirstComponent, indexOfLastComponent);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 


  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
};



  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };



  useEffect(()=>{
    let Interval;
    if(m.MacID)
      {
   Interval= setInterval(()=>{
     
        const Page=currentPage+1;
        setCurrentPage(Page);
        if(Page===8)
          {
            setCurrentPage(1);
            clearInterval(Interval);
          }
       
     },5000)


     
    }
    return ()=>clearInterval(Interval);
  },[currentPage,m.MacID])
 








  // submit form of technician form 
  const SubmitForm=()=>{
    const obj={
    machineNumber: $('[name="machine"]').val(),
    userName: $('[name="userName"]').val(),
    fault:$('[name="fault"]').val(),
    action:$('[name="action"]').val(),
    status:$('[name="faultStatus"]').val(),
    Lat:sessionStorage.getItem("Lattitude"),
    Long:sessionStorage.getItem("Longitude"),
    }
    SaveFaultReport(obj).then((r)=>{
       showAlertMessage();
       setType('success');
       setMessage("Saved Succesfully");
       handleModalClose();

    })

  }

  const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;



  return (
    <>
    {/* Alert popup ui */}
       <Stack spacing={2} sx={{ width: '100%'}}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox" sx={{paddingBottom:"200px"}}>
        
     
        
        
     
        <TableCell >
      {/* <button
        type="button"
        className="btn btn-sm btn-outline-success btn-tt heading6"
        onClick={handleOpenMenu}
        
      >
        View
      </button> */}
    </TableCell>
  
      </TableRow >
        <div style={{border:"1px solid grey",width:'100%', overflow: "auto", height: "650px",paddingTop:"10px",paddingLeft:'2px'}}>
       <b style={{fontSize: '1.20em',cursor:'pointer'}} >  SN:{m.SNoutput} MacID:{m.MacID} Socket:{m.SocketNumber}</b>
         {/* Pagination controls */}
      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
         <table className="table" style={{fontSize:'14px'}}>

                            <tbody > 
                          
                            <tr ><th style={{color: '#444',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Status <td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></th>  <td /> </tr>
                            
                              {currentComponents.map((component, index) => (
                                    <tr>   {component} </tr>
                              ))}
                            

                          
                                                  
                            
                           
                                                                                                            
                            </tbody>
                        </table>
       </div>
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
                <h5 className="modal-title">FAUALT REPORT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Machine No.:</h6>
                            <input readOnly type="text" className="form-control" name="machine" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>User Name:</h6>
                            <input readOnly type="text" className="form-control" name="userName" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Fault Reported:</h6>
                            <input type="text" className="form-control" name="fault" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Action Taken:</h6>
                            <input type="text" className="form-control" name="action" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                      <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Status:</h6>
                            <select className="form-control" name="faultStatus">
                                <option value="Completed" selected>Completed</option>
                                <option value="Pending">Pending</option>
                              

                            </select>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={SubmitForm}>Save Report</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
        </div>
    </div>
            </Box>
            </Modal>
    </>
  );
}

UserTableRow.propTypes = {
 
  m:PropTypes.any,
  key: PropTypes.any,
  sr:PropTypes.any,
  testMode:PropTypes.any,
  board:PropTypes.any,
   handleClick: PropTypes.func

};


Component1.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};

Component2.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};


Component3.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};


Component4.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};


Component5.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};

Component6.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};

Component7.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};

Component8.propTypes = {
 
  m:PropTypes.any,
  board:PropTypes.any
  

};