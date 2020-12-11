import React, { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const filterList = {
  colors: ["red", "black", "yellow", "white", "violet", "grey"],
  brands: ["nike", "vans", "adidas", "jordan"],
  category: ["men", "women"],
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  flexAcc: { display: "flex", flexDirection: "column" },
}));
const FilterProducts = (props) => {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [expanded, setExpanded] = useState({
    category: true,
    colors: true,
    brands: true,
  });

  return (
    <div style={{ width: "200px", marginTop: "15px" }}>
      <Accordion
        expanded={expanded.category}
        onChange={() =>
          setExpanded({ ...expanded, category: !expanded.category })
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Category</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.flexAcc}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={props.value}
            onChange={props.handleChange}
          >
            {filterList.category.map((el, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={el}
                  control={<Radio />}
                  label={`${el} (${
                    state.products.filter(
                      (key) => key.category.toLowerCase() === el
                    ).length
                  })`}
                />
              );
            })}
            <FormControlLabel
              value="all"
              control={<Radio />}
              label={`All (${state.products.length})`}
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded.colors}
        onChange={() => setExpanded({ ...expanded, colors: !expanded.colors })}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Colors</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.flexAcc}>
          {filterList.colors.map((el, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={props.activeFilter.includes(el)}
                    value={el}
                    onChange={() => props.onFilterChange(el)}
                    name={el}
                  />
                }
                label={`${el} (${
                  props.products.filter((key) => key.color.toLowerCase() === el)
                    .length
                })`}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.brands}
        onChange={() => setExpanded({ ...expanded, brands: !expanded.brands })}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Colors</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.flexAcc}>
          {filterList.brands.map((el, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={props.activeFilter.includes(el)}
                    value={el}
                    onChange={() => props.onFilterChange(el)}
                    name={el}
                  />
                }
                label={`${el} (${
                  props.products.filter((key) => key.brand.toLowerCase() === el)
                    .length
                })`}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterProducts;
