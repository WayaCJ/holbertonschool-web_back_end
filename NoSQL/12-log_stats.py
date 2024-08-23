#!/usr/bin/env python3

"""
This script connects to a MongoDB instance and performs various queries on the 'nginx' collection
in the 'logs' database
"""

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure


def main():
    """
    Connects to a MongoDB instance, retrieves data from collection
    in the database, and performs various counts
    """
    try:
        # Connect to MongoDB
        client = MongoClient()
        db = client.logs
        collection = db.nginx
    except ConnectionFailure:
        print("Could not connect to MongoDB")
        return

    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    print("Methods:")
    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    status_check_count = collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{status_check_count} status check")


if __name__ == "__main__":
    """
    Entry point of the script
    """
    main()
