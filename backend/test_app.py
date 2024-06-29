"""App unit tests"""
from unittest import TestCase
import app

class TestApp(TestCase):
    """Test Class for App module"""

    def test_get_search_clauses_empty_if_no_params(self):
        """Test output of funtion to get search clauses from query params with no query params"""
        clauses = app.get_search_clauses_from_query_params(None)
        self.assertEqual(len(clauses), 0)

    def test_get_search_clauses_populate_from_search_param(self):
        """Test output of funtion to get search clauses from query params with search param"""
        clauses = app.get_search_clauses_from_query_params({'search': 'abc'})
        self.assertEqual(len(clauses), 1)
        self.assertTrue('abc' in str(clauses[0]))

    def test_get_search_clauses_populate_from_company_param(self):
        """Test output of funtion to get search clauses from query params with 
        filter_by_company_name params"""
        clauses = app.get_search_clauses_from_query_params({'filter_by_company_name': 'xyz'})
        self.assertEqual(len(clauses), 1)
        self.assertTrue('xyz' in str(clauses[0]))


    def test_get_search_clauses_populate_from_multiple_params(self):
        """Test output of funtion to get search clauses from query params with 
        multiple query params"""
        clauses = app.get_search_clauses_from_query_params(
            {'filter_by_company_name': 'xyz', 'search': 'abc'})
        self.assertEqual(len(clauses), 2)

    def test_get_query_size_limit_defaults_to_ten(self):
        """Test get_query_size_limit defaults to 10 when not overridden by query params"""
        size = app.get_query_size_limit(None)
        self.assertEqual(size, 10)

    def test_get_query_size_limit_respects_query_params(self):
        """Test get_query_size_limit respects query params"""
        size = app.get_query_size_limit({'limit': 5})
        self.assertEqual(size, 5)

    def test_build_customer_query_returns_default_query(self):
        """Test build_customer_search_query defaults correctly"""
        query = app.build_customer_search_query([])
        self.assertTrue('match_all' in query)
        self.assertEqual(len(query['match_all'].keys()), 0)

    def test_build_customer_query_returns_query_with_specified_clauses(self):
        """Test build_customer_search_query includes the specified clauses"""
        clauses = ['abc', 'def']
        query = app.build_customer_search_query(clauses)
        for clause in clauses:
            self.assertIn(clause, query['bool']['must'])
