import sys
import json


from gtts import gTTS

# This module is imported so that we can
# play the converted audio
import os

# The text that you want to convert to audio
data = str(sys.argv[1])
urlObj = json.loads(data)

# print(urlObj)

mytext = 'Hello man, I am Raunak and this is ' + urlObj["title"]

# Language in which you want to convert
language = 'en'

# Passing the text and language to the engine,
# here we have marked slow=False. Which tells
# the module that the converted audio should
# have a high speed
myobj = gTTS(text=mytext, lang=language, slow=False)

# Saving the converted audio in a mp3 file named
# welcome
myobj.save("welcome.mp3")

# Playing the converted file
# os.system("welcome.mp3")