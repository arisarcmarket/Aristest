import { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("https://staging-api.arc.market/ws/v2/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       textPrompt: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        msgs.push(data.data);
        setChats(msgs);
        setIsTyping(false);
       window.scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
    <h1>Chat bot ai </h1>

    <section>
      {chats && chats.length
        ? chats.map((chat, index) => (
            <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
              <span>{chat.content}</span>
            </p>
          ))
        : ""}
    </section>

    <div className={isTyping ? "" : "hide"}>
      <p>
        <i>{isTyping ? "Typing" : ""}</i>
      </p>
    </div>

    <form action="" onSubmit={(e) => chat(e, message)}>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Type a message here and hit Enter..."
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  </main>
  );
}

export default App;
