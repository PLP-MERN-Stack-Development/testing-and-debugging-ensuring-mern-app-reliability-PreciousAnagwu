const saved = bug.save(); // bug: missing await
res.status(201).json(saved); // saved is a promise, not a document
