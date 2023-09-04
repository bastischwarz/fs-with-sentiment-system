import NextHead from "next/head";
import { Header } from ".";

export const Head = () => {
  return (
    <>
      <NextHead>
        <title>Study | FS</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <Header />
    </>
  );
};
