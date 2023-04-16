import React, { useState,useEffect } from 'react'
import { FaDatabase, FaEdit, FaTrash } from 'react-icons/fa'
import Alert from './Alert'
const Home = () => {
  const[item,setItem] = useState('')
  const[itemArray,setItemArray] = useState(JSON.parse(localStorage.getItem("itemArray")) || [])
  const[editId,setEditId] = useState(null)
  const[editing,setEditing] = useState(false)
  const[alerts,setAlerts] = useState({
    show:false,
    message:'',
    type:''
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!item){
      return ManageAlerts(true, 'Please Enter Item', 'Failed')
    }else if(item && editing){
      setItemArray(
        itemArray.map((data) => {
          if (data.id === editId) {
            return { ...data, item:item };
          }
          return data;
        })
      );
      setItem('')
      setEditing(false)
      ManageAlerts(true, 'Edited Successfully', 'Success')
    }
    else{
      ManageAlerts(true, 'Item Successfully Added', 'Success')
      onAdd({item})
      setItem('')
    }
    

  }
  const onAdd = (new_item) =>{
    const id = Math.floor(Math.random() * 1000) + 1
    // const id = new Date().getTime().toString()
    const added_item = {id, ...new_item}
    setItemArray([...itemArray,added_item])
  }
  const DeleteItems =(id) =>{
    ManageAlerts(true, 'Item Deleted', 'Failed')
    const filtered_item = itemArray.filter((item) => item.id !== id)
    setItemArray(filtered_item)
  }
  const EditItems =(id) =>{
    const edited_item = itemArray.find((item) => item.id === id)
    setEditId(id)
    setEditing(true)
    setItem(edited_item.item)
  }

  const ManageAlerts =(show,message,type) =>{
    setAlerts(prevalert => ({
      ...prevalert,
      show:show,
      message:message,
      type:type
    }))
    console.log(alerts)
  }
  const ClearItems = () =>{
    ManageAlerts(true, 'Cart is Empty', 'Failed')
    setItemArray([])
  }

  useEffect(() => {
    localStorage.setItem('itemArray', JSON.stringify(itemArray))
  }, [itemArray])
  return (
    <div className='mx-auto p-4 bg-white mt-20 w-[94vw] max-w-[499px] rounded'>
     
      <form onSubmit={handleSubmit}>
        {alerts.show &&  <Alert alerts={alerts} ManageAlerts={ManageAlerts} itemArray={itemArray}/>}
        <h1 className="text-center mb-2 font-semibold text-md">Glossary Bud</h1>

        <div className='flex justify-between items-center mt-4 border rounded'>
          <input className="outline-none p-1 w-full" type="text" placeholder='e.gs bread' value={item} onChange={(e) => setItem(e.target.value)}/>
          <button type='submit' className='bg-[gray] p-1 px-3 rounded-tr rounded-br'>{editing ? "Edit" :"Submit"}</button>
        </div>
      </form>
      <div className='mt-8'>
       {itemArray.map((data) => {
        return(
          <div key={data.id} className="flex items-center justify-between px-1 py-1 mb-3 rounded hover:scale-105 duration-500 ease-in-out hover:bg-slate-400">
              <h1 className='capitalize'>{data.item}</h1>
              <div className='flex items-center'>
                <FaEdit onClick={() => EditItems(data.id)} className='text-[gray] cursor-pointer'/>
                <FaTrash onClick={() => DeleteItems(data.id)} className='ml-2 text-red-500 cursor-pointer'/>
              </div>
          </div>
        )
       })}
      </div >
      
      <div className='flex flex-col items-center justify-center'>
      <button disabled={itemArray.length === 0} className='text-red-700' onClick={ClearItems}>Clear Items</button>
      </div>
     

    </div>
  )
}

export default Home