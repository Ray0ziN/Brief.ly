from nturl2path import url2pathname
import sys
import json
import os
from time import sleep
from gtts import gTTS

data = str(sys.argv[1])
urlObj = json.loads(data)


# This module is imported so that we can
# play the converted audio

# The text that you want to convert to audio

# print(urlObj["url"]) # This will get you the url obj
print(urlObj["title"]) # This will give the title of the document
# print(urlObj["id"])

id = urlObj["id"]
myText = 'Hello  ' + urlObj["title"]

# Language in which you want to convert
language = 'en'

# Passing the text and language to the engine,
# here we have marked slow=False. Which tells
# the module that the converted audio should
# have a high speed
# sleep(10)


myObj = gTTS(text=myText, lang=language, slow=False)


# sleep(2)
# Saving the converted audio in a mp3 file named
# welcome
myObj.save("audio/" + id +".mp3")
print('Save done')