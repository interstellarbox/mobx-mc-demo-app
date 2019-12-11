import React from "react";
import { Modal, Form, Input } from "antd";

const DogModal = ({ visible, onCancel, onSubmit, form, model }) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title={model ? "Edit model" : "Create model"}
      okText="Submit"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Dog Name">
          {getFieldDecorator("name", {
            initialValue: model ? model.name : null,
            rules: [
              {
                required: true,
                message: "Please name the dog!"
              }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DogModalForm = Form.create({ name: "dogForm" })(DogModal);

export default DogModalForm;
