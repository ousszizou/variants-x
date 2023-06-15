import { Component, Variants } from "./types";

export const mergeProps = (
  base: string,
  variants: Variants,
  extendedComponent?: Component,
  classFormat: RegExp = /^([a-z@]+:)?[a-z\d-]+$/i
): [string, Variants] => {
  if (extendedComponent) {
    const extendedBaseClasses = extendedComponent.base.split(" ");
    const baseClasses = base.split(" ");

    const filteredExtendedBaseClasses = extendedBaseClasses.filter(
      (extendedClass) => {
        const isConflicting = baseClasses.some((baseClass) => {
          return (
            classFormat.test(extendedClass) &&
            extendedClass.split("-")[0] === baseClass.split("-")[0]
          );
        });
        return !isConflicting;
      }
    );

    base = [...baseClasses, ...filteredExtendedBaseClasses].join(" ");

    variants = {
      ...extendedComponent.variants,
      ...Object.entries(variants).reduce((merged, [key, value]) => {
        merged[key] = { ...merged[key], ...value };
        return merged;
      }, {} as Variants),
    };
  }

  return [base, variants];
};

export const filterOverrides = (overrides: { [key: string]: string | undefined }): { [key: string]: string } => {
  return Object.fromEntries(
    Object.entries(overrides).filter(
      ([, value]) => value !== undefined && value !== "undefined"
    )
  ) as { [key: string]: string };
}

export const generateClasses = (
  base: string,
  variants: Variants,
  finalVariants: { [key: string]: string }
): string => {
  let classes = base;

  for (let key in finalVariants) {
    let variant = finalVariants[key];
    if (variant in variants[key]) {
      classes += ` ${variants[key][variant]}`;
    }
  }

  return classes;
};
