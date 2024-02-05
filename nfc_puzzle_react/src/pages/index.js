import { useEffect, useState } from "react";

function PopupAD({ message }) {
    return (
        <div className="popup" id="completion-popup">
            <span className="close">&times;</span>
            <p className="message">{message}</p>
            <button id="restart" onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
    );
}

export default function Index() {
    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState(0);
    const [didWompWomp, setDidWompWomp] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [clickedAnswer, setClickedAnswer] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        fetch("/questions")
            .then((r) => r.json())
            .then((d) => {
                setQuestions(d);
                setShuffledQuestions([...d].sort(() => Math.random() - 0.5));
            });
    }, []);

    const curQuestion = shuffledQuestions[questionId];

    const shuffleAnswers = (answers) => {
        return [...answers].sort(() => Math.random() - 0.5);
    };

    const onAnswer = (answer) => {
        const isNotWompWomp = answer === curQuestion.answer;
        if (isNotWompWomp === false) {
            setDidWompWomp(true);
        } else {
            if (questionId === shuffledQuestions.length - 1) {
                setIsFinished(true);
            } else {
                setQuestionId(questionId + 1);
            }
        }
        setClickedAnswer(answer === clickedAnswer ? null : answer);
    };

    return (
        <div id="main-body">
            <h1 id="title">NFC Puzzle</h1>
            {isFinished ? (
                <PopupAD message={"du vant!!!"} />
            ) : undefined}
            {shuffledQuestions.length > 0 ? (
                <>
                    <div id="question-container">
                        <p>{curQuestion.question}</p>
                        <div id="question-counter">Question {questionId + 1}</div>
                    </div>
                    <div>
                        {shuffleAnswers([...curQuestion.wrongAnswers, curQuestion.answer]).map((answer) => (
                            <button
                                key={answer}
                                onClick={() => onAnswer(answer)}
                                className={clickedAnswer === answer ? "clicked" : ""}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>

                    {didWompWomp ? (
                        <PopupAD message={"Feil svar, prøv igjen..."} />
                    ) : undefined}
                </>
            ) : (
                <>
                    laster inn gutta🍌
                </>
            )}
        </div>
    );
}
