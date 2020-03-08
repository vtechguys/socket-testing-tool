import React from "react";
import { Form, Input, Button, Divider } from "antd";

export function SiderContent(props) {
  const onFinish = values => {
    console.log(values);
    props.onSendEvent(values);
  };
  const onAddListener = values => {
    props.onAddListener(values);
  }
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const onAddListenerFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const { style, className } = props;
  const extraProps = {};
  if (style) {
    extraProps.style = style;
  }
  if (className) {
    props.className = className;
  }

  return (
    <>
    <h1 style={{color:'#fff'}}>Events</h1>
      
      <Divider style={{color: '#fff'}}>Send Event </Divider>
      <Form
        name="socketconnect"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        
      >
        <Form.Item
          name="event"
          rules={[
            {
              required: true,
              message: "Please input event name"
            }
          ]}
        >
          <Input placeholder="event name" />
        </Form.Item>
        <Form.Item name="data">
          <Input.TextArea placeholder="message" />
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit">
            Send 🚀 
          </Button>
        </Form.Item>
      </Form>
      
      <Divider style={{color: '#fff'}}>Listen for Event</Divider>
      <Form
        name="socketconnect"
        onFinish={onAddListener}
        onFinishFailed={onAddListenerFailed}
      >
        <Form.Item
          name="event"
          rules={[
            {
              required: true,
              message: "Please input event name"
            }
          ]}
        >
          <Input placeholder="event name" />
        </Form.Item>
        <Form.Item
        >
          <Button type="primary" htmlType="submit">
            Listen 🎧
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
