function throttle<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastExecTime = 0;

  return function (this: unknown, ...args: Parameters<T>): void {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (timeSinceLastExec >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    } else if (!timeoutId) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this;
      const savedArgs = args;

      timeoutId = setTimeout(() => {
        func.apply(context, savedArgs);
        lastExecTime = Date.now();
        timeoutId = undefined;
      }, delay - timeSinceLastExec);
    }
  } as T;
}

export default throttle;
