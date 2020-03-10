import React from "react";
import { Timeline, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
export function HistoryContent({ history }) {
  return (
    <Timeline>
      {history.map(historyItem => (
        <Timeline.Item key={historyItem.count} dot={<ClockCircleOutlined />}>
          <div>
            {new Date(historyItem.timestamp).toLocaleTimeString()}
          </div>
          <div>{historyItem.data ? historyItem.data : "No Data Recived" }</div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
