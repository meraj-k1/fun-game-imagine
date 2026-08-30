import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Unlock,
    Eye,
    EyeOff,
    KeyRound,
} from "lucide-react";

const SECRET_PASSWORD = "LOVE";

function PasswordPuzzle({ onComplete }) {
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [showPassword, setShowPassword] =
        useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setError(
                "The terminal is waiting for something..."
            );
            return;
        }

        setAttempts((prev) => prev + 1);

        if (
            password.trim().toUpperCase() ===
            SECRET_PASSWORD
        ) {
            setError("");
            setUnlocked(true);

            setTimeout(() => {
                onComplete();
            }, 3500);
        } else {
            setError(
                "ACCESS DENIED — Follow the clues."
            );

            setPassword("");
        }
    };

    const handleChange = (e) => {
        setPassword(e.target.value);
        setError("");
    };

    return (
        <section className="password-screen">

            <div className="terminal-glow"></div>

            <motion.div
                className="password-container"
                initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.8,
                }}
            >

                {/* Progress */}

                <div className="password-progress">

                    <span>
                        QUEST 04
                    </span>

                    <div className="password-progress-line">
                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: "66%",
                            }}
                            transition={{
                                duration: 1,
                            }}
                        />
                    </div>

                    <span>
                        04 / 06
                    </span>

                </div>

                {/* Terminal */}

                <div
                    className={`terminal-card ${
                        unlocked
                            ? "terminal-unlocked"
                            : ""
                    }`}
                >

                    {/* Terminal header */}

                    <div className="terminal-header">

                        <div className="terminal-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span>
                            LOVE_OS // SECRET_TERMINAL
                        </span>

                    </div>

                    {/* Terminal body */}

                    <div className="terminal-body">

                        <motion.div
                            className="terminal-icon"
                            animate={
                                unlocked
                                    ? {
                                          scale: [
                                              1,
                                              1.2,
                                              1,
                                          ],
                                      }
                                    : {}
                            }
                        >
                            {unlocked ? (
                                <Unlock size={50} />
                            ) : (
                                <Lock size={50} />
                            )}
                        </motion.div>

                        <div className="terminal-status">
                            STATUS:{" "}
                            {unlocked
                                ? "ACCESS GRANTED"
                                : "ACCESS REQUIRED"}
                        </div>

                        <h1>
                            {unlocked
                                ? "SECRET UNLOCKED"
                                : "Secret Terminal"}
                        </h1>

                        <p className="terminal-description">
                            {unlocked
                                ? "You found the secret."
                                : "Something important is hidden behind this door."}
                        </p>

                        {!unlocked && (
                            <>
                                {/* Clues */}

                                <div className="clues">

                                    <div className="clue">

                                        <span>
                                            CLUE 01
                                        </span>

                                        <p>
                                            It has four
                                            letters.
                                        </p>

                                    </div>

                                    <div className="clue">

                                        <span>
                                            CLUE 02
                                        </span>

                                        <p>
                                            You can't
                                            touch it,
                                            but you can
                                            feel it.
                                        </p>

                                    </div>

                                    <div className="clue">

                                        <span>
                                            CLUE 03
                                        </span>

                                        <p>
                                            The heart
                                            knows the
                                            answer.
                                        </p>

                                    </div>

                                </div>

                                {/* Password form */}

                                <form
                                    className="password-form"
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <label>
                                        ENTER PASSWORD
                                    </label>

                                    <div className="password-input-wrapper">

                                        <KeyRound
                                            size={18}
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="••••"
                                            autoComplete="off"
                                        />

                                        <button
                                            type="button"
                                            className="password-visibility"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={
                                                        18
                                                    }
                                                />
                                            ) : (
                                                <Eye
                                                    size={
                                                        18
                                                    }
                                                />
                                            )}
                                        </button>

                                    </div>

                                    <button
                                        type="submit"
                                        className="unlock-button"
                                    >
                                        UNLOCK
                                        <span>
                                            →
                                        </span>
                                    </button>

                                </form>

                                {/* Error */}

                                <AnimatePresence>

                                    {error && (
                                        <motion.div
                                            className="terminal-error"
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                        >
                                            <span>
                                                ✕
                                            </span>

                                            {error}
                                        </motion.div>
                                    )}

                                </AnimatePresence>

                                <div className="terminal-attempts">
                                    ATTEMPTS:{" "}
                                    {attempts}
                                </div>
                            </>
                        )}

                        {unlocked && (
                            <motion.div
                                className="access-granted"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                            >
                                <div>
                                    ACCESS GRANTED
                                </div>

                                <p>
                                    The final question
                                    is waiting for
                                    you...
                                </p>

                                <span>
                                    PREPARING FINAL
                                    PROTOCOL
                                </span>
                            </motion.div>
                        )}

                    </div>

                </div>

            </motion.div>

        </section>
    );
}

export default PasswordPuzzle;