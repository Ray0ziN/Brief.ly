import sys
import json


data = str(sys.argv[1])
urlObj = json.loads(data)

# print(type(urlObj["url"]))
URL = urlObj["url"]
id = urlObj["id"]
# URLs = "https://en.wikipedia.org/wiki/balapur"
# URLn = 90

print(URL)
print(id)
# print(type(URLs))
# print(type(URLn))