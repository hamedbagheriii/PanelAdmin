import React from 'react';
import style from './style.module.css';
import { useLocation } from 'react-router-dom';



const EditUser = ()=>{

    const title = useLocation().state;

    return(
        <div className={`${style.item_content} mt-5 p-4 container-fluid `}>
            <h5 className='text-center alert alert-warning' style={{fontSize:19}}>
                توجه ! شما در حال تغیر اطلاعات {title} خود میباشید .
            </h5>
        </div>
    )
}


export default EditUser;