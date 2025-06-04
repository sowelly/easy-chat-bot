"use client"
import React, {useEffect, useState} from "react";
import CreatedKnowledge from "@/knowledgeBase/createdKnowledge";
import {Button, message, Popconfirm, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import Query from "@/knowledgeBase/query";
import {cn} from "@/lib/utils";
import {deleteKnowledgeBaseRelationship} from "../../electron/tools.ts";


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
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={()=>confirm(record)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>,
    },
  ];

  return (
    <>
      <Query/>
      <div className={cn('mt-4')}>
        <Table<DataType>
          columns={columns}
          expandable={{
            expandedRowRender: ({files}) => files.map(f => <p style={{margin: 0}}>{f.name}</p>),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data}
        />
      </div>
    </>
  );
}


