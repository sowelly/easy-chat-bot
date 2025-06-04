import {create} from "zustand";
import {persist} from "zustand/middleware";

interface Session {
  id: string
  messages: Message[]
}

interface Message {
  role: 'user' | 'assistant',
  content: string
}

interface SessionState {
  loading: boolean
  setLoading: (val: boolean) => void
  currentSessionID: string
  setCurrentSessionID: (id: string) => void
  sessionList: Session[]
  setSessionList: (list: Session[]) => void
  currentSession: Session | null
  setCurrentSession: (val: Message[] | ((prev: Message[]) => Message[])) => void
}


export const useSessionStore = create<SessionState>(
  persist(
    (set, get) => ({
      loading: false,
      setLoading: (val) => set({'loading': val}),
      currentSession: [],
      setCurrentSession: (val) => {
        const prev = get().currentSession
        const next = typeof val === 'function' ? (val as (prev: Message[]) => Message[])(prev) : val
        console.log('next',  next)
        set({'currentSession': next})
      },
      currentSessionID: '',
      setCurrentSessionID: (val) => set({'currentSessionID': val}),
      sessionList: [],
      setSessionList: (val) => set({'sessionList': val}),
    }),
    {
      name: 'session-store'
    }
  )
)