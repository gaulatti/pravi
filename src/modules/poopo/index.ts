import fs from 'fs';
import { Flags, RunnerResult } from 'lighthouse';
const PoopoModule = () => {};
const chromeLauncher = await import('chrome-launcher');
const { default: lighthouse } = await import('lighthouse');

const poopoCli = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options: Flags = { output: 'html', onlyCategories: ['performance'], port: chrome.port };
  const runnerResult: RunnerResult | undefined = await lighthouse('https://www.cnn.com', options);

  if (runnerResult) {
    const reportHtml = Array.isArray(runnerResult.report) ? runnerResult.report.join() : runnerResult.report;

    fs.writeFileSync('lhreport.html', reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
    console.log('Performance score was', (runnerResult.lhr.categories.performance.score || 0) * 100);
  }
  chrome.kill();
};

poopoCli().then(() => {
  console.log('Poopo CLI executed successfully');
});

export { PoopoModule };
