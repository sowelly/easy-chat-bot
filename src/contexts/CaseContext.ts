import React from "react";

type CaseContextType = {
  dbName: 'case'
  storeName: 'case'
}
export const CaseContext: React.Context<CaseContextType | null> = React.createContext(null)
