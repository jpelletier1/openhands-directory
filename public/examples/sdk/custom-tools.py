---
title: Custom Tools SDK Example
author: Alex Rodriguez
category: sdk
description: Advanced example showing how to extend OpenHands with custom tools, including API integrations and specialized functions for your workflow.
---

from openhands import Agent, Tool

class WeatherTool(Tool):
    name = "get_weather"
    description = "Get current weather for a location"
    
    def run(self, location: str):
        # Implementation here
        return f"Weather data for {location}"

agent = Agent(
    model="gpt-4",
    tools=[WeatherTool()]
)

result = agent.run(
    task="What's the weather in San Francisco?"
)
