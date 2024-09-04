import { useRef, useState } from "react";
import "./App.css";
import "./Blobs.css";
import Button from "./Button";
import "./Header.css";
import "./TextArea.css";

function App() {
  const [text, setText] = useState("");
  const blobRef = useRef(null);
  const maxWords = 260;

  const handleChange = (event) => {
    const words = event.target.value
      .split(/\s+/)
      .filter((word) => word.length > 0);
    if (words.length <= maxWords) {
      setText(event.target.value);
    }
  };

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const Sentiment = (name) => {
    return (
      <button
        className={`button ${"button-" + name.toLowerCase()}`}
        data-text="Awesome"
      >
        <span className="actual-text">&nbsp;{name}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;{name}&nbsp;
        </span>
      </button>
    );
  };

  const handelClick = async () => {
    console.log(JSON.stringify({ text }));
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const sentimentMapping = {
        0: "neutral",
        1: "positive",
        2: "negative",
      };

      const sentimentLabel = sentimentMapping[data.prediction];

      console.log(sentimentLabel);

      if (blobRef.current) {
        blobRef.current.classList.remove("neutral", "positive", "negative");
        blobRef.current.classList.add(`${sentimentLabel}`);
      }
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <>
      <div className={`navbar`}>
        <div className="logo">
          {Sentiment("Positive")}
          {Sentiment("Negative")}
          {Sentiment("Neutral")}
        </div>
        <a
          className="org"
          href="https://github.com/marwan2232004"
          target="_blank noreferrer"
        >
          <div className="icon">
            <button className="Btn">
              <span className="svgContainer">
                <svg fill="white" viewBox="0 0 496 512">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </span>
              <span className="BG"></span>
            </button>
          </div>
        </a>
      </div>
      <div className="main-page">
        <h1 className="name">
          <span className="emotion">Emotion</span>{" "}
          <span className="header">Sense</span>
        </h1>
        <div className="description">
          <span className="welcome">Welcome</span> to Emotion Sense! We leverage
          cutting-edge deep learning technology to analyze sentiments in
          COVID-related tweets. Experience real-time sentiment detection with
          Emotion Sense and gain insights into the emotions expressed in social
          media conversations about COVID-19.{" "}
        </div>
        <div className="input-area gradient-border">
          <textarea
            name="text"
            value={text}
            onChange={handleChange}
            placeholder="Type your text here..."
            maxLength={maxWords * 10}
          />
          <div className="word-counter">
            {wordCount} / {maxWords} words
          </div>
        </div>
        <Button handelClick={handelClick} />
        <div className="background" ref={blobRef}>
          <div className="shape-blob"></div>
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="shape-blob three"></div>
          <div className="shape-blob four"></div>
          <div className="shape-blob five"></div>
          <div className="shape-blob six"></div>
        </div>
      </div>
    </>
  );
}

export default App;
