const ed25519Prefix = 'ed25519:'

// Normalize a host public key entered by the user. Copying a key by
// double-clicking it skips the `ed25519:` prefix, so implicitly add it when the
// user provides a bare key.
export function normalizePublicKey(value: string): string {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed.startsWith(ed25519Prefix)) {
    return trimmed
  }
  return `${ed25519Prefix}${trimmed}`
}
