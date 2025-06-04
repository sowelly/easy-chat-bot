import React from 'react';
import {Alert, Flex, Spin} from 'antd';
import {cn} from "@/lib/utils";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle}/>;

const Loading: React.FC = () => (
  <div className={cn('flex items-center justify-center h-full')}>
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </div>
);

export default Loading;