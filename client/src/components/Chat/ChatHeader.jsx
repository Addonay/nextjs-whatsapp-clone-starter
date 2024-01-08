import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";

function ChatHeader() {
  const [{ currentChatUser,onlineUsers }, dispatch] = useStateProvider();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x:0,
    y:0,
  })

  const showContextMenu = (e) => {
    e.preventDefault()
    setContextMenuCoordinates({x:e.pageX, y:e.pageY})
    setIsContextMenuVisible(true)
  }

  const contextMenuOptions = [{
    name : "Exit",
    callback: async () => {
      dispatch({type:reducerCases.SET_EXIT_CHAT})
    }
  }]

  const handleVoiceCall = () => {
    dispatch({type:reducerCases.SET_VOICE_CALL,
      voiceCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"voice",
        roomId:Date.now()
      }})
  };

  const handleVideoCall = () => {
    dispatch({type:reducerCases.SET_VIDEO_CALL,
    videoCall:{
      ...currentChatUser,
      type:"out-going",
      callType:"video",
      roomId:Date.now()
    }})
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center z-10 bg-panel-header-background">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="sm text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-sm text-secondary">
            {onlineUsers.includes(currentChatUser.id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={handleVoiceCall}
        />
        <IoVideocam
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={handleVideoCall}
        />
        <BiSearchAlt2
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={() => dispatch({ type: reducerCases.SET_SEARCH_MESSAGE })}
        />
        <BsThreeDotsVertical className="cursor-pointer text-xl text-panel-header-icon" onClick={(e)=>showContextMenu(e)} id="context-opener" />
        {
      isContextMenuVisible && <ContextMenu
      options={contextMenuOptions}
      coordinates={contextMenuCoordinates}
      contextMenu={isContextMenuVisible}
      setContextMenu={setIsContextMenuVisible}
      />
    }
      </div>
    </div>
  );
}

export default ChatHeader;
