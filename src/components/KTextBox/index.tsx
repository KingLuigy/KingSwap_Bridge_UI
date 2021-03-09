import React from "react";
import { Props } from "./props";
import {
  KingTextField,
  KingTextBox,
  StyledTitle,
  StyledLabel,
  StyledInputContainer,
  StyledSelect,
} from "./styles";

const KTextBox: React.FC<Props> = (props) => {
  const {
    label,
    rightLabel,
    value,
    disabled,
    selectedValue,
    onChange,
    onSelectedValueChange,
    renderMenuItem,
  } = props;

  // ======================= VIEWS
  return (
    <KingTextBox>
      <StyledTitle>
        <StyledLabel>{label}</StyledLabel>
        {rightLabel && (
          <StyledLabel className="rightlabel">{rightLabel}</StyledLabel>
        )}
      </StyledTitle>
      <StyledInputContainer>
        <KingTextField
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          disabled={disabled || false}
        />
        <StyledSelect
          value={selectedValue}
          disabled={disabled || false}
          onChange={(e) => onSelectedValueChange(e.target.value as string)}
        >
          {renderMenuItem()}
        </StyledSelect>
      </StyledInputContainer>
    </KingTextBox>
  );
};

export default KTextBox;
