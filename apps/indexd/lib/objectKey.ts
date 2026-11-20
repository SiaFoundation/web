const objectKeyPattern = /^[0-9a-f]{64}$/

// Object keys are 32 byte hashes, encoded as hex.
export function normalizeObjectKey(value: string): string {
  return value.trim().toLowerCase()
}

export const objectKeyValidation = {
  required: 'required',
  validate: {
    format: (value: string) =>
      objectKeyPattern.test(normalizeObjectKey(value)) ||
      'must be a 64 character hex key',
  },
}
