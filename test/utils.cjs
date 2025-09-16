/**
 * @type {() => [(event: MediaQueryListEvent) => void, MediaQueryListEvent[]]}
 */
exports.mock = () => {
  /**
   * @type MediaQueryListEvent[]
   */
  const calls = [];
  return [
    (event) => {
      calls.push(event);
    },
    calls,
  ];
};
