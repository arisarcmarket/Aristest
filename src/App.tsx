import React, { useRef, useState } from "react";
import "./App.css";
import {
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Tooltip,
  theme,
  List,
  Avatar,
  Skeleton,
  Card,
  Typography,
} from "antd";
import {
  ClearOutlined,
  SendOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import logo from "./reactor.svg";
import axios from "axios";
import Paragraph from "antd/es/skeleton/Paragraph";
const { Header, Content, Footer } = Layout;

const url = "https://staging-api.arc.market/ws/v2/";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  background: "transparent",
  padding: "30px",
};

const postMessage = async (message: string, id: string) => {
  // using axios
  const response = await axios.post(`${url}ai/chat`, {
    id: id ?? null,
    textPrompt: message,
  });
  return response.data;
};

const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [list, setList] = useState<any>([]);

  const [data, setData] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [theId, settheId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [lastChats, setLastChats] = useState([]);
  const bottomEl: any = useRef(null);
  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessage = (e: any) => {
    chat(e, message);
  };
  const handleClear = (e: any) => {
    setMessage("");
    setChats([]);
    settheId(null);
    setLastChats([]);
    setCurrentMessage("");
  };

  const saveResult = async (index: any, prompt: any) => {
    console.log("-->>>>>", prompt);
    // const data = await postMessage(prompt, theId??'');
    // console.log(data.data)
    // const msgs = chats;
    // msgs[index] = data.data;
    // setChats(msgs);
    // setCurrentMessage(data.data.content);
    // settheId(data.data._id);
    // scrollToBottom();
  };
  const editChat = (index: any) => {
    console.log(chats[index]);
    chats[index].isEdit = true;
    setChats(chats);
  };
  const chat = async (e: any, textPrompt: any) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: textPrompt });
    setChats(msgs);
    setTimeout(() => {
      scrollToBottom();
    }, 50);

    setMessage("");
    const data = await postMessage(textPrompt, theId ?? "");
    console.log(data.data);
    msgs.push(data.data);
    setChats(msgs);
    settheId(data.data._id);
    setChats(msgs);
    setCurrentMessage(data.data.content);

    setIsTyping(false);
    setMessage("");
    scrollToBottom();
  };
  // useEffect(() => {
    
  // }, [JSON.stringify(chats)])
  
  return (
    <Layout style={{ background: "transparent" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          height: "10vh",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" />
      </Header>
      <Content style={contentStyle}>
        <div className={`chat-popup`}>
          <div className="chat-wrapper">
            <div className="chat-body">
              <div className="chat-body-inner">
                {chats && chats.length
                  ? chats.map((chat: any, index: any) => (
                      <div
                        key={index}
                        style={{ marginBottom: "10px" }}
                        className={
                          chat.role === "user" ? "user_msg" : "bot_msg"
                        }
                      >
                        {chat.role === "user" ? (
                          chat.content
                        ) : (
                          
                            <div>
                              {chat.isEdit ? (
                                <input type="text" key={index}    onChange={(event) => {
                                  console.log(event)
                                }}
                                value={chat.content}></input>
                              ) : (
                                <pre style={{ whiteSpace: "pre-wrap" }}>
                                  {chat.content}
                                </pre>
                              )}
                            
                            
                             
                            
                          </div>
                        )}
                      </div>
                    ))
                  : ""}

                <div className={isTyping ? "chat-typing" : "chat-typing hide"}>
                  <div className="dot-flashing" />
                </div>
                <div ref={bottomEl} />
              </div>
            </div>
          </div>
        </div>
        {/* <List
            style={{
              height: "80vh",
              overflow: "auto",
              backgroundColor: "transparent",
              color: "#fff",
              padding: "50px",
            }}
            loading={isTyping}
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={(item: any, index: any) => (
              <div>
                {item.role === "user" ? (
                  <div
                    style={{
                      textAlign: "right",
                      color: "#fff",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography.Text
                      style={{ margin: 0, color: "#fff", width: "100%" }}
                    >
                      {item.content}
                    </Typography.Text>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "left",
                      color: "#fff",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography.Text
                      editable
                      style={{ margin: 0, color: "#fff", width: "100%" }}
                      onChange={() => saveResult(index, item.content)}

                    >
                      {item.content} {index}
                    </Typography.Text>
                  </div>
                )}
              </div>

              // <List.Item
              //   actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
              // >
              //   <Skeleton avatar title={false} loading={ isTyping ?? false} active>
              //     <List.Item.Meta
              //       avatar={<Avatar src={logo} />}
              //       // title={item._id}
              //       description={item.content}
              //     />
              //    </Skeleton>
              // </List.Item>
            )}
          /> */}
      </Content>
      <Footer
        style={{
          backgroundColor: "transparent",
          position: "fixed",
          left: 0,
          bottom: 0,
          height: "12vh",
          width: "100%",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div></div>
        <div className="chat-message">
          <div className="chat-message-left">
            <div className="chat-logo">
              <img src={logo} alt="logo" className="rotate" />
            </div>
          </div>
          <div className="chat-message-middle">
            <form
              autoComplete="off"
              action=""
              onSubmit={(e) => {
                chat(e, message);
              }}
            >
              <input
                type="text"
                name="message"
                autoComplete="off"
                value={message}
                placeholder="Hey there, type your question here..."
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
          <div className="chat-message-right">
            <Tooltip title="Send">
              <Button
                type="link"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleMessage}
              />
            </Tooltip>
            <Tooltip title="Clear">
              <Button
                type="link"
                shape="circle"
                icon={<ClearOutlined />}
                onClick={handleClear}
              />
            </Tooltip>
          </div>
        </div>
        <div></div>
      </Footer>
    </Layout>
  );
};

export default App;
