export {};
declare global {
  interface String {
    replaceSpacesWithDash(): string;
  }
}

String.prototype.replaceSpacesWithDash = function (): string {
  return this.replace(/\s+/g, '-');
};
