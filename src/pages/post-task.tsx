import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { clamp } from "../../lib/clamp";
import { fetcher } from "../../lib/fetcher";
import { preventBackButton } from "../../lib/prevent-back-button";
import { createPostTaskQuestion } from "../api";
import { Button, Head, LikertScale, PageContainer } from "../components";
import { Input } from "../components/Input";

const questions = [
  {
    topic: "schoolUniforms",
    question: "Should students wear school uniform?",
    value: null,
  },
  {
    topic: "propertyRights",
    question: "Should intellectual property rights be banned?",
    value: null,
  },
  {
    topic: "obesity",
    question: "Is Obesity a Disease?",
    value: null,
  },
];

const PostTask: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const [stance, setStance] = useState<number | null>(null);
  //knowledge post task
  const [knowledgepost, setKnowledge] = useState<number>();
  const userId = Cookies.get("userId");
  const topic = Cookies.get("topic");
  const router = useRouter();
  const question = questions.filter((q) => q.topic === topic)[0];
  const [attention, setAttention] = useState<string>("");

  const { data: queries, error: queryError } = useSWR(
    () => `/api/queries`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: preTaskQuestion, error: preTaskQuestionError } = useSWR(
    () => `/api/pretaskquestions/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  preventBackButton();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      userId,
      topic,
        stance: clamp(stance),
        knowledgepost,
        explanation,
        attention,
    };

    try {
      const [res] = await Promise.allSettled([
        createPostTaskQuestion(data),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      router.push("/post-study");
    } catch (e) {
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  if (!queries || !preTaskQuestion) return <div>Loading...</div>;
  if (queryError) return <div>Error: {queryError.message}</div>;
  if (preTaskQuestionError) return <div>Error: {preTaskQuestionError.message}</div>;


    //</form>
    //<form onSubmit={handleSubmit} className="space-y-6">
  return (
    <>
      <Head />
      <PageContainer className="space-y-8">
      <h2>Post-Task Questionnaire</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3>
            Please state to which degree you agree or disagree with the
            topic: {queries[topic]["topic"]}
          </h3>
        </div>
          <div className="space-y-2">
            <LikertScale
              key={question?.topic}
              name="stancepost"
              minLabel="Strongly Disagree"
              maxLabel="Strongly Agree"
              numButtons={7}
              selected={stance}
              onChange={(e) => setStance(parseInt(e.target.value))}
            />
           </div>
         <div className="space-y-2">
            <h3>
               Please state how much you know about the
               following topic:
            </h3>
            <h3 className="p-4 bg-slate-200 rounded-md">
               {queries[topic]["topic"]}
            </h3>
            </div>
            <div className="space-y-2">
              <LikertScale
                key={question?.topic}
                name="knowledgepost"
                minLabel="No knowledge at all"
                maxLabel="Highly proficient"
                numButtons={7}
                selected={knowledgepost}
                onChange={(e) => setKnowledge(parseInt(e.target.value))}
              />
            </div>
          <div className="p-4 bg-slate-100 rounded-md border-2 border-slate-200">
            <h3 className="mb-2 font-semibold text-lg">
              In the beginning you gave the following explanation regarding your
              stance on the topic:
            </h3>
            {preTaskQuestion?.explanation ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: preTaskQuestion?.explanation,
                }}
              />
            ) : (
              "No explanation given"
            )}
          </div>
          <div className="space-y-2">
            <p>
              Now that you have completed the search task, think of the information that you found
              and list as many words or phrases as you can on the topic of the search task.
              Please list all the information you knew before as well.
              Please list only one word (or phrase) per line and end each line with a comma here:
            </p>
            <textarea
              className="block w-full p-3 shadow-sm border-slate-300 border rounded-md h-[200px] text-lg"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
                  </div>
                  <Input
                      type="text"
                      name="attention"
                      max={10}
                      placeholder=""
                      label="Type the word 'attention' here."
                      value={attention}
                      onChange={(e) => setAttention(e.target.value)}
                  />
                  <Button
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit">
                      Continue
              </Button>
          </form>
      </PageContainer>
    </>
  );
};

export default PostTask;
