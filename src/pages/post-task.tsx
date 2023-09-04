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
      explanation,
      knowledgepost,
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
  if (preTaskQuestionError)
    return <div>Error: {preTaskQuestionError.message}</div>;

  return (
    <>
      <Head />
      <PageContainer className="space-y-8">
        <h2>Post-Task Questionnaire</h2>
        <div className="space-y-2">
          <h3>
            Please state to which degree you agree or disagree with the
            following topic:
          </h3>
          <h3 className="p4 bg-slate-200 rounded-md">
            {queries[topic]["topic"]}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <LikertScale
              key={question?.topic}
              name={question?.topic}
              minLabel="Strongly Disagree"
              maxLabel="Strongly Agree"
              numButtons={7}
              selected={stance}
              onChange={(e) => setStance(parseInt(e.target.value))}
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
              After having informed yourself about the topic, are there any
              reasons previously not mentioned? If so please explain them here:
            </p>
            <textarea
              className="block w-full p-3 shadow-sm border-slate-300 border rounded-md h-[200px] text-lg"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>
              </form>
              <div className="space-y-2">
                  <h3>
                      Please state how much you know about the
                      following topic:
                  </h3>
                  <h3 className="p-4 bg-slate-200 rounded-md">
                      {queries[topic]["topic"]}
                  </h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                      <LikertScale
                          key={question?.topic}
                          name={question?.topic}
                          minLabel="No knowledge at all"
                          maxLabel="Highly proficient"
                          numButtons={7}
                          selected={knowledgepost}
                          onChange={(e) => setKnowledge(parseInt(e.target.value))}
                      />
                  </div>
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
