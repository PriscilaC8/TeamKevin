import nltk.data
from textblob.classifiers import NaiveBayesClassifier

import sys
sys.path.append('Users/admin/anaconda/pkgs/textblob-0.9.1-py27_0/lib/python2.7/site-packages/textblob/')
print sys.path

# Given string text, returns a list of sentences.
def tokenize(text):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    return tokenizer.tokenize(text)

# Given a string sentence, returns a list of words
# with leading and trailing whitespaces removed.
def get_words(sentence):
    return sentence.strip().lstrip().split()





#############
# Test code #
text = '''
Ok, I've also attached a few papers for you to read.  One is the NIRS review I mentioned (the McDonnell Consortium paper).  A few more are NIRS experiments or reviews of NIRS work on social cognition.  Two more are behavioral papers with infants that claim to use looking time for two different purposes -- to track interest in informative stimuli (the "Goldilocks effect" paper) versus to assess social preferences (the native language paper).  One of the projects we're going to work on is looking at whether we can use NIRS to distinguish when looking is driven by preference versus the quest for information.  I also attached a paper on how to write/interpret papers about science experiments that's a good guide to understanding and evaluating the things you read (the QALMRI handout).  Finally, just in case you're interested, I attached a review of the history of social cognition research that could give you a sense of some of the questions that people have asked about how we perceive and interpret others.  It's very well written, but also very long.  Read it if and when you have the time, but no pressure.  (No pressure on any of them -- I'd read the QALMRI handout first and then the rest of them in the order I described them, but I won't expect you to have made it through them all by the next time we meet.)
As for meeting, I think it would be hard for me to arrange to skype tomorrow -- I'm in a different time zone and don't have reliable child care, so I'm not sure when I'd be free your time.  Let's meet next week.  Or, if you feel like the above will keep you busy til Wednesday, maybe we'd both be more flexible then.
'''
sentences = tokenize(text)
# print '\n-----\n'.join(sentences)
# print get_words(sentences[0])

text2 = '''
Could we meet at 5:30 or 6:30? Could you please email me the files? Are you finished with the icons? Can you schedule a meeting with Pat? Where are you going to be over the weekend?
'''
questions = tokenize(text2)

text3 = '''
We're supposed to have our next meeting by Friday, October 9th, so it would be awesome if you could fill out this when2meet (http://www.when2meet.com/?3584971-Scaez). We can keep the same location (somewhere in building 1), unless someone has another meeting place in mind. Same building as last time (building 1). Tentatively 1-132 (I will email out if the room number changes).
How does 6:30pm-7:30pm on Thursday, 10/8 sound for everyone? Is there anything that I can do to help? What are we covering during the meeting?'''
test_sentences = tokenize(text3)

train = [(sentence, 'declarative') for sentence in sentences]
train += [(question, 'interrogative') for question in questions]

test = [(sentence, 'declarative') for sentence in test_sentences[:-3]]
test += [(question, 'interrogative') for question in test_sentences[len(test_sentences)-4:]]

cl = NaiveBayesClassifier(train)