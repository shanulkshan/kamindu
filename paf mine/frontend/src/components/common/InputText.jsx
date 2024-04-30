import * as React from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";

const Input = React.forwardRef(function CustomInput(props, ref) {
  return (
    <BaseInput
      slots={{
        root: RootDiv,
        input: "input",
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function InputMultiline() {
  return <Input aria-label="Demo input" multiline placeholder="Note…" />;
}

const RootDiv = styled("div")`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled("textarea")(
  ({ theme }) => `
  width: 160px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 200;
  padding: 8px 12px;
  border-radius: 5px;
  color: white;
  background: #050412;


  
  }


`
);
