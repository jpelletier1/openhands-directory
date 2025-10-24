---
title: Error Handling and Retries
author: OpenHands Team
category: sdk
description: Robust error handling with retries, fallbacks, and graceful degradation.
---

from openhands import Agent
from openhands.exceptions import AgentError, ToolError, TimeoutError
from openhands.retry import RetryPolicy

retry_policy = RetryPolicy(
    max_attempts=3,
    backoff_factor=2,
    retry_on=[ToolError, TimeoutError]
)

agent = Agent(
    name="resilient_agent",
    retry_policy=retry_policy,
    fallback_strategy="degrade"
)

try:
    response = agent.execute(
        "Analyze this document and extract key points",
        timeout=30
    )
except AgentError as e:
    print(f"Agent error: {e.message}")
    fallback_response = agent.execute_fallback(e)
    print(f"Fallback response: {fallback_response}")
except TimeoutError:
    print("Operation timed out, retrying with simpler approach...")
    response = agent.execute_simple("Summarize the document")
finally:
    agent.cleanup()
