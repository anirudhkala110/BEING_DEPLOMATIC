import React from 'react'
import { useState } from 'react'
import Profile from './Profile';
import Expense from './Expense';
import NewEntry from './NewEntry';
import OldEntries from './OldEntries';

const Dashboard = () => {
    const [val,setVal] = useState(3);
    const [minHeight,setMinHeight] = useState(550);
  return (
    <div className='' style={{minHeight:`${minHeight}px`,background:'#ff0000'}}>
        <div className='row'>
            <div className='col-sm-12 col-md-4 col-lg-2 bg-black' style={{minHeight:`${minHeight}px`}}>
                <div className='px-1 my-1 d-block'>
                   <ul>
                    <li className='my-1'> <button className={`w-100 rounded-0 ${val==1 ? 'btn btn-primary' : 'btn btn-light'}`} onClick={()=>setVal(e=>1)}>Profile</button></li>
                    <li className='my-1'> <button className={`w-100 rounded-0 ${val==2 ? 'btn btn-primary' : 'btn btn-light'}`} onClick={()=>setVal(e=>2)}>Expenses</button></li>
                    <li className='my-1'> <button className={`w-100 rounded-0 ${val==3 ? 'btn btn-primary' : 'btn btn-light'}`} onClick={()=>setVal(e=>3)}>New Entry</button></li>
                    <li className='my-1'> <button className={`w-100 rounded-0 ${val==4 ? 'btn btn-primary' : 'btn btn-light'}`} onClick={()=>setVal(e=>4)}>Old Entries</button></li>
                   </ul>
                </div>
            </div>
            <div className='col-sm-12 col-md-8 col-lg-10' style={{minHeight:`${minHeight}px`}}>
                {val==1 && <><div className='px-2 border bg-light shadow-sm border-1' style={{minHeight:`${minHeight}px`}}><Profile/></div></>}
                {val==2 && <><div className='px-2 border bg-light shadow-sm border-1' style={{minHeight:`${minHeight}px`}}><Expense/></div></>}
                {val==3 && <><div className='px-2 border bg-light shadow-sm border-1' style={{minHeight:`${minHeight}px`}}><NewEntry/></div></>}
                {val==4 && <><div className='px-2 border bg-light shadow-sm border-1' style={{minHeight:`${minHeight}px`}}><OldEntries/></div></>}
            </div>
        </div>
    </div>
  )
}

export default Dashboard