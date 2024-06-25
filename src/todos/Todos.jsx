import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Todos = ()=>{

    const navigate = useNavigate()
    const [dataTodos ,setTodos] = useState([])
    const searchInp = useRef();
    const warning = useRef()
    // برای سرچ کاربران =>
    const [mainTodos , setMainTodos] = useState([]);
    const [isSearch , setIsSearch] = useState(false)

    // get data for show =>
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res =>{
            const data = (res.data).splice(0,100)
            setTodos(data);
            setMainTodos(data);
        }).catch(err => console.log(err))
    }, []);


    const handleShowSearch = (e)=>{
        setTodos(mainTodos.filter((p)=> p.title.includes(e.target.value)));
        e.target.value.length ? setIsSearch(true) : setIsSearch(false) ;
        if(!dataTodos.length){
            warning.current.innerText=''
        }
    }   


    const handleDeleteTodos = (u)=>{
        swal({
            title: "حذف کار !",
            text: `آیا از حذف آیتم ${u.id} اطمینان دارید ؟`,
            icon: "warning",
            buttons: ['لغو' , 'تایید'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://jsonplaceholder.typicode.com/todos/${u.id}`).then(res =>{
                    if(res.status == 200){
                        const newTodos = dataTodos.filter((e)=>e.id != u.id)
                        setTodos(newTodos)
                        swal("کار مورد نظر پاک شد !", {
                            icon: "success",
                            buttons:'متوجه شدم'
                        });
                    }
                    else{
                        swal('عملیات با خطا مواجه شد' , {
                            icon : 'error',
                            buttons: 'متوجه شدم'
                        })
                    }
                });

            }
            else {
              swal("عملیات لغو شد .");
            }
          });
    }



    return (
        <div className={`${style.item_content} mt-3 p-4 container-fluid`}>
            <h4 className="text-center mb-4 fw-bold">مدیریت کار ها</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" ref={searchInp} onChange={handleShowSearch} className="form-control pt-2 shadow" placeholder="جستجو"/>
                </div>
                <div className="col-2 text-start px-0">
                    <Link to={'/todos/add'}>
                    <button className="btn btn-primary pt-2">
                        <i className="fas fa-plus text-light "></i>
                    </button>
                    </Link>
                </div>
            </div>
            {isSearch ?             
                <div className='resSearch w-100 text-center alert alert-warning'>
                    <h6 className='fw-bold text-center pt-2 fs-5'>{dataTodos.length > 0 ? `${dataTodos.length} مورد پیدا شد .` : 'هیج موردی پیدا نشد .' } </h6>
                </div> :
                ''
            }
            {dataTodos.length ? (
                <div className={`${style.table_scroll} px-1 `}>
                    <table className={`table bg-light w-100 shadow table-striped border border-1 border-dark`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>کار</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                        { dataTodos.map((u)=>(
                            <tr  key={u.id}>
                                <td>{u.id}</td>
                                <td width={300}>{u.title}</td>
                                <td><i className={` fs-5 ${u.completed ?  'fas fa-toggle-on text-success' : "fas fa-toggle-off"}`} /></td>
                                <td className=''>
                                    <i className="fas fa-edit text-warning mx-2 pointer" onClick={()=>{
                                        return navigate(`/todos/add/${u.id}` , {state : 'کار'})
                                    }} ></i>
                                    <i className="fas fa-trash text-danger mx-2 pointer" onClick={()=>{handleDeleteTodos(u)}} ></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h4 ref={warning} className='text-center text-dark mt-5'>لطفا صبر کنید ...</h4>
            )}
        </div>
    )

}

export default Todos;