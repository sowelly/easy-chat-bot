"use client"
import React, {useContext, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Splitter} from "antd";
import SettingModal from "@/components/setting/settingModal";
import {ToolBox, Conversations, Sender} from "@/components/chat";

export type ChatType = {
  id: string;
  message: { role: 'user' | 'assistant'; content: string }[];
  status?: 'success' | 'pending' | 'error';
};

interface ISplitterLayout {
  defaultSizes?: string[]
}

export default function SplitterLayout({defaultSizes, context}: ISplitterLayout) {
  const sizes = defaultSizes || ['25%', '85%']
  const [sideOpen, setSideOpen] = useState(true)

  return <>
    <Splitter>
      <Splitter.Panel size={sideOpen ? sizes[0] : 0} resizable={false}>
        <Conversations extra={<ToolBox setSideOpen={setSideOpen}/>} customContext={context}/>
      </Splitter.Panel>
      <Splitter.Panel size={sizes[1]}>
        <div className={cn(sideOpen ? "hidden" : "")}>
          <ToolBox setSideOpen={setSideOpen}/>
        </div>
        <div className={cn('mx-auto w-[95%] h-full')}>
          <Sender customContext={context}/>
        </div>
      </Splitter.Panel>
    </Splitter>
    <SettingModal/>
  </>
}