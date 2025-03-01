import { useState } from 'react';

export default function Questionnaire() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    "Quels sont vos objectifs principaux pour votre entreprise ?",
    "Comment évaluez-vous l'impact environnemental de votre entreprise ?",
    "Quels bénéfices attendez-vous d'une démarche RSE ?",
    "Avez-vous déjà mis en place des actions RSE ? Si oui, lesquelles ?"
  ];

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = () => {
    // Calculer la note basée sur les réponses
    const score = Object.values(responses).reduce((acc, val) => acc + (val ? 1 : 0), 0);
    let grade;
    if (score >= 3) grade = 'vert';
    else if (score === 2) grade = 'orange';
    else grade = 'rouge';

    setResult(grade);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Questionnaire de Maturité RSE</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">{question}</label>
          <input
            type="text"
            className="border p-2 w-full"
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Soumettre</button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl">Votre note: {result}</h2>
          <p>Voici des exemples d'entreprises ayant mis en œuvre des actions RSE :</p>
          <ul>
            <li>Entreprise A: Description de l'action RSE</li>
            <li>Entreprise B: Description de l'action RSE</li>
            <li>Entreprise C: Description de l'action RSE</li>
          </ul>
          <p>Contactez-nous pour plus d'informations et pour vous accompagner dans votre démarche RSE.</p>
        </div>
      )}
    </div>
  );
}
