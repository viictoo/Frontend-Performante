import nltk
import re
import string
import spacy

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords, treebank
from nltk.stem import PorterStemmer

nltk.download("punkt")
nltk.download('wordnet')
nltk.download('stopwords')


with open('Complete_data.txt') as cd:
    raw_bytes = cd.read()
    # clean text by removing successive whitespace and newlines then print regularized text
    clean_txt = re.sub(r"\n", " ", raw_bytes)
    clean_txt = re.sub(r"\s+", " ", clean_txt)
    clean_txt = clean_txt.strip()
    print(clean_txt)

    # tokenize cleaned text
    tokens = word_tokenize(clean_txt)

    # remove non-alphabetic tokens and print
    filtered_tokens_alpha = [word for word in tokens if word.isalpha()]
    print(filtered_tokens_alpha)

    # load stop list from NLTK
    stop_words = set(stopwords.words('english'))

    # remove stop words from tokenized text and print
    filtered_tokens_final = [w for w in filtered_tokens_alpha if not w in stop_words]
    print(filtered_tokens_final)

    # define Porter Stemmer from NLTK
    p_stemmer = PorterStemmer()

    # stem tokenized text and print first 500 tokens
    stemmed_tokens = [p_stemmer.stem(word) for word in filtered_tokens_final]
    print(stemmed_tokens[:500])