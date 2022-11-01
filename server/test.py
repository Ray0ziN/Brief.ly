from transformers import pipeline
from bs4 import BeautifulSoup
import requests

import sys
import json


data = str(sys.argv[1])
urlObj = json.loads(data)



# summarizer = pipeline("summarization")
print(type(urlObj["url"]))
# URL = urlObj["url"]
URL = "https://en.wikipedia.org/wiki/Nagothana"

r = requests.get(URL)

soup = BeautifulSoup(r.text, 'html.parser')
results = soup.find_all(['h1', 'p'])
text = [result.text for result in results]
# print(text)
ARTICLE = ' '.join(text)
print(ARTICLE)

max_chunk = 500

ARTICLE = ARTICLE.replace('.', '.<eos>')
ARTICLE = ARTICLE.replace('?', '?<eos>')
ARTICLE = ARTICLE.replace('!', '!<eos>')

sentences = ARTICLE.split('<eos>')
current_chunk = 0
chunks = []
for sentence in sentences:
    if len(chunks) == current_chunk + 1:
        if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk:
            chunks[current_chunk].extend(sentence.split(' '))
        else:
            current_chunk += 1
            chunks.append(sentence.split(' '))
    else:
        print(current_chunk)
        chunks.append(sentence.split(' '))

for chunk_id in range(len(chunks)):
    chunks[chunk_id] = ' '.join(chunks[chunk_id])

len(chunks)

# res = summarizer(chunks, max_length=100, min_length=30, do_sample=False)

# res[0]

# ' '.join([summ['summary_text'] for summ in res])

# text = ' '.join([summ['summary_text'] for summ in res])


# # :id as an arg would concatenate

# with open('text/id.txt', 'w') as f:
#     f.write(text)

# print(text)


# from gtts import gTTS

# # This module is imported so that we can
# # play the converted audio

# # The text that you want to convert to audio
# #mText = 'Hello I am Raunak and we are making Brief it!'

# # Language in which you want to convert
# language = 'en'

# # Passing the text and language to the engine,
# # here we have marked slow=False. Which tells
# # the module that the converted audio should
# # have a high speed

# # myObj = gTTS(text=text, lang=language, slow=False)

# # Saving the converted audio in a mp3 file named

# # TOD :id with same

# # myObj.save("audio/" + id +".mp3")
# print('Save done')