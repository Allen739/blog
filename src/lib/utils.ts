import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const DATE_ONLY_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

type ParsedDateInput = {
  date: Date;
  isDateOnly: boolean;
};

const LONG_DATE_LOCAL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const LONG_DATE_UTC_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const SHORT_DATE_LOCAL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const SHORT_DATE_UTC_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function parseDateInput(value: string): ParsedDateInput | null {
  const trimmedValue = value.trim();
  const dateOnlyMatch = DATE_ONLY_REGEX.exec(trimmedValue);

  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]);
    const day = Number(dateOnlyMatch[3]);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    if (
      parsedDate.getUTCFullYear() !== year ||
      parsedDate.getUTCMonth() !== month - 1 ||
      parsedDate.getUTCDate() !== day
    ) {
      return null;
    }

    return {
      date: parsedDate,
      isDateOnly: true,
    };
  }

  const parsedDate = new Date(trimmedValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return {
    date: parsedDate,
    isDateOnly: false,
  };
}

function getDateKeyFromLocalCalendar(date: Date) {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_IN_DAY,
  );
}

function getDateKeyFromUTCDate(date: Date) {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) /
      MS_IN_DAY,
  );
}

function getDayDifferenceFromToday(parsed: ParsedDateInput) {
  const todayDateKey = getDateKeyFromLocalCalendar(new Date());
  const targetDateKey = parsed.isDateOnly
    ? getDateKeyFromUTCDate(parsed.date)
    : getDateKeyFromLocalCalendar(parsed.date);

  return targetDateKey - todayDateKey;
}

function formatLongAbsoluteDate(parsed: ParsedDateInput) {
  return parsed.isDateOnly
    ? LONG_DATE_UTC_FORMATTER.format(parsed.date)
    : LONG_DATE_LOCAL_FORMATTER.format(parsed.date);
}

export function formatDateShort(value: string) {
  const parsed = parseDateInput(value);
  if (!parsed) {
    return value;
  }

  return parsed.isDateOnly
    ? SHORT_DATE_UTC_FORMATTER.format(parsed.date)
    : SHORT_DATE_LOCAL_FORMATTER.format(parsed.date);
}

function getDateSortKey(value: string) {
  const parsed = parseDateInput(value);
  if (!parsed) {
    return Number.NEGATIVE_INFINITY;
  }

  if (parsed.isDateOnly) {
    return Date.UTC(
      parsed.date.getUTCFullYear(),
      parsed.date.getUTCMonth(),
      parsed.date.getUTCDate(),
    );
  }

  return parsed.date.getTime();
}

export function compareDateStringsDesc(a: string, b: string) {
  return getDateSortKey(b) - getDateSortKey(a);
}

export function formatDate(value: string) {
  const parsed = parseDateInput(value);
  if (!parsed) {
    return value;
  }

  const fullDate = formatLongAbsoluteDate(parsed);
  const dayDifference = getDayDifferenceFromToday(parsed);

  if (dayDifference > 0) {
    return fullDate;
  }

  if (dayDifference === 0) {
    return "Today";
  }

  const daysAgo = Math.abs(dayDifference);

  if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  }

  if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  }

  if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  }

  const yearsAgo = Math.floor(daysAgo / 365);
  return `${fullDate} (${yearsAgo}y ago)`;
}
