import { test, describe } from "vitest";

import { filterOverrides, mergeProps, generateClasses } from "../src/utils";
import { Component, Variants } from "../src/types";

describe("mergeProps", () => {
  test("should return the base and variants of a standalone component when no extended component is provided", ({
    expect,
  }) => {
    const base = "btn-base";
    const variants: Variants = {
      size: {
        lg: "btn-lg",
      },
    };
    const [mergedBase, mergedVariants] = mergeProps(base, variants);

    expect(mergedBase).toBe(base);
    expect(mergedVariants).toEqual(variants);
  });

  test("should correctly resolve conflicts between base and extended classes following Tailwind CSS format (default)", ({
    expect,
  }) => {
    const base = "bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded";
    const variants: Variants = { size: { large: "py-4 px-8" } };
    const extendedComponent: Component = {
      base: "bg-red-500 font-medium hover:bg-red-700 mt-2 py-5 px-6",
      variants: { color: { primary: "text-white" } },
    };

    const [mergedBase, mergedVariants] = mergeProps(
      base,
      variants,
      extendedComponent
    );

    expect(mergedBase.split(" ")).toHaveLength(8);
    expect(mergedBase.split(" ")).toEqual(
      expect.arrayContaining([
        "bg-blue-500",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "py-5",
        "px-4",
        "rounded",
        "mt-2",
      ])
    );
    expect(mergedBase.split(" ")).not.toContain([
      "bg-red-500",
      "hover:bg-red-700",
    ]);
    expect(mergedVariants).toEqual({
      size: { large: "py-4 px-8" },
      color: { primary: "text-white" },
    });
  });
});

describe("filterOverrides", () => {
  test("should return an empty object when the input is an empty object", ({ expect }) => {
    const overrides = {};
    const result = filterOverrides(overrides);
    expect(result).toEqual({});
  });

  test("should filter out entries with undefined values", ({ expect }) => {
    const overrides = {
      prop1: "value1",
      prop2: "undefined",
      prop3: "value3",
      prop4: undefined,
    };
    const result = filterOverrides(overrides);
    expect(result).toEqual({
      prop1: "value1",
      prop3: "value3",
    });
  });

  test("filterOverrides returns an empty object when all properties are 'undefined'", ({ expect }) => {
    const overrides = { prop1: undefined, prop2: "undefined" };
    const result = filterOverrides(overrides);
    expect(result).toEqual({});
  });
});

describe("generateClasses", () => {
  test("should return the base class and any matching variant classes", ({
    expect,
  }) => {
    const base = "button";
    const variants: Variants = {
      size: {
        small: "button--small",
        large: "button--large",
      },
      color: {
        blue: "button--blue",
        red: "button--red",
      },
    };
    const finalVariants = {
      size: "large",
      color: "blue",
    };
    const classes = generateClasses(base, variants, finalVariants);

    expect(classes.split(" ")).toHaveLength(3);
    expect(classes.split(" ")).toEqual(
      expect.arrayContaining(["button", "button--large", "button--blue"])
    );
  });

  test("should return only the base class when the finalVariants object is empty", ({
    expect,
  }) => {
    const base = "button";
    const variants: Variants = {
      size: {
        small: "button--small",
        large: "button--large",
      },
      color: {
        blue: "button--blue",
        red: "button--red",
      },
    };
    const finalVariants = {};
    const classes = generateClasses(base, variants, finalVariants);

    expect(classes).toBe("button");
  });

  test("should ignore unknown variant names", ({ expect }) => {
    const base = "button";
    const variants: Variants = {
      size: {
        small: "button--small",
        large: "button--large",
      },
      color: {
        blue: "button--blue",
        red: "button--red",
      },
    };
    const finalVariants = {
      size: "extra-large",
      color: "green",
    };
    const classes = generateClasses(base, variants, finalVariants);

    expect(classes).toBe("button");
  });
});
