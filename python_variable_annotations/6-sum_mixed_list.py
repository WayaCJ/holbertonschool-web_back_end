#!/usr/bin/env python3

from typing import List, Union

""" Module to define a function for summing a list of """


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Calculate the sum of a list containing integers and floating-point numbers.

    Args:
    mxd_lst (List[Union[int, float]]): The list containing
    integers and floating-point numbers.

    Returns:
    float: The sum of the integers and floating-point numbers in the list.
    """
    return float(sum(mxd_lst))
