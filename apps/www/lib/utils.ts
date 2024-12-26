import { type ClassValue, clsx } from "clsx";
import prettyMilliseconds from "pretty-ms";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLabel(text: string) {
  let flag = false;
  const sentence = text.split("").reduce((acc, word) => {
    if (word === "&" || word === ";") {
      flag = !flag;
      return acc;
    }
    if (flag === false) return acc + word;
    return acc;
  });
  return sentence;
}

export function formatDuration(duration: string) {
  const durationInSeconds = Number(duration);
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  return [minutes, seconds]
    .map((val) => {
      if (val < 10) {
        return `0${val}`;
      } else return val;
    })
    .join(":");
}

export function customSplit(payload: string, deLimitingCharacter: string) {
  return payload
    .split(deLimitingCharacter)
    .map((data) => data.trim())
    .filter((data) => data !== "");
}

export function prettySeconds(seconds: number, colonNotation = false) {
  return prettyMilliseconds(seconds * 1000, { colonNotation });
}
