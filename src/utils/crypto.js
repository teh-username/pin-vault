import forge from 'node-forge';

export const hashString = string => {
  const md = forge.md.sha256.create();
  return md
    .update(string)
    .digest()
    .toHex();
};

export const generateRandomBytes = (length = 6) => {
  const bytes = forge.random.getBytesSync(8);
  return forge.util.bytesToHex(bytes).substring(0, length);
};
