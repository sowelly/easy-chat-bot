import {Prompts, Welcome} from '@ant-design/x';
import {Button, message, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {EllipsisOutlined, ShareAltOutlined} from "@ant-design/icons";

import type {PromptsProps} from '@ant-design/x';
import {
  BulbOutlined,
  InfoCircleOutlined,
  RocketOutlined,
  SmileOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const icons = [
  <BulbOutlined style={{color: '#FFD700'}}/>,
  <InfoCircleOutlined style={{color: '#1890FF'}}/>,
  <RocketOutlined style={{color: '#722ED1'}}/>,
  <SmileOutlined style={{color: '#52C41A'}}/>,
  <WarningOutlined style={{color: '#FF4D4F'}}/>
]
export default () => {
  const [dataSource, setDataSource] = useState<PromptsProps['items']>([])
  useEffect(() => {
    fetchPrompts()
  }, []);
  const fetchPrompts = async () => {
    const {success, data} = await window.mainAPI.getUploadFiles()
    if (success) {
      setDataSource(data.map((d, index) => ({label: d.name, key: d.id, description: d.name, icon: icons[index]})))
    }
  }
  return (
    <div className={cn('flex h-full flex-col items-center justify-center w-full gap-20')}>
      <Prompts
        title="✨ Inspirational Sparks and Marvelous Tips"
        items={dataSource}
        wrap
        onItemClick={(info) => {
          message.success(`You clicked a prompt: ${info.data.label}`);
        }}
      />

      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Hello, I'm Ant Design X"
        description="Base on Ant Design, AGI product interface solution, create a better intelligent vision~"
        extra={
          <Space>
            <Button icon={<ShareAltOutlined/>}/>
            <Button icon={<EllipsisOutlined/>}/>
          </Space>
        }
      />
    </div>
  );
};

