import React from "react";

export interface Props {
  label: string;
  value: string;
  selectedValue: string;
  disabled?: boolean;
  onChange(e: string): void;
  onSelectedValueChange(e: string): void;
  renderMenuItem(): React.ReactNode;
}
