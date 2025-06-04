import React, {ReactNode, Suspense, useEffect, useState, useTransition} from 'react';
import {Layout, Menu, MenuProps} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {cn} from "@/lib/utils";
import Loading from "./loading";



const {Header, Content, Footer} = Layout;

const items = [
  {
    key: '/',
    label: `index`,
  }, {
    key: '/knowledgeBase',
    label: `knowledgeBase`,
  },
  {
    key: '/case',
    label: `case`,
  },
]

const BasicLayout = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [activeKeys, setActiveKeys] = useState([pathname || '/home'])
  console.log('pathname',pathname)
  const pushState: MenuProps['onClick'] = (e) => {
    startTransition(() => {
      navigate(e.key)
      setActiveKeys([e.key])
    })
  }

  return (
    <Layout className={cn('h-full w-full')}>
      <Header className={cn('sticky flex items-center top-0 z-999')}>
        <div className="demo-logo"/>
        <Menu
          theme="dark"
          selectedKeys={activeKeys}
          onClick={pushState}
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{flex: 1, minWidth: 0}}
        />
      </Header>
      <Content className={cn('p-6 h-[80vh] ')}>
        {isPending ? <Loading/> : <Outlet/>}
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default BasicLayout;