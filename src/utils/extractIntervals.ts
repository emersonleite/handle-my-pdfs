import { IPageInterval } from 'src/interfaces/IPageInterval';

export function extractIntervals(expression: string): IPageInterval[] {
  const elements: string[] = expression.split(';');

  const intervals: IPageInterval[] = [];

  for (const element of elements) {
    if (element.includes('-')) {
      const interval: string[] = element.split('-');

      const start: number = parseInt(interval[0]);

      const end: number = parseInt(interval[1]);

      if (!isNaN(start) && !isNaN(end)) {
        intervals.push({ start, end });
      }
    } else {
      const value: number = parseInt(element);

      if (!isNaN(value)) {
        intervals.push({ start: value, end: value });
      }
    }
  }

  return intervals;
}
