const regexRegex = /^\/?(.*?)(?:\/([gsiu])?)?$/;

export function strToRegex(str: string): RegExp {
  const match = str.match(regexRegex);
  if (match) {
    return new RegExp(match[1], match[2] || "");
  } else {
    return new RegExp(str);
  }
}
