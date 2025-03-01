import React from 'react';
import Footer from "../Footer.js";
const Threads = () => {
  return (
    <div className="coming-soon">
      <h1>Threads Coming Soon!</h1>
      <p>Stay tuned for updates and new threads.</p>
      <style jsx>{`
        .coming-soon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh; /* Full viewport height */
          background-color: #f9f9f9;
          text-align: center;
          color: #333;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>

    </div>
  );
};

export default Threads;
