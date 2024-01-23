import React, { useState } from 'react'
import UserPanel from '../../components/UserPanel'
import CarPanel from '../../components/CarPanel/CarPanel'
import RentalPanel from '../../components/RentalPanel.tsx/RentalPanel'

type Props = {}

const Admin = (props: Props) => {

    const [section, setSection] = useState<string>("user")
    


  return (
    <div className='row'>
        <div className='col-2 bg-danger d-flex flex-column '>
        <div
            className="btn btn-primary row  mb-2"
            onClick={() => setSection("user")}
          >
            USERS
          </div>
          <div
            className="btn btn-primary row mb-2"
            onClick={() =>  setSection("car")}
          >
            CARS
          </div>
          <div
            className="btn btn-primary row mb-2"
            onClick={() =>  setSection("rental")}
          >
            RENTALS
          </div>
        </div>
        <div className='col bg-info'> { (section =="user" && <UserPanel/> ) } {(section =="car" && <CarPanel/>)  } {(section =="rental" && <RentalPanel/>) }</div>
        
    
        
        
        </div>
  )
}

export default Admin