import * as React from "react";
import { Box, styled } from "@mui/system";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: InputRoot,
        input: InputElement,
        incrementButton: Button,
        decrementButton: Button,
      }}
      slotProps={{
        incrementButton: {
          children: <span className="arrow">▴</span>,
        },
        decrementButton: {
          children: <span className="arrow">▾</span>,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputAdornments({ unit }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <NumberInput endAdornment={<InputAdornment>{unit}</InputAdornment>} />
    </Box>
  );
}

const InputAdornment = styled("div")(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: white;
`
);

const blue = {
  100: "#DAECFF",
  200: "#B6DAFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;

  background: black;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: grid;
  grid-template-columns: auto 1fr auto 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const InputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-row: 1/3;
  color: white;
  background: inherit;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  outline: 0;
  width: 30px;
 
`
);

const Button = styled("button")(
  ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 20px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    color: #FB5B21; // Change the text color to red
    border: 0;
    background: #FB5B21; // Change the background color to red
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    margin: 1px 0;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
     
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 4/5;
      grid-row: 1/2;
      
      background: #FB5B21; // Change the background color to red
      color: black; // Change the text color to white
  
      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
      
      }
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 4/5;
      grid-row: 2/3;
    
      background: #FB5B21; // Change the background color to red
      color: black; // Change the text color to white
  
      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
      
      }
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  `
);
