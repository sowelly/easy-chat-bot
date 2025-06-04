import {useContext} from "react";

export {default as Conversations} from "./conversations";
export {default as Sender} from './sender'
export {default as ToolBox} from './toolBox'
export {default as Welcome} from './welcome'

export type ChatType = {
  id: string;
  message: { role: 'user' | 'assistant'; content: string }[];
  status?: 'success' | 'pending' | 'error';
};
export const useChatContext = (context) => {
  const ctx = useContext(context);
  if (!ctx) throw new Error('useChat must be used within a context Provider');
  return ctx;
}