import React from 'react'

const EditableRow = ({editFormData,handleEidtFormChange,handleCancleClick}) => {

    return(
                <tr>    
                   <td>
                       <input type="text"  name='fullname' value={editFormData.fullname}  required placeholder='enter a name' onChange={handleEidtFormChange}/>
                    </td>
                   <td>
                        <input type="text" name='fullage'  value={editFormData.fullage} required placeholder='enter age'  onChange={handleEidtFormChange}/>
                   </td>
                   <td>
                        <input type="text" name='fulladdress' value={editFormData.fulladdress} required placeholder='enter address' onChange={handleEidtFormChange} />
                   </td>
                   <button type='submit'>save</button>
                   <button type='button' onClick={handleCancleClick}>cancle</button>
               </tr>
    )}

    export default EditableRow;  