// import rtl from "jss-rtl";
// import moment from "moment";
// import $ from 'jquery';

import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';

// import { create } from "jss";
import {useRef} from 'react';
import PropTypes from 'prop-types';


// import { StylesProvider,jssPreset } from "@mui/system";


// import { useEffect } from "react";


// const sr=1;
export default function HourlyZoneTable({data,data1,data2,data3,data4,data5}){
    const tblDataRef = useRef(null);
  
     
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
      

      const filteredDataForZones=(d,index) => d.filter((item,i)=> 
      item.zone === `${index}`
 );

      const Percent=(m,t)=>(m/t*100).toFixed(2);
      const totalMachines = (d) => d.reduce((total, item) =>
      total + parseInt(item.machinesTotal, 10), 0);
    
      const totalMachineOnline = (d) => d.reduce((total, item) =>
      total + parseInt(item.machineOnline, 10), 0);


      const totalCollection =(d)=> d.reduce((total, item)=> 
      total + parseInt(item.cashSales,10),0);
 
      const totalItemsDispends =(d)=> d.reduce((total, item)=> 
      total + parseInt(item.qtySales,10),0);
    
    // const totalLowStock =(d)=> d.reduce((total, item)=> 
    //     total + parseInt(item.machineLowStock,10),0);
   
      const totalStockEmpty =(d)=> d.reduce((total, item)=> 
      total + parseInt(item.machineEmpty,10),0);
  
       const totalBurningEnabled =(d)=> d.reduce((total, item)=> 
       total +parseInt(item.burningSales,10),0);
  
       const MachinesTotal = (d,index) => filteredDataForZones(d,index).reduce((total, item) =>
       total + parseInt(item.machinesTotal, 10), 0);

        const MachineOnline = (d,index) => filteredDataForZones(d,index).reduce((total, item) =>
        total + parseInt(item.machineOnline, 10), 0);
  
  
         const Collection =(d,index)=> filteredDataForZones(d,index).reduce((total, item)=> 
           total + parseInt(item.cashSales,10),0);
   
          const ItemsDispends =(d,index)=> filteredDataForZones(d,index).reduce((total, item)=> 
           total + parseInt(item.qtySales,10),0);
      
      // const totalLowStock =(d,index)=> filteredDataForZones(d,index).reduce((total, item)=> 
      //     total + parseInt(item.machineLowStock,10),0);
     
          const StockEmpty =(d,index)=> filteredDataForZones(d,index).reduce((total, item)=> 
          total + parseInt(item.machineEmpty,10),0);
    
         const BurningEnabled =(d,index)=> filteredDataForZones(d,index).reduce((total, item)=> 
          total +parseInt(item.burningSales,10),0);


          const uniqueZonesData = data.reduce((acc, entry) => {
            const { zone } = entry;
        
      
              acc[zone] = entry;
          
              return acc
        }, {});
      
   
   
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
                               <th  className="type fixed_position">Zone</th>
                               <th >TOTAL MACHINES</th>
                              <th colSpan="2" className="text-center " >OPENING BALANCE</th>
                              <th colSpan="1" className="text-center " >&gt; </th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              
                              <th colSpan="2" className="text-center ">10:00 AM</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">12:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">2:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">4:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">6:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                           
                             </tr>
                             <tr >
                                 <th />
                                  <th className="fixed_position"/>
                                    <th />
                                          
                               <th>ONLINE MACHINES </th>
                               <th> ONLINE PERCENTAGE</th>
                               <th >TOTAL ITEM DISPENSED</th>
                              
                               <th >COLLECTION</th>
                               <th >STOCK EMPTY</th>
                               <th >No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                                <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                              
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                             
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                              
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                 <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                             
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                               <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                            
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                             
                               
                             </tr>
          
        </thead>
        <tbody>
            {data.length===0 ? <td colSpan={14} align='center'>Loading...</td>:null}
            {
              Object.values(uniqueZonesData).map((m,i)=>
                <tr className="data">
                     <td >{i+1}</td>
                            <td   className="fixed_position">{i+1}</td>
                            <td  >{MachinesTotal(data,i+1)}</td>
                            <td  >{MachineOnline(data,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data,i+1)}</td>
                            <td >{Collection(data,i+1)}</td>
                             <td  >{StockEmpty(data,i+1)}</td>
                            <td >{BurningEnabled(data,i+1)*8}</td>
                            {/* ***** */}

                            {data1.length>0 ? <>
                                <td  >{MachineOnline(data1,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data1,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data1,i+1)}</td>
                             <td>{ItemsDispends(data1,i+1)-ItemsDispends(data,i+1)}</td>
                            <td >{Collection(data1,i+1)}</td>
                             <td  >{StockEmpty(data1,i+1)}</td>
                            <td >{BurningEnabled(data1,i+1)*8}</td></>:null}
                             {/* ***** */}

                             {data2.length>0 ? <>
                                <td  >{MachineOnline(data2,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data2,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data2,i+1)}</td>
                             <td>{ItemsDispends(data2,i+1)-ItemsDispends(data1,i+1)}</td>
                            <td >{Collection(data2,i+1)}</td>
                             <td  >{StockEmpty(data2,i+1)}</td>
                            <td >{BurningEnabled(data2,i+1)*8}</td></>:null}
                             {/* ***** */}

                             {data3.length>0 ? <>
                                <td  >{MachineOnline(data3,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data3,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data3,i+1)}</td>
                             <td>{ItemsDispends(data3,i+1)-ItemsDispends(data2,i+1)}</td>
                            <td >{Collection(data3,i+1)}</td>
                             <td  >{StockEmpty(data3,i+1)}</td>
                            <td >{BurningEnabled(data3,i+1)*8}</td></>:null}

                             {/* ***** */}

                             {data4.length>0 ? <>
                                <td  >{MachineOnline(data4,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data4,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data4,i+1)}</td>
                             <td>{ItemsDispends(data4,i+1)-ItemsDispends(data3,i+1)}</td>
                            <td >{Collection(data4,i+1)}</td>
                             <td  >{StockEmpty(data4,i+1)}</td>
                            <td >{BurningEnabled(data4,i+1)*8}</td></>:null}
                             {/* ***** */}

                             {data5.length>0 ? <>
                                <td  >{MachineOnline(data5,i+1)}</td>
                            <td> <p >{Percent(MachineOnline(data5,i+1),MachinesTotal(data,i+1))}%</p></td>
                             <td >{ItemsDispends(data5,i+1)}</td>
                             <td>{ItemsDispends(data5,i+1)-ItemsDispends(data4,i+1)}</td>
                            <td >{Collection(data5,i+1)}</td>
                             <td  >{StockEmpty(data5,i+1)}</td>
                            <td >{BurningEnabled(data5,i+1)*8}</td></>:null}

                </tr>
              
             )
            }

            <tr className="data">
              
                  {data.length>0 ? <>
                    <td colSpan="2" className="text-center"><b>Total</b></td>
                          <td>{totalMachines(data)}</td>
                          <td>{totalMachineOnline(data)}</td>
                          <td>{Percent(totalMachineOnline(data),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data)}</td>
                          <td>{totalCollection(data)}</td>
                          <td>{totalStockEmpty(data)}</td>
                          <td>{totalBurningEnabled(data)}</td>
                          </>:null}
                    {data1.length>0 ? <>
                          <td>{totalMachineOnline(data1)}</td>
                          <td>{Percent(totalMachineOnline(data1),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data1)}</td>
                          <td>{totalItemsDispends(data1)-totalItemsDispends(data)}</td>
                          <td>{totalCollection(data1)}</td>
                          <td>{totalStockEmpty(data1)}</td>
                          <td>{totalBurningEnabled(data1)}</td>
                    </>:null}
                    {data2.length>0 ? <>
                          <td>{totalMachineOnline(data2)}</td>
                          <td>{Percent(totalMachineOnline(data2),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data2)}</td>
                          <td>{totalItemsDispends(data2)-totalItemsDispends(data1)}</td>
                          <td>{totalCollection(data2)}</td>
                          <td>{totalStockEmpty(data2)}</td>
                          <td>{totalBurningEnabled(data2)}</td>
                    </>:null}
                    {data3.length>0 ? <>
                          <td>{totalMachineOnline(data3)}</td>
                          <td>{Percent(totalMachineOnline(data3),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data3)}</td>
                          <td>{totalItemsDispends(data3)-totalItemsDispends(data2)}</td>
                          <td>{totalCollection(data3)}</td>
                          <td>{totalStockEmpty(data3)}</td>
                          <td>{totalBurningEnabled(data3)}</td>
                    </>:null}
                    {data4.length>0 ? <>
                          <td>{totalMachineOnline(data4)}</td>
                          <td>{Percent(totalMachineOnline(data4),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data4)}</td>
                          <td>{totalItemsDispends(data4)-totalItemsDispends(data3)}</td>
                          <td>{totalCollection(data4)}</td>
                          <td>{totalStockEmpty(data4)}</td>
                          <td>{totalBurningEnabled(data4)}</td>
                    </>:null}
                    {data5.length>0 ? <>
                          <td>{totalMachineOnline(data5)}</td>
                          <td>{Percent(totalMachineOnline(data5),totalMachines(data))}%</td>
                          <td>{totalItemsDispends(data5)}</td>
                          <td>{totalItemsDispends(data5)-totalItemsDispends(data4)}</td>
                          <td>{totalCollection(data5)}</td>
                          <td>{totalStockEmpty(data5)}</td>
                          <td>{totalBurningEnabled(data5)}</td>
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
                <button type="button" className="btn btn-outline-success" onClick={printData} >Print
                    Report</button>
            </p>
        </div>
    </div>
</div>
     )
}

HourlyZoneTable.propTypes = {
    data: PropTypes.any,
    data1: PropTypes.any,
    data2: PropTypes.any,
    data3: PropTypes.any,
    data4: PropTypes.any,
    data5: PropTypes.any,
   
  };