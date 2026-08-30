import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cardValues = [
    "❤️",
    "🌹",
    "✨",
    "💌",
    "❤️",
    "🌹",
    "✨",
    "💌",
];

function shuffleCards() {
    return [...cardValues]
        .sort(() => Math.random() - 0.5)
        .map((value, index) => ({
            id: index,
            value,
        }));
}

function MemoryGame({ onComplete }) {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        setCards(shuffleCards());
    }, []);

    useEffect(() => {
        if (
            cards.length > 0 &&
            matched.length === cards.length
        ) {
            setGameCompleted(true);

            setTimeout(() => {
                onComplete();
            }, 3000);
        }
    }, [matched, cards, onComplete]);

    const handleCardClick = (card) => {
        if (
            locked ||
            flipped.includes(card.id) ||
            matched.includes(card.id)
        ) {
            return;
        }

        const newFlipped = [...flipped, card.id];

        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);

            setLocked(true);

            const firstCard = cards.find(
                (item) => item.id === newFlipped[0]
            );

            const secondCard = cards.find(
                (item) => item.id === newFlipped[1]
            );

            if (
                firstCard.value === secondCard.value
            ) {
                setTimeout(() => {
                    setMatched((prev) => [
                        ...prev,
                        firstCard.id,
                        secondCard.id,
                    ]);

                    setFlipped([]);
                    setLocked(false);
                }, 600);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setLocked(false);
                }, 1000);
            }
        }
    };

    const restartGame = () => {
        setCards(shuffleCards());
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setLocked(false);
        setGameCompleted(false);
    };

    return (
        <section className="memory-game">

            <div className="memory-glow"></div>

            <motion.div
                className="memory-container"
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.8,
                }}
            >

                {/* Progress */}

                <div className="memory-progress">

                    <span>
                        QUEST 02
                    </span>

                    <div className="memory-progress-line">
                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: "33%",
                            }}
                            transition={{
                                duration: 1,
                            }}
                        />
                    </div>

                    <span>
                        02 / 06
                    </span>

                </div>

                {/* Header */}

                <div className="memory-header">

                    <span className="memory-label">
                        THE MEMORY CHALLENGE
                    </span>

                    <h1>
                        Find Our Memories
                    </h1>

                    <p>
                        Some things are worth remembering.
                        <br />
                        Find all the matching pairs.
                    </p>

                </div>

                {/* Stats */}

                <div className="memory-stats">

                    <div>
                        <span>
                            MOVES
                        </span>

                        <strong>
                            {moves}
                        </strong>
                    </div>

                    <div>
                        <span>
                            MATCHED
                        </span>

                        <strong>
                            {matched.length / 2}
                            /4
                        </strong>
                    </div>

                </div>

                {/* Cards */}

                <div className="memory-grid">

                    {cards.map((card) => {

                        const isFlipped =
                            flipped.includes(
                                card.id
                            );

                        const isMatched =
                            matched.includes(
                                card.id
                            );

                        return (
                            <motion.button
                                key={card.id}
                                className={`
                                    memory-card
                                    ${
                                        isFlipped ||
                                        isMatched
                                            ? "flipped"
                                            : ""
                                    }
                                    ${
                                        isMatched
                                            ? "matched"
                                            : ""
                                    }
                                `}
                                onClick={() =>
                                    handleCardClick(
                                        card
                                    )
                                }
                                whileHover={
                                    !isFlipped &&
                                    !isMatched
                                        ? {
                                              y: -5,
                                          }
                                        : {}
                                }
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >

                                <div className="card-inner">

                                    {/* Front */}

                                    <div className="card-face card-front">
                                        <span>
                                            ?
                                        </span>
                                    </div>

                                    {/* Back */}

                                    <div className="card-face card-back">
                                        <span>
                                            {card.value}
                                        </span>
                                    </div>

                                </div>

                            </motion.button>
                        );
                    })}

                </div>

                {/* Instructions */}

                {!gameCompleted && (
                    <p className="memory-hint">
                        Match all four pairs to continue ❤️
                    </p>
                )}

                {/* Completion */}

                {gameCompleted && (
                    <motion.div
                        className="memory-success"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                    >

                        <div className="memory-success-icon">
                            🎉
                        </div>

                        <h2>
                            MEMORY UNLOCKED
                        </h2>

                        <p>
                            You remembered them all.
                            <br />
                            Maybe our memories aren't so
                            easy to forget. ❤️
                        </p>

                    </motion.div>
                )}

                {/* Restart */}

                {!gameCompleted && moves > 0 && (
                    <button
                        className="restart-memory"
                        onClick={restartGame}
                    >
                        Restart Game
                    </button>
                )}

            </motion.div>

        </section>
    );
}

export default MemoryGame;