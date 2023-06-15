import { expectTypeOf, test, describe } from "vitest";
import { Component, Variants } from "../src/types";

describe("types", () => {
  test("Variants", () => {
    const variants: Variants = {
      size: {
        small: "button--small",
        large: "button--large",
      },
    };
    expectTypeOf(variants).toMatchTypeOf<Variants>();
  });

  test("Component", () => {
    const component: Component = {
      base: "button",
      variants: {
        size: {
          small: "button--small",
          large: "button--large",
        },
      },
      defaultVariants: {
        size: "large",
      },
    };
    expectTypeOf(component).toMatchTypeOf<Component>();
  });
});
