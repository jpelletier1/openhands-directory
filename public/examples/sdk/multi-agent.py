---
title: Multi-Agent Collaboration
author: OpenHands Team
category: sdk
description: Coordinate multiple specialized agents to solve complex tasks through collaboration.
---

from openhands import Agent, Coordinator

researcher = Agent(
    name="researcher",
    role="Research and gather information",
    tools=["web_search", "document_reader"]
)

coder = Agent(
    name="coder",
    role="Write and test code",
    tools=["code_editor", "test_runner"]
)

reviewer = Agent(
    name="reviewer",
    role="Review and validate solutions",
    tools=["code_analyzer", "security_scanner"]
)

coordinator = Coordinator(agents=[researcher, coder, reviewer])

result = coordinator.execute(
    task="Build a secure REST API with documentation",
    workflow="sequential"
)

print(f"Task completed by {len(result.agents_used)} agents")
print(f"Final output: {result.output}")
