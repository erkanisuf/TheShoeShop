import React, { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core/";

const filterList = {
  colors: ["red", "black", "yellow", "white", "violet", "grey"],
  brands: ["nike", "vans", "adidas", "jordan"],
  category: ["men", "women"],
};

const FilterProducts = (props) => {
  const { state } = useContext(MyContext);

  return (
    <div style={{ width: "1000px" }}>
      <p>Category</p>
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
      <p>COlors</p>
      {filterList.colors.map((el, index) => {
        return (
          <div key={index}>
            <FormControlLabel
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
          </div>
        );
      })}
      <p>Brands</p>
      {filterList.brands.map((el, index) => {
        return (
          <div key={index}>
            <FormControlLabel
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
          </div>
        );
      })}
    </div>
  );
};

export default FilterProducts;
