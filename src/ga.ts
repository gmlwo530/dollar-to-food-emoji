import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GA_ID as string);

export const clickAnalytics = (eventName: string, optionName: string = "") => {
  if (optionName !== "") {
    ReactGA.event({
      category: "Click",
      action: eventName,
      label: optionName,
    });
  } else {
    ReactGA.event({
      category: "Click",
      action: eventName,
    });
  }
};

export const viewAnalytics = (eventName: string, optionName: string = "") => {
  if (optionName !== "") {
    ReactGA.event({
      category: "View",
      action: eventName,
      label: optionName,
    });
  } else {
    ReactGA.event({
      category: "View",
      action: eventName,
    });
  }
};
