#!/usr/bin/env python
# coding: utf-8

# In[1]:


import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import sys


# In[2]:


tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
 
def chat_with_bot(user_input):
    input_ids = tokenizer.encode(user_input, return_tensors="pt")
    response = model.generate(input_ids, max_length=50, num_return_sequences=1, no_repeat_ngram_size=2)

    bot_response = tokenizer.decode(response[0], skip_special_tokens=True)
    return bot_response

print(chat_with_bot(sys.argv[0]))

# In[ ]:




