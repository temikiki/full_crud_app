import { useEffect, useState } from "react"

export default function ModalForm({isopen, onClose, mode, onSubmit, clientData}){
    const [rate, setrate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState(false);
    
    const handleStatusChange =(e) => {
      setStatus(e.target.value === 'Active')
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const clientData ={name,email,job,rate:Number(rate), isactive:status}
        await onSubmit(clientData)
        onClose();
      }catch(err){
        console.error("Error adding client", err)
      }
  //     onSubmit({
  //   Name,
  //   Email,
  //   Job,
  //   rate,
  //   Status
  // })
      onClose()
    }
  useEffect(()=>{
    if(mode === 'edit' && clientData){
      setName(clientData.name)
      setEmail(clientData.email)
      setJob(clientData.job)
      setrate(clientData.rate)
      setStatus(clientData.status)
    }else{
      setName("")
      setEmail("")
      setJob("")
      setrate("")
      setStatus(false)
    }
  },[mode, clientData])
  return(
        <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
<dialog id="my_modal_3" className="modal" open={isopen}>
  <div className="modal-box">
    <h3 className="font-bold text-lg py-4">{mode === "edit" ? "Edit Client": "Client Details"}</h3>
    <form method="dialog" onSubmit={handleSubmit}>
      <label className="input validator ">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
  <input
    type="text"
    required
    placeholder="Name"
    // pattern="[A-Za-z][A-Za-z0-9\-]*"
    // minlength="3"
    // maxlength="30"
    // title="Only letters, numbers or dash"
    value={name}
    onChange={(e)=> setName(e.target.value)}
  />
</label>
{/* <p className="validator-hint">
  Must be 3 to 30 characters
  <br />containing only letters, numbers or dash
</p> */}
<label className="input validator mb-4">
  
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  
  <input type="email" placeholder="mail@site.com" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
</label>
{/* <div className="validator-hint hidden">Enter valid email address</div> */}
<input type="text" placeholder="Job" className="input" value={job} onChange={(e)=> setJob(e.target.value)} />
<div className="flex mb-4 justify-between mt-5 gap-5">
      <label className="input input-bordered flex item-center gap-2">
        Rate
        <input type="number" className="grow" placeholder="Daisy" value={rate} onChange={(e)=> setrate(e.target.value)}/>
      </label>
      <select value={status? "Active": "Inactive"} className="select select-bordered w-full max-w-xs"  onChange={handleStatusChange}>
        <option >Inactive</option>
        <option >Active</option>
      </select>
</div>
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        <button className="btn btn-success">{mode === "edit" ? "Save Changes": "add"} </button>
    </form>
    </div>
</dialog>
        </>
    )
}