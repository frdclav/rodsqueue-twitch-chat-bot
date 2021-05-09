import { createContext } from "react";

export const ChatBotLogContext = createContext( {
  ChatBotLog: {},
  setChatBotLog: () => { },
} );
