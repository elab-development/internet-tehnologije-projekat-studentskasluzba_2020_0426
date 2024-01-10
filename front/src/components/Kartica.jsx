import React from 'react';

function Kartica({ uni }) {
  return (
    <div   className="univerzitet">
          <h2>{uni.name}</h2>
          <p>{uni.country}</p>
          <a href={`http://${uni.web_pages[0]}`} target="_blank" rel="noreferrer">Posetite sajt</a>
        </div>
  );
}

export default Kartica;
