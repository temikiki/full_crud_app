import * as clientServices from '../services/clientServices.js'

export const getClients = async(req,res) =>{
    try{
       
        const clients = await clientServices.getClients();
        res.status(200).json(clients)
    }catch (err){
        console.error('Error Fetching clients:', err)
        res.status(500).json({message:'internal Server Error'})
    }
};

export const createClient = async(req,res) =>{
    try{
        console.log("Sending to DB:", req.body)
        // const { Name, Email, Job, rate, isActive } = req.body;
        const clientData = req.body;
        const newClient = await clientServices.createClient(clientData)
        res.status(200).json(newClient)
    }catch (err){
        console.error('Error Fetching clients:', err)
        res.status(500).json({message:'internal Server Error'})
    }
};

export const updateClient = async(req,res) =>{
    try{
        console.log("Sending update to DB:", req.body)
        const clientId = req.params.id;
        const clientData = req.body;
        const updateClient = await clientServices.updateClient(clientId, clientData);
        if(!updateClient){
            return res.status(404).json({message:" Client not found"});
        }
        res.status(200).json(updateClient)
    }catch (err){
        console.error('Error Fetching clients:', err)
        res.status(500).json({message:'internal Server Error'})
    }
};

export const deleteClient = async(req,res) =>{
    try{
        const clientId = req.params.id;
        const deleted = await clientServices.deleteClient(clientId);
        if(!deleted){
            return res.status(404).json({message:" Client not found"});
        }
        res.status(200).send()
    }catch (err){
        console.error('Error deleting clients:', err)
        res.status(500).json({message:'internal Server Error'})
    }
};

export const searchClients = async(req,res) =>{
    try{
        const searchTerm = req.query.q;
        const clients = await clientServices.searchClients(searchTerm)
        res.status(200).json(clients)
    }catch (err){
        console.log("Error searching clients:", err)
        res.status(500).json({message:" Internal serval error"})
    }
}