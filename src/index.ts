import { Component, VxFunc } from "./types";
import { filterOverrides, generateClasses, mergeProps } from "./utils";

export function vx(component: Component): VxFunc {
  
  const [base, variants] = mergeProps(
    component.base,
    component.variants || {},
    component.extends,
  );

  let defaultVariants = component.extends
    ? { ...component.extends.defaultVariants, ...component.defaultVariants }
    : component.defaultVariants || {};

  const fn: VxFunc = (
    variantOverrides: { [key: string]: string } = {}
  ) => {
    const filteredOverrides = filterOverrides(variantOverrides);
    const finalVariants = { ...defaultVariants, ...filteredOverrides };
    
    return generateClasses(base, variants, finalVariants);
  };

  fn.component = component;
  return fn;
}
