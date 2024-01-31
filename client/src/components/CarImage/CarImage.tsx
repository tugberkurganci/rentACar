import React, { useEffect, useState } from 'react'
import axiosInstance, { axiosAssets } from '../../utils/interceptors/axiosInterceptors'
import axios from 'axios'


type Props = {source?:string}

const CarImage = ({source}: Props) => {

    const [imageUrl, setImageUrl] = useState<string>()

    const fetchImage=async ()=>{

            try {
                const response = await axiosAssets.get(`/car/${source}`,  { responseType: 'blob' });
                const imageURL = URL.createObjectURL(response.data);
                setImageUrl(imageURL);
            } catch (error) {
                console.log(error)
            }
    }
    

    useEffect(() => {
    fetchImage()
    console.log("girdi")
    }, [])
    
  return (

    <> <img src={imageUrl}></img></>
  )
}

export default CarImage