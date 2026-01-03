import './App.css'
import NavBar from './components/navbar'
import TableList from './components/table'
import ModalForm from './components/modalForm'
import { useState } from 'react'
import axios from 'axios'

function App() {
 const [isopen, setIsOpen] = useState(false);
 const [modalMode, setModalMode] = useState('add');
 const [searchTerm, setSearchTerm] = useState("")
 const [clientData, setClientData] = useState(null)

 const handleOpen = (mode,client)=>{
  setClientData(client)
  setIsOpen(true);
  setModalMode(mode)
 }

 const handlesubmit = async(newClientData) =>{
  
  if(modalMode === 'add'){
    try{
      console.log("Sending to backend:", newClientData)
      const response = await axios.post('http://localhost:3000/api/clients', newClientData)
      console.log("client added:", response.data);
    }catch(err){
      console.error('Error adding client', err)
    }
    console.log("Modal mode add");
  }else{
     console.log("Modal mode edit");
     console.log('updating client with ID:', clientData.id);
     try{
      const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData)
      console.log('client updated', response.data);
     }catch(err){
      console.error('Erro updating a client', err)
     }
  }
 }

  return (
    <>
    <NavBar onOpen={()=> handleOpen('add')} onSearch={setSearchTerm}/>
    <TableList handleOpen={handleOpen} searchTerm={searchTerm}/>
    <ModalForm isopen={isopen}
    onSubmit={handlesubmit} 
    onClose= {()=>setIsOpen(false)}
    mode={modalMode}
    clientData={clientData}/>
    
    </>
  )
}

export default App
