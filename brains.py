import nltk.data
from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier

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
text = '''
Ok, I've also attached a few papers for you to read. I am so excited! One is the NIRS review I mentioned (the McDonnell Consortium paper).  A few more are NIRS experiments or reviews of NIRS work on social cognition.  Two more are behavioral papers with infants that claim to use looking time for two different purposes -- to track interest in informative stimuli (the "Goldilocks effect" paper) versus to assess social preferences (the native language paper).  One of the projects we're going to work on is looking at whether we can use NIRS to distinguish when looking is driven by preference versus the quest for information.  I also attached a paper on how to write/interpret papers about science experiments that's a good guide to understanding and evaluating the things you read (the QALMRI handout).  Finally, just in case you're interested, I attached a review of the history of social cognition research that could give you a sense of some of the questions that people have asked about how we perceive and interpret others.  It's very well written, but also very long.  Read it if and when you have the time, but no pressure.  (No pressure on any of them -- I'd read the QALMRI handout first and then the rest of them in the order I described them, but I won't expect you to have made it through them all by the next time we meet.)
As for meeting, I think it would be hard for me to arrange to skype tomorrow -- I'm in a different time zone and don't have reliable child care, so I'm not sure when I'd be free your time.  Let's meet next week.  Or, if you feel like the above will keep you busy til Wednesday, maybe we'd both be more flexible then. The human species' use of technology began with the conversion of natural resources into simple tools. The prehistoric discovery of how to control fire and the later Neolithic Revolution increased the available sources of food and the invention of the wheel helped humans to travel in and control their environment. Developments in historic times, including the printing press, the telephone, and the Internet, have lessened physical barriers to communication and allowed humans to interact freely on a global scale. The steady progress of military technology has brought weapons of ever-increasing destructive power, from clubs to nuclear weapons. Technology has many effects. It has helped develop more advanced economies (including today's global economy) and has allowed the rise of a leisure class. Many technological processes produce unwanted by-products, known as pollution, and deplete natural resources, to the detriment of Earth's environment. Various implementations of technology influence the values of a society and new technology often raises new ethical questions. Examples include the rise of the notion of efficiency in terms of human productivity, a term originally applied only to machines, and the challenge of traditional norms. Philosophical debates have arisen over the use of technology, with disagreements over whether technology improves the human condition or worsens it. Neo-Luddism, anarcho-primitivism, and similar reactionary movements criticise the pervasiveness of technology in the modern world, opining that it harms the environment and alienates people; proponents of ideologies such as transhumanism and techno-progressivism view continued technological progress as beneficial to society and the human condition. Until recently, it was believed that the development of technology was restricted only to human beings, but 21st century scientific studies indicate that other primates and certain dolphin communities have developed simple tools and passed their knowledge to other generations.
'''
sentences = tokenize(text)
# print '\n-----\n'.join(sentences)
# print get_words(sentences[0])

text2 = '''
Could we meet at 5:30 or 6:30? Could you please email me the files? Are you finished with the icons? Can you schedule a meeting with Pat? Where are you going to be over the weekend? Who is going to the park today? Could you go to the store with me? Will you buy something for me? Why are you going for a run?
'''
questions = tokenize(text2)

text3 = '''
We're supposed to have our next meeting by Friday, October 9th, so it would be awesome if you could fill out this when2meet (http://www.when2meet.com/?3584971-Scaez). We can keep the same location (somewhere in building 1), unless someone has another meeting place in mind. Same building as last time (building 1). Tentatively 1-132 (I will email out if the room number changes).
How does 6:30pm-7:30pm on Thursday, 10/8 sound for everyone? Is there anything that I can do to help? What are we covering during the meeting?'''
test_sentences = tokenize(text3)

'''
train = [(sentence, 'declarative') for sentence in sentences]
train += [(question, 'interrogative') for question in questions]

test = [(sentence, 'declarative') for sentence in test_sentences[:-3]]
test += [(question, 'interrogative') for question in test_sentences[len(test_sentences)-4:]]

cl = NaiveBayesClassifier(train)
blob = TextBlob(text3, classifier=cl)
for s in blob.sentences:
    print(s)
    print(s.classify())
'''

for s in test_sentences:
    print(s, is_question_naive(s))
