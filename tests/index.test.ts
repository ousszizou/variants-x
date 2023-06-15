import { test, describe } from "vitest";
import { vx } from "../src";
import { Component } from "../src/types";

describe("vx", () => {
  test("should apply default variants when no overrides are provided", ({ expect }) => {
    const button: Component = {
      base: "button",
      variants: {
        size: {
          sm: "button--sm",
          lg: "button--lg",
        },
        color: {
          primary: "button--primary",
          secondary: "button--secondary",
        },
      },
      defaultVariants: {
        size: "lg",
        color: "primary",
      },
    };

    const vxButton = vx(button);
    const classes = vxButton();

    expect(classes.split(" ")).toHaveLength(3);
    expect(classes.split(" ")).toEqual(expect.arrayContaining(["button", "button--lg", "button--primary"]));
  });

  test("should override default variant with provided variant", ({ expect }) => {
    const button: Component = {
      base: "button",
      variants: {
        size: {
          sm: "button--sm",
          lg: "button--lg",
        },
        color: {
          primary: "button--primary",
          secondary: "button--secondary",
        },
      },
      defaultVariants: {
        size: "lg",
        color: "primary",
      },
    };

    const vxButton = vx(button);
    const classes = vxButton({ size: "sm" });

    expect(classes.split(" ")).toHaveLength(3);
    expect(classes.split(" ")).toEqual(expect.arrayContaining(["button", "button--sm", "button--primary"]));
  });

  test("should handle component extensions correctly", ({ expect }) => {
    const baseComponent: Component = {
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

    const extendedComponent: Component = {
      base: "button-extended",
      extends: baseComponent,
      variants: {
        color: {
          blue: "button--blue",
          red: "button--red",
        },
      },
      defaultVariants: {
        color: "red",
      },
    };

    const vxExtendedButton = vx(extendedComponent);
    const classes = vxExtendedButton();

    expect(classes.split(" ")).toHaveLength(3);
    expect(classes.split(" ")).toEqual(expect.arrayContaining(["button-extended", "button--large", "button--red"]));
  });
});
