import React from "react";
import { Row, Col, Card, Badge, Drawer, Empty } from "antd";
import { SiderContent } from "./sider";
import {
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  SyncOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import { SITE_BACKGROUND_COLOR } from "./theme";
import { HistoryContent } from "./Eventhistory";
import "./AppScreen.css";

export function AppScreen(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const onClose = () => setIsVisible(false);
  const onBadgeClick = event => {
    props.setSelected(event);
    setIsVisible(true);
  };
  return (
    <Row
      style={{
        overflowX: "hidden"
      }}
    >
      <Col span={24}>
        <Row
          gutter={[10, 10]}
          style={{
            padding: '10px 20px',
            backgroundColor: "#4af700",
            color: "#fff",
            
          }}
          align="middle"
        >
          <Col span={4}>
            <h2 style={{color: '#fff'}}>
              <span role="img" aria-label="listen">
                🎧
              </span>&nbsp;
              Socket
              &nbsp;
              <span role="img" aria-label="listen">
                🚀
              </span>
            </h2>
          </Col>
          <Col span={20}>
            <Row gutter={[5, 5]} style={{
              fontSize: 20,
            
            }}>
              <Col span={2} push={22}>
                <Row align="middle" onClick={props.onOff} >
                  <PoweroffOutlined /> &nbsp; Off
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[32, 10]}>
          <Drawer
            title={
              <span>
                <SyncOutlined />
                History
              </span>
            }
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isVisible}
          >
            {props.history &&
            props.selected &&
            props.history[props.selected] ? (
              <HistoryContent history={props.history[props.selected]} />
            ) : (
              <Empty description={"No Records found"}></Empty>
            )}
          </Drawer>
          <Col span={6}>
            <SiderContent
              onSendEvent={props.onSendEvent}
              onSendEventRemove={props.onSendEventRemove}
              onAddListener={props.onAddListener}
              onRemoveEventListener={props.onRemoveEventListener}
            ></SiderContent>
          </Col>
          <Col
            span={18}
            style={{
              backgroundColor: SITE_BACKGROUND_COLOR
            }}
          >
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <h3
                  style={{
                    margin: 10
                  }}
                >
                  Listen:Listen for server
                </h3>
                {props.listenEvents.map(event => (
                  <div key={event.event}>
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      borderWidth: 1,
                      borderColor: 'transparent',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      fontSize: 11,
                      fontWeight: 'bold',
                      padding: 5,
                      position: 'relative',
                     top: 30,
                     zIndex: 100
                    }}
                    onClick={() => onBadgeClick(event)}
                  >
                    { event.count <= props.countLimit ? event.count: props.countLimitLimit + "+" }
                  </span>
                  
                    <Card
                      style={{ width: 300, marginTop: 16 }}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => props.onEditListener(event)}
                        />,
                        <DeleteOutlined
                          key="ellipsis"
                          onClick={() => props.onRemoveEventListener(event)}
                        />
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <span role="img" aria-label="listen">
                            🎧
                          </span>
                        }
                        title={event.event}
                        description={event.data ? event.data : ""}
                      />
                    </Card>
                  </div>
                ))}
              </Col>
              <Col span={12}>
                <h3
                  style={{
                    margin: 10
                  }}
                >
                  Send:Emit to server
                </h3>

                {props.sendEvents.map(event => (
                  <div key={event.event}>
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      borderWidth: 1,
                      borderColor: 'transparent',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      fontSize: 11,
                      fontWeight: 'bold',
                      padding: 5,
                      position: 'relative',
                     top: 30,
                     zIndex: 100
                    }}
                    onClick={() => onBadgeClick(event)}
                  >
                    { event.count <= props.countLimit ? event.count: props.countLimitLimit + "+" }
                  </span>
                    <Card
                      key={event.event}
                      style={{ width: 300, marginTop: 16 }}
                      actions={[
                        <SendOutlined
                          key="ellipsis"
                          onClick={() => props.onSendEvent(event)}
                          rotate={-30}
                        />,
                        <EditOutlined
                          key="edit"
                          onClick={() => props.onEditSendEvent(event)}
                        />,
                        <DeleteOutlined
                          key="delete"
                          onClick={() => props.onSendEventRemove(event)}
                        />
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <span role="img" aria-label="listen">
                            🚀
                          </span>
                        }
                        title={event.event}
                        description={event.data ? event.data : ""}
                      />
                    </Card>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
