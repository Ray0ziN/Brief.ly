import sys
import json

data = str(sys.argv[1])
urlObj = json.loads(data)

print(urlObj["url"])