import React from "react";
import { Form, Input, Button, Checkbox, Icon } from "antd";
import "./SocketConnect.css";
const layout = {
  
  width: '80%'
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

export function SocketConnectForm(props) {
  const onFinish = values => {
    console.log(values);
    props.onSumbit(values);
  };

  const onFinishFailed = errorInfo => {
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
    <div
      {...extraProps}
      className="flex_column justify_center align_items_center card"
    >
      <div className="socket_connect_header">Socket Connect</div>
      <div className="socket_connect_body flex_row justify_center">
        <Form
          {...layout}
          name="socketconnect"
          
          layout="inline"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please input url"
              }
            ]}
          >
            <Input placeholder="http://example.com"/>
          </Form.Item>

          <Form.Item
          // {...tailLayout}
          >
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
function SocketForm(props) {}
