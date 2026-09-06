import React from 'react';
import faculty1Img from '../assets/faculty-1.jpg';
import faculty2Img from '../assets/faculty-2.jpg';
import './FacultyPreview.css';

const FACULTY = [
  {
    index: '01',
    role: 'Head of the Department',
    name: 'Dr. A. Ganesh',
    department: 'Department of Computer Science & Engineering',
    image: faculty1Img,
    quote:
      'Mentoring students to explore ideas fearlessly, bridge theory with practice, and cultivate an enduring engineering mindset.',
    placeholderLabel: 'Official Portrait Placeholder',
  },
  {
    index: '02',
    role: 'Year Incharge',
    name: 'Dr. A. Saritha Reddy',
    department: 'Department of Computer Science & Engineering',
    image: faculty2Img,
    quote:
      'Guiding curious builders to collaborate across disciplines, solve real challenges, and grow into community leaders.',
    placeholderLabel: 'Official Portrait Placeholder',
  },
  {
    index: '03',
    role: 'Faculty Advisor',
    name: 'Dr. Vishnu',
    department: 'Department of Computer Science & Engineering',
    image: null,
    quote:
      'Nurturing research curiosity, open experimentation, and the vision to create technology with lasting social impact.',
    placeholderLabel: 'Official Portrait Placeholder',
  },
];

export default function FacultyPreview() {
  return (
    <section id="mentorship" className="faculty-section">
      <div className="container">
        <div className="faculty__header reveal">
          <div className="faculty__eyebrow label-mono">02 / Mentorship</div>
          <h2 className="faculty__title">OUR DRIVING FORCE</h2>
          <p className="faculty__subtitle">Guided by experience. Driven by curiosity. Showed us the path</p>
        </div>

        <div className="faculty__editorial-list">
          {FACULTY.map((member) => (
            <article
              key={member.index}
              className="faculty__item reveal"
            >
              <div className="faculty__portrait-frame">
                {member.image ? (
                  <div className="faculty__portrait-wrap">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="faculty__portrait-img"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className="faculty__portrait-placeholder"
                    role="img"
                    aria-label={`${member.role} portrait placeholder`}
                  >
                    <div className="faculty__placeholder-backdrop">
                      <span className="label-mono">{member.placeholderLabel}</span>
                      <span className="faculty__placeholder-spec">4:5 Aspect Ratio &bull; High-res Headshot</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="faculty__meta">
                <div className="faculty__index label-mono">{member.index}</div>
                <div className="faculty__role-tag label-mono">{member.role}</div>
                <h3 className="faculty__name">{member.name}</h3>
                <p className="faculty__department">{member.department}</p>
                <blockquote className="faculty__quote">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
