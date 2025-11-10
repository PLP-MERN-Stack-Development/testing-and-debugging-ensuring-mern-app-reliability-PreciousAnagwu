import React from 'react';
export default function BugItem({ bug, onUpdate, onDelete }) {
  const toggleResolved = () => onUpdate(bug._id, { status: bug.status === 'resolved' ? 'open' : 'resolved' });
  return (
    <div>
      <h3>{bug.title} <small>({bug.status})</small></h3>
      <p>{bug.description}</p>
      <button onClick={toggleResolved}>{bug.status === 'resolved' ? 'Reopen' : 'Resolve'}</button>
      <button onClick={()=>onDelete(bug._id)}>Delete</button>
    </div>
  );
}

