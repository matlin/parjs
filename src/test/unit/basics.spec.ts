import { ParjsFailure, ResultKind, ParjsSuccess } from "../../lib/internal/result";
import { expectFailure } from "../helpers/custom-matchers";
import { anyChar } from "../../lib/internal/parsers";

describe("basics: anyChar example", () => {
    const parser = anyChar();
    const successInput = "a";
    const tooMuchInput = "ab";
    const failInput = "";
    const uniqueState = {};
    it("single char input success", () => {
        parser.parse(successInput, uniqueState) as ParjsSuccess<string>;
    });
    it("empty input failure", () => {
        const result = parser.parse(failInput, uniqueState) as ParjsFailure;
        expectFailure(result, ResultKind.SoftFail);
    });

    it("fails on too much input", () => {
        const result = parser.parse(tooMuchInput);
        expectFailure(result, ResultKind.SoftFail);
    });

    describe("resolve", () => {
        it("throws", () => {
            expect(() => parser.parse("").value).toThrow();
        });
        it("doesn't throw", () => {
            expect(parser.parse("a").value).toBe("a");
        });
    });

    describe("non-string inputs", () => {
        it("throws on null, undefined", () => {
            expect(() => parser.parse(null as any)).toThrow();
            expect(() => parser.parse(undefined as any)).toThrow();
        });
        it("throws on non-string", () => {
            expect(() => parser.parse(5 as any)).toThrow();
        });
    });

    describe("expects", () => {
        it("is correct", () => {
            const base = anyChar().expects("a character");
            const parser = anyChar().expects("a character of some sort");
            expect((parser as any).expecting).toBe("a character of some sort");
            expect((base as any).expecting).toBe("a character");
        });
    });
});
