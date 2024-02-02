import { useEffect, useState } from "react"

function PopupAD({ message }) {
    return (
        <div class="popup" id="completion-popup">
            <span class="close">&times;</span>
            <p class="message">{message}</p>
            <button id="restart" onClick={() => {
                window.location.reload();
            }}>Restart Quiz</button>
        </div>
    )
}

export default function Index() {
    const [questions, setQuestions] = useState()
    const [questionId, setQuestionId] = useState(0);
    const [didWompWomp, setDidWompWomp] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const curQuestion = questions?.[questionId] ?? undefined;

    useEffect(() => {
        fetch("/questions").then((r) => {
            r.json().then(d => {
                setQuestions(d);
            })
        })
    }, []);

    const onAnswer = (answer) => {
        const isNotWompWomp = answer === curQuestion.answer
        if (isNotWompWomp === false) {
            setDidWompWomp(true);//womp womp
        } else {
            //ikke womp womp
            if (questionId === questions.length - 1) {
                //du er ferdig woww!!!
                setIsFinished(true);
            } else {
                setQuestionId(questionId + 1);
            }
        }
    }

    return (
        <div id="main-body">
            <h1 id ="title">NFC Puzzle</h1>
            {isFinished ? (
                <PopupAD message={"du vant!!!!!!1!!!1U73759872985732"} />
            ) : undefined}
            {questions ? (
                <>
                    <div id="question-container">
                        <p>{curQuestion.question}</p>
                    </div>
                    <div>
                        {[...curQuestion.wrongAnswers, curQuestion.answer].map((answer) => {
                            return (
                                <button onClick={() => {
                                    onAnswer(answer)
                                }}>
                                    {answer}
                                </button>
                            )
                        })}
                    </div>

                    {didWompWomp ? (
                        <PopupAD message={"du SUGER, DREP DEG SLEV"} />
                    ) : undefined}

                    <div id="question-counter">Question {questionId + 1}</div>
                </>
            ) : (
                <>
                    laster inn gutta🍌
                </>
            )}
        </div>
    )
}