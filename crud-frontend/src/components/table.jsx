import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function TableList({onOpen,handleOpen, searchTerm}){

  const [tableData, setTableData] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fecthData = async() =>{
      try{
        const response = await axios.get('http://localhost:3000/api/clients')
        setTableData(response.data)
      }catch(err){
        setError(err.message)
      }
    }
    fecthData()
  }, [])

   const filterData = tableData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.job.toLowerCase().includes(searchTerm.toLowerCase()) 
   )

   const handleDelete =async (id) =>{
    const confirmedDelete = window.confirm('Are you sure you want to delete this')
    if(confirmedDelete){
      try{
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        setTableData((prevData) => prevData.filter(client => client.id !== id));
        
      }catch(err){
        setError(err.message)
      }
    }
   }
    

    return(<>
    {error && <div className='alert alert-error'> {error}</div>}
    <div className="overflow-x-auto mt-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Job</th>
        <th>Rating</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody >
      {/* row 1 */}
      {filterData.map((customer)=>(
        <tr key={customer.id} className="hover:bg-base-300">
        <th>{customer.id}</th>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.job}</td>
        <td>{customer.rate}</td>
        <td>
            <button className={`btn rounded-full w-20 ${customer.isactive ? `btn-primary`: `btn-outline btn-primary`}`}>
                {customer.isactive ? `Active`: `Inactive`}
            </button>
        </td>
        <td>
            <button onClick={()=> handleOpen('edit', customer)} className="btn btn-secondary"> Update</button>
        </td>
        <td>
            <button  className="btn btn-error" onClick={()=> handleDelete(customer.id)}> Delete</button>
        </td>
      </tr>
      ))}
      
      
    </tbody>
  </table>
</div>
    </>)
}