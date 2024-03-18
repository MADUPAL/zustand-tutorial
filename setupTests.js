import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
//https://stackoverflow.com/questions/77655616/expect-extend-doesnt-work-typeerror-cannot-convert-undefined-or-null-to-objec
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

expect.extend(matchers);

afterEach(cleanup);
