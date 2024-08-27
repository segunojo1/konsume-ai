// Debounce function to limit the rate of function execution
export const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };