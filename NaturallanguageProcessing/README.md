Steps

    Set up your environment
    Install and import relevant libraries
    Load the data
    Preprocess the data
    Tokenize the text
    Remove stop words
    Running the Porter stemmer

pip install nltk
pip install spacy

<p xmlns="http://www.w3.org/1999/xhtml"><a href="https://www.ibm.com/topics/stemming?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">Stemming</a> is a text preprocessing technique in <a href="https://www.ibm.com/topics/natural-language-processing?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">natural language processing</a> (NLP). More specifically, stemming algorithms reduce inflectional forms to their stem or root form. This root word is also known as a “lemma” in computational linguistics. Stemming is one of two primary methods (the other being lemmatization) for reducing inflectional variants within a text data set to one, shared morphological lexeme by removing affixes.</p>
<p xmlns="http://www.w3.org/1999/xhtml">In this tutorial, we’ll use the Python <a href="https://www.nltk.org/">natural language toolkit</a> (NLTK) to walk through stemming <code style="font-family:monospace;font-size:1rem">.txt</code> files with the most widely used stemming algorithm, Porter stemmer. We’ll focus on stemming as a means to prepare raw text data for use in machine learning models and NLP tasks.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Note that there are other libraries and packages for stemming text, such as <a href="https://scikit-learn.org/stable/install.html">scikitlearn</a>. Also, while this tutorial focuses on stemming in Python programming, R’s tm package (text mining package) contains functions for stemming.</p>
<h2 xmlns="http://www.w3.org/1999/xhtml" id="more-about-stemming">More about stemming</h2>
<p xmlns="http://www.w3.org/1999/xhtml">Stemming is one stage in <a href="https://www.ibm.com/topics/text-mining?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">text mining</a> pipelines that converts raw text data into a structured format for machine processing. It is often used in search engines and other information retrieval systems. Stemming is also used in preparing text data for <a href="https://www.ibm.com/topics/deep-learning?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">deep learning</a> tools, such as <a href="https://www.ibm.com/topics/large-language-models?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">large language models</a>, and various NLP tasks, such as sentiment analysis and text classification.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Stemmers are the algorithms used to reduce different forms of a word to a base form. Essentially, they do this by removing specific character strings from the end of word tokens. Stemmers thus do not account for prefixes. Most stemmers contain a list of common language-specific suffixes against which the algorithm matches input word tokens. If the algorithm matches a word to one of the suffixes, and stripping the suffix does not violate pre-specified rules in the algorithm (e.g. character length restrictions), then the algorithm removes the suffix from the word.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Stemming algorithms differ in a number of ways. One primary difference is in the conditions or rules that determine whether to strip a given suffix from a token. Additionally, some stemmers have processes to correct for malformed stem words, and so they limit under-stemming and over-stemming.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Though closely related, stemming differs from <a href="https://www.ibm.com/topics/stemming-lemmatization?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">lemmatization</a> in that stemming is a more heuristic process of removing suffixes to produce a base form. Lemmatization conducts a more detailed morphological analysis, often involving part of speech (POS) tagging and mapping output to real word roots contained in dictionaries.</p>
<h2 xmlns="http://www.w3.org/1999/xhtml" id="prerequisites">Prerequisites</h2>
<p xmlns="http://www.w3.org/1999/xhtml">You'll need an <a href="https://cloud.ibm.com/registration?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-trial">IBM Cloud account</a> to create a <a href="https://www.ibm.com/products/watsonx-ai?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-product">watsonx.ai</a> project.</p>
<h2 xmlns="http://www.w3.org/1999/xhtml" id="steps">Steps</h2>
<ol xmlns="http://www.w3.org/1999/xhtml">
<li>Set up your environment</li>
<li>Install and import relevant libraries</li>
<li>Load the data</li>
<li>Preprocess the data</li>
<li>Tokenize the text</li>
<li>Remove stop words</li>
<li>Running the Porter stemmer</li>
</ol>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-1-set-up-your-environment">Step 1. Set up your environment</h3>
<p xmlns="http://www.w3.org/1999/xhtml">While there are a number of tools to choose from, we’ll walk you through how to set up a watsonx project to use a Jupyter notebook. Jupyter notebooks are widely used tools in data science to combine code, text, and visualizations to formulate well-formed analyses.</p>
<ol xmlns="http://www.w3.org/1999/xhtml">
<li><p>Log in to watsonx.ai using your IBM Cloud account.</p>
</li>
<li><p>Create a watsonx.ai project.</p>
<ol>
<li>Click the navigation menu at the top left of the screen, and then select <strong>Projects &gt; View all projects</strong>.</li>
<li>Click the <strong>New project</strong> button.</li>
<li>Select <strong>Create an empty project</strong>.</li>
<li>Enter a project name in the <strong>Name</strong> field.</li>
<li>Select <strong>Create</strong>.</li>
</ol>
</li>
<li><p>Create a Jupyter notebook.</p>
<ol>
<li>In your project environment, select the <strong>Assets</strong> tab.</li>
<li>Click the blue <strong>New asset</strong> button.</li>
<li>Scroll down in the pop-up window, and then select <strong>Jupyter notebook editor</strong>.</li>
<li>Enter a name for your notebook in the <strong>Name</strong> field.</li>
<li>Click the blue <strong>Create</strong> button.</li>
</ol>
</li>
</ol>
<p xmlns="http://www.w3.org/1999/xhtml">A notebook environment opens for you to load your data set and copy code from this tutorial to tackle a simple single-file text stemming task. To view how each block of code affects the text file, each step’s code block is best inserted as a separate cell of code in your watsonx.ai project notebook.</p>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-2-install-and-import-relevant-libraries">Step 2. Install and import relevant libraries</h3>
<p xmlns="http://www.w3.org/1999/xhtml">You'll need a few libraries for this tutorial. Make sure to import the ones below, and if they're not installed, you can resolve this with a quick pip install, included at the top of the code.</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code>!pip install nltk -U
!pip install spacy -U

import nltk
import re
import string
import spacy

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

nltk.download("punkt")
nltk.download('wordnet')
nltk.download('stopwords')

!python -m spacy download en_core_web_sm
sp=spacy.load('en_core_web_sm')
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-3-load-the-data">Step 3. Load the data</h3>
<p xmlns="http://www.w3.org/1999/xhtml">For this tutorial, we use the Asian religious text data set from the <a href="https://archive.ics.uci.edu/">UCI Machine Learning Repository</a>. We will focus on stemming one text file in this tutorial for the purpose of explaining in detail the steps that are involved in producing high-quality stemmed text data. Many of the later preprocessing and stemming steps can be combined together under one Python function to iterate through a corpus of text files.</p>
<ol xmlns="http://www.w3.org/1999/xhtml">
<li>Download the Asian religious text data from the <a href="http://archive.ics.uci.edu/dataset/512/a+study+of+asian+religious+and+biblical+texts">UCI Machine Learning Repository</a>.</li>
<li>Unzip the file and open the resulting folder.</li>
<li>Select the <code style="font-family:monospace;font-size:1rem">Complete_data.txt</code> file to upload from your local system to your notebook in watsonx.ai.</li>
<li>Read the data into the project by selecting the <strong>&lt;/&gt;</strong> icon in the upper right menu, and then selecting <strong>Read data</strong>.</li>
<li>Select <strong>Upload a data file</strong>.</li>
<li>Drag your data set over the prompt, <strong>Drop data files here or browse for files to upload</strong>.</li>
<li>Return to the <strong>&lt;/&gt;</strong> menu and select <strong>Read data again</strong>. Click <strong>Select data from project</strong>.</li>
<li>In the pop-up menu, click <strong>Data asset</strong> on the left-side menu. Select your data file (for example, <code style="font-family:monospace;font-size:1rem">Complete_data.txt</code>), and then click the lower right-side blue button <strong>Select</strong>.</li>
<li>Select <strong>Insert code to cell</strong>, or the copy to clipboard icon to manually inject the data into your notebook.</li>
</ol>
<p xmlns="http://www.w3.org/1999/xhtml">Because watsonx.ai imports the file as a streamingBody, we need to convert it into a text string. The following code does this conversion:</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code># convert loaded streamingbody file into text string for preprocessing
# note "streaming_body_1" in the following line may need to be changed to whatever your file imports as

raw_bytes = streaming_body_1.read()
working_txt = raw_bytes.decode("utf-8", errors="ignore")

# print to confirm text converted successfully
print(working_txt)
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-4-preprocess-data">Step 4. Preprocess data</h3>
<p xmlns="http://www.w3.org/1999/xhtml">Even though stemming is itself considered a preprocessing technique, there are several preliminary steps that can improve the quality of our stemmed text file. This step strips line breaks and sequential white space from the text.</p>
<p xmlns="http://www.w3.org/1999/xhtml">This step is not necessary for stemming text, but it improves the quality of the final output from the tokenizer, and by extension, the stemmer.</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code># clean text by removing successive whitespace and newlines then print regularized text
clean_txt = re.sub(r"\n", " ", working_txt)
clean_txt = re.sub(r"\s+", " ", clean_txt)
clean_txt = clean_txt.strip()
print(clean_txt)
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-5-tokenize-text">Step 5. Tokenize text</h3>
<p xmlns="http://www.w3.org/1999/xhtml">Tokenization breaks down unstructured text data into smaller units called tokens. A token can range from a single character or individual word to much larger textual units. Although electronic text is, essentially, only a sequence of characters, NLP techniques process text in discrete linguistic units (for example, words and sentences). To stem a text string, the machine must be able to identify individual words. Tokenization allows the machine to do this.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Fortunately, the NLTK library comes with a function to tokenize text at the word level. We can pass our cleaned text string through this <code style="font-family:monospace;font-size:1rem">word_tokenize</code> function, with a subsequent parameter to only return alphabetic characters.</p>
<p xmlns="http://www.w3.org/1999/xhtml">While this latter step is not necessary to stem text data, it will help clean our final output by removing punctuation, numbers, and other such characters that are unaffected by the stemmer. This cleaned up text can be especially useful if you are stemming text for NLP tasks such as word embeddings or topic models.</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code># tokenize cleaned text
tokens = word_tokenize(clean_txt)

# remove non-alphabetic tokens and print
filtered_tokens_alpha = [word for word in tokens if word.isalpha()]
print(filtered_tokens_alpha)
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-6-remove-stop-words">Step 6. Remove stop words</h3>
<p xmlns="http://www.w3.org/1999/xhtml">Stop words (or stop lists) denote a non-universal list of words that are removed from a data set during preprocessing. Often, stop words are the most commonly used words in a language, and are believed to add little value in NLP tasks. Some stemmers come with predefined stop lists. One notable example is the Snowball stemmer, whose predefined stop list contains words without a direct conceptual definition and that serve more of a grammatical than conceptual purpose (for example, the words "a," "the," and "being.")</p>
<p xmlns="http://www.w3.org/1999/xhtml">Rather than create an original collection of stop words, we can load the NLTK English language stop list. We then remove the stop words in the NLTK list from the tokenized text.</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code># load stop list from NLTK
stop_words = set(stopwords.words('english'))

# remove stop words from tokenized text and print
filtered_tokens_final = [w for w in filtered_tokens_alpha if not w in stop_words]
print(filtered_tokens_final)
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<h3 xmlns="http://www.w3.org/1999/xhtml" id="step-7-running-the-porter-stemmer">Step 7. Running the Porter stemmer</h3>
<p xmlns="http://www.w3.org/1999/xhtml">The <a href="https://tartarus.org/martin/PorterStemmer/">Porter stemming algorithm</a> classifies every character in a given token as either a consonant ("c") or vowel ("v"), grouping subsequent consonants as "C" and subsequent vowels as "V." The algorithm thereby represents every word token as a specific combination of consonant and vowel groups. For example, the word <em>therefore</em> is represented as CVCVCVCV, or C(VC)3V, with the exponent representing repetitions of consonant-vowel groups.</p>
<p xmlns="http://www.w3.org/1999/xhtml"><img alt="alt" src="https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/489/images/porter_stemming.png"></p>
<p xmlns="http://www.w3.org/1999/xhtml">Once enumerated this way, the stemmer runs each word token against a list of rules that specify the ending characters to remove according to the number of vowel-consonant groups in that token. The following code runs each word token through the Porter stemmer and prints the first 500 stemmed tokens.</p>
<div xmlns="http://www.w3.org/1999/xhtml" data-code-snippet="" class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide"><div aria-label="Code Snippet Text" class="bx--snippet-container"><pre><code># define Porter Stemmer from NLTK
p_stemmer = PorterStemmer()

# stem tokenized text and print first 500 tokens
stemmed_tokens = [p_stemmer.stem(word) for word in filtered_tokens_final]
print(stemmed_tokens[:500])
</code></pre></div><button tabindex="0" aria-label="Copy code" class="bx--snippet-button" type="button" data-copy-btn=""><svg viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="bx--snippet__icon"><path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path><path d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"></path></svg><div xmlns="http://www.w3.org/1999/xhtml" data-feedback="Copied!" class="bx--btn--copy__feedback"></div></button><button type="button" class="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"><span data-show-less-text="Show less" data-show-more-text="Show more" class="bx--snippet-btn--text">Show more</span><svg aria-label="Show more icon" viewBox="0 0 12 7" height="7" width="12" class="bx--icon-chevron--down"><title>Show more icon</title><path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" fill-rule="nonzero"></path></svg></button></div>
<p xmlns="http://www.w3.org/1999/xhtml"><img alt="alt" src="https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/489/images/sample_stemmed_output.png"></p>
<h2 xmlns="http://www.w3.org/1999/xhtml" id="other-stemming-algorithms">Other stemming algorithms</h2>
<p xmlns="http://www.w3.org/1999/xhtml">Because the English language itself follows general but not absolute lexical rules, the Porter stemmer algorithm’s systematic criterion for determining suffix removal can return errors. This is where other stemming algorithms can be useful. Although Porter stemmer is the most common stemming algorithm, there are a number of other stemmers with their own respective advantages and disadvantages:</p>
<ul xmlns="http://www.w3.org/1999/xhtml">
<li><p><a href="https://aclanthology.org/www.mt-archive.info/MT-1968-Lovins.pdf"><strong>Lovins stemmer</strong></a>, the first published stemming algorithm, is essentially a heavily parametrized find-and-replace function. It compares each input token against a list of common English suffixes, each suffix being conditioned by one of twenty-nine rules. If the stemmer finds a predefined suffix in a token and removing the suffix does not violate any conditions attached to that suffix (such as character length restrictions), the algorithm removes that suffix. The stemmer then runs the resulting stemmed token through another set of rules that correct for common malformations, such as double letters (such as <em>hopping</em> becomes <em>hopp</em> becomes <em>hop</em>).</p>
</li>
<li><p><a href="https://snowballstem.org/texts/introduction.html"><strong>Snowball stemmer</strong></a> is an updated version of the Porter stemmer. It differs from Porter in two main ways. First, while Lovins and Porter only stem English words, Snowball can stem text data in other Roman script languages, such as Dutch, German, French, or Spanish. It also has capabilities for non-Roman script languages, most notably Russian. Second, Snowball has an option to ignore stop words.</p>
</li>
<li><p><a href="https://doi.org/10.1145/101306.101310"><strong>Lancaster stemmer</strong></a> (also called Paice stemmer) is considered the most aggressive English stemming algorithm. It contains a list of over 100 rules that dictate which ending strings to replace. The stemmer iterates each word token against each rule. If a token’s ending characters match the string defined in a given rule, the algorithm modifies the token per that rule’s operation, then runs the transformed token through every rule again. The stemmer iterates each token through each rule until that token passes all the rules without being transformed.</p>
</li>
</ul>
<h2 xmlns="http://www.w3.org/1999/xhtml" id="summary-and-next-steps">Summary and next steps</h2>
<p xmlns="http://www.w3.org/1999/xhtml">In this tutorial, you used the Porter stemmer from Python NLTK to complete a popular text normalization technique. Although this tutorial describes how to stem a single text, the same commands and techniques can be deployed on a corpus of <code style="font-family:monospace;font-size:1rem">.txt</code> files by combining the tokenization, formatting, and stemming commands under one Python function and iterating files through that function.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Build an AI strategy for your business on one collaborative AI and data platform called IBM watsonx, which brings together new generative AI capabilities, powered by foundation models, and traditional machine learning into a powerful platform spanning the AI lifecycle. With <a href="https://www.ibm.com/products/watsonx-ai?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-product">watsonx.ai</a>, you can train, validate, tune, and deploy models with ease and build AI applications in a fraction of the time with a fraction of the data.</p>
<p xmlns="http://www.w3.org/1999/xhtml">Try <a href="https://www.ibm.com/products/watsonx-ai?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-product">watsonx.ai</a>, the next-generation studio for AI builders. Explore more <a href="https://developer.ibm.com/components/watsonx/">articles and tutorials about watsonx</a> on IBM Developer.</p>
<p xmlns="http://www.w3.org/1999/xhtml">To continue learning, we recommend exploring this content:</p>
<ul xmlns="http://www.w3.org/1999/xhtml">
<li><a href="https://developer.ibm.com/tutorials/text-classification-using-watson-nlp">Tutorial: Explore text classification with watson NLP</a></li>
<li><a href="https://developer.ibm.com/articles/introduction-to-watson-natural-language-processing">An introduction to Watson natural language processing</a></li>
<li><a href="https://www.ibm.com/topics/stemming-lemmatization?utm_source=skills_network&amp;utm_content=in_lab_content_link&amp;utm_id=Lab-489&amp;cm_sp=ibmdev-_-developer-tutorials-_-ibmcom">Stemming versus lemmatization</a></li>
</ul>