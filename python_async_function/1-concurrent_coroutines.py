#!/usr/bin/env python3
"""
Import wait_random written and write an async routine called wait_n
that takes in 2 int arguments.

wait_n should return the list of all the delays
(float values).
"""

from typing import List
import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
        returns the list of all delays without using sort()
    """
    i: List[float] = []
    for _ in range(n):
        i.append(asyncio.create_task(wait_random(max_delay)))
    return [await delay for delay in asyncio.as_completed(i)]
