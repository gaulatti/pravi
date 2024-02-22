import axios from 'axios';
import xml2js from 'xml2js';
const parser = new xml2js.Parser();

/**
 * Parses the input string and extracts the URL and title of each article from the RSS feed.
 * @param input - The input string containing the RSS feed.
 * @returns An array of objects containing the URL and title of each article.
 */
const parseArticlesList = async (input: string) => {
  const output: { url: string; title: string }[] = [];
  parser.parseString(input, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    result.rss.channel[0].item.forEach((element: any) => {
      const url = element.link[0];
      const title = element.title[0];

      if (url && title) {
        output.push({ url, title });
      }
    });
  });
  return output;
};

const sourceNYT = async () => {
  const response = await axios.get(`https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml`);
  const contents = parseArticlesList(response.data);
  return contents;
};

export { sourceNYT };
