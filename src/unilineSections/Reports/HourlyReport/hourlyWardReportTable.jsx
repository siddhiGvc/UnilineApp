// import rtl from "jss-rtl";
// import moment from "moment";
// import $ from 'jquery';

import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';

// import { create } from "jss";
import PropTypes from 'prop-types';
import {useRef,useState,useEffect} from 'react';

import { GetColorsWithRange } from 'src/_mock/hourlyReport';
// import { StylesProvider,jssPreset } from "@mui/system";


// import { useEffect } from "react";


// const sr=1;
export default function HourlyWardTable({data,data1,data2,data3,data4,data5}){
  const [Primary,setPrimary]=useState(null);
  const [Secondary,setSecondary]=useState(null);
  const [Tertiary,setTertiary]=useState(null);
  const [Faulty,setFaulty]=useState(null);
  const [Range1,setRange1]=useState(null);
  const [Range2,setRange2]=useState(null);
  const [Range3,setRange3]=useState(null);
  const [Range4,setRange4]=useState(null);
    const tblDataRef = useRef(null);

    useEffect(()=>{
       GetColorsWithRange().then((res)=>{
           setPrimary(res.Primary);
           setSecondary(res.Secondary);
           setTertiary(res.Tertiary);
           setFaulty(res.Faulty);
           setRange1(res.Range1);
           setRange2(res.Range2);
           setRange3(res.Range3);
           setRange4(res.Range4);

       })
    },[])
  
     
    // const printData=()=> {
    //     const printContents = tblDataRef.current.outerHTML;
     
    //     const originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
       
    //     document.body.innerHTML = originalContents;
    //     window.location.reload();
    // } 

   
      const printExcelData = () => {
        const table = tblDataRef.current;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'report.xlsx');
      };
      

      const Percent=(m,t)=>(m/t*100).toFixed(2);
      const totalMachines = (d) => d.reduce((total, item) =>
      total + parseInt(item.deviceTotal, 10), 0);
    
    const totaldeviceOnline = (d) => d.reduce((total, item) =>
      total + parseInt(item.deviceOnline, 10), 0);

   
    
    const totalInverterOnline = (d) => d.reduce((total, item) =>
      total + parseInt(item.inverterOnline, 10), 0);

    const totalBatteryLow =(d)=> d.reduce((total, item)=> 
      total + parseInt(item.BatteryLow,10),0);
  
     const totalBatteryShutDown =(d)=> d.reduce((total, item)=> 
        total + parseInt(item.BatteryShutDown,10),0);
  


        const getPercentageColor = (deviceOnline, deviceTotal) => {
          const percent = (deviceOnline / deviceTotal) * 100;
       
          let color;

              if (percent >= 0 && percent <= Range4) {
                color = Faulty;
              } else if (percent >= parseFloat(`${Range4}.01`) + 0.01 && percent <= Range3) {
                color = Tertiary;
              } else if (percent >= parseFloat(`${Range3}.01`) + 0.01 && percent <= Range2) {
                color = Secondary;
              } else if (percent >= parseFloat(`${Range2}.01`) + 0.01 && percent <= Range1) {
                color = Primary;
              } else {
                color = Faulty;
              }

              return {
                color,
                fontSize: '16px',
              };
        };

   
   
     return (
        <div className="col-12" id="divData">
        <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-12 sm-scroll-h" style={{overflowX: 'scroll'}} >
        <table className="table table-bordered" id="tblData"  ref={tblDataRef}>
        <thead>
        <tr >
                               
                              
                               <th >Sr No</th>
                               <th  className="type fixed_position">Ward</th>
                               <th >TOTAL DEVICES</th>
                              <th colSpan="2" className="text-center " >OPENING BALANCE</th>
                              <th colSpan="1" className="text-center " >&gt; </th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                             
                              <th colSpan="2" className="text-center ">10:00 AM</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                            
                             
                              <th colSpan="2" className="text-center">12:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                            
                            
                              <th colSpan="2" className="text-center">2:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                             
                             
                              <th colSpan="2" className="text-center">4:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                           
                           
                              <th colSpan="2" className="text-center">6:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                            
                            
                           
                             </tr>
                             <tr >
                                 <th />
                                  <th className="fixed_position"/>
                                    <th />
                                          
                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>
                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>

                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>
                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>
                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>
                               <th>ONLINE DEVICES</th>
                               <th> ONLINE PERCENTAGE</th>
                               <th> ONLINE INVERTERS</th>
                            
                               <th >BATTERY LOW</th>
                               <th >BATTERY SHUT DOWN</th>
                             
                               
                             </tr>
          
        </thead>
        <tbody>
            {data.length===0 ? <td colSpan={14} align='center'>Loading...</td>:
            
             data && data.map((m,i)=>
                <tr className="data" key={i}>
                    
                           {data && data.length>0 ?<><td >{i+1}</td>
                            <td   className="fixed_position">{m.ward}</td>
                            <td  >{data[i].deviceTotal}</td>
                            <td  >{data[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data[i].deviceOnline, data[i].deviceTotal)}>{Percent(data[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data[i].inverterOnline}</td>
                           
                            <td >{data[i].BatteryLow}</td>
                            <td  >{data[i].BatteryShutDown}</td>
                           </>:null}
                            {/* ***** */}

                            {data1 && data1.length>0 ? <><td  >{data1[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data1[i].deviceOnline, data[i].deviceTotal)}>{Percent(data1[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data1[i].inverterOnline}</td>
                            
                            <td >{data1[i].BatteryLow}</td>
                             <td  >{data1[i].BatteryShutDown}</td>
                            </>:null}
                             {/* ***** */}

                             {data2 && data2.length>0 ? <> <td  >{data2[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data2[i].deviceOnline, data[i].deviceTotal)}>{Percent(data2[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data2[i].inverterOnline}</td>
                        
                            <td >{data2[i].BatteryLow}</td>
                             <td  >{data2[i].BatteryShutDown}</td>
                        </>:null}
                             {/* ***** */}
                             
                             {data3 && data3.length>0 ? <> <td  >{data3[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data3[i].deviceOnline, data[i].deviceTotal)}>{Percent(data3[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data3[i].inverterOnline}</td>
                           
                            <td >{data3[i].BatteryLow}</td>
                             <td  >{data3[i].BatteryShutDown}</td>
                           </>:null}
                           

                             {/* ***** */}

                             {data4 && data4.length>0 ? <> <td  >{data4[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data4[i].deviceOnline, data[i].deviceTotal)}>{Percent(data4[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data4[i].inverterOnline}</td>
                          
                            <td >{data4[i].BatteryLow}</td>
                             <td  >{data4[i].BatteryShutDown}</td>
                           </>:null}

                             {/* ***** */}

                            {data5 && data5.length>0 ? <><td  >{data5[i].deviceOnline}</td>
                            <td> <p style={getPercentageColor(data5[i].deviceOnline, data[i].deviceTotal)}>{Percent(data5[i].deviceOnline,data[i].deviceTotal)}%</p></td>
                             <td >{data5[i].inverterOnline}</td>
                           
                            <td >{data5[i].BatteryLow}</td>
                             <td  >{data5[i].BatteryShutDown}</td>
                           </>:null}

                </tr>
                
              
             )
               
            }
             <tr className="data">
              
              {data.length>0 ? <>
                <td colSpan="2" className="text-center"><b>Total</b></td>
                      <td>{totalMachines(data)}</td>
                      <td>{totaldeviceOnline(data)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data),totalMachines(data))}>{Percent(totaldeviceOnline(data),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data)}</td>
                      <td>{totalBatteryLow(data)}</td>
                      <td>{totalBatteryShutDown(data)}</td>
                     
                      </>:null}
                {data1.length>0 ? <>
                      <td>{totaldeviceOnline(data1)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data1),totalMachines(data))}>{Percent(totaldeviceOnline(data1),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data1)}</td>
                    
                      <td>{totalBatteryLow(data1)}</td>
                      <td>{totalBatteryShutDown(data1)}</td>
                      
                </>:null}
                {data2.length>0 ? <>
                      <td>{totaldeviceOnline(data2)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data2),totalMachines(data))}>{Percent(totaldeviceOnline(data2),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data2)}</td>
                     
                      <td>{totalBatteryLow(data2)}</td>
                      <td>{totalBatteryShutDown(data2)}</td>
                     
                </>:null}
                {data3.length>0 ? <>
                      <td>{totaldeviceOnline(data3)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data3),totalMachines(data))}>{Percent(totaldeviceOnline(data3),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data3)}</td>
                      
                      <td>{totalBatteryLow(data3)}</td>
                      <td>{totalBatteryShutDown(data3)}</td>
                      
                </>:null}
                {data4.length>0 ? <>
                      <td>{totaldeviceOnline(data4)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data4),totalMachines(data))}>{Percent(totaldeviceOnline(data4),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data4)}</td>
                    
                      <td>{totalBatteryLow(data4)}</td>
                      <td>{totalBatteryShutDown(data4)}</td>
                     
                </>:null}
                {data5.length>0 ? <>
                      <td>{totaldeviceOnline(data5)}</td>
                      <td style={getPercentageColor(totaldeviceOnline(data5),totalMachines(data))}>{Percent(totaldeviceOnline(data5),totalMachines(data))}%</td>
                      <td>{totalInverterOnline(data5)}</td>
                    
                      <td>{totalBatteryLow(data5)}</td>
                      <td>{totalBatteryShutDown(data5)}</td>
                      
                </>:null}
         </tr>
         

        </tbody>
    </table>
    </div>
            </div>
            <p style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-info" onClick={printExcelData}>
                    <i className="fas fa-file-excel"/> &nbsp; Excel
                </button>
                {/* <button type="button" className="btn btn-outline-success" onClick={printData} >Print
                    Report</button> */}
            </p>
        </div>
    </div>
</div>
     )
}

HourlyWardTable.propTypes = {
    data: PropTypes.any,
    data1: PropTypes.any,
    data2: PropTypes.any,
    data3: PropTypes.any,
    data4: PropTypes.any,
    data5: PropTypes.any,
   
  };