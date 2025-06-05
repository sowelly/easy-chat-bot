import React, {useEffect, useState} from "react";
import {Button, message, Popconfirm, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import Query from "@/knowledgeBase/query";
import {cn} from "@/lib/utils";

interface DataType {
  key: React.Key;
  name: string;
  count: number;
  description: string;
}

export default () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    const res = await window.mainAPI.getKnowledgeBaseRelationship()
    console.log('data', res.data)
    setData(res.data)
  }

  const confirm = async (r) => {
    const {success} = await window.mainAPI.deleteKnowledgeBaseRelationship(r)
    if (success) {
      message.success('操作成功')
      fetchData()
    }

  }
  const columns: TableColumnsType<DataType> = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'description', dataIndex: 'description', key: 'description'},
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (value, record, index) => <Popconfirm
        title="删除"
        description={`确认删除该${record.files ? '知识库' : '附件'}？`}
        onConfirm={() => confirm(record)}
        okText="确认"
        cancelText="取消"
      >
        <Button danger size={'small'} type={'text'}>删除</Button>
      </Popconfirm>
    },
  ];

  return (
    <>
      <Query/>
      <div className={cn('mt-4')}>
        <Table<DataType>
          columns={columns}
          childrenColumnName={'files'}
          // expandable={{
          //   expandedRowRender: ({files}) => files.map(f => <p style={{margin: 0}}>{f.name}</p>),
          //   rowExpandable: (record) => record.name !== 'Not Expandable',
          // }}
          dataSource={data}
        />
      </div>
    </>
  );
}


