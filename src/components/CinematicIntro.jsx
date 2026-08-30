import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function CinematicIntro({ onStart }) {
    return (
        <section className="cinematic-intro">

            <div className="intro-glow"></div>

            <motion.div
                className="intro-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >

                <motion.div
                    className="heart-icon"
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                >
                    <Heart fill="currentColor" size={48} />
                </motion.div>

                <motion.p
                    className="system-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    SYSTEM INITIALIZING...
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    Searching for someone special...
                </motion.h1>

                <motion.div
                    className="loading-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                        duration: 2,
                        delay: 2.5,
                    }}
                />

                <motion.p
                    className="candidate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5 }}
                >
                    ❤️ CANDIDATE FOUND ❤️
                </motion.p>

                <motion.p
                    className="question"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5 }}
                >
                    There is one important question
                    waiting for you...
                </motion.p>

                <motion.button
                    className="start-button"
                    onClick={onStart}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5.5 }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    START THE JOURNEY
                    <span>→</span>
                </motion.button>

            </motion.div>

        </section>
    );
}

export default CinematicIntro;