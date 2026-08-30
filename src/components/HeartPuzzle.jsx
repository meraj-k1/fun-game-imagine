import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, RotateCcw } from "lucide-react";

function HeartPuzzle({ onComplete }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const answers = [
        {
            id: 1,
            text: "Money",
        },
        {
            id: 2,
            text: "Love ❤️",
        },
        {
            id: 3,
            text: "WiFi",
        },
        {
            id: 4,
            text: "Coffee ☕",
        },
    ];

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer.id);
        setAttempts((prev) => prev + 1);

        if (answer.id === 2) {
            setIsCorrect(true);

            setTimeout(() => {
                onComplete();
            }, 2500);
        } else {
            setIsCorrect(false);
        }
    };

    const resetAnswer = () => {
        setSelectedAnswer(null);
    };

    return (
        <section className="heart-puzzle">

            {/* Background glow */}
            <div className="puzzle-glow"></div>

            <motion.div
                className="puzzle-container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >

                {/* Progress */}
                <div className="puzzle-progress">
                    <span>QUEST 01</span>

                    <div className="progress-line">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "16%" }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                    <span>01 / 06</span>
                </div>

                {/* Heart */}
                <motion.div
                    className={`locked-heart ${
                        isCorrect ? "heart-unlocked" : ""
                    }`}
                    animate={
                        isCorrect
                            ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, -5, 5, 0],
                              }
                            : {
                                  scale: [1, 1.05, 1],
                              }
                    }
                    transition={{
                        duration: isCorrect ? 0.8 : 2,
                        repeat: isCorrect ? 0 : Infinity,
                    }}
                >
                    {isCorrect ? (
                        <Unlock size={65} />
                    ) : (
                        <Lock size={65} />
                    )}

                    <Heart
                        className="heart-outline"
                        size={120}
                    />
                </motion.div>

                {/* Title */}
                <motion.p
                    className="mini-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    THE FIRST CHALLENGE
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Unlock My Heart
                </motion.h1>

                <motion.p
                    className="puzzle-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Every heart has a secret.
                    <br />
                    Can you find the right answer?
                </motion.p>

                {/* Question */}
                <div className="question-card">

                    <span className="question-number">
                        CLUE #01
                    </span>

                    <h2>
                        What is something that gets
                        stronger every time we share it?
                    </h2>

                </div>

                {/* Answers */}
                <div className="answer-grid">

                    {answers.map((answer) => {

                        const isSelected =
                            selectedAnswer === answer.id;

                        const isWrong =
                            isSelected &&
                            !isCorrect;

                        return (
                            <motion.button
                                key={answer.id}
                                className={`
                                    answer-button
                                    ${isSelected ? "selected" : ""}
                                    ${isWrong ? "wrong-answer" : ""}
                                    ${
                                        isCorrect &&
                                        answer.id === 2
                                            ? "correct-answer"
                                            : ""
                                    }
                                `}
                                onClick={() =>
                                    !isCorrect &&
                                    handleAnswer(answer)
                                }
                                whileHover={{
                                    scale: 1.02,
                                    y: -3,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                            >
                                <span className="answer-letter">
                                    {String.fromCharCode(
                                        65 + answer.id - 1
                                    )}
                                </span>

                                <span>
                                    {answer.text}
                                </span>
                            </motion.button>
                        );
                    })}

                </div>

                {/* Wrong answer message */}
                <AnimatePresence>
                    {selectedAnswer && !isCorrect && (
                        <motion.div
                            className="wrong-message"
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        >
                            <span>✕</span>

                            <div>
                                <strong>
                                    Hmm... not quite.
                                </strong>

                                <p>
                                    Think with your heart,
                                    not your brain. ❤️
                                </p>
                            </div>

                            <button
                                onClick={resetAnswer}
                                className="try-again"
                            >
                                <RotateCcw size={15} />
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Correct message */}
                <AnimatePresence>
                    {isCorrect && (
                        <motion.div
                            className="success-message"
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                        >
                            <div className="success-icon">
                                ❤️
                            </div>

                            <h3>
                                HEART UNLOCKED
                            </h3>

                            <p>
                                You knew the answer.
                                <br />
                                Maybe you know me better
                                than I thought... ❤️
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Attempts */}
                <div className="attempt-counter">
                    Attempts: {attempts}
                </div>

            </motion.div>
        </section>
    );
}

export default HeartPuzzle;