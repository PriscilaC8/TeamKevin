import nltk.data

# Given string text, returns a list of sentences.
def tokenize(text):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    tokens = tokenizer.tokenize(text)
    return [token.strip() for token in tokens]

# Given a string sentence, returns a list of words
# with leading and trailing whitespaces removed.
def get_words(sentence):
    return sentence.strip().lstrip().split()

# Given a string sentence, returns True iff sentence contains a question mark.
def is_question_naive(sentence):
    return sentence.find("?") != -1



#############
# Test code #

sample_text = '''
We're supposed to have our next meeting by Friday, October 9th, so it would be awesome if you could fill out this when2meet (http://www.when2meet.com/?3584971-Scaez). We can keep the same location (somewhere in building 1), unless someone has another meeting place in mind. Same building as last time (building 1). Tentatively 1-132 (I will email out if the room number changes).
How does 6:30pm-7:30pm on Thursday, 10/8 sound for everyone? Is there anything that I can do to help? What are we covering during the meeting?'''
test_sentences = tokenize(sample_text)

for s in test_sentences:
    print(s, is_question_naive(s))
