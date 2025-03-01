import React, { useEffect, useState } from "react";

const Title = ({ text }) => {
  const [typedTitle, setTypedTitle] = useState("");
  const [blink, setBlink] = useState(true);
  const [currentSentence, setCurrentSentence] = useState("");
  const [titleComplete, setTitleComplete] = useState(false); // Track title animation completion

  useEffect(() => {
    // Title typing effect
    let charIndex = 0;
    const typeInterval = 150; // Typing speed
    const blinkInterval = 500; // Cursor blink speed

    const typeTitle = () => {
      if (charIndex <= text.length) {
        setTypedTitle(text.substring(0, charIndex));
        charIndex++;
        setTimeout(typeTitle, typeInterval);
      } else {
        setTitleComplete(true); // Mark title as complete
      }
    };

    typeTitle();

    // Cursor blinking
    const blinkCursor = setInterval(() => setBlink((prev) => !prev), blinkInterval);

    return () => clearInterval(blinkCursor); // Clean up blinking cursor
  }, [text]);

  useEffect(() => {
    if (!titleComplete) return; // Start sentence animation only after title completes

    // Sentences typing and deleting effect
    const sentences = ["CU_Jharkhand", "Let's go out of the CodeSpace"];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isRemoving = false;

    const typeInterval = 150; // Typing speed
    const pauseBetween = 1000; // Pause before removing text

    const typeSentence = () => {
      if (!isRemoving && charIndex <= sentences[sentenceIndex].length) {
        setCurrentSentence(sentences[sentenceIndex].substring(0, charIndex));
        charIndex++;
      } else if (isRemoving && charIndex >= 0) {
        setCurrentSentence(sentences[sentenceIndex].substring(0, charIndex));
        charIndex--;
      } else {
        isRemoving = !isRemoving;
        if (!isRemoving) {
          sentenceIndex = (sentenceIndex + 1) % sentences.length; // Move to the next sentence
        }
        setTimeout(typeSentence, pauseBetween); // Pause before next action
        return;
      }
      setTimeout(typeSentence, isRemoving ? 100 : typeInterval);
    };

    setTimeout(typeSentence, pauseBetween); // Start after a short delay
  }, [titleComplete]); // Depend on title completion

  return (
    <div className="text-center">
      {/* Title */}
      <div className="font-radley text-3xl md:text-5xl text-yellow-500">
        <span>{typedTitle}</span>
        {/* Remove underscore when title animation completes */}
        {!titleComplete && <span className={`ml-1 ${blink ? "opacity-100" : "opacity-0"}`}>_</span>}
      </div>

      {/* Animated Sentence */}
      {titleComplete && ( // Render sentences only after title completes
        <div className="text-2xl font-mono text-white mt-4">
          <span>{currentSentence}</span>
          <span className={`ml-1 ${blink ? "opacity-100" : "opacity-0"}`}>_</span>
        </div>
      )}
    </div>
  );
};

export default Title;
