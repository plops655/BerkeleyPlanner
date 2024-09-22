import React from 'react';

const MajorsList = ({ majors }) => {
  // Define colors for each major
  const majorColors = {
    "Computer Science": "#FF5733",
    "Mathematics": "#33FF57",
    "Physics": "#3357FF",
    "Chemistry": "#FF33A1",
    "Biology": "#33FFF1"
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Majors</h3>
      <ul style={styles.list}>
        {majors.map((major, index) => (
          <li key={index} style={styles.listItem}>
            <span 
              style={{ 
                ...styles.colorBox, 
                backgroundColor: majorColors[major] || '#333' 
              }}
            ></span>
            <span>{major}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define styles
const styles = {
  container: {
    width: '300px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  title: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#333'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  colorBox: {
    width: '15px',
    height: '15px',
    marginRight: '10px',
    borderRadius: '3px'
  }
};

export default MajorsList;
