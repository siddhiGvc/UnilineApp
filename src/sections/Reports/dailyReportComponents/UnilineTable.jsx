
// import rtl from "jss-rtl";
import moment from "moment";

// import $ from 'jquery';

import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';

// import { create } from "jss";
import PropTypes from 'prop-types';
import React,{useRef,useState, useEffect,useCallback} from 'react';

import {GetClentNameDetails} from 'src/_mock/customers';

// import NumDayRows from "./numDayRows";

// import { StylesProvider,jssPreset } from "@mui/system";


// import { useEffect } from "react";


// const sr=1;




export default function UnilineTable({data,zones,wards,beats,startDate,endDate,numbDaysArray}){
    const [cInfo,setCInfo]=useState(["City","Zone","Ward","Beat"]);
    const tblDataRef = useRef(null);


  
    useEffect(()=>{

        console.log(numbDaysArray);
        const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      
      console.log(startDate,endDate)
      if(UserInfo.clientName)
      {
        const obj={
          clientName:UserInfo.clientName
        }
        
         GetClentNameDetails(obj).then((r)=>{
             console.log(r);
              setCInfo([]);
              const CInfos=[];
               CInfos.push(r.data[0].CInfo1);
               CInfos.push(r.data[0].CInfo2);
               CInfos.push(r.data[0].CInfo3);
               CInfos.push(r.data[0].CInfo4);
    
               setCInfo(CInfos)
         })
      }
    
    
      },[setCInfo,startDate,endDate,data,numbDaysArray])
     
    const printData=()=> {
        const printContents = tblDataRef.current.outerHTML;
     
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
       
        document.body.innerHTML = originalContents;
        window.location.reload();
    } 

   
      const printExcelData = () => {
        const table = tblDataRef.current;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'report.xlsx');
      };
      
      const start = useCallback(() => moment(startDate),[startDate]);
      const end = useCallback(() => moment(endDate),[endDate]);

      const numDays = useCallback(() =>
         moment(end()).diff(start(), 'day') + 2 
      , [start, end]);


    return   <div className="col-12" id="divData">
    <div className="card">
    <div className="card-body">
        <div className="row">
            <div className="col-12 sm-scroll-h" style={{overflowX: 'scroll'}} >
    <table className="table table-bordered" id="tblData"  ref={tblDataRef}>
    <thead>
            <tr>
                <th colSpan="2">Project</th>
                 {/* <td colSpan="3">BRIHANMUMBAI MUNICIPAL CORPORATION (BMC)</td> */}
                <td colSpan="3"/>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="3" className="count city">{data?.City}</td>
                <td colSpan="1" rowSpan="2" className="text-center"/>
            </tr>
            {/* <tr>
                <th colSpan="2">REPORT TYPE</th>
                <td colSpan="3" className="display rtype">{data.machines.length > 1 ? 'GROUP' : 'INDIVIDUAL'}</td>
                <th colSpan="2">Machine Location / ID</th>
                <td colSpan="3"/>
            </tr> */}
            <tr>
                <th colSpan="2" className="CInfo2">{cInfo[1]}</th>
                <td colSpan="3" className="list zone">{zones?.length>0 ? zones?.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
               <td colSpan="4" className="count zone">{data?.Zone}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo3">{cInfo[2]}</th>
                <td colSpan="3" className="list ward">{wards?.length>0 ? wards?.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="4" className="count ward">{data?.Ward}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo4">{cInfo[3]}</th>
                <td colSpan="3" className="list beat">{beats?.length>0 ? beats?.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="4" className="count beat">{data?.Beat}</td>
            </tr>
            <tr>
                <th colSpan="2">Report Generated</th>
                <td colSpan="3" className="ds nowdate">{moment().format('DD-MMM-YYYY')}</td>
                <th colSpan="2">Time</th>
                <td colSpan="4" className="ds nowtime">{moment().format('hh:mm a')}</td>
            </tr>
            <tr>
                <th colSpan="2">REPORT PERIOD</th>
                <td colSpan="3" className="ds rptdatefrom">{moment(startDate).format('DD-MMM-YYYY')}</td>
                <th colSpan="2">To</th>
                <td colSpan="4" className="ds rptdateto">{moment(endDate).format('DD-MMM-YYYY')}</td>
            </tr>
            <tr className="center" id="heading">
            <th >Sr. No.</th>
                <th >SerialNumber</th>
                <th >Location</th>
                <th >Address</th>
           
               
            </tr>
            <tr className="center" id="subHeading">
            <th/>
            <th/>
            <th/>
            <th/>
            <th/>
         
          
           
               
            </tr>
        </thead>
        <tbody>
                 {numbDaysArray && data.machines.length > 0 && data.machines.map((m, i) =>(
                 <tr>
                    <td rowSpan={numDays+1} className="text-center" style={{ verticalAlign: 'center' }}>{i + 1}</td>
                   <td rowSpan={numDays+1} style={{ verticalAlign: 'center' }}>{m.SNoutput}<br /><small className="text-muted">{m.MacID}</small></td>
                  <td rowSpan={numDays+1} style={{ verticalAlign: 'center', whiteSpace: 'nowrap' }} >{cInfo[1]}: {m.Zone}<br />{cInfo[2]}: {m.Ward}<br />{cInfo[3]}: {m.Beat}</td>
                 </tr>
                 ))}
        </tbody>
       
        
      </table>
      </div>
            </div>
            <p style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-info" onClick={printExcelData}>
                    <i className="fas fa-file-excel"/> &nbsp; Excel
                </button>
                <button type="button" className="btn btn-outline-success" onClick={printData} >Print
                    Report</button>
            </p>
        </div>
    </div>
    </div>
  
    
}



UnilineTable.propTypes = {
    data: PropTypes.any,
    zones: PropTypes.any,
    wards: PropTypes.any,
    beats: PropTypes.any,
   
    startDate:PropTypes.any,
    endDate:PropTypes.any,
    numbDaysArray:PropTypes.any,
   
    
  };