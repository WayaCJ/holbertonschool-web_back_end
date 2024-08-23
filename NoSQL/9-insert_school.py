#!/usr/bin/env python3
"""inserts a document in Python"""

def insert_school(mongo_collection, **kwargs):
    """
    function that inserts a new document
    """

    result = mongo_collection.insert_one(kwargs)

    return (result.inserted_id)
