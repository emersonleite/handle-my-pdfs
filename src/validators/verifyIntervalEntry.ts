export function verifyIntervalEntry(intervalContent: string): boolean {
  const elements: string[] = intervalContent.split(';');

  const i = [];

  for (const element of elements) {
    console.log(elements);

    if (element.includes('-')) {
      const interval: string[] = element.split('-');
      if (interval.length !== 2) {
        return false;
      }
      const initialValue: string = interval[0];
      const endValue: string = interval[1];

      /* i.push({ i: initialValue, e: endValue });

      i.forEach((item) => {
        console.log('i');
        if (initialValue >= item.i && initialValue <= item.e) {
          console.log(false);
          return false;
        }
      });
      console.log(i); */

      if (!initialValue.match(/^\d+$/) || !endValue.match(/^\d+$/)) {
        return false;
      }
      if (parseInt(initialValue) >= parseInt(endValue)) {
        return false;
      }
    } else {
      if (!element.match(/^\d+$/)) {
        return false;
      }
    }
  }

  return true;
}
