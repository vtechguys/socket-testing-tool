import React from "react";
import { Form, Input, Button, Divider } from "antd";

export function SiderContent(props) {
  const onFinish = values => {
    console.log(values);
    props.onSendEvent(values);
  };
  const onAddListener = values => {
    props.onAddListener(values);
  };
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
      <h2>Events</h2>

      <Divider>Send Event </Divider>
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send{" "}
            <span role="img" aria-label="listen">
              🚀
            </span>
          </Button>
        </Form.Item>
      </Form>

      <Divider>Listen for Event</Divider>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Listen
            <span role="img" aria-label="listen">
              🎧
            </span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
