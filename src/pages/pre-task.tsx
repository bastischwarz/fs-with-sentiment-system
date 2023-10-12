import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { preventBackButton } from "../../lib/prevent-back-button";
import { getRandomInt } from "../../lib/rand-int";
import { createPreTaskQuestion } from "../api";
import { Button, Head, LikertScale, PageContainer } from "../components";
//new to ask participants for their knowledge in hmtl part
const questions = [
  {
    topic: "schoolUniforms",
    question: "School uniform?",
    value: null,
  },
  {
    topic: "propertyRights",
    question: "Intellectual Property Rights",
    value: null,
  },
  {
    topic: "obesity",
    question: "Obesity",
    value: null,
  },
];

const PreTask: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const [snippetId, setSnippetId] = useState<number>();
  const [knowledge, setKnowledge] = useState<number>();
  const combination = String(Cookies.get("combination"));
  const userId = Cookies.get("userId");
  const stance = combination.split("-")[0];
  const topicCombi = combination.split("-")[1];
  const logic = combination.split("-")[2];
  const router = useRouter();
  //new
  console.log(combination);
  
  const question = questions.filter((q) => q.topic === topicCombi)[0];

  preventBackButton();

  const { data: queries, error: queryError } = useSWR(
    () => `/api/queries`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: snippets, error: snippetError } = useSWR(
    () => `/api/snippets`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // useEffect(() => {
  //   if (snippets) {
  //     const { featuredSnippets } = snippets;

  //     const randomIndex = getRandomInt(0, 1);
  //     const featuredSnippet = (featuredSnippets?.filter(
  //       (snippet) =>
  //         (stance === "pos" ? snippet.stance > 0 : snippet.stance < 0) &&
  //         snippet.topic === topic
  //     ))[randomIndex];

  //     Cookies.set("snippetId", featuredSnippet?.id);
  //     setSnippetId(featuredSnippet?.id);
  //   }
  // }, [snippets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { featuredSnippets } = snippets;

    //const randomIndex = getRandomInt(0, 1);
    const featuredSnippet = (featuredSnippets?.filter(
      (snippet) =>
        (stance === "pos" ? snippet.stance > 0 : snippet.stance < 0) &&
        snippet.topic === topicCombi && snippet.logic === logic
    ));
    console.log(topicCombi);
    console.log(stance);
    console.log(logic);
    console.log(featuredSnippet?.id);
    //[randomIndex]
    //neu hardcode
    //const featuredSnippetId = "935"
    Cookies.set("snippetId", featuredSnippet?.id);

    /*if(logic === "neutral" && stance === "pos" && topic === "schoolUniforms"){
     Cookies.set("snippetId", featuredSnippet?.id);}
    else if(logic === "postitive") {
     Cookies.set("snippetId", featuredSnippet?.id);}
    else {
     Cookies.set("snippetId", featuredSnippet?.id);  
    }*/

    // Replace new lines of explanation with actual <br> tags
    const explanationWithBreaks = explanation.replace(/\n/g, "<br>");

    const data = {
      userId,
      topicCombi,
      snippetId: featuredSnippet?.id,
      explanation: explanationWithBreaks,
      knowledge,
    };

    try {
      await createPreTaskQuestion(data);
      router.push("/serp");
    } catch (e) {
      console.log(e);
    }

    setIsSubmitting(false);
  };

  if (!queries || !snippets) return <div>Loading...</div>;
  if (queryError) return <div>Error: {queryError.message}</div>;
  if (snippetError) return <div>Error: {snippetError.message}</div>;

  return (
    <>
      <Head />
          <PageContainer className="space-y-8">
          <h2>Pre-Task Questionnaire</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
           <h3>
             Please state how much you know about the
             following topic:
           </h3>
           <h3 className="p-4 bg-slate-200 rounded-md">
            {queries[topicCombi]["topic"]}
           </h3>
          </div>
           <div className="space-y-2">
            <LikertScale
            key={question?.topic}
            name={question?.topic}
            minLabel="No knowledge at all"
            maxLabel="Highly proficient"
            numButtons={7}
            selected={knowledge}
            onChange={(e) => setKnowledge(parseInt(e.target.value))}
            />
           </div>
         <p>
          Think of what you already know about "{queries[topicCombi]["topic"]}" and list as many phrases or words as you can that come to your mind. 
          For example, if you know about side effects please do not just type the phrase "side effects", but rather list the specific side effects you know about. 
          Please list only one word or phrase per line and end each line with a comma.
          <br />
          (It's ok if you don't know anything about the subject - you are not
          forced to write anything.)
         </p>
          <textarea
           className="block w-full p-3 shadow-sm border-slate-300 border rounded-md h-[200px] text-lg"
           value={explanation}
           onChange={(e) => setExplanation(e.target.value)}
          />
           <Button isLoading={isSubmitting} disabled={isSubmitting}>
             Continue
           </Button>
         </form>
      </PageContainer>
    </>
  );
};

export default PreTask;
