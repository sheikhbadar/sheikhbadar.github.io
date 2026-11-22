const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Exercise the shipped script with small DOM fixtures; no browser library needed.
const papers = [
  { textContent: '2026 Bayesian forecasting Roberto Macrì-Demartino' },
  { textContent: '2026 Leicester’s tale Leonardo Egidi' },
  { textContent: '2023 Vehicle detection Sensors' }
];
const groups = [papers.slice(0, 2), papers.slice(2)].map(entries => ({
  count: {}, querySelectorAll: () => entries,
  querySelector() { return this.count; }
}));
const form = { hidden: true };
let onInput;
const input = { value: '', closest: () => form, addEventListener: (_, callback) => { onInput = callback; } };
const status = {}, noResults = {}, year = {};
const elements = { year, 'paper-search': input, 'search-status': status, 'no-results': noResults };
const document = {
  getElementById: id => elements[id],
  querySelectorAll: selector => selector === '.paper' ? papers : groups
};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8'), { document });
function search(value, expected) {
  input.value = value; onInput();
  assert.equal(papers.filter(paper => !paper.hidden).length, expected);
  assert.equal(noResults.hidden, expected !== 0);
  assert.equal(status.textContent, `${expected} ${expected === 1 ? 'publication' : 'publications'} shown`);
}
assert.equal(form.hidden, false);
search(' MACRI ', 1);
search("Leicester's", 1);
search('vehicle', 1);
assert.equal(groups[1].count.textContent, '1 entry');
assert.equal(groups[0].hidden, true);
search('no-such-paper', 0);
search('', 3);
assert.equal(groups[0].count.textContent, '2 entries');
assert.equal(groups[0].hidden, false);
console.log('PASS: accented authors, apostrophes, counts, empty results and clearing search');
