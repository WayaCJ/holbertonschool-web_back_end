#!/usr/bin/env python3

"""
coroutine called async_generator that takes no arguments.
"""

import random
from typing import Generator
from asyncio import sleep


async def async_generator() -> Generator[float, None, None]:
    """
    Create an asynchronous generator that yields numbers from 0 to 10.
    """
    for _ in range(10):
        await sleep(1)
        yield random.uniform(0, 10)
