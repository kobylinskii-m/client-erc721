import * as React from "react";
import { NullFunction } from "../../functools/null-function";
import { BaseInput, BaseInputPropsTypes } from "./base-input";

export type InputNumberPropsTypes = {
  onChangeToNumber?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void | Promise<void>;
  defaultValue?: number;
} & BaseInputPropsTypes;

export const InputNumber: React.FC<InputNumberPropsTypes> = ({
  onChangeToNumber = NullFunction,
  defaultValue,
  ...rest
}) => {
  const [value, setValue] = React.useState<string | undefined>(
    defaultValue?.toString() ?? undefined
  );

  const setValueWrapper = React.useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      value: string | undefined
    ) => {
      if (typeof value !== "undefined") {
        setValue(value);
        await onChangeToNumber(e, +value);
      }
    },
    [onChangeToNumber]
  );

  return (
    <BaseInput
      defaultValue={defaultValue}
      onChange={(e) => {
        e.preventDefault();
        const value = e.target.value.replace(",", ".");
        //Проверка на то, что поставлена точка в конце
        if (/(^[\d]+\.$)/.test(value)) {
          setValueWrapper(e, value);
        } else if (value.length > 0) {
          //Проверка было ли введено значение
          if (+e.target.value >= 0) {
            // Проверка число это или нет
            setValueWrapper(e, (+value).toString());
          }
        } else {
          setValueWrapper(e, "");
        }
      }}
      onBlur={(e) => {
        // Когда поле теряет фокус и input пустой ставим 0
        if (typeof value !== "undefined" && value.length === 0) {
          setValueWrapper(e, "");
        }
      }}
      {...(rest as any)}
    />
  );
};
