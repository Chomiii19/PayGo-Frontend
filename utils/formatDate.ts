const formatDate = (timestamp: string, includeTime: boolean = true) => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (includeTime) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.hour12 = true;
  }

  //@ts-ignore
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;
