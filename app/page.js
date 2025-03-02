"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { 
  Phone, 
  Menu, 
  Download, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Lightbulb,
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [applicableThemes, setApplicableThemes] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const personalInfo = [
    { id: "companyName", label: "Nom de l'entreprise", type: "text" },
    { id: "size", label: "Taille de l'entreprise", type: "select", options: [
      "1-9 employés",
      "10-49 employés",
      "50-249 employés",
      "250+ employés"
    ]},
    { id: "sector", label: "Secteur d'activité", type: "text" },
    { id: "firstName", label: "Prénom", type: "text" },
    { id: "lastName", label: "Nom", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Téléphone", type: "tel" }
  ];

  // Nouveau système de questions structuré par thématique
  const rseThemes = [
    {
      id: 'gouvernance',
      title: 'Gouvernance Responsable',
      questions: [
        {
          id: 'gouv1',
          text: 'En tant que dirigeant, lors de l\'élaboration d\'un nouveau projet ou d\'une décision stratégique (nouveau marché, investissement majeur, réorganisation...), comment intégrez-vous les enjeux RSE ?',
          options: [
            { 
              value: 10, 
              label: 'Systématiquement pris en compte avec analyse d\'impact social et environnemental',
              example: 'Ex: Étude d\'impact environnemental et social avant chaque projet majeur'
            },
            { 
              value: 5, 
              label: 'Occasionnellement considérés selon le contexte',
              example: 'Ex: Prise en compte uniquement pour les projets à fort impact visible'
            },
            { 
              value: 0, 
              label: 'Rarement ou jamais intégrés dans la réflexion',
              example: 'Ex: Décisions basées uniquement sur les critères financiers'
            }
          ]
        },
        {
          id: 'gouv2',
          text: 'Comment impliquez-vous vos parties prenantes (employés, clients, fournisseurs) dans vos décisions stratégiques ?',
          options: [
            { 
              value: 10, 
              label: 'Consultation régulière et structurée',
              example: 'Ex: Comités consultatifs réguliers, enquêtes systématiques'
            },
            { 
              value: 5, 
              label: 'Consultation ponctuelle sur certains sujets',
              example: 'Ex: Sondages occasionnels, réunions ad hoc'
            },
            { 
              value: 0, 
              label: 'Peu ou pas de consultation',
              example: 'Ex: Décisions prises uniquement au niveau de la direction'
            }
          ]
        }
      ]
    },
    {
      id: 'droits',
      title: 'Droits des Personnes',
      questions: [
        {
          id: 'droits1',
          text: 'Comment votre organisation s\'assure-t-elle du respect des droits humains dans sa chaîne de valeur (fournisseurs, sous-traitants, partenaires) ?',
          options: [
            { 
              value: 10, 
              label: 'Politique formalisée avec audits et actions correctives',
              example: 'Ex: Charte éthique signée, audits réguliers des fournisseurs, plan d\'action en cas de non-conformité'
            },
            { 
              value: 5, 
              label: 'Contrôles ponctuels sans procédure systématique',
              example: 'Ex: Vérifications occasionnelles des conditions de travail chez les fournisseurs'
            },
            { 
              value: 0, 
              label: 'Aucune vérification particulière',
              example: 'Ex: Relations basées uniquement sur les aspects commerciaux'
            }
          ]
        },
        {
          id: 'droits2',
          text: 'Quelles mesures concrètes avez-vous mises en place pour prévenir toute forme de discrimination dans vos processus RH ?',
          options: [
            { 
              value: 10, 
              label: 'Processus complet et formalisé',
              example: 'Ex: CV anonymes, grilles d\'entretien standardisées, formation des recruteurs, indicateurs de suivi'
            },
            { 
              value: 5, 
              label: 'Quelques actions ponctuelles',
              example: 'Ex: Sensibilisation occasionnelle des managers aux biais de recrutement'
            },
            { 
              value: 0, 
              label: 'Aucune mesure spécifique',
              example: 'Ex: Recrutement et promotion basés sur des critères non formalisés'
            }
          ]
        }
      ]
    },
    {
      id: 'relations',
      title: 'Relations et Conditions de Travail Responsables',
      questions: [
        {
          id: 'rel1',
          text: 'Comment organisez-vous le dialogue social au sein de votre entreprise ?',
          options: [
            { 
              value: 10, 
              label: 'Dialogue social proactif et structuré',
              example: 'Ex: Réunions régulières avec les représentants du personnel, enquêtes de satisfaction, boîte à idées active'
            },
            { 
              value: 5, 
              label: 'Communication ponctuelle selon les besoins',
              example: 'Ex: Réunions uniquement lors des obligations légales ou des situations de crise'
            },
            { 
              value: 0, 
              label: 'Dialogue minimal ou inexistant',
              example: 'Ex: Communication descendante uniquement, pas de consultation des employés'
            }
          ]
        },
        {
          id: 'rel2',
          text: 'Quelles actions menez-vous pour améliorer la qualité de vie au travail ?',
          options: [
            { 
              value: 10, 
              label: 'Programme complet et suivi',
              example: 'Ex: Télétravail encadré, espaces de détente, formation continue, suivi de la charge de travail'
            },
            { 
              value: 5, 
              label: 'Quelques initiatives isolées',
              example: 'Ex: Events occasionnels, quelques aménagements des espaces de travail'
            },
            { 
              value: 0, 
              label: 'Aucune action spécifique',
              example: 'Ex: Respect uniquement des obligations légales minimales'
            }
          ]
        }
      ]
    }
  ];

  // Fonction pour gérer le toggle des thématiques
  const handleThemeToggle = (themeId) => {
    setApplicableThemes(prev => ({
      ...prev,
      [themeId]: !prev[themeId]
    }));
    
    // Si on désactive une thématique, on supprime ses réponses
    if (applicableThemes[themeId]) {
      const newResponses = { ...responses };
      rseThemes.find(t => t.id === themeId)?.questions.forEach(q => {
        delete newResponses[q.id];
      });
      setResponses(newResponses);
    }
  };

  // Nouvelle fonction de calcul du score
  const calculateScore = () => {
    const totalScore = Object.entries(responses).reduce((acc, [questionId, value]) => {
      // Vérifier si la question appartient à une thématique applicable
      const theme = rseThemes.find(t => t.questions.some(q => q.id === questionId));
      if (theme && applicableThemes[theme.id]) {
        return acc + Number(value);
      }
      return acc;
    }, 0);
    
    let label = '';
    if (totalScore >= 500) {
      label = 'LUCIE 26000 🏅🏅';
    } else if (totalScore >= 300) {
      label = 'LUCIE Progress 🏅';
    } else {
      label = 'Score insuffisant';
    }

    return { score: totalScore, label };
  };

  // Fonction pour vérifier si toutes les questions d'une thématique sont répondues
  const isThemeCompleted = (themeId) => {
    const theme = rseThemes.find(t => t.id === themeId);
    if (!theme) return false;
    
    return theme.questions.every(q => responses[q.id] !== undefined);
  };

  // Fonction pour compter le nombre de questions répondues dans une thématique
  const getThemeProgress = (themeId) => {
    const theme = rseThemes.find(t => t.id === themeId);
    if (!theme) return { completed: 0, total: 0 };
    
    const completed = theme.questions.filter(q => responses[q.id] !== undefined).length;
    return { completed, total: theme.questions.length };
  };

  // Modifier la fonction handleChange pour gérer l'état des sections
  const handleChange = (field, value) => {
    setResponses(prev => ({ ...prev, [field]: value }));
    
    // Vérifier si la thématique est complétée après la réponse
    const theme = rseThemes.find(t => t.questions.some(q => q.id === field));
    if (theme && isThemeCompleted(theme.id)) {
      setExpandedSections(prev => ({ ...prev, [theme.id]: false }));
    }
  };

  // Fonction pour gérer l'expansion/collapse des sections
  const toggleSection = (themeId) => {
    setExpandedSections(prev => ({ ...prev, [themeId]: !prev[themeId] }));
  };

  // Fonction utilitaire pour obtenir la couleur en fonction du score
  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTextScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  // Simplifier la fonction handleSubmit en supprimant l'option de test
  const handleSubmit = () => {
    const score = Object.entries(responses).reduce((acc, [questionId, value]) => {
      const theme = rseThemes.find(t => t.questions.some(q => q.id === questionId));
      if (theme && applicableThemes[theme.id]) {
        return acc + Number(value);
      }
      return acc;
    }, 0);
    
    let label = '';
    if (score >= 500) {
      label = 'LUCIE 26000 🏅🏅';
    } else if (score >= 300) {
      label = 'LUCIE Progress 🏅';
    } else {
      label = 'Score insuffisant';
    }

    setResult({ score, label });
  };

  // Nouvelle fonction pour calculer le score par thématique
  const getThemeScore = (themeId) => {
    const theme = rseThemes.find(t => t.id === themeId);
    if (!theme || !applicableThemes[themeId]) return { score: 0, maxPossible: 0 };

    const themeQuestions = theme.questions;
    const maxPossible = themeQuestions.length * 10; // 10 est le score max par question
    const actualScore = themeQuestions.reduce((acc, q) => {
      return acc + (parseInt(responses[q.id] || 0));
    }, 0);

    return {
      score: actualScore,
      maxPossible,
      percentage: (actualScore / maxPossible) * 100
    };
  };

  // Fonction pour obtenir des recommandations basées sur le score
  const getRecommendations = (themeId, score) => {
    const theme = rseThemes.find(t => t.id === themeId);
    if (!theme) return '';

    const recommendations = {
      gouvernance: {
        low: "La PME Greentech Solutions a transformé sa gouvernance en créant un comité RSE incluant des représentants de chaque service, permettant une prise de décision plus inclusive et durable.",
        medium: "L'entreprise de logistique EcoTransit a mis en place des réunions trimestrielles avec ses parties prenantes et intégré des critères RSE dans son tableau de bord stratégique.",
        high: "Comme BioInnovate qui partage ses bonnes pratiques lors des salons professionnels, continuez à être un ambassadeur de la RSE dans votre secteur."
      },
      droits: {
        low: "La société textile FairWear a implémenté une charte éthique et un système d'audit social chez ses fournisseurs, augmentant sa note RSE de 40%.",
        medium: "L'entreprise agroalimentaire NutriCo a développé un programme de formation sur la diversité et l'inclusion, réduisant les écarts salariaux de 15%.",
        high: "Suivez l'exemple de TechForGood qui a créé un label interne de respect des droits humains, devenu une référence dans le secteur numérique."
      },
      relations: {
        low: "Start-up RH Solutions a lancé des 'cafés dialogue' mensuels et une plateforme de suggestions, multipliant par 3 l'engagement des employés.",
        medium: "L'industriel MetalPro a mis en place un programme de bien-être au travail incluant télétravail et horaires flexibles, réduisant le turnover de 25%.",
        high: "Comme DigitalCare qui est devenue 'Great Place to Work', votre politique RH peut devenir un modèle dans votre secteur."
      }
    };

    if (score < 50) {
      return recommendations[themeId]?.low || "Implémentez des actions concrètes basées sur les meilleures pratiques du secteur.";
    } else if (score < 80) {
      return recommendations[themeId]?.medium || "Renforcez vos pratiques actuelles avec des actions mesurables.";
    }
    return recommendations[themeId]?.high || "Partagez vos succès et devenez un leader RSE dans votre secteur.";
  };

  // Ajouter une fonction pour vérifier si le questionnaire est prêt à être soumis
  const canSubmit = () => {
    // Vérifier qu'au moins une thématique est applicable
    const hasApplicableTheme = Object.values(applicableThemes).some(isApplicable => isApplicable);
    if (!hasApplicableTheme) return false;

    // Vérifier que toutes les thématiques applicables sont complétées
    return rseThemes.every(theme => {
      if (!applicableThemes[theme.id]) return true; // Ignorer les thématiques non applicables
      return isThemeCompleted(theme.id);
    });
  };

  return (
    <>
      {/* Navbar ajustée pour iPhone 11 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-gray-900/80 backdrop-blur-md shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex-shrink-0">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={80}
                height={20}
                className="w-auto h-5 sm:h-6"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="md:hidden text-gray-300 hover:text-white p-2">
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </a>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Services
                </a>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </a>
              </div>
              <a 
                href="tel:+33612345678"
                className="text-gray-300 hover:text-white font-medium flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">06 12 34 56 78</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main container avec padding ajusté */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-3 sm:p-8 pb-16 sm:pb-20 gap-4 sm:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-950 text-gray-200">
        <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center w-full max-w-4xl">
          {/* Profile section ajustée */}
          <div className="text-center w-full mb-4 sm:mb-8 px-3 sm:px-0">
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
              <Image
                src="/pp.jpg"
                alt="Franck Lidar"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 80px, 128px"
              />
            </div>
            <h1 className="text-xl sm:text-3xl font-bold mb-2 text-gray-100 px-2">
              Franck Lidar - Consultant RSE
            </h1>
            <h2 className="text-base sm:text-xl text-gray-400 mb-3 sm:mb-4">
              Certifié ISO 26000 Label Lucie
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-6 px-3 sm:px-4">
              Expert en Responsabilité Sociétale des Entreprises, j'accompagne les organisations 
              dans leur transformation vers des pratiques plus durables et responsables.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:scale-105"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer hover:scale-105"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="mailto:toto@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                <span>Me contacter</span>
              </a>
            </div>
          </div>

          {!showQuestionnaire ? (
            <>
              {/* Cards grid ajustée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 w-full mb-6 sm:mb-8 px-3 sm:px-0">
                {/* Carte LUCIE Progress */}
                <div className="p-3 sm:p-6 rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-400">Label LUCIE Progress 🏅</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">Premier niveau de reconnaissance de votre engagement RSE</p>
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Valorisation de votre démarche RSE</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Amélioration de votre image de marque</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Engagement dans une démarche d'amélioration continue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Accompagnement personnalisé</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowQuestionnaire(true)}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-200 cursor-pointer"
                  >
                    Commencer le test de pré-scoring
                  </button>
                </div>

                {/* Carte LUCIE 26000 */}
                <div className="p-3 sm:p-6 rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-400">Label LUCIE 26000 🏅🏅</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">Label d'excellence en matière de RSE</p>
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Reconnaissance ISO 26000 complète</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Avantage concurrentiel significatif</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Accès à un réseau d'entreprises engagées</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Attractivité employeur renforcée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Performance globale optimisée</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowQuestionnaire(true)}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-200 cursor-pointer"
                  >
                    Commencer le test de pré-scoring
                  </button>
                </div>

              </div>

              {/* Supprimez ou commentez l'ancien bouton "Commencer le questionnaire RSE" puisqu'il est maintenant dans les cartes */}
              {/*
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                onClick={() => setShowQuestionnaire(true)}
              >
                Commencer le questionnaire RSE
              </a>
              */}
            </>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-8 p-3 sm:p-8 max-w-6xl w-full">
              {!result ? (
                <>
                  {/* Section informations avec responsive */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8">
                    <div className="w-full p-3 sm:p-6 rounded-lg bg-gray-900 border border-gray-700">
                      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-100">Informations du répondant</h2>
                      {personalInfo.map((field) => (
                        <div key={field.id} className="mb-3 sm:mb-4">
                          <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-300">{field.label}</label>
                          {field.type === 'select' ? (
                            <select 
                              className="border border-gray-600 bg-gray-800 p-2 w-full rounded text-sm sm:text-base text-gray-200"
                              onChange={(e) => handleChange(field.id, e.target.value)}
                            >
                              <option value="">Sélectionnez une option</option>
                              {field.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              className="border border-gray-600 bg-gray-800 p-2 w-full rounded text-sm sm:text-base text-gray-200"
                              onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="w-full p-3 sm:p-6 rounded-lg bg-gray-900 border border-gray-700 flex flex-col justify-center">
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-100">Devenez l'organisation dont notre société a besoin</h2>
                      <p className="text-sm sm:text-base text-gray-300">
                        Les attentes des citoyens évoluent, l'entreprise ne peut plus être un simple acteur économique. 
                        Elle doit créer du sens, avoir des valeurs et remplir sa mission en adoptant un modèle 
                        économique positif pour les hommes et son territoire.
                      </p>
                    </div>
                  </div>

                  {/* Questionnaire avec responsive */}
                  <div className="w-full p-3 sm:p-6 rounded-lg">
                    {rseThemes.map((theme) => (
                      <div key={theme.id} className="mb-3 sm:mb-8 border border-gray-700 rounded-lg p-3 sm:p-6 bg-gray-900">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">{theme.title}</h2>
                            {applicableThemes[theme.id] && (
                              <div className="flex items-center gap-2">
                                {isThemeCompleted(theme.id) ? (
                                  <div className="flex items-center gap-2 text-green-500">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="text-sm">
                                      Questions répondues {getThemeProgress(theme.id).completed}/{getThemeProgress(theme.id).total}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">
                                    Questions répondues {getThemeProgress(theme.id).completed}/{getThemeProgress(theme.id).total}
                                  </span>
                                )}
                                {isThemeCompleted(theme.id) && (
                                  <button
                                    onClick={() => toggleSection(theme.id)}
                                    className="text-blue-400 hover:text-blue-300 ml-2 transition-colors duration-200 cursor-pointer hover:scale-110"
                                  >
                                    {expandedSections[theme.id] ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              {applicableThemes[theme.id] ? 'Applicable' : 'Non applicable'}
                            </span>
                            <button
                              onClick={() => handleThemeToggle(theme.id)}
                              className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                                applicableThemes[theme.id] ? 'bg-blue-600' : 'bg-gray-600'
                              }`}
                            >
                              <span
                                className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-gray-200 transition-transform transform ${
                                  applicableThemes[theme.id] ? 'translate-x-7' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        
                        {applicableThemes[theme.id] && (!isThemeCompleted(theme.id) || expandedSections[theme.id]) && (
                          <div className="space-y-4">
                            {theme.questions.map((question) => (
                              <div key={question.id} className="p-4 border border-gray-700 rounded bg-gray-800">
                                <p className="mb-4 text-gray-200">{question.text}</p>
                                <div className="flex flex-col gap-4">
                                  {question.options.map((option) => (
                                    <label key={option.value} className="flex items-start gap-2 text-gray-300 cursor-pointer group">
                                      <div className="flex items-center h-6">
                                        <input
                                          type="radio"
                                          name={question.id}
                                          value={option.value}
                                          onChange={(e) => handleChange(question.id, e.target.value)}
                                          className="form-radio text-blue-500 border-gray-600 bg-gray-700"
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <span>{option.label}</span>
                                        <span className="text-sm text-gray-400 italic mt-1">{option.example}</span>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button 
                        onClick={handleSubmit} 
                        disabled={!canSubmit()}
                        className={`w-full p-3 rounded transition-all duration-200 ${
                          canSubmit()
                            ? 'bg-blue-600 text-white hover:bg-blue-500 cursor-pointer hover:shadow-lg hover:scale-102'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-75'
                        }`}
                      >
                        {!Object.values(applicableThemes).some(isApplicable => isApplicable)
                          ? "Sélectionnez au moins une thématique applicable"
                          : !canSubmit()
                            ? "Complétez toutes les thématiques applicables"
                            : "Soumettre"
                        }
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 sm:gap-8 p-3 sm:p-8 max-w-6xl w-full">
                  {/* En-tête des résultats */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-100">Résultats de votre évaluation RSE</h1>
                    <button 
                      onClick={() => {/* Logique pour télécharger le PDF */}}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Télécharger le rapport PDF</span>
                      <span className="sm:hidden">Télécharger PDF</span>
                    </button>
                  </div>

                  {/* Score global */}
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-100">Score Global</h2>
                      <span className={`text-4xl font-bold ${getTextScoreColor(result.score, 600)}`}>
                        {result.score} pts
                      </span>
                    </div>
                    <div className="relative h-4 bg-gray-700 rounded-full mb-4">
                      <div 
                        className={`absolute top-0 left-0 h-full rounded-full transition-all ${getScoreColor(result.score, 600)}`}
                        style={{ width: `${(result.score / 600) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>0</span>
                      <span className="text-blue-400">Score actuel: {result.score}</span>
                      <span>600</span>
                    </div>
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                      <p className="text-xl mb-2 text-gray-200">Label recommandé : <span className="font-bold text-blue-400">{result.label}</span></p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <i className={`fas fa-circle text-xs ${result.score >= 300 ? 'text-green-500' : 'text-gray-500'}`}></i>
                          LUCIE Progress 🏅 : 300 points
                        </li>
                        <li className="flex items-center gap-2">
                          <i className={`fas fa-circle text-xs ${result.score >= 500 ? 'text-green-500' : 'text-gray-500'}`}></i>
                          LUCIE 26000 🏅🏅 : 500 points
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Analyse par thématique */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-100">Analyse détaillée par thématique</h2>
                    {rseThemes.map(theme => {
                      if (!applicableThemes[theme.id]) return null;
                      const themeScore = getThemeScore(theme.id);
                      return (
                        <div key={theme.id} className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-200">{theme.title}</h3>
                            <span className={`text-2xl font-bold ${getTextScoreColor(themeScore.score, themeScore.maxPossible)}`}>
                              {themeScore.score}/{themeScore.maxPossible}
                            </span>
                          </div>
                          <div className="relative h-4 bg-gray-700 rounded-full mb-4">
                            <div 
                              className={`absolute top-0 left-0 h-full rounded-full transition-all ${getScoreColor(themeScore.score, themeScore.maxPossible)}`}
                              style={{ width: `${themeScore.percentage}%` }}
                            ></div>
                          </div>
                          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <div className="flex items-start gap-2 text-yellow-400 mb-2">
                              <Lightbulb className="h-4 w-4 mt-1" />
                              <p className="text-gray-200">
                                {getRecommendations(theme.id, themeScore.percentage)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 p-6 bg-blue-600 rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Prêt à concrétiser votre démarche RSE ?</h2>
                    <p className="text-gray-100 mb-6">
                      Prenez rendez-vous pour un accompagnement personnalisé et obtenir votre label
                    </p>
                    <button 
                      onClick={() => {/* Logique pour la prise de RDV */}}
                      className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                    >
                      Prendre rendez-vous
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
        <footer className="row-start-3 flex gap-2 sm:gap-6 flex-wrap items-center justify-center text-gray-400 text-xs sm:text-base px-2 sm:px-4 text-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
            href="/"
          >
            À propos
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
            href="/"
          >
            RGPD
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
            href="/"
          >
            En savoir plus sur la RSE
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
            href="/"
          >
            En savoir plus sur les critères
          </a>
        </footer>
      </div>
    </>
  );
}
