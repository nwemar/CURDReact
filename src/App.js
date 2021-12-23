import React, { useState,Fragment } from 'react';
import "./App.css";
import {nanoid} from 'nanoid';
import data from './mock_data.json';
import ReadOnlyRow from './component/ReadOnlyRow';
import EditableRow from './component/EditableRow';

const App = () => {

        const [contacts, setContacts] = useState(data);
        const [addFormData,setaddFormData] =useState({
          fullname:'',
          fullage:'',
          fulladdress:''
        })
        const handleAddFormChange=(event)=>{
          event.preventDefault();
          const field_Name=event.target.getAttribute("name");
          const field_Value=event.target.value;
          const newFormData={...addFormData}
          newFormData[field_Name] =field_Value;
          setaddFormData(newFormData);
        }
        const handleAddFormSubmit =(event)=>{
          event.preventDefault();
          const newContact={
            id:nanoid(),
            name:addFormData.fullname,
            age:addFormData.fullage,
            address:addFormData.fulladdress
          };
          const newContacts =[...contacts,newContact]
          setContacts(newContacts)
          event.target.reset();
        }

        const [editContactID,seteditContactID]=useState(null);

        const handleEditClick =(event,contact)=>{
          event.preventDefault();
          seteditContactID(contact.id);

          const editFormData_withID ={
            fullname :contact.name,
            fullage:contact.age,
            fulladdress:contact.address
          }
          seteditFormData(editFormData_withID)
        }

        const [editFormData,seteditFormData]=useState({
          fullname:'',
          fullage:'',
          fulladdress:''
        })

        const handleEidtFormChange=(event)=>{
          event.preventDefault();
          const field_Name=event.target.getAttribute("name");
          const field_Value=event.target.value;
          const editContact ={...editFormData};
          editContact[field_Name]=field_Value;
          seteditFormData(editContact);
        }

        const handleEditSubmit=(event)=>{
          event.preventDefault();
          const newEidtContact ={
            id:editContactID,
            name : editFormData.fullname,
            age:editFormData.fullage,
            address:editFormData.fulladdress
          }
          const newContacts=[...contacts];
          const index = contacts.findIndex((contact)=>contact.id==newEidtContact.id)
          newContacts[index]=newEidtContact;
          setContacts(newContacts);
          seteditContactID(null);
        }

        const handleCancleClick =(event)=>{
            event.preventDefault();
            seteditContactID(null);
        }

        const handleDeleteClick =(contactID)=>{
         const newContacts=[...contacts];
         const find_Index=contacts.findIndex((contact)=> contact.id==contactID);
         newContacts.splice(find_Index);
         setContacts(newContacts);

        }

        return (
          <div>
            <form onSubmit={handleEditSubmit}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      contacts.map((contact)=>(
                        <Fragment>
                          { editContactID == contact.id ? <EditableRow editFormData={editFormData} handleEidtFormChange={handleEidtFormChange}  handleCancleClick={handleCancleClick}/> : <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
                        </Fragment>
                        
                      ))}
                  </tbody>
                </table>
          </form>
          <h2>Add New Contact</h2>
          <form onSubmit={handleAddFormSubmit} >
            <input type="text"  name='fullname'  required placeholder='enter a name' onChange={handleAddFormChange}/>
            <input type="text" name='fullage' required placeholder='enter age' onChange={handleAddFormChange}/>
            <input type="text" name='fulladdress' required placeholder='enter address' onChange={handleAddFormChange}/>
            <button type='submit'>Add</button>
          </form>
        </div>
            )

        }

        export default App;