import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Mail,
  Lock,
  ChevronRight,
} from "lucide-react";

const letterSections = [
  {
    title: "If you ever wonder...",
    text: "I don't know exactly when you became so important to me. Maybe it was one conversation, one smile, or one of those little moments that seemed ordinary at the time.",
  },
  {
    title: "What I do know...",
    text: "Somewhere along the way, talking to you became something I looked forward to. Your presence started making ordinary days feel a little less ordinary.",
  },
  {
    title: "And honestly...",
    text: "I could write hundreds of words about you, but words somehow never feel enough when the person you're writing about means this much.",
  },
  {
    title: "So here's my truth...",
    text: "I don't want this to be just another beautiful memory. I want to create many more of them with you — the silly ones, the unexpected ones, the unforgettable ones.",
  },
];

function InteractiveLoveLetter({ onComplete }) {
  const [opened, setOpened] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  const openLetter = () => {
    setOpened(true);
  };

  const nextSection = () => {
    if (currentSection < letterSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      setShowFinal(true);
    }
  };

  return (
    <section className="love-letter-screen">
      <div className="letter-floating-hearts">
        {Array.from({ length: 12 }, (_, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: "100vh",
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: "-20vh",
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {!opened ? (
        <motion.div
          className="letter-intro"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <span className="letter-chapter">
            CHAPTER 06
          </span>

          <h1>
            Something I
            <br />
            never said...
          </h1>

          <p>
            I wrote this one especially for you.
          </p>

          <motion.div
            className="envelope-wrapper"
            whileHover={{
              scale: 1.03,
            }}
          >
            <motion.div
              className="envelope"
              onClick={openLetter}
              whileTap={{
                scale: 0.97,
              }}
            >
              <div className="envelope-back" />

              <motion.div
                className="letter-paper-preview"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Mail size={35} />

                <span>FOR YOU</span>
              </motion.div>

              <div className="envelope-front" />

              <div className="envelope-flap">
                <div className="flap-inner" />
              </div>

              <div className="wax-seal">
                <Heart
                  size={17}
                  fill="currentColor"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            className="open-letter-button"
            onClick={openLetter}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Lock size={15} />
            OPEN MY HEART
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="letter-wrapper"
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="letter-top">
            <span>A LETTER FOR YOU</span>

            <div>
              {showFinal
                ? "♥"
                : `${currentSection + 1} / ${letterSections.length}`}
            </div>
          </div>

          <div className="letter-card">
            <div className="letter-decoration">
              
            </div>

            <AnimatePresence mode="wait">
              {!showFinal ? (
                <motion.div
                  key={currentSection}
                  className="letter-section"
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
                    duration: 0.5,
                  }}
                >
                  <span className="letter-section-number">
                    {String(
                      currentSection + 1
                    ).padStart(2, "0")}
                  </span>

                  <h2>
                    {
                      letterSections[
                        currentSection
                      ].title
                    }
                  </h2>

                  <p>
                    {
                      letterSections[
                        currentSection
                      ].text
                    }
                  </p>

                  <div className="letter-line" />

                  <button
                    className="letter-next"
                    onClick={nextSection}
                  >
                    {currentSection ===
                    letterSections.length - 1
                      ? "THERE'S SOMETHING ELSE"
                      : "KEEP READING"}

                    <ChevronRight size={17} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  className="letter-final"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  <motion.div
                    className="final-letter-heart"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                    }}
                  >
                    ❤️
                  </motion.div>

                  <span>ONE LAST THING</span>

                  <h2>
                    If I could choose...
                  </h2>

                  <p>
                    Out of all the people,
                    places, moments and
                    possibilities in this world,
                    I think I'd still choose the
                    ones where you're there.
                  </p>

                  <strong>
                    Every. Single. Time.
                  </strong>

                  <div className="letter-line" />

                  <button
                    className={`heart-reveal ${
                      heartClicked ? "clicked" : ""
                    }`}
                    onClick={() =>
                      setHeartClicked(true)
                    }
                  >
                    <Heart
                      size={20}
                      fill={
                        heartClicked
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {heartClicked
                      ? "YOU FOUND IT ❤️"
                      : "TAP MY HEART"}
                  </button>

                  <AnimatePresence>
                    {heartClicked && (
                      <motion.button
                        className="letter-continue"
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        onClick={onComplete}
                      >
                        CONTINUE
                        <ChevronRight size={17} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="letter-bottom">
            <Heart
              size={13}
              fill="currentColor"
            />
            written with love
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default InteractiveLoveLetter;