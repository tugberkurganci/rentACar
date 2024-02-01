import React, { useEffect, useState } from 'react'
import axiosInstance, { axiosAssets } from '../../utils/interceptors/axiosInterceptors'
import axios from 'axios'


type Props = {source?:string}

const CarImage = ({source}: Props) => {

    
    
  return (

    <> <img className='img-fluid rounded' src={source?`/assets/car/${source}`:""}></img></>
  )
}

export default CarImage