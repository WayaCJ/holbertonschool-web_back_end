#!/usr/bin/env python3
"""function that returns list """


def schools_by_topic(mongo_collection, topic):
    """returns the list of school having a specific topic
    """

    list_of_school = mongo_collection.find({"topics": topic})
    return list_of_school
