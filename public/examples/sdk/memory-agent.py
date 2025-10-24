---
title: Agent with Memory
author: OpenHands Team
category: sdk
description: Agent with persistent memory for context-aware conversations and learning.
---

from openhands import Agent
from openhands.memory import VectorMemory, ConversationMemory

vector_memory = VectorMemory(
    storage="chromadb",
    collection="agent_knowledge"
)

conversation_memory = ConversationMemory(
    max_history=10,
    summarize=True
)

agent = Agent(
    name="memory_agent",
    memory=[vector_memory, conversation_memory]
)

agent.remember("User prefers Python over JavaScript")
agent.remember("Project deadline is next Friday")

response = agent.execute(
    "What programming language should I use for the project?"
)

context = agent.recall("programming language preference")
print(f"Recalled context: {context}")
print(f"Response: {response.output}")
