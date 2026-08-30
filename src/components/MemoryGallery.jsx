import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  X,
} from "lucide-react";

const memories = [
  {
    id: 1,
    image: "/memories/memory-1.jpg",
    date: "THE BEGINNING",
    title: "Where It All Started",
    description:
      "Some stories begin with a moment. Ours began with something that felt completely ordinary.",
  },
  {
    id: 2,
    image: "/memories/memory-2.jpg",
    date: "MEMORY 02",
    title: "That Beautiful Day",
    description:
      "A simple day became one of those memories I never want to forget.",
  },
  {
    id: 3,
    image: "/memories/memory-3.jpg",
    date: "MEMORY 03",
    title: "Your Smile",
    description:
      "Somehow your smile became one of my favorite things in the world.",
  },
  {
    id: 4,
    image: "/memories/memory-4.jpg",
    date: "MEMORY 04",
    title: "Our Little Adventure",
    description:
      "The best memories are not always planned. Sometimes they just happen.",
  },
  {
    id: 5,
    image: "/memories/memory-5.jpg",
    date: "MEMORY 05",
    title: "A Moment Worth Keeping",
    description:
      "If I could keep one moment forever, there would be more than one.",
  },
  {
    id: 6,
    image: "/memories/memory-6.jpg",
    date: "TODAY",
    title: "And Here We Are",
    description:
      "Every memory brought us here. And somehow, I would not change a thing.",
  },
];

function MemoryGallery({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const activeMemory = memories[activeIndex];
  const isLastMemory = activeIndex === memories.length - 1;

  const nextMemory = () => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
    setLiked(false);
  };

  const previousMemory = () => {
    setActiveIndex(
      (prev) => (prev - 1 + memories.length) % memories.length
    );
    setLiked(false);
  };

  const selectMemory = (index) => {
    setActiveIndex(index);
    setLiked(false);
  };

  return (
    <section className="memory-gallery">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMemory.id}
          className="gallery-background"
          style={{
            backgroundImage: `url(${activeMemory.image})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="gallery-overlay" />

      <header className="gallery-header">
        <div>
          <span>CHAPTER 05</span>
          <h1>Our Memories</h1>
        </div>

        <div className="gallery-counter">
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(memories.length).padStart(2, "0")}
        </div>
      </header>

      <div className="gallery-stage">
        <div className="orbit-gallery">
          {memories.map((memory, index) => {
            if (index === activeIndex) {
              return null;
            }

            const distance =
              (index - activeIndex + memories.length) %
              memories.length;

            let position = "orbit-hidden";

            if (distance === 1) {
              position = "orbit-right";
            }

            if (distance === memories.length - 1) {
              position = "orbit-left";
            }

            if (distance === 2) {
              position = "orbit-right-far";
            }

            if (distance === memories.length - 2) {
              position = "orbit-left-far";
            }

            return (
              <motion.button
                key={memory.id}
                className={`orbit-card ${position}`}
                onClick={() => selectMemory(index)}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: position === "orbit-hidden" ? 0 : 1,
                  scale:
                    position === "orbit-right-far" ||
                    position === "orbit-left-far"
                      ? 0.75
                      : 0.9,
                }}
                transition={{ duration: 0.5 }}
              >
                <img src={memory.image} alt={memory.title} />

                <div className="orbit-card-overlay">
                  <span>{memory.date}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.id}
            className="main-memory"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -20,
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={activeMemory.image}
              alt={activeMemory.title}
            />

            <button
              className="fullscreen-button"
              onClick={() => setFullscreen(true)}
              aria-label="Open fullscreen"
            >
              <Maximize2 size={18} />
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          className="gallery-nav gallery-prev"
          onClick={previousMemory}
          aria-label="Previous memory"
        >
          <ChevronLeft size={25} />
        </button>

        <button
          className="gallery-nav gallery-next"
          onClick={nextMemory}
          aria-label="Next memory"
        >
          <ChevronRight size={25} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMemory.id}
          className="memory-information"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
        >
          <span>{activeMemory.date}</span>

          <h2>{activeMemory.title}</h2>

          <p>{activeMemory.description}</p>

          <button
            className={`heart-memory ${liked ? "liked" : ""}`}
            onClick={() => setLiked((prev) => !prev)}
          >
            <Heart
              size={18}
              fill={liked ? "currentColor" : "none"}
            />

            {liked ? "MEMORY SAVED" : "SAVE THIS MEMORY"}
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="gallery-dots">
        {memories.map((memory, index) => (
          <button
            key={memory.id}
            className={index === activeIndex ? "active" : ""}
            onClick={() => selectMemory(index)}
            aria-label={`Go to memory ${index + 1}`}
          />
        ))}
      </div>

      {isLastMemory && (
        <motion.button
          className="gallery-continue"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          onClick={onComplete}
        >
          CONTINUE OUR STORY
          <ChevronRight size={17} />
        </motion.button>
      )}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fullscreen-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            <button
              className="fullscreen-close"
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen"
            >
              <X size={25} />
            </button>

            <motion.img
              src={activeMemory.image}
              alt={activeMemory.title}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MemoryGallery;