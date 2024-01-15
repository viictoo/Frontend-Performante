 <div class="post">
<h1 class="title">Elasticsearch: Custom Analysis</h1>                         
<p>GIPHY uses <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html">Elasticsearch</a> to deliver all the best GIFs. Elasticsearch is an extremely fast, open source search engine supported by a great community. It has a robust Query API which allows us to quickly iterate our search algorithm. The Mapping API enables us to prototype new signals and account for the quirks in GIF metadata.</p>



<p>This article describes text analysis as related to Elasticsearch, covers built-in analysis and introduces the development of custom analysis. While we will not exhaustively cover text analysis we aim to provide solid tools for further exploration.</p>



<p>You are encouraged to follow along using the docker environment described below.<br></p>



<br>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh3.googleusercontent.com/0qW_zsZnQu_Dpzwc8aoodnzg1c7SjZ8y4TjEWXiTRXG-Bx3z0dxRgjGiU3IGWuJJ8EFsfou0xHVM3Rd6m4MOoJKNpp0quKK3tNKtL80qqpKPI0UcZsLxOn9Pl5FCVw8ewZGusg9N" alt=""/></figure></div>



<br>



<h4 class="wp-block-heading"><strong>Docker Setup</strong></h4>



<p>To follow the exercises in this tutorial you will need to install the following:</p>



<ol><li><a href="https://hub.docker.com/search/?q=&amp;type=edition&amp;offering=community">Docker Desktop Community Edition</a></li><li><a href="https://www.postman.com/downloads/">Postman</a></li></ol>



<p>Installing Docker Desktop may require a full restart.</p>



<p>Once Docker is running, let’s pull the Elasticsearch container by entering the following in your console:</p>



<pre> docker pull docker.elastic.co/elasticsearch/elasticsearch:7.5.2 </pre>



<p>Now let’s start your local container:</p>



<pre>docker run -p 9200:9200 -e "discovery.type=single-node" \
docker.elastic.co/elasticsearch/elasticsearch:7.5.2
</pre>



<p>From a new console confirm Elasticsearch is running using POSTMAN</p>



<pre>GET localhost:9200
</pre>



<p>You should receive a response similar to the following</p>



<pre>HTTP/1.1 200 OK

 {
    "cluster_name": "docker-cluster",
    "cluster_uuid": "_LQxOs63Rte4xlC8AQqLvw",
    "name": "cce47c60c1fd",
    "tagline": "You Know, for Search",
    "version": {
        "build_date": "2020-01-15T12:11:52.313576Z",
        "build_flavor": "default",
        "build_hash": "8bec50e1e0ad29dad5653712cf3bb580cd1afcdf",
        "build_snapshot": false,
        "build_type": "docker",
        "lucene_version": "8.3.0",
        "minimum_index_compatibility_version": "6.0.0-beta1",
        "minimum_wire_compatibility_version": "6.8.0",
        "number": "7.5.2"
    }
}
</pre>



<p>Congratulations! You are all set up for the exercises below!</p>



<br>



<h3 class="wp-block-heading"><strong>Introduction to Text Analysis</strong></h3>



<p>Text Analysis is the process of decomposing text into small components called tokens. Frequently, tokens are just words.</p>



<p>Tokens produced by analysis are used to build the <a href="https://en.wikipedia.org/wiki/Inverted_index" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">inverted indices</a> which Elasticsearch uses to retrieve and rank documents. Analysis also collects term counts, positions, and other data for ranking documents.</p>



<p>Elasticsearch documents are composed of fields. Each field is assigned a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">data type</a> either by <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">mappings</a> or through <a href="https://www.elastic.co/guide/en/elasticsearch/guide/current/dynamic-mapping.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">inference</a>. Each data type has an implicit analyzer, but you may configure custom analyzers when the defaults do not suit your needs.</p>



<p>Incoming queries are parsed using the same analysis used at index time to ensure searches are operating on the same set of tokens.</p>



<p><br></p>



<h3 class="wp-block-heading"><strong>How Analysis Works</strong></h3>



<p>Analysis consists of three parts:</p>



<ol><li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-charfilters.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Character Filters</a> transform the original string by replacing or adding characters.</li><li>A <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Tokenizer</a> decomposes the text into tokens, usually splitting on whitespace to form words.</li><li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Token Filters</a> then remove or transform the tokens created by the Tokenizer. Common Token Filters include stop-word removal and stemming.</li></ol>



<p>The Analysis Pipeline:</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh5.googleusercontent.com/CK4mWPWvGQrK4sTnZ7McYPlt_9BFsZhbDB_vGQz-K65thWnVQS4hUeOEw4uiQGNp7PfHlgnGxwF9veKa6yYz-YPdmh6FBYtaego0jnUFvy89onSHM5_RzBFwduvzXsj_2jOWcNQY" alt=""/></figure>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh4.googleusercontent.com/FZ0ouNnfWF2_EPuWsGyHvK5Qc05pEt4Mie44Yjg47p_dpKiPxiCmm9e2AuKDuLeO3VzXcigGogEmSmfu6yE6zp1ELHoWguSketwUJoLcfd8KQAUQwMTBQICDJi1UBs1yWGQ2eDft" alt=""/></figure></div>



<h3 class="wp-block-heading"><strong>Analysis in Action</strong></h3>



<p>You can inspect analysis before indexing using the <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-analyze.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Analyze API</a>.</p>



<br>



<h4 class="wp-block-heading"><strong>Example 1: Standard Analysis</strong></h4>



<p>Use Postman to POST the phrase “lost in translation” to your local Elasticsearch Analyze API:</p>



<p>Enter the following:<br></p>



<pre>localhost:9200/_analyze &lt;&lt;&lt; body  '{
  "text": "lost in translation"
}'
</pre>



<p>You should receive the following in response:</p>



<pre>{
	"tokens": [
    	{
        	"end_offset": 4,
        	"position": 0,
        	"start_offset": 0,
        	"token": "lost",
        	"type": "&lt;ALPHANUM&gt;"
    	},
    	{
        	"end_offset": 7,
        	"position": 1,
        	"start_offset": 5,
        	"token": "in",
        	"type": "&lt;ALPHANUM&gt;"
    	},
    	{
        	"end_offset": 19,
        	"position": 2,
        	"start_offset": 8,
        	"token": "translation",
        	"type": "&lt;ALPHANUM&gt;"
    	}
	]
}
</pre>



<p>Since we did not specify an analyzer, we received the <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Standard Analyzer</a>. The phrase &#8220;lost in translation&#8221; has been broken into the three tokens &#8220;lost&#8221;, &#8220;in&#8221; and &#8220;translation&#8221;.</p>



<br>



<h4 class="wp-block-heading"><strong>Built-in Analysis</strong></h4>



<p>Elasticsearch has default analysers for each data type. The Text data type defaults to the Standard Analyzer. There are also language specific analyzers which will outperform the default when the language is known. </p>



<br>



<h4 class="wp-block-heading"><strong>Example 2: English Analysis</strong></h4>



<p>Let’s try analyzing “cats in space” using the <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">English Language Analyzer</a>. The English analyzer has no Token Filters, uses the standard tokenizer and passes the resulting tokens through a stop word filter, a stemmer, and a lowercase filter.</p>



<p>Enter the following in your terminal:</p>



<pre>http localhost:9200/_analyze &lt;&lt;&lt; '{
  "analyzer": "english",
  "text": "lost in translation"
}'
</pre>



<p>This time we will receive only two tokens, &#8220;lost&#8221; and &#8220;translat&#8221;.</p>



<pre>{
	"tokens": [
    	{
        	"end_offset": 4,
        	"position": 0,
        	"start_offset": 0,
        	"token": "lost",
        	"type": "&lt;ALPHANUM&gt;"
    	},
    	{
        	"end_offset": 19,
        	"position": 2,
        	"start_offset": 8,
        	"token": "translat",
        	"type": "&lt;ALPHANUM&gt;"
    	}
	]
}

</pre>



<p>The english analyzer removed the <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://en.wikipedia.org/wiki/Stop_words" target="_blank">stop word</a> &#8220;in&#8221; and <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://stackedit.io/%5Bhttps://tartarus.org/martin/PorterStemmer/%5D(https://tartarus.org/martin/PorterStemmer/)" target="_blank">stemmed</a> &#8220;translation&#8221; to &#8220;translat&#8221; (stemming is funny like that). Stopwords are very frequently occurring words like “a” or “it.” Adding stopwords to the index adversely impacts performance while doing little to improve the relevance of results. Stemming folds words with similar meaning like “translate” and “translation” down to one word, “translat” which has the overall effect of improving <a href="https://en.wikipedia.org/wiki/Precision_and_recall" target="_blank" rel="noreferrer noopener" aria-label="recall (opens in a new tab)">recall</a>.<br></p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh5.googleusercontent.com/D7-GLnfUjAE4QdyUwA8C45RIEs_7P5guDJ5RoAu7VQrK4aOYs-9Y3F89mVx59FNVm6C-qq1SGjdmExITHmy9ikTXfveo6gvN6e4nQE9yArjaHJ3sgCysKA_IgSijuUCiAj_KgTJW" alt=""/></figure></div>



<br>



<h4 class="wp-block-heading"><strong>Example 3: Phrase Matching using English Analysis</strong></h4>



<p>Let’s post mappings defining a single field named caption with English analysis.</p>



<pre>PUT localhost:9200/gifs &lt;&lt;&lt; '{                        
  "mappings": {
      "properties": {
        "caption": {
          "type": "text",
          "analyzer": "english"
        }
      }
  }
}'
</pre>



<p>Next, let’s add some documents using the <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">bulk </a>API.</p>



<pre>PUT localhost:9200/_bulk &lt;&lt;&lt; '
  { "index" : { "_index" : "gifs", "_id" : "1" } }
  { "caption": "Happy birthday my love" }

  { "index" : { "_index" : "gifs", "_id" : "2" } }
  { "caption": "happy birthday to me" }

  { "index" : { "_index" : "gifs", "_id" : "3" } }
  { "caption": "happy birthday my friend" }

'
</pre>



<p>Now lets run a query:</p>



<pre>GET localhost:9200/gifs/_search &lt;&lt;&lt; '{
  "query": {
    "match_phrase" : {
      "caption" : "Happy birthday to"
    }
  }
}'
</pre>



<p>You should receive the following results:</p>



<pre>[
  {
    "_id": "2",
    "_index": "gifs",
    "_score": 0.28852317,
    "_source": {
      "caption": "happy birthday to me"
    },
    "_type": "_doc"
  },
  {
    "_id": "1",
    "_index": "gifs",
    "_score": 0.25748682,
    "_source": {
      "caption": "Happy birthday my love"
    },
    "_type": "_doc"
  },
  {
    "_id": "3",
    "_index": "gifs",
    "_score": 0.25748682,
    "_source": {
      "caption": "happy birthday my friend"
    },
    "_type": "_doc"
  }
]
</pre>



<p>The query &#8220;happy birthday to&#8221; matches all documents. This is because the English analyzer removed the stopword &#8220;to,&#8221; both at index time and at query time. Our actual query was &#8220;happy birthday&#8221; which matched all three documents.</p>



<p>If we wanted to match with more precision we could switch to an analyzer without a stop word filter. Let’s explore that further in the next example.</p>



<br>



<h4 class="wp-block-heading"><strong>Example 4: Standard Analysis</strong></h4>



<p>Let’s post mappings with the caption field set to standard analysis.</p>



<pre>PUT localhost:9200/gifs-standard &lt;&lt;&lt; '{                        
  "mappings": {
      "properties": {
        "caption": {
          "type": "text",
          "analyzer": "standard"
        }
      }
  }
}'
</pre>



<p>Let’s add the same documents as before:</p>



<pre>PUT localhost:9200/_bulk &lt;&lt;&lt; '
  { "index" : { "_index" : "gifs-standard", "_id" : "1" } }
  { "caption": "Happy birthday my love" }

  { "index" : { "_index" : "gifs-standard", "_id" : "2" } }
  { "caption": "happy birthday to me" }

  { "index" : { "_index" : "gifs-standard", "_id" : "3" } }
  { "caption": "happy birthday my friend" }

'
</pre>



<p>Now let’s rerun our query against the new index:</p>



<pre>GET localhost:9200/gifs-standard/_search &lt;&lt;&lt; '{
  "query": {
    "match_phrase" : {
      "caption" : "Happy birthday to"
    }
  }
}'
</pre>



<p>This time we should receive only the result matching the entire phrase:</p>



<pre>[
  {
    "_id": "2",
    "_index": "gifs-standard",
    "_score": 1.247892,
    "_source": {
      "caption": "happy birthday to me"
    },
    "_type": "_doc"
  }
]
</pre>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://media.giphy.com/media/xT0BKqk8FSsAgRQ0SY/giphy.gif" alt="Happy Birthday GIF"/></figure></div>



<br>



<h4 class="wp-block-heading"><strong>Custom Analysis</strong></h4>



<p>If we wanted the query “Happy birthday” to only match the document tagged “<em>Happy birthday</em> my love” we would need to write a custom mapping without the lowercase filter found in the standard and English analysers.</p>



<pre>PUT localhost:9200/gifs-custom &lt;&lt;&lt; '{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom", 
          "tokenizer": "standard",
          "char_filter": [],
          "filter": []
        }
      }
    }
  },
  "mappings": {
      "properties": {
        "caption": {
          "type": "text",
          "analyzer": "my_custom_analyzer"
        }
      }
  }
}'
</pre>



<p>Now let’s add our documents:</p>



<pre>PUT localhost:9200/_bulk &lt;&lt;&lt; '
  { "index" : { "_index" : "gifs-custom", "_id" : "1" } }
  { "caption": "Happy birthday my love" }

  { "index" : { "_index" : "gifs-custom", "_id" : "2" } }
  { "caption": "happy birthday to me" }

  { "index" : { "_index" : "gifs-custom", "_id" : "3" } }
  { "caption": "happy birthday my friend" }

'
</pre>



<p>Now run the query:</p>



<pre> GET localhost:9200/gifs-custom/_search &lt;&lt;&lt; '{
  "query": {
    "match_phrase" : {
      "caption" : "Happy birthday my"
    }
  }
}'
</pre>



<p>And you will receive the document we expect:</p>



<pre>[
  {
    "_id": "1",
    "_index": "gifs-custom",
    "_score": 1.5843642,
    "_source": {
      "caption": "Happy birthday my love"
    },
    "_type": "_doc"
  }
]
</pre>



<p>You can combine different tokenizers and filters to achieve different text analysis styles to match your needs.</p>



<br>



<h4 class="wp-block-heading"><strong>Inspecting Mappings</strong></h4>



<p>Let’s take a closer look at what happened in Example 3. <br><br>We can invoke the analysis defined on a specific mapping like this:<br></p>



<pre>GET localhost:9200/gifs/_analyze &lt;&lt;&lt; '{
  "field" : "caption",
  "text" : "Happy birthday to"
}'
</pre>



<p>You should receive two tokens:</p>



<pre>[
    {
        "end_offset": 5,
        "position": 0,
        "start_offset": 0,
        "token": "happi",
        "type": "&lt;ALPHANUM&gt;"
    },
    {
        "end_offset": 14,
        "position": 1,
        "start_offset": 6,
        "token": "birthdai",
        "type": "&lt;ALPHANUM&gt;"
    }
]
</pre>



<p>“Happy birthday my” and “birthday” were stemmed to &#8220;happi&#8221; and &#8220;birthdai&#8221; respectively. The algorithm that produced these odd stems is called the porter stemmer.</p>



<p>Most importantly, the stop word filter removed the word &#8220;to&#8221;.</p>



<p>Let’s now see what happens when we use standard analysis:</p>



<pre>GET localhost:9200/gifs-standard/_analyze &lt;&lt;&lt; '{
  "field" : "caption",
  "text" : "happy birthday to"
}'
</pre>



<p>You will receive three tokens:</p>



<pre>[
  {
    "end_offset": 5,
    "position": 0,
    "start_offset": 0,
    "token": "happy",
    "type": "&lt;ALPHANUM&gt;"
  },
  {
    "end_offset": 14,
    "position": 1,
    "start_offset": 6,
    "token": "birthday",
    "type": "&lt;ALPHANUM&gt;"
  },
  {
    "end_offset": 17,
    "position": 2,
    "start_offset": 15,
    "token": "to",
    "type": "&lt;ALPHANUM&gt;"
  }
]
</pre>



<p>The standard analyzer has only separated the words at word boundaries. This allows phrase match to find the phrase &#8220;happy birthday to&#8221; on the document we expect to be returned.</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://media.giphy.com/media/xV97qRRH2yDeg4w4Ds/giphy.gif" alt="Happy Birthday To The Ground GIF"/></figure></div>



<br>



<h4 class="wp-block-heading"><strong>Further Exploration</strong></h4>



<p>With the tools outlined above in hand, you should be well prepared to dive into custom analysis. Elasticsearch has extensive documentation on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html">analysis</a>, which when paired with these examples, will help you craft custom analysis pipelines suited to your data.&nbsp;</p>



<p>— Utah Ingersoll, Senior Software Engineer</p>
            </div>