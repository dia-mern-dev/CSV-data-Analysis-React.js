import React, { useRef } from "react";
import ReactSelect, { ActionMeta, MultiValue } from "react-select";

import { ISelectOption } from "../../../utils/types";

type Props = {
  options: ISelectOption[];
  selectedValue: ISelectOption[];
  setSelectedValue: Function;
  className: string;
  label: string;
};

export const MultiSelect: React.FC<Props> = ({
  options,
  selectedValue,
  className = "",
  setSelectedValue = () => {},
  label,
}) => {
  const valueRef = useRef(selectedValue);
  valueRef.current = selectedValue;

  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: label,
  };

  const isSelectAllSelected = () => valueRef.current.length === options.length;

  const isOptionSelected = (option: ISelectOption) =>
    valueRef.current.some((value: ISelectOption) => value.value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...options];

  const getValue = () => (isSelectAllSelected() ? [selectAllOption] : selectedValue);

  const onChange = (newValue: MultiValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option?.value === selectAllOption.value) {
      setSelectedValue(options, actionMeta);
    } else if (
      (action === "deselect-option" && option?.value === selectAllOption.value) ||
      (action === "remove-value" && removedValue.value === selectAllOption.value)
    ) {
      setSelectedValue([], actionMeta);
    } else if (actionMeta.action === "deselect-option" && isSelectAllSelected()) {
      setSelectedValue(
        options.filter((value) => value.value !== option?.value),
        actionMeta
      );
    } else {
      setSelectedValue(newValue || [], actionMeta);
    }
  };

  return (
    <ReactSelect
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      isMulti
      className={className}
    />
  );
};
