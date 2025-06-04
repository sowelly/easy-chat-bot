'use client'
import React from "react";
import SplitterLayout from "@/components/chat/SplitterLayout";
import {CaseContext} from "@/contexts/CaseContext";


const Case = () => {
  const dbName = 'Case_db', storeName = 'case'

  return <CaseContext.Provider value={{dbName, storeName}}>
    <SplitterLayout context={CaseContext}/>
  </CaseContext.Provider>
}
export default Case