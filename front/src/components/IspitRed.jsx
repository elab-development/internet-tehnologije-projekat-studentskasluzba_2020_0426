import React from 'react';

function IspitRed({ ispit }) {
  return (
    <tr>
     <td>{ispit.datum}</td>  
      <td>{ispit.predmet.naziv}</td>    
      <td>{ispit.predmet.esbp}</td>    
      <td>{ispit.predmet.profesor.ime}   {ispit.predmet.profesor.prezime }</td>
      <td>{ispit.ocena}</td>  
      <td>{ispit.opisnaOcena}</td>  
    </tr>
  );
}

export default IspitRed;
