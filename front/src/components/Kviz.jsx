import React, { useEffect, useState } from 'react';
 
const Kviz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple');
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
          setQuestions(data.results.map((q) => ({
            ...q,
            answers: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5),
          })));
        } else {
          // Ovde možete postaviti neku vrstu greške ili upozorenja ako nema rezultata
          console.error('No results found');
        }
      } catch (error) {
        // Rukovanje greškama ako dođe do problema sa mrežom ili API-jem
        console.error('Failed to fetch questions', error);
      }
    };
  
    fetchQuestions();
  }, []);
  

  const handleAnswer = (answer) => {
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          Score: {score} out of {questions.length}
        </div>
      ) : (
        <>
          {questions.length > 0 && (
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentIndex + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentIndex].question}</div>
              <div className="answer-section">
                {questions[currentIndex].answers.map((answer, index) => (
                  <button key={index} onClick={() => handleAnswer(answer)}>
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Kviz;
