import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// this is a reusable delete pop up card confiramtion for every delete buttton 
const DeletePopup = ({ onConfirm }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    onConfirm();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        onClick={showModal}
      >

      </Button>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
            Confirm Delete
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this record?</p>
      </Modal>
    </>
  );
};

DeletePopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default DeletePopup;
