import React, { useContext, useState, useEffect, useCallback } from "react";
import { MyContext } from "../../Context/Context";
import FilterProducts from "./FilterProducts";
import Product from "./Product";
export const Products = () => {
  const { state } = useContext(MyContext);

  const [products, setProducts] = useState(state.products);
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    setProducts(state.products);
  }, [state.products]);

  const onFilterChange = (filter) => {
    if (filter === "All") {
      setActiveFilter([]);
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        setActiveFilter(newFilter);
      } else {
        setActiveFilter([...activeFilter, filter]);
      }
    }
  };
  const [value, setValue] = useState("all");
  const [numberz, setNumberz] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
    setActiveFilter([]);
  };

  useEffect(() => {
    if (!activeFilter.length) {
      if (value === "all") {
        setProducts(state.products);
        setNumberz(state.products);
      } else if (value === "men") {
        const findMen = state.products.filter(
          (el) => el.category.toLowerCase() === "men"
        );
        setProducts(findMen);
        setNumberz(findMen);
      } else if (value === "women") {
        const findWomen = state.products.filter(
          (el) => el.category.toLowerCase() === "women"
        );
        setProducts(findWomen);
        setNumberz(findWomen);
      }
    } else {
      const copy = [...state.products];
      const filter = copy.filter(
        (item) =>
          activeFilter.includes(item.color.toLowerCase()) ||
          activeFilter.includes(item.brand.toLowerCase())
      );

      const combine = copy.filter(
        (item) =>
          activeFilter.includes(item.color.toLowerCase()) &&
          activeFilter.includes(item.brand.toLowerCase())
      );

      if (combine.length) {
        const combineZ = combine.filter(
          (el) => el.category.toLowerCase() === value
        );
        setProducts(combineZ);
      } else {
        const filterZ = filter.filter(
          (el) => el.category.toLowerCase() === value
        );
        setProducts(filterZ);
      }
    }
  }, [activeFilter, state.products, value]);

  return (
    <div>
      <h1>Products</h1>
      <FilterProducts
        onFilterChange={onFilterChange}
        activeFilter={activeFilter}
        handleChange={handleChange}
        products={numberz}
        value={value}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",

          flex: "1 1 0",
          justifyContent: "flex-start",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {products.map((item, index) => {
          return <Product product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Products;
