---
title: Async Operations SDK Example
author: Emily White
category: sdk
description: Demonstrates asynchronous agent operations for handling multiple tasks concurrently with proper error handling and result aggregation.
---

import asyncio
from openhands import AsyncAgent

async def main():
    agent = AsyncAgent(model="gpt-4")
    
    tasks = [
        agent.run("Analyze data.csv"),
        agent.run("Generate report from results"),
        agent.run("Create visualization")
    ]
    
    results = await asyncio.gather(*tasks)
    
    for i, result in enumerate(results):
        print(f"Task {i+1}: {result.output}")

if __name__ == "__main__":
    asyncio.run(main())
