// server/src/controllers/bugsController.js

// A simple in-memory "database" (just for testing)
let bugs = [];

// Validation helper
function validateBugPayload(payload) {
  const { title, status } = payload || {};

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters long' };
  }

  const allowedStatuses = ['open', 'in-progress', 'resolved'];
  if (status && !allowedStatuses.includes(status)) {
    return { valid: false, error: 'Invalid status' };
  }

  return { valid: true };
}

// Controller: List all bugs
const listBugs = (req, res) => {
  res.status(200).json(bugs);
};

// Controller: Create new bug
const createBug = (req, res) => {
  const result = validateBugPayload(req.body);
  if (!result.valid) {
    return res.status(400).json(result);
  }

  const newBug = { id: bugs.length + 1, ...req.body };
  bugs.push(newBug);
  res.status(201).json({ message: 'Bug created', data: newBug });
};

// Controller: Update bug by ID
const updateBug = (req, res) => {
  const id = parseInt(req.params.id);
  const bug = bugs.find(b => b.id === id);
  if (!bug) {
    return res.status(404).json({ error: 'Bug not found' });
  }

  Object.assign(bug, req.body);
  res.json({ message: 'Bug updated', data: bug });
};

// Controller: Delete bug by ID
const deleteBug = (req, res) => {
  const id = parseInt(req.params.id);
  const index = bugs.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Bug not found' });
  }

  bugs.splice(index, 1);
  res.json({ message: 'Bug deleted' });
};

module.exports = {
  validateBugPayload,
  listBugs,
  createBug,
  updateBug,
  deleteBug,
};
