import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const fetchFeedbacks = async () => {
    const res = await fetch('http://localhost:5000/api/feedback');
    const data = await res.json();
    setFeedbacks(data);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', email: '', message: '' });
    fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="container">
      <h2>Submit Feedback</h2>
      <form onSubmit={submitFeedback}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        <button type="submit">Send</button>
      </form>

      <h3>All Feedback</h3>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}><b>{f.name}</b>: {f.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

