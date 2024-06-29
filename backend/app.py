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

@app.route("/customers")
@cross_origin()
def search():
    """Endpoint for searching the customer index"""
    query = request.args
    print(request.args)
    size = 10
    search_requirements = []
    if query:
        if 'limit' in query:
            size = query['limit']
        if 'search' in query:
            search_requirements.append({'wildcard': {'name': query['search'].lower()+'*' }})
        if 'filter_by_company_name' in query:
            search_requirements.append({'term': {
                'company.keyword': query['filter_by_company_name']}})
    data_query = {
        'match_all': {}
    }
    if len(search_requirements) > 0:
        data_query = {
            'bool': {
                'must': search_requirements
            }
        }
    print(data_query)
    query_results = data_client.search(index=INDEX_NAME, size=size, query=data_query).body
    return query_results['hits']['hits']
