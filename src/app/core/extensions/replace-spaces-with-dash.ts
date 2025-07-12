export {};
declare global {
  interface String {
    replaceSpacesWithDash(): string;
    toKebabCase(): string;
  }
}

String.prototype.replaceSpacesWithDash = function (): string {
  return this.replace(/\s+/g, '-');
};

String.prototype.toKebabCase = function (): string {
  return this.trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[_]/g, '-') // Replace underscores with dashes
    .replace(/[^\w\-]/g, '') // Remove special characters except word chars and dashes
    .replace(/--+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
};
