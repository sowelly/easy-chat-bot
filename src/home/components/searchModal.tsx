import React, {useEffect} from 'react';
import {Button, Input, Modal} from 'antd';

const SearchModal: React.FC = ({open, setOpen}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchContent, setSearchContent] = React.useState<string>('');

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open]);


  const fetchData = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const onSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }


  return (
    <Modal
      width={800}
      title={<Input placeholder={'搜索聊天'}  variant="underlined" onChange={(e) => setSearchContent(e.target.value)} onPressEnter={onSearch}/>}
      footer={null}
      loading={loading}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default SearchModal;