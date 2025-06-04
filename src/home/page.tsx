"use client"
import React from "react";
import SplitterLayout from "@/components/chat/SplitterLayout";
import {ChatContext} from '../contexts/ChatContext'

export default function Home() {
  const dbName = 'chat_db', storeName = 'chats'

  return <ChatContext.Provider value={{dbName, storeName}}>
    <SplitterLayout context={ChatContext}/>
  </ChatContext.Provider>
}