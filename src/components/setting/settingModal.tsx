import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';
import Setting from "./setting";
import {userConfigStore} from "@/store/userConfigStore";

const SettingModal: React.FC = () => {
  const apiConfig = userConfigStore(s => s.apiConfig)
  const hasHydrated = userConfigStore(s => s._hasHydrated)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setCallback = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (hasHydrated) {
      if (!apiConfig.API_KEY) {
        showModal()
      }
    }

  }, [hasHydrated, apiConfig]);

  return (
    <>
      <Modal
        width={800}
        title="快捷登录"
        closable={{'aria-label': 'Custom Close Button'}}
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Setting setCallback={setCallback}/>
      </Modal>
    </>
  );
};

export default SettingModal;