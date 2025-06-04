import React, {ReactNode, useContext, useEffect} from 'react';
import {cn} from "@/lib/utils";
import {CommentOutlined} from '@ant-design/icons';
import {Conversations} from '@ant-design/x';
import {type GetProp, Space} from 'antd';
import useChatSessions from "./hooks/useChatSessions";
import {useSessionStore} from "@/store/sesseionStore";


const groupable: GetProp<typeof Conversations, 'groupable'> = {
  sort(a, b) {
    if (a === b) return 0;

    return a === 'Today' ? -1 : 1;
  },
  title: (group, {components: {GroupTitle}}) =>
    group ? (
      <GroupTitle>
        <Space>
          <CommentOutlined/>
          <span>{group}</span>
        </Space>
      </GroupTitle>
    ) : (
      <GroupTitle/>
    ),
};
const style = {
  width: 256,
};

interface IConversations {
  extra: ReactNode,
  customContext: React.Context<any>
}

export default ({extra, customContext}: IConversations) => {
  const context = useContext(customContext);

  if (!context) {
    throw new Error("useChatSessions 必须在对应的 Provider 内使用");
  }
  const {dbName, storeName} = context

  const {switchSession} = useChatSessions(dbName, storeName)
  const {sessionList, currentSessionID} = useSessionStore()


  return <div className={cn('h-full overflow-y-auto')}>
    <div className={cn('flex sticky top-0   bg-[#f5f5f5]')}>{extra}  </div>
    <Conversations
      style={style}
      groupable={groupable}
      onActiveChange={(v) => switchSession(v)}
      activeKey={currentSessionID}
      items={sessionList}
    />
  </div>
}