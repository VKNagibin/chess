declare global {
  interface String {
    /**
     * Преобразует первую букву строки в верхний регистр
     * @returns Строка с первой заглавной буквой
     */
    capitalize(): string;
  }
}

export {};

export const overrideString = () => {
  Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
  });
};
