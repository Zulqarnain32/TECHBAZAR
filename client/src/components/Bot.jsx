import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const Bot = () => {
   const [openbot, SetOpenBot] = useState(false);
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [thinking, setThinking] = useState(false);
   const messagesEndRef = useRef(null);

   const API_KEY = "AIzaSyCKYhX_a-LBNPNrydxpF5mEE92Ej-pKyEM";
   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   useEffect(() => {
      if (openbot) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "auto";
      }
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [openbot]);

   const sendMessage = async () => {
      if (!input.trim()) return;

      setThinking(true);
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
         const response = await axios.post(API_URL, {
            contents: [{ parts: [{ text: input }] }],
         });

         const botReply =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I didn't understand that.";

         setMessages([...newMessages, { text: botReply, sender: "bot" }]);
      } catch (error) {
         console.error("Error fetching response: ", error);
         setMessages([
            ...newMessages,
            { text: "Error fetching response.", sender: "bot" },
         ]);
      } finally {
         setTimeout(() => setThinking(false), 300); // Small delay for smooth transition
      }
   };

   return (
      <>
         {openbot && (
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => SetOpenBot(false)}>
            </div>
         )}

         {openbot ? (
            <div className="fixed inset-0 flex justify-center items-center z-50">
               <div className="w-full max-w-md p-4 bg-white xs:w-10/12 shadow-lg rounded-lg flex flex-col h-[calc(100vh-100px)] relative">
               <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">TECH<span className='text-red-500'>BAZAAR</span> </p>

                  <RxCross2
                     className="absolute right-4 top-4 text-2xl cursor-pointer text-blue-500"
                     onClick={() => SetOpenBot(false)}
                  />

                  <div className="flex-1 p-2 space-y-2 overflow-auto">
                     {messages.map((msg, index) => (
                        <div
                           key={index}
                           className={`p-2 rounded-lg max-w-xs ${msg.sender === "user"
                                 ? "bg-blue-500 text-white relative self-end"
                                 : "bg-gray-200 text-black self-start"
                              }`}
                        >
                           {msg.text}
                        </div>
                     ))}
                     <div ref={messagesEndRef} />
                     {thinking && <div className="text-gray-500 ">Thinking...</div>}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:outline-none"
                        placeholder="Ask me anything..."
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                     />
                     <button
                        onClick={sendMessage}
                        className="p-2 bg-blue-500 text-white rounded-lg"
                     >
                        Send
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div>
               <div
                  onClick={() => SetOpenBot(true)}
                  className="fixed bottom-16 right-10 xs:right-4 bg-red-500 text-white cursor-pointer h-12 w-12 leading-[48px] border rounded-full text-center"
               >
                  Chat
               </div>
            </div>
         )}
      </>
   );
};

export default Bot;
