import Cookies from "js-cookie";
import router from "next/router";
import { useState } from "react";
import { clamp } from "../../lib/clamp";
import { preventBackButton } from "../../lib/prevent-back-button";
import { createPreStudyQuestions } from "../api";
import { Button, Head, LikertScale, PageContainer } from "../components";

const questions = [
  {
    topic: "schoolUniforms",
    question: "Should students wear school uniform?",
    value: null,
  },
  {
    topic: "propertyRights",
    question: "Should intellectual property rights exist?",
    value: null,
  },
  {
    topic: "obesity",
    question: "Is Obesity a Disease?",
    value: null,
  },
];

interface LikertQuestion {
  topic: string;
  question: string;
  value: number | null;
}

const PreStudy = () => {
  const [question, setQuestion] = useState<LikertQuestion[]>(questions);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const userId = Cookies.get("userId");
  //const logic = Cookies.get("neutral")

  preventBackButton();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuestion(
      question.map((q) => {
        if (q.topic === name) {
          return {
            ...q,
            value: parseInt(value),
          };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
//q.topic , logic hinzugefügt, stance: clamp(q.value),
const data = question.map((q) => {
  return {
      userId,
      topic: q.topic,
      stance: clamp(q.value),
  };
});

    // Get all stances
    const anyStances = data.filter((q) => q.stance >= -3 && q.stance <= 3);

    try {
      await createPreStudyQuestions(data);

      // If there are no stances, redirect to the next page
      if (anyStances.length === 0) {
        router.push("/thank-you");
        return;
      }

      // Add randomAnyStance to the cookie
      //const randomAnyStance = anyStances[Math.floor(Math.random() * anyStances.length)];
      //Cookies.set("topic", randomAnyStance.topic);
      const combination = String(Cookies.get("combination"))
      const topic = combination.split("-")[1];
      Cookies.set("topic", topic)

      router.push("/pre-task");
    } catch (e) {
      console.log(e);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Head />
      <PageContainer className="space-y-8">
        <h1>Pre-Study Questionnaire</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
          <h3>
            Please state to which degree you agree or disagree with the
            following topics
          </h3>
          {question.map((q) => (
            <div
              key={q.topic}
              className="border-2 p-4 rounded-lg border-slate-200">
              <LikertScale
                key={q.topic}
                name={q.topic}
                question={q.question}
                minLabel="Strongly Disagree"
                maxLabel="Strongly Agree"
                numButtons={7}
                selected={q.value}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button isLoading={isSubmitting} disabled={isSubmitting}>
            Continue
          </Button>
        </form>
      </PageContainer>
    </>
  );
};

export default PreStudy;
