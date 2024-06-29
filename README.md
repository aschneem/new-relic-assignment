# new-relic-assignment
New Relic take home assignment

## Data Source Setup
I selected Elasticsearch becaused it is something that I have some experience with and seemed to fit all of the use cases fairly well.
Below are the steps for getting a single node cluster running for local dev. Note you need to have the environment variable ELASTIC_PASSWORD set.
Another note I'm working on windows powershell so there could be some idiosyncracies. 

```
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.14.1
docker network create elastic-net
docker run -p 127.0.0.1:9200:9200 -d --name elasticsearch --network elastic-net -e ELASTIC_PASSWORD=$ENV:ELASTIC_PASSWORD -e "discovery.type=single-node" -e "xpack.security.http.ssl.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.14.1
```

## Backend 
Given my time contraint I went with python and flask since they make it very easy to setup and endpoint quickly. As usual with python I'd recommend setting up and using a virtual environment. 

 If needed install the virtualenv module
```pip install virtualenv```

create the virtual environment
```python -m venv my_venv```

Activate the virtual environment using the appropriate script type for your environment in the venv/Scripts folder created by venv command
```
pip install -r requirements.txt
```
At that point you should be able to run the application

```
python -m flask run
```

I currently have it setup on first run to connect to a localhost:9200 elastic cluster with the ELASTIC_PASSWORD environment variable create the index if it doesn't exist and populate it with 1000 entries generated with Faker. By default it will run on port 5000

## Front end
I did a quick setup with Vite and React. I went with pure javascript becasue of my time crunch I didn't want to spend too much extra time defining types.

It can be run like this:
```
npm install
npm run dev
```

Tests can be run with:
```
npm test
```

## Additional Notes
I don't think this is my best work, but I don't have the time I'd normally want to take to clean things up the way that I would want. I essentially only had part of a day to work on this project since it was sent to me before I could coordinate the best timeline. As of writing I technically have 2 days left to submit, but I have family in from out of town and child care responsibilities this weekend that will severely limit any additional time I have to devote to this. That said I'm going to try and go back and do a little refactoring on the backend and write some tests for that code. Also if possible I'll probably make dockerfiles for the frontend and backend, and then use those to throw together a docker-compose.yml to make running things easier. Other things that come time mind that I'd want to take on are parameratising all the URLs so they could theoretically could be made to different hosts like in a more productionized environment. I'd also want to perform more thourough manual and automated testing of the application. Additionally, I might look at trying to ensure that there was more company overlap with the fake data since the number of unique entries generated seems high compared to what I might expect in the real world. I also noticed that some names would be generated with titles throwing off my simple first / last name parsing. I'd also spend some more time styling the front-end, which doesn't look great right now, but is functionally working.
