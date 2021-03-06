import React from "react";
import { Props } from "./props";
import {
  KingTextField,
  KingTextBox,
  StyledContent,
  StyledLabel,
  StyledInputContainer,
  StyledSelect,
} from "./styles";

const KTextBox: React.FC<Props> = (props) => {
  const {
    label,
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
      <StyledContent>
        <StyledLabel>{label}</StyledLabel>
      </StyledContent>
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
