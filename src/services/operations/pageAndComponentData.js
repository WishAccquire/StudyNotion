import React from 'react'
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../api';

export const pageCatalogPageData=async(categoryId) =>{
  let result=[];
  const toastId=toast.loading("Loading....")
  console.log("the category id isgyhuijko:",categoryId)
  
  try{
    const response=await apiConnector("GET",`${catalogData.CATALOGPAGEDATA_API}?categoryId=${categoryId}`);
    if(!response?.data?.success){
      throw new Error("CATALOGPAGEDATA_API RESPONSE ERROR.................");
    }

    result=response?.data?.data;
    
    
    
  }catch(err){
     console.log("CATALOGPAGEDATA_API RESPONSE ERROR .............",err);
     
     toast.error(err?.response?.data?.message);
     
     result=err?.response?.data?.message;
  }
  toast.dismiss(toastId);
  
  return result;
}


