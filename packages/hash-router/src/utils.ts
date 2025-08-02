export function getCurrentURL() {
  return new URL(window.location.hash.slice(1), window.location.origin);
}
