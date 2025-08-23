import { MOCK_API_DELAY } from "./constants";

export function delay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
}
