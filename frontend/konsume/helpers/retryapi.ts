// Retry function with exponential backoff
export const retry = async (fn: Function, retries = 6, delay = 3000) => {
    try {
      await fn();
    } catch (error) {
      if (retries > 1) {
        setTimeout(() => {
          retry(fn, retries - 1, delay * 2);
        }, delay);
      } else {
        console.error("Max retries reached:", error);
      }
    }
  };