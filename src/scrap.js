const cheerio = require('cheerio')
const {JSDOM} = require('jsdom')
const Readability = require("./Readability")

module.exports = Scrap;

function Scrap(body) {
  body = body || {};

  function isComment(index, node) {
    return node.type === 'comment'
  }

  function getJsonLD($$){
    let json_ld = [];
    try {
      $$('script[type="application/ld+json"]').map(function (i, ld) {
        let jsonld = $$(this).html();
        console.log(jsonld)
        jsonld = (JSON.parse(jsonld))
        if (jsonld['@type'] === "NewsArticle") {
      		json_ld = jsonld;
        }
      });
    } catch (e) {
      console.log("json_ld", e.message)
    }
    return json_ld
  }

  function generateParagraph($){
    let paragraph = [];
    $('p').map(function (i, p) {
      let pa = $(p).text().trim();
      if (pa.length >= 30) {
        paragraph.push({
          text: pa,
          length: pa.length
        });
      }
    });
    return paragraph
  }

  let $$ = cheerio.load(body, {normalizeWhitespace: true});

  let meta = {
    title: null,
    description: null,
    keywords: null,
    author: null,
    published_time: null,
    thumbnail: null,
    site_name: null,
    language: null,
    url: null,
    amphtml: null,
    canonical: null,
    twitter: null,
    json_ld: [],
    all_images: [],
  }

  try {
    meta.title = $$("meta[property='og:title']").attr("content") || $$("title").text() || null
  } catch (e) {}
  try {
    meta.description = $$("meta[name='description']").attr("content") || null
  } catch (e) {}
  try {
    meta.keywords = $$("meta[name='keywords']").attr("content") || null
  } catch (e) {}
  try {
    meta.author = $$("meta[name='author']").attr("content") || null
  } catch (e) {}
  try {
    meta.published_time = $$("meta[property='article:published_time']").attr("content") || $$("meta[name='pubdate']").attr("content") || $$("meta[name='publishdate']").attr("content") || null
  } catch (e) {}
  try {
    meta.thumbnail = $$("meta[property='og:image']").attr("content") || null
  } catch (e) {}
  try {
    meta.site_name = $$("meta[property='og:site_name']").attr("content") || null
  } catch (e) {}
  try {
    meta.language = $$("meta[name='language']").attr("content") || $$("html").attr("lang") || null
  } catch (e) {}
  try {
    meta.url = $$("meta[property='og:url']").attr("content") || null
  } catch (e) {}
  try {
    meta.amphtml = $$("link[rel='amphtml']").attr("href") || null
  } catch (e) {}
  try {
    meta.canonical = $$("link[rel='canonical']").attr("href") || null
  } catch (e) {}
  try {
    meta.twitter = $$("meta[name='twitter:site']").attr("content") || null
  } catch (e) {}
  try {
    meta.json_ld =  getJsonLD($$)
  } catch (e) {}


  $$.root().contents().filter(isComment).remove();
  $$('head').contents().filter(isComment).remove();
  $$('body').contents().filter(isComment).remove();

  //remove all tag script
  $$('script').remove();
  $$('iframe').remove();

  //remove head
  $$('head').remove();
  let doc = new JSDOM($$('html').html());
  let reader = new Readability(doc.window.document, {debug: false});
  let article = reader.parse();


  meta.all_images.push({
    src: meta.thumbnail,
    alt: meta.title
  });

  let $ = cheerio.load(article.content);
  try {
    $('img').map(function (i, img) {
    	if (img.attribs.src){
	    	meta.all_images.push({
	        src: img.attribs.src,
	        alt: img.attribs.alt
	      });	
    	}
      

    });
  } catch (e) {
    console.log("img", e)
  }

  let author = null
  try {
  	author = meta.json_ld.author.name
  }catch (e) {
  	author =   meta.author 
  }
  let result = {
  	title: meta.title,
  	description: meta.description,
  	thumbnail: meta.thumbnail,
  	url: meta.url,
  	published_time: meta.published_time || meta.json_ld.datePublished,
  	author: author,
    paragraph: generateParagraph($),
  	
    meta: meta,
    // html: article.content,
  }
  return result

}