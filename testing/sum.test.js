const sum = require("./sum");

test("Returns sum of 1 and 2", () => {
    expect(sum(1,2)).toBe(3);
});
