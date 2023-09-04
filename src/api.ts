import {
  PostTaskQuestion,
  PreStudyQuestion,
  PreTaskQuestion,
  User,
} from "@prisma/client";
import axios from "axios";
import { getRandomInt } from "../lib/rand-int";

const routes = {
  users: "/api/users",
  preStudyQuestions: "/api/prestudyquestions",
  preTaskQuestions: "/api/pretaskquestions",
  postTaskQuestions: "/api/posttaskquestions",
  pageVisits: "/api/pagevisits",
  demographics: "/api/demographics",
};

/**
 * Creates a new user in the database.
 * @param prolificId The prolific id of the user.
 * @returns The user that was created.
 */
export const createUser = async (
  prolificId: string,
  stance: string
): Promise<User> => {
  const res = await axios.post(routes.users, { prolificId, stance });

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create user");
  }
};

/**
 * Creates a new entry for the responses to the pre-study questions.
 * @param preStudyQuestion The pre-study question that the user answered.
 * @returns The pre-study question that was created.
 */
export const createPreStudyQuestions = async (
  preStudyQuestions
): Promise<void> => {
  const res = await axios.post(routes.preStudyQuestions, preStudyQuestions);

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create pre-study question");
  }
};

/**
 * Creates a new entry for the responses to the pre-task questions.
 * @param preTaskQuestion The pre-task question that the user answered.
 * @returns The pre-task question that was created.
 */
export const createPreTaskQuestion = async (preTaskQuestion): Promise<void> => {
  const res = await axios.post(routes.preTaskQuestions, preTaskQuestion);

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create pre-task question");
  }
};

/**
 * Creates a new entry for the responses to the post-task questions.
 * @param postTaskQuestion The post-task question that the user answered.
 * @returns The post-task question that was created.
 */
export const createPostTaskQuestion = async (
  postTaskQuestion
): Promise<void> => {
  const res = await axios.post(routes.postTaskQuestions, postTaskQuestion);

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create post-task question");
  }
};

/**
 * Creates a new entry when a user visits a page.
 * @param pageVisit The page and additional info the user clicked on.
 * @returns The page visit that was created.
 */
export const createPageVisit = async (pageVisit): Promise<void> => {
  const res = await axios.post(routes.pageVisits, pageVisit);

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create page visit");
  }
};

/**
 * Creates a new entry for the response to the demographic questions.
 * @param demographic The demographic data that the user filled out.
 * @returns The demographic data that was created.
 */
export const createDemographic = async (demographic): Promise<void> => {
  const res = await axios.post(routes.demographics, {
    ...demographic,
    age: parseInt(demographic.age),
  });

  if (res?.status === 201) {
    return res.data;
  } else {
    throw new Error("Failed to create demographic");
  }
};

/**
 *
 * @param userId The id of the user.
 * @param logic The logic that the user got presented in the Featured Snippet.
 * @returns The user that was updated.
 */
export const updateUserLogic = async (userId: string, logic: string) => {
  const res = await axios.post(`${routes.users}/${userId}`, { logic });

  if (res?.status === 200) {
    return res.data;
  } else {
    throw new Error("Failed to update user logic");
  }
};
