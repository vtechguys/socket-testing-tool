import React from "react";
import { Row, Col, Card, Badge, Drawer, Empty, } from "antd";
import { SiderContent } from "./sider";
import { EditOutlined, DeleteOutlined, SendOutlined, SyncOutlined } from "@ant-design/icons";
import { SITE_BACKGROUND_COLOR } from "./theme";
import { HistoryContent } from './Eventhistory';
import "./AppScreen.css";

export function AppScreen(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const onClose = () => setIsVisible(false);
  const onBadgeClick = (event) => {
    props.setSelected(event);
    setIsVisible(true);
  };
  return (
 
       <Row style={{
      overflowX: 'hidden'
    }}>
      <Col span={24}>
        <Row >
          <h1>Header</h1>
        </Row>
        
        <Row gutter={[32, 10]}>
          <Drawer
            title={<span><SyncOutlined />History</span>}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isVisible}
          >
            {
               props.history && props.selected &&  props.history[props.selected]
               ? 
               <HistoryContent history={props.history[props.selected]}/>
               : <Empty
               description={
                 "No Records found"
               }
             >
             </Empty> 
            }
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
              backgroundColor: SITE_BACKGROUND_COLOR,
            }}
           
          >
            <Row gutter={[10, 10]} >
              <Col span={12}>
                <h3
                  style={{
                    margin: 10
                  }}
                >
                  Listen:Listen for server
                </h3>
                {props.listenEvents.map(event => (
                  <Badge
                    count={event.count}
                    overflowCount={props.countLimit ? props.countLimit : 10}
                    offset={[0, 20]}
                    key={event.event}
                    onClick={() => onBadgeClick(event) }
                  >
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
                  </Badge>
                ))}
              </Col>
              <Col span={12} >
                <h3
                  style={{
                    margin: 10
                  }}
                >
                  Send:Emit to server
                </h3>

                {props.sendEvents.map(event => (
                  <Badge
                    count={event.count}
                    overflowCount={props.countLimit ? props.countLimit : 10}
                    offset={[0, 20]}
                    key={event.event}
                    onClick={()=>onBadgeClick(event)}
                  >
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
                  </Badge>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  
 
  
  );
}
