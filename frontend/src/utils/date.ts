export const DateformattedDateTime = (
  dateObj: Date,
  dateOptions?: Intl.DateTimeFormatOptions,
  timeFormatOptions?: Intl.DateTimeFormatOptions
) => {
  const now = new Date();
  const isToday = dateObj.toDateString() === now.toDateString();
  const isThisYear = dateObj.getFullYear() === now.getFullYear();

  if (isToday) {
    return `Today, ${dateObj.toLocaleTimeString(undefined, timeFormatOptions)}`;
  }

  const options: Intl.DateTimeFormatOptions = {
    ...dateOptions,
    year: isThisYear ? undefined : 'numeric',
  };

  return dateObj.toLocaleString(undefined, options);
};

export const DateformattedDateFull = (dateObj: Date, dateOptions?: Intl.DateTimeFormatOptions) => {
  return dateObj.toLocaleString(undefined, dateOptions);
};

export const DateTimeAgo = (
  dateObj: Date,
  dateOptions?: Intl.DateTimeFormatOptions,
  timeFormatOptions?: Intl.DateTimeFormatOptions
) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return DateformattedDateTime(dateObj, dateOptions, timeFormatOptions);
};
