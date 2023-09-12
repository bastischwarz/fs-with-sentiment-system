import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { preventBackButton } from "../../lib/prevent-back-button";
import { createDemographic } from "../api";
import { Button } from "../components/Button";
import { Head } from "../components/Head";
import { Input } from "../components/Input";
import { PageContainer } from "../components/PageContainer";
import { Select } from "../components/Select";

interface Demographic {
  age: string;
  gender: string;
  education: string;
  occupation: string;
}

const PostStudy: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [demographic, setDemographic] = useState<Demographic>({
    age: "",
    gender: "",
    education: "",
    occupation: "",
  });

  const router = useRouter();

  // Get Cookies
  const userId = Cookies.get("userId");

  preventBackButton();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const [res] = await Promise.allSettled([
        createDemographic({ ...demographic, userId }),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      router.push("/thank-you");
    } catch (e) {}

    setIsSubmitting(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDemographic({ ...demographic, [name]: value });
  };

  return (
    <>
      <Head />
      <PageContainer className="space-y-8">
        <h2>Post-Study Questionnaire</h2>
        <p>
          Thank you for your work so far. For the last step, all you have to do
          is answer some question pretaining to your personal demographics.
        </p>
        <form className="space-y-4" onSubmit={submitForm}>
          <Input
            required
            type="number"
            name="age"
            min={18}
            max={100}
            placeholder="e.g. 18"
            label="How old are you?"
            value={demographic.age}
            onChange={changeHandler}
          />
          <Select
            required
            name="gender"
            label="What gender do you identify with?"
            value={demographic.gender}
            onChange={changeHandler}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="diverse">Diverse</option>
            <option value="other">Other</option>
          </Select>
          <Select
            required
            name="education"
            label="What is your highest level of education?"
            value={demographic.education}
            onChange={changeHandler}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="less than high school">
              Less than a high school diploma
            </option>
            <option value="high school">
              High school degree or equivalent
            </option>
            <option value="bachelor">Bachelor's degree or equivalent</option>
            <option value="master">Master's degree or equivalent</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </Select>
          <Input
            required
            type="text"
            name="occupation"
            max={100}
            placeholder="e.g. Student"
            label="What's your current occupation? (e.g.: if you are currently studying
              at a university insert 'Student')"
            value={demographic.occupation}
            onChange={changeHandler}
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

export default PostStudy;
