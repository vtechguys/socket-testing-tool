import React from "react";
import { Layout, Menu, Row, Col, Card, Meta, Avatar } from "antd";
import { SiderContent } from "./sider";
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

export function AppScreen(props) {
  return (
    <Layout>
      <Sider width={props.width || 200}  style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        color: '#fff'
      }}>
        <SiderContent
          onSendEvent={props.onSendEvent}
          onSendEventRemove={props.onSendEventRemove}
          onAddListener={props.onAddListener}
          onRemoveEventListener={props.onRemoveEventListener}
        ></SiderContent>
      </Sider>
      <Content  className="site-layout-background"
          // style={{
          //   padding: 24,
          //   margin: 0,
          //   minHeight: 280,
          // }}
          style={{ padding: 24, marginLeft:props.width || 200 , overflowY: 'scroll', overflowX: 'hidden', height: '100%' }}>
        <Row>
          <Col span={12}>
          <h3>Listen:Listen for server</h3>

            {
              props.listenEvents.map(event=>(
                <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <EditOutlined key="edit" onClick={()=>props.onEditListener(event)}/>,
                  <DeleteOutlined key="ellipsis" onClick={(()=>props.onRemoveEventListener(event))}/>,
                ]}
              >
                  <Card.Meta
                    avatar={
                      <Avatar src="https://www.pinclipart.com/picdir/middle/71-713909_headphones-clipart-svg-cartoon-headphones-png-transparent-png.png" />
                    }
                    title={event.event }
                    description={event.data ? event.data: '' }
                  />
              </Card>
              ))
            }
          </Col>
          <Col span={12}>
          <h3>Send:Emit to server</h3>

          {
              props.sendEvents.map(event=>(
                <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <SendOutlined key="ellipsis" onClick={()=>props.onSendEvent(event)} rotate={-30}/>,
                  <EditOutlined key="edit" onClick={()=>props.onEditSendEvent(event)}/>,
                  <DeleteOutlined key="delete" onClick={()=>props.onSendEventRemove(event)}/>,
                ]}
              >
                  <Card.Meta
                    avatar={
                      <Avatar src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.p2jcU2EXZs0xsJwIlWHJMgHaHa%26pid" />
                    }
                    title={event.event }
                    description={event.data ? event.data: '' }
                    
                  />
              </Card>
              ))
            }
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
