import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "Where did our story begin?",
    options: ["Instagram", "College", "That random day", "A coincidence"],
    answer: 2,
  },
  {
    question: "What was the first thing I noticed about you?",
    options: ["Your smile", "Your eyes", "Your voice", "Your attitude"],
    answer: 0,
  },
  {
    question: "Who is most likely to say 'I love you' first? ❤️",
    options: ["Me 😌", "You 👀", "Both of us ❤️", "Nobody, we're too shy 😂"],
    answer: 2,
  },
  {
    question: "What makes a relationship stronger?",
    options: ["Trust 🤝", "Money 💰", "WiFi 📶", "Arguing 😂"],
    answer: 0,
  },
  {
    question: "What should never be missing between two people?",
    options: ["Honesty ❤️", "Ego 😎", "Silence 🤐", "Drama 🎭"],
    answer: 0,
  },
  {
    question: "What turns an ordinary moment into a beautiful memory?",
    options: [
      "Expensive gifts",
      "Being together ❤️",
      "Taking selfies",
      "Nothing",
    ],
    answer: 1,
  },
  {
    question: "And what is the most important thing in this journey?",
    options: [
      "The destination",
      "The adventure",
      "The person beside you ❤️",
      "The snacks 😂",
    ],
    answer: 2,
  },
];

function LoveQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);

        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const getResultMessage = () => {
    if (score === 5) {
      return {
        title: "PERFECT SCORE ❤️",
        message: "Okay... you definitely know what matters.",
      };
    }

    if (score >= 3) {
      return {
        title: "ALMOST PERFECT ✨",
        message: "Not bad. Your heart knows the way.",
      };
    }

    return {
      title: "THE JOURNEY CONTINUES 💫",
      message: "Maybe there are still a few things to discover.",
    };
  };

  if (finished) {
    const result = getResultMessage();

    return (
      <section className="quiz-screen">
        <div className="quiz-glow"></div>

        <motion.div
          className="quiz-result"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="result-heart">❤️</div>

          <span>QUEST 03 COMPLETE</span>

          <h1>{result.title}</h1>

          <div className="score">
            {score}
            <small>/ {questions.length}</small>
          </div>

          <p>{result.message}</p>

          <motion.button
            className="continue-button"
            onClick={onComplete}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            CONTINUE THE JOURNEY
            <span>→</span>
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="quiz-screen">
      <div className="quiz-glow"></div>

      <motion.div
        className="quiz-container"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        {/* Progress */}

        <div className="quiz-progress">
          <span>QUEST 03</span>

          <div className="quiz-progress-line">
            <motion.div
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{
                duration: 0.4,
              }}
            />
          </div>

          <span>
            {String(currentQuestion + 1).padStart(2, "0")}
            {" / "}
            {String(questions.length).padStart(2, "0")}
          </span>
        </div>

        {/* Header */}

        <div className="quiz-heading">
          <span>THE LOVE QUIZ</span>

          <h1>
            How well do you know
            <br />
            this journey?
          </h1>
        </div>

        {/* Question */}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="quiz-question"
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -40,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <div className="question-count">QUESTION {currentQuestion + 1}</div>

            <h2>{question.question}</h2>

            <div className="quiz-options">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;

                const isCorrect = index === question.answer;

                let className = "quiz-option";

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    className += " quiz-correct";
                  } else if (isSelected) {
                    className += " quiz-wrong";
                  }
                }

                return (
                  <motion.button
                    key={option}
                    className={className}
                    onClick={() => handleAnswer(index)}
                    whileHover={
                      selectedAnswer === null
                        ? {
                            x: 5,
                          }
                        : {}
                    }
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <span className="option-number">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>

                    {selectedAnswer !== null && isCorrect && (
                      <span className="answer-icon">✓</span>
                    )}

                    {selectedAnswer === index && !isCorrect && (
                      <span className="answer-icon">✕</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="quiz-footer">
          There is no wrong way to love.
          <span> ❤️</span>
        </p>
      </motion.div>
    </section>
  );
}

export default LoveQuiz;
