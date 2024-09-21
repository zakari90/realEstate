import { AgentPropertyData, getAgentProperties, registerClerkUserAsAgent } from '@/_actions/agent/actions'
import { Agents } from '@prisma/client'
import { create } from 'zustand'

interface AgentState {
  agent: Agents | null // Replace 'any' with your actual Agent type
  agentProperties: { properties: AgentPropertyData[] }
  error: string | null
  isLoading: boolean
  fetchAgentData: () => Promise<void>
}

export const useAgentStore = create<AgentState>((set) => ({
  agent: null,
  agentProperties: { properties: [] },
  error: null,
  isLoading: false,
  fetchAgentData: async () => {
    set({ isLoading: true, error: null })
    try {
      const agent = await registerClerkUserAsAgent()
      set({ agent })
      if (agent) {
        const agentProperties = await getAgentProperties()
        set({ agentProperties })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({ error: 'Failed to fetch agent data' })
    } finally {
      set({ isLoading: false })
    }
  },
}))