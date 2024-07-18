import { useAuthContext } from "../../context/AuthContext";
import React from "react";
import useConversation from "../../zustand/useConverstaion";

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? 'chat-end' : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-white text-black'
  console.log(message.message)
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt=""
              src={profilePic}
            />
          </div>
        </div>
          <div className={`chat-bubble ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">11:47</div>
      </div>
  );
};

export default Message;
