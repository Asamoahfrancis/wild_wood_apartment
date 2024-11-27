import { AsyncAdd } from "../TestStaff/math";

test("Should add two numbers in async", async () => {
  const results = await AsyncAdd(2, 3);
  expect(results).toBe(5);
});

beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});
