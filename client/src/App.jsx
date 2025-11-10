import React, { useState } from 'react';
import BugForm from './components/BugForm';

const App = () => {
  const [bugs, setBugs] = useState([]);

  // ✅ Add new bug
  const handleAddBug = (bug) => {
    const newBug = { ...bug, resolved: false }; // Add resolved field
    setBugs((prev) => [...prev, newBug]);
  };

  // ✅ Resolve a bug
  const handleResolve = (index) => {
    setBugs((prev) =>
      prev.map((bug, i) =>
        i === index ? { ...bug, resolved: !bug.resolved } : bug
      )
    );
  };

  // ✅ Delete a bug
  const handleDelete = (index) => {
    setBugs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bug Tracker</h1>
      <BugForm onAdd={handleAddBug} />

      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong
                style={{
                  textDecoration: bug.resolved ? 'line-through' : 'none',
                }}
              >
                {bug.title}
              </strong>{' '}
              — {bug.description}
              <br />
              <button onClick={() => handleResolve(index)}>
                {bug.resolved ? 'Unresolve' : 'Resolve'}
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
