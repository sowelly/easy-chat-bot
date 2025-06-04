import {Button, Tooltip} from "antd";
import {FormOutlined, MenuFoldOutlined, SearchOutlined} from "@ant-design/icons";
import React from "react";
import SearchModal from "../../home/components/searchModal";
import useChatSessions from "./hooks/useChatSessions";

export interface IChatContextType {
  sideOpen: boolean
  setSideOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default ({sideOpen, setSideOpen}: IChatContextType) => {
  const {newSession} = useChatSessions()
  const [open, setOpen] = React.useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  return <>
    <Tooltip title={`${sideOpen ? '关闭' : '展开'}边栏`}>
      <Button icon={<MenuFoldOutlined/>} type="text" onClick={() => setSideOpen((pre) => !pre)}/>
    </Tooltip>
    <Tooltip title="搜索聊天">
      <Button shape="circle" onClick={openModal} icon={<SearchOutlined/>} type="text"/>
    </Tooltip>
    <Tooltip title="新聊天">
      <Button icon={<FormOutlined/>} type="text" onClick={newSession}/>
    </Tooltip>

    <SearchModal open={open} setOpen={setOpen}/>
  </>
}
