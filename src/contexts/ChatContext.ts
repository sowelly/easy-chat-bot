import React from "react";

type ChatContextType = {
  dbName: 'case' | 'chat_db'
  storeName: 'case' | 'chats'
}
export const ChatContext = React.createContext<ChatContextType | null>(null)
