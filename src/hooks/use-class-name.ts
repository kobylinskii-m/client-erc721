interface IClassNameFC {
  (...classes: (string | undefined | false)[]): string;
  (classes: (string | undefined | false)[]): string;
}

export function useClassName(): IClassNameFC {
  return (...args: any[]) => {
    const classes = Array.isArray(args[0]) ? args[0] : args;
    return classes.filter((css) => !!css).join(' ');
  };
}
