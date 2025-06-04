import {PlusOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {Button, Form, message, Table} from 'antd';
import DraggerUpload from "@/components/upload";
import {ProFormUploadButton, ProFormUploadDragger} from "@ant-design/pro-form";
import {useEffect, useState} from "react";
import {createKnowledgeBase} from "../../electron/tools.ts";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [fileIds, setFileIds] = useState([])


  const fileUpload = async (options: any) => {
    const {file} = options;
    console.log('fileUpload', file.name)

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;

      async function upload() {
        const {data, success, msg} = await window.mainAPI.uploadFile(file.name, content);
        console.log('fileUpload', data)
        if (success) {
          setFileIds(prevState => (
            [
              ...prevState,
              data.fileId
            ]
          ))
          setFileList(prevState => ([...prevState, {
            uid: file.uid,
            name: file.name,
            status: 'done'
          }]))
        } else message.error(msg)
      }

      upload()
    };


    reader.readAsText(file); // 也可以根据需要改为 readAsArrayBuffer
  };

  const onFinish = async (values) => {
    const {success} = await window.mainAPI.createKnowledgeBase({...values, files: fileIds})
    console.log('success', success)
    if (success) message.success('创建成功')
    setOpen(false)
  }

  return (
    <ModalForm<{
      name: string;
      file: string;
      description: string
    }>
      open={open}
      onOpenChange={setOpen}
      title="新建"
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          新建
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={onFinish}
    >


      <ProFormText
        width="md"
        name="name"
        label="名称"
        placeholder="请输入名称"
      />
      <ProFormText
        width="md"
        name="description"
        label="描述"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormUploadButton
        fieldProps={{
          customRequest: fileUpload,
          fileList
        }}
        width="sm"
        name="files"
        label="附件"
      />

    </ModalForm>
  );
};