import { getAgentInvestments, investmentData, registerClerkUserAsAgent } from '@/_actions/agent/actions';
import { Agent } from '@prisma/client';
import { create } from 'zustand';

interface AgentState {
  agent: Agent | null; 
  agentInvestments: { investment: investmentData[] };  // Corrected the name from 'agentProperties' to 'agentInvestments'
  error: string | null;
  isLoading: boolean;
  fetchAgentInvestemtData: () => Promise<void>;
}

export const useAgentInvestmentStore = create<AgentState>((set) => ({
  agent: null,
  agentInvestments: { investment: [] }, 
  error: null,
  isLoading: false,
  fetchAgentInvestemtData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Register the user as an agent
      const agent = await registerClerkUserAsAgent();
      set({ agent });

      // If the agent is found, fetch the agent's investments
      if (agent) {
        const agentInvestments = await getAgentInvestments();
        set({ agentInvestments });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ error: 'Failed to fetch agent data' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
