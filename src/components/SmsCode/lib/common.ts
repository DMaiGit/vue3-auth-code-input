/**
 * @description 防抖函数，该函数延迟调用 `fn` 直到等待 `delay` 毫秒后自上次去抖动函数被调用。
 *              返回的去抖动函数附带一个取消方法，用于取消延迟的 `fn` 调用，以及一个立即调用的刷新方法。
 *              对于实现应该仅在输入停止后才发生的行为非常有用，例如：文本输入、窗口调整大小事件、滚动事件等。
 *
 * @param {T} fn 需要去抖动的函数。
 * @param {number} delay 延迟执行的时间，以毫秒为单位。
 * @return {(...args: Parameters<T>) => void} 一个新的去抖动函数。
 */
export function _debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const result = fn.apply(this, args);
      if (result instanceof Promise) {
        result.catch(console.error); // 捕获异步执行中的错误
      }
    }, delay);
  };
}
