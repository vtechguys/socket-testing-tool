import React from "react";
import { Spin } from "antd";
import { SocketConnectForm } from "./components/SocketConnect";
import { AppScreen } from "./components/app";

import { tryToSubscribe } from "./utils/socket";

const socketConnectExternalStyle = {
  height: "20%"
};
function urlvalidation(url) {
  return true;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isConnected: false,
      socket: null,
      sendEvents: [],
      listenEvents: [],
      countLimit: 100,
      history: null,
      selected: null
    };
    this.tryToConnectHandler = this.tryToConnectHandler.bind(this);
    this.socketConnect = this.socketConnect.bind(this);
    this.socketDisconnect = this.socketDisconnect.bind(this);
    this.socketEvent = this.socketEvent.bind(this);
    this.onSendEvent = this.onSendEvent.bind(this);
    this.onAddListener = this.onAddListener.bind(this);
    this.onSendEventRemove = this.onSendEventRemove.bind(this);
    this.onRemoveEventListener = this.onRemoveEventListener.bind(this);
    this.setSelectedForHistoryView = this.setSelectedForHistoryView.bind(this);
  }
  socketConnect() {
    this.setState({
      isConnected: true,
      isLoading: false
    });
  }
  someListenerTriggered(event, data) {
    const { listenEvents, history } = this.state;
    let ev = null;
    const newListenerEvents = listenEvents.map(e => {
      if (e.event === event) {
        ev = e;
        let count = e.count + 1;
        return {
          ...e,
          data,
          count
        };
      }
      return e;
    });

    let newHistory = null;
    if (!history) {
      newHistory = {
        [event]: [
          {
            timestamp: Date.now(),
            ...ev
          }
        ]
      };
    } else {
      newHistory = { ...history };
      if (event in history) {
        newHistory[event].push({
          timestamp: Date.now(),
          ...ev
        });
      } else {
        newHistory[event] = [
          {
            timestamp: Date.now(),
            ...ev
          }
        ];
      }
    }

    this.setState({
      listenEvents: newListenerEvents,
      history: newHistory
    });
  }
  socketDisconnect() {}
  socketEvent(...args) {
    console.log(args);
  }
  onSendEvent({ event, data }) {
    const { socket, history, sendEvents } = this.state;
    const index = sendEvents.findIndex(e => e.event === event);
    const isAlreadyExist = index > -1;
    let newHistory = null;

    if (isAlreadyExist) {
      const newSendEvents = [...sendEvents];
      newSendEvents[index].count++;

      (newSendEvents[index].data = data);
      let ev = newSendEvents[index];
      if (!history) {
        console.log("1");
        newHistory = {
          [event]: [
            {
              timestamp: Date.now(),
              ...ev
            }
          ]
        };
      } else {
        newHistory = { ...history };
        if (event in history) {
          console.log("2");
          newHistory[event].push({
            timestamp: Date.now(),
            ...ev,
            key: ev.count
          });
        } else {
          console.log("3", event);
          newHistory[event] = [
            {
              timestamp: Date.now(),
              ...ev
            }
          ];
        }
      }

      this.setState({ sendEvents: newSendEvents, history: newHistory });
      socket.emit(event, data);
      return;
    }
    let ev = { event, data, count: 1 };
    if (!history) {
      console.log("1");
      newHistory = {
        [event]: [
          {
            timestamp: Date.now(),
            ...ev
          }
        ]
      };
    } else {
      newHistory = { ...history };
      if (event in history) {
        console.log("2");
        newHistory[event].push({
          timestamp: Date.now(),
          ...ev,
          key: ev.count
        });
      } else {
        console.log("3", event);
        newHistory[event] = [
          {
            timestamp: Date.now(),
            ...ev
          }
        ];
      }
    }
    this.setState(prevState => ({
      sendEvents: prevState.sendEvents.concat(ev),
      history: newHistory
    }));
    socket.emit(event, data);
  }
  onSendEventRemove({ event }) {
    console.log("onSendEventRemove", event);
    const { sendEvents } = this.state;
    const index = sendEvents.findIndex(e => e.event === event);
    console.log("index", index);

    if (index == -1) {
      return;
    }
    const newSendEvents = [...sendEvents];
    newSendEvents.splice(index, 1);
    console.log("newSendEvents", newSendEvents);
    this.setState({
      sendEvents: newSendEvents
    });
  }
  onAddListener({ event }) {
    const isAlreadyExist =
      this.state.listenEvents.findIndex(e => e.event === event) > -1;
    if (isAlreadyExist) {
      return;
    }
    this.setState(prevState => ({
      listenEvents: prevState.listenEvents.concat({ event, count: 0 })
    }));
    const { socket } = this.state;
    socket.on(event, data => this.someListenerTriggered(event, data));
  }
  onRemoveEventListener({ event }) {
    console.log("onRemoveEventListener", event);

    const { listenEvents, socket, history } = this.state;
    if (history && event in history) {
      delete history[event];
    }
    const index = listenEvents.findIndex(e => e.event === event);
    if (index == -1) {
      return;
    }
    const newListenerEvents = [...listenEvents];
    newListenerEvents.splice(index, 1);
    this.setState({
      listenEvents: newListenerEvents
    });
    socket.off(event);
  }
  tryToConnectHandler({ url }) {
    const { socket } = tryToSubscribe(
      { url },
      this.socketConnect,
      this.socketEvent,
      this.socketDisconnect
    );
    this.setState({
      socket,
      isLoading: true
    });
  }
  onEditListener(event) {
    console.log(event);
  }
  onEditSendEvent(event) {
    console.log(event);
  }
  setSelectedForHistoryView({ event }) {
    this.setState({
      selected: event
    });
  }
  render() {
    console.log("render", this.state);
    let isTryingToConnect = this.state.socket && this.state.isLoading;
    let jsx = null;
    if (isTryingToConnect) {
      jsx = (
        <div className="vw vh flex_column justify_center align_items_center">
          <Spin tip="Connecting..."></Spin>
        </div>
      );
    }
    let isConnectForm = !this.state.socket;
    if (isConnectForm) {
      jsx = (
        <div className="vw vh flex_column justify_center align_items_center">
          <SocketConnectForm
            style={socketConnectExternalStyle}
            onSumbit={this.tryToConnectHandler}
          />
        </div>
      );
    }
    let isSocketCoonected = this.state.socket && this.state.isConnected;
    if (isSocketCoonected) {
      jsx = (
        <AppScreen
          onSendEvent={this.onSendEvent}
          onSendEventRemove={this.onSendEventRemove}
          onAddListener={this.onAddListener}
          onRemoveEventListener={this.onRemoveEventListener}
          listenEvents={this.state.listenEvents}
          sendEvents={this.state.sendEvents}
          onEditListener={this.onEditListener}
          onEditSendEvent={this.onEditSendEvent}
          countLimit={this.state.countLimit}
          history={this.state.history}
          selected={this.state.selected}
          setSelected={this.setSelectedForHistoryView}
        ></AppScreen>
      );
    }

    return jsx;
  }
}

export default App;
