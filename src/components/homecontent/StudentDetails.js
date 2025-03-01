import React from 'react';
import './StudentDetails.css';

const students = {
  Soumya: { name: "Soumya Ranjan Nayak", role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/soumyasrn/", github: "https://github.com/Soumyasrn" },
  Sandeep: { name: "Sandeep", role: "Treasurer", linkedin: "https://www.linkedin.com/in/sandeep-mahato-a31b4a256/", github: "https://github.com/sandeepmahato1" },
  // Add other students here...
};

const StudentDetails = ({ studentName }) => {
  const student = students[studentName];

  if (!student) return null;

  return (
    <div className="student-details">
      <h2>{student.name}</h2>
      <p>{student.role}</p>
      <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={student.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  );
};

export default StudentDetails;
