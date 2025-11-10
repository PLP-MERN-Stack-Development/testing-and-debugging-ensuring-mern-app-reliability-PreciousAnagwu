const { validateBugPayload } = require('../../src/controllers/bugsController');

test('valid payload passes', () => {
  const res = validateBugPayload({ title: 'Fix login', status: 'open' });
  expect(res.valid).toBe(true);
});

test('missing title fails', () => {
  const res = validateBugPayload({ });
  expect(res.valid).toBe(false);
  expect(res.error).toMatch(/Title/);
});

test('invalid status fails', () => {
  const res = validateBugPayload({ title: 'abc', status: 'invalid' });
  expect(res.valid).toBe(false);
  expect(res.error).toMatch(/Invalid status/);
});
