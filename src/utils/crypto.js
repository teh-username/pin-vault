import forge from 'node-forge';

export const hashString = string => {
  const md = forge.md.sha256.create();
  return md
    .update(string)
    .digest()
    .toHex();
};
