const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  //@ts-ignore
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;
