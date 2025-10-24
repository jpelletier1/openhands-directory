---
title: Streaming Agent
author: OpenHands Team
category: sdk
description: Agent with streaming responses for real-time interaction and progress updates.
---

from openhands import Agent
from openhands.streaming import StreamingHandler

class ProgressHandler(StreamingHandler):
    def on_token(self, token):
        print(token, end='', flush=True)

    def on_complete(self, response):
        print(f"\nCompleted: {response.status}")

agent = Agent(
    name="streaming_agent",
    streaming_handler=ProgressHandler()
)

response = agent.execute(
    "Write a Python function to calculate fibonacci numbers",
    stream=True
)

for chunk in response:
    print(f"Progress: {chunk.progress}%")
