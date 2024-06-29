"""New Relic take home flask backend"""
import os
from flask import Flask, request
from flask_cors import cross_origin
from elasticsearch import Elasticsearch
from data_generator import DataGenerator

app = Flask(__name__)

elastic_password = os.environ.get("ELASTIC_PASSWORD")
data_client = Elasticsearch("http://localhost:9200", basic_auth=('elastic', elastic_password))
INDEX_NAME = 'customers'

generator = DataGenerator(data_client, INDEX_NAME)
if not data_client.indices.exists(index=INDEX_NAME):
    data_client.indices.create(index=INDEX_NAME)
    generator.populate_entries(1000)

@app.route('/companies')
@cross_origin()
def companies():
    """Gets All the different company names"""
    results = data_client.search(index=INDEX_NAME, size=0, aggs={
        "unique_values": {
            "terms": {
                "field": "company.keyword",
                "size": 10000
            }
        }
    })

    return results['aggregations']['unique_values']['buckets']

def get_search_clauses_from_query_params(query):
    """Build search clauses for the given query parameters"""
    search_requirements = []
    if not query:
        return search_requirements
    if 'search' in query:
        search_requirements.append({'wildcard': {'name': query['search'].lower()+'*' }})
    if 'filter_by_company_name' in query:
        search_requirements.append({'term': {
            'company.keyword': query['filter_by_company_name']}})
    return search_requirements

def get_query_size_limit(query):
    """Gets the query size limit given the parameters"""
    size = 10
    if not query:
        return size
    if 'limit' in query:
        size = query['limit']
    return size

def build_customer_search_query(search_requirements):
    """Builds the customer search with the specified requirements"""
    if len(search_requirements) > 0:
        return {
            'bool': {
                'must': search_requirements
            }
        }
    return {
        'match_all': {}
    }

@app.route("/customers")
@cross_origin()
def search():
    """Endpoint for searching the customer index"""
    query = request.args
    size = get_query_size_limit(query)
    search_requirements = get_search_clauses_from_query_params(query)
    data_query = build_customer_search_query(search_requirements)
    query_results = data_client.search(index=INDEX_NAME, size=size, query=data_query).body
    return query_results['hits']['hits']
