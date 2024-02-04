import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IspitRed from './IspitRed';
import './Ispiti.css';
import useIspiti from './useIspiti';
import { jsPDF } from 'jspdf'; 
import logo from './images/logo.png';
function Ispiti() {
  

  const [ukupnoESP, setUkupnoESP] = useState(0);
  const [prosecnaOcena, setProsecnaOcena] = useState(0);
  const [pretraga, setPretraga] = useState('');
  const [sortirajPo, setSortirajPo] = useState(null);
  const [sortSmer, setSortSmer] = useState('asc');
  const [ispiti, loading, error,setIspiti] = useIspiti('http://127.0.0.1:8000/api/ispiti/student');
  const [polozeniIspiti, setPolozeniIspiti] = useState();
  const [studentPodaci, setStudentPodaci] = useState(null);  //potrebno za generisanje potvrde o redovnom studiranju
  const toggleSortSmer = () => {
    setSortSmer(prevSortSmer => (prevSortSmer === 'asc' ? 'desc' : 'asc'));
    setSortirajPo('ocena');  
  };
  useEffect(() => {
    if (sortirajPo === 'ocena') {
      setIspiti(prevIspiti => [...prevIspiti].sort((a, b) => {
        return sortSmer === 'asc' ? a.ocena - b.ocena : b.ocena - a.ocena;
      }));
    }
  }, [sortirajPo, sortSmer]);



    useEffect(() => {
      const studentId = sessionStorage.getItem('auth_id');
     console.log(ispiti);
      const polozeniIspitiStudenta = ispiti.filter(ispit =>  ispit.ocena > 5
      );
      console.log(polozeniIspitiStudenta)
      const ispitiSaOcenomVecomOdPet = polozeniIspitiStudenta.filter(ispit => ispit.ocena > 5);
      const ukupnoESP = ispitiSaOcenomVecomOdPet.reduce((total, ispit) => total + ispit.predmet.esbp, 0);
      const prosecnaOcena = ispitiSaOcenomVecomOdPet.reduce((total, ispit) => total + ispit.ocena, 0) / ispitiSaOcenomVecomOdPet.length;

      setUkupnoESP(ukupnoESP);
      setProsecnaOcena(prosecnaOcena || 0); 
      setPolozeniIspiti(polozeniIspitiStudenta)
    }, [ispiti]);
  const filtriraniIspiti = ispit => {
    return (
      ispit.predmet.naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
      ispit.predmet.profesor.ime.toLowerCase().includes(pretraga.toLowerCase()) ||
      ispit.predmet.profesor.prezime.toLowerCase().includes(pretraga.toLowerCase())
    );
  };
  useEffect(() => {
      setStudentPodaci(ispiti[0].student)
  }, []);

  // Funkcija za konverziju broja godine u string
  const getGodinaString = (godina) => {
    switch (godina) {
      case 1:
        return 'prvu';
      case 2:
        return 'drugu';
      case 3:
        return 'treću';
      case 4:
        return 'četvrtu';
      default:
        return '';  
    }
  };

  const kreirajPDFPotvrdu = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 15, 0, 180, 90); // Logo ostaje na istom mestu
  
    // Podešavanje fonta i veličine za naslov
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Potvrda o redovnom studiranju', 105, 100, null, null, 'center'); // Centriranje naslova
  
    // Podešavanje fonta i veličine za telo potvrde
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  
    // Tekst potvrde sa podacima studenta
    const imePrezime = studentPodaci.ime+" "+studentPodaci.prezime;
    const brIndeksa =  studentPodaci.broj+"/"+studentPodaci.godina;
    const godinaString = getGodinaString(studentPodaci.trenutnaGodina);
    const potvrdaTekst = `Ovim se potvrdjuje da je ${imePrezime}, broj indeksa ${brIndeksa},\n` +
                        `upisao/la ${godinaString} godinu u skolskoj ${studentPodaci.upis} godini na Fakultetu organizacionih\n` +
                        `nauka u Beogradu.\n` +
                        `\n\nOva potvrda se može koristiti za:\n` +
                        `- Vadjenje kartice za prevoz\n` +
                        `- Zdravstvene knjižice\n` +
                        `- Regulisanje vojne obaveze\n` +
                        `- Prava na deciji dodatak i porodicne penzije\n` +
                        
                        
                        `\n\nPotvrda je vazeca i bez pecata i potpisa i ne moze se koristiti u druge svhre osim navedenih`;
  
    // Dodavanje teksta potvrde u dokument
    doc.text(potvrdaTekst, 20, 130); // Podešavanje početne pozicije teksta
  
    // Dodavanje datuma u donji desni ugao
    const datum = new Date().toLocaleDateString('en-GB');
    doc.text(`Datum izdavanja: ${datum}`, 105, 280, null, null, 'center'); // Centriranje datuma na dnu stranice
  
    // Čuvanje PDF-a
    doc.save('Potvrda_o_studiranju.pdf');
  };
  
  
  console.log(ispiti)
  return (
    <div className="ispiti-container">
         <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Pretraži predmete ili profesore"
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
        <button onClick={toggleSortSmer}>
          Sortiraj po oceni ({sortSmer === 'asc' ? 'rastuće' : 'opadajuće'})
        </button>
        <button onClick={kreirajPDFPotvrdu}>Kreiraj PDF Potvrdu</button>
      </div>
      <table className="ispiti-table">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Predmet</th> 
            <th>Br. esp</th> 
            <th>Profesor</th>
            <th>Ocena</th>
            <th>Opisna ocena</th>
          </tr>
        </thead>
        <tbody>
            { polozeniIspiti && polozeniIspiti.filter(filtriraniIspiti).map((ispit) => (
                <IspitRed key={ispit.id} ispit={ispit} />
            ))}
        </tbody>
      </table>
      <div className="ispiti-summary">
          <p>Ukupan broj ESP bodova: {ukupnoESP}</p>
          <p>Prosečna ocena: {prosecnaOcena}</p>
        </div>
    </div>
  );
}

export default Ispiti;
