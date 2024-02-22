import axios from 'axios';
import { load } from 'cheerio';

/**
 * Fetches and parses an article from a given URL.
 * @param url - The URL of the article to fetch and parse.
 * @returns An object containing the title, byline, and text of the article.
 */
const fetchAndParseArticle = async (url: string) => {
  const response = await axios.get(`https://lite.cnn.com${url}`);
  const html = response.data;
  const $ = load(html);

  const title = $('.headline').text().trim();
  const byline = $('.byline--lite').text().trim();
  const text = $('.paragraph--lite:not(:last-child)')
    .map((index, element) => $(element).text().trim())
    .get()
    .join('\n');

  return { title, byline, text };
};

/**
 * Parses the articles list from the provided HTML string.
 *
 * @param html - The HTML string to parse.
 * @returns An array of objects containing the URL and text of each article.
 */
const parseArticlesList = async (html: string) => {
  const $ = load(html);
  const output: { url: string; title: string }[] = [];
  $('.card--lite a').map((_index, element) => {
    const url = $(element).attr('href')?.trim();
    const title = $(element).text().trim();
    if (url && title) {
      output.push({ url, title });
    }
  });
  return output;
};

const sourceCNN = async () => {
  const response = await axios.get(`https://lite.cnn.com`);
  const contents = parseArticlesList(response.data);
  return contents;
};

export { sourceCNN };
