---
title: Basic Agent SDK Example
author: OpenHands Team
category: sdk
description: Simple example demonstrating how to create and run an OpenHands agent using the Python SDK with custom instructions and file operations.
---

from openhands import Agent

agent = Agent(
    model="gpt-4",
    instructions="You are a helpful coding assistant"
)

result = agent.run(
    task="Create a Python function that calculates fibonacci numbers",
    workspace="/workspace"
)

print(result.output)
