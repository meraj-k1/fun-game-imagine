import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FinalProposal() {
    const [accepted, setAccepted] = useState(false);
    const [noPosition, setNoPosition] = useState({
        x: 0,
        y: 0,
    });

    const moveNoButton = () => {
        const x =
            Math.random() * 240 - 120;

        const y =
            Math.random() * 180 - 90;

        setNoPosition({ x, y });
    };

    if (accepted) {
        return (
            <section className="celebration-screen">

                <div className="celebration-hearts">
                    {Array.from(
                        { length: 30 },
                        (_, index) => (
                            <motion.span
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 100,
                                    x: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    opacity: [
                                        0,
                                        1,
                                        1,
                                        0,
                                    ],
                                    y: [
                                        100,
                                        -100,
                                        -300,
                                    ],
                                    x:
                                        Math.random() *
                                            500 -
                                        250,
                                    scale: [
                                        0,
                                        1,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration:
                                        3 +
                                        Math.random() *
                                            2,
                                    delay:
                                        Math.random(),
                                    repeat: Infinity,
                                }}
                            >
                                ❤️
                            </motion.span>
                        )
                    )}
                </div>

                <motion.div
                    className="celebration-content"
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1,
                        type: "spring",
                    }}
                >

                    <motion.div
                        className="big-heart"
                        animate={{
                            scale: [
                                1,
                                1.15,
                                1,
                            ],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                        }}
                    >
                        ❤️
                    </motion.div>

                    <span className="celebration-label">
                        ACCESS GRANTED
                    </span>

                    <h1>
                        You said YES.
                    </h1>

                    <p>
                        And somehow,
                        <br />
                        that just made my whole
                        world brighter.
                    </p>

                    <div className="final-message">
                        <span>
                            Dear Mosena,
                        </span>

                        <p>
                            If I could choose one
                            person to share all my
                            ordinary days, crazy
                            moments, beautiful
                            memories and everything
                            in between with...
                        </p>

                        <strong>
                            It would always be you.
                        </strong>

                        <div className="signature">
                            Forever MI ❤️
                        </div>
                    </div>

                </motion.div>

            </section>
        );
    }

    return (
        <section className="proposal-screen">

            <div className="proposal-orbit orbit-one"></div>
            <div className="proposal-orbit orbit-two"></div>

            <motion.div
                className="proposal-content"
                initial={{
                    opacity: 0,
                    y: 50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                }}
            >

                {/* Final stage */}

                <div className="proposal-stage">
                    FINAL PROTOCOL
                </div>

                {/* Heart */}

                <motion.div
                    className="proposal-heart"
                    animate={{
                        scale: [
                            1,
                            1.08,
                            1,
                        ],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                >
                    ❤️
                </motion.div>

                {/* Text */}

                <motion.p
                    className="proposal-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.7,
                    }}
                >
                    You made it through every
                    challenge.
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1,
                    }}
                >
                    There is only
                    <br />
                    one question left.
                </motion.h1>

                <motion.div
                    className="proposal-divider"
                    initial={{
                        width: 0,
                    }}
                    animate={{
                        width: 80,
                    }}
                    transition={{
                        delay: 1.3,
                        duration: 0.8,
                    }}
                />

                <motion.h2
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        delay: 1.5,
                        duration: 0.8,
                    }}
                >
                    Will you be mine? 💍
                </motion.h2>

                {/* Buttons */}

                <motion.div
                    className="proposal-buttons"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 2,
                    }}
                >

                    <motion.button
                        className="yes-button"
                        onClick={() =>
                            setAccepted(true)
                        }
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                    >
                        YES, ABSOLUTELY ❤️
                    </motion.button>

                    <motion.button
                        className="no-button"
                        style={{
                            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                        }}
                        onMouseEnter={
                            moveNoButton
                        }
                        onClick={
                            moveNoButton
                        }
                    >
                        No 😏
                    </motion.button>

                </motion.div>

                <motion.p
                    className="proposal-footer"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 2.5,
                    }}
                >
                    Choose carefully... 😉
                </motion.p>

            </motion.div>

        </section>
    );
}

export default FinalProposal;