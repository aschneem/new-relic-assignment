"""Generate fake data to populate the data source"""
from faker import Faker

class DataGenerator():
    """Class to generate fake data in the data source"""

    def __init__(self, client, index_name):
        self.client = client
        self.index_name = index_name
        self.faker = Faker()

    def populate_entries(self, count):
        """Generate fake data"""
        for i in range(count):
            name = self.faker.name()
            company = self.faker.company()
            name_split = name.split(" ")
            first_name = name_split[0]
            last_name = " ".join(name_split[1:])
            self.client.index(
                index = self.index_name,
                id = i,
                document = {
                    "name": name,
                    "first_name": first_name,
                    "last_name": last_name,
                    "company": company
                }
            )
