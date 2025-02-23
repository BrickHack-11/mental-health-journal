from ollama import chat
import re

def get_self_care_suggestion(age, gender, contri, mood, sleep, journal_entry):
    pre_prompt = 'Here is the journal entry of a ' + str(age) + ' year old ' + str(gender) + ' their mood was ' + str(mood) + ' today and it was due to ' + str(contri) + ' also they had ' + str(sleep) +'today :' 
    post_prompt = """ analyse the sentiments in this entry and give me a sentiment (positive, mostly positive, mostly negative and negative) that matches the most. Then based on the entry suggest 2 self care suggestions that could be any activity can helps make their mood better. You should be polite and sensitive while doing this. 
    I want your response to be in the following format No extra new lines in between
    Sentiment:<positive, mostly positive, mostly negative, negative>
    Suggestions:<suggestions separated by comma>
    <NOTHING AFTER THIS>
    """

    content = pre_prompt + journal_entry + post_prompt

    response = chat(model='deepseek-r1:1.5b', messages=[
        {
            'role': 'user',
            'content': content,
        }
    ])

    stripped_text = re.sub(r"<think>.*?</think>", "", response.message.content, flags=re.DOTALL).strip()
    stripped_text = stripped_text.replace("Sentiment:", "")
    stripped_text = stripped_text.replace("Suggestions:", "")
    stripped_text = stripped_text.replace("-", "")
    result = [res.strip() for res in stripped_text.split("\n")]
    return result[0], result[1:]
    


    