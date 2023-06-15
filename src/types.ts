export interface Variants {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Component {
  base: string;
  variants?: Variants;
  defaultVariants?: { [key: string]: string };
  extends?: Component;
}

export interface VxFunc {
  (variantOverrides?: { [key: string]: string }): string;
  component: Component;
}
