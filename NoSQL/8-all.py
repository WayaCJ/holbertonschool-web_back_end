#!/usr/bin/env python3
"""lists all documents in Python"""

def list_all(mongo_collection):
    """
    function that lists all documents
    """

    documents = list(mongo_collection.find())

    return documents
