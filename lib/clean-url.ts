export const getCleanURL = (url: string): string => {
  if (url) {
    // Remove last slash on URL if it exists
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    let { protocol, host, pathname } = new URL(url);

    let urlArray = pathname?.split("/");
    return `${protocol}//${host}${urlArray?.splice(0, 4).join(" › ")}`;
  }
};
