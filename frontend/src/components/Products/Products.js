import React, { useContext, useState, useEffect, useCallback } from "react";
import { MyContext } from "../../Context/Context";
import FilterProducts from "./FilterProducts";
import Product from "./Product";
import SortBy from "./SortBy";
import { useLocation } from "react-router-dom";
export const Products = () => {
  const { state } = useContext(MyContext);
  const params = useLocation();
  console.log(params.state);
  const [products, setProducts] = useState(state.products);
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    setProducts(state.products);

    if (
      params.state === "men" ||
      params.state === "women" ||
      params.state === "all"
    ) {
      setValue(params.state);
    } else {
      setValue("all");
    }
  }, [state.products, params, state]);

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
        setSort("");
      } else if (value === "men") {
        const findMen = state.products.filter(
          (el) => el.category.toLowerCase() === "men"
        );
        setProducts(findMen);
        setNumberz(findMen);
        setSort("");
      } else if (value === "women") {
        const findWomen = state.products.filter(
          (el) => el.category.toLowerCase() === "women"
        );
        setProducts(findWomen);
        setNumberz(findWomen);
        setSort("");
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
        if (value === "all") {
          setProducts(combine);
        } else {
          const combineZ = combine.filter(
            (el) => el.category.toLowerCase() === value
          );
          setProducts(combineZ);
        }
      } else {
        if (value === "all") {
          setProducts(filter);
        } else {
          const filterZ = filter.filter(
            (el) => el.category.toLowerCase() === value
          );
          setProducts(filterZ);
        }
      }
    }
  }, [activeFilter, value, state]);

  const [sort, setSort] = useState("");

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    sortItems(event.target.value);
  };

  const calculate = (product) => {
    if (!product.reviews.length) {
      return 0;
    } else if (product.reviews.length === 1) {
      return product.reviews[0].rating;
    } else {
      const calculate = product.reviews.reduce((a, b) => {
        return (a.rating + b.rating) / product.reviews.length;
      });
      return calculate;
    }
  };

  const sortItems = useCallback(
    (value) => {
      const copy = [...products];
      if (value === "Cheapest first") {
        const sortCheap = copy.sort((a, b) => a.price - b.price);
        setProducts(sortCheap);
      } else if (value === "Expensive first") {
        const sortExpensive = copy.sort((a, b) => a.price - b.price).reverse();
        setProducts(sortExpensive);
      } else if (value === "Highest rating") {
        const map = copy
          .sort((a, b) => {
            return calculate(a) - calculate(b);
          })
          .reverse();
        setProducts(map);
      } else if (value === "Lowest rating") {
        const map = copy.sort((a, b) => {
          return calculate(a) - calculate(b);
        });

        setProducts(map);
      }
    },
    [products]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <SortBy
        products={products}
        handleChangeSort={handleChangeSort}
        sort={sort}
      />
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
            width: "100%",
            margin: "0 auto",
          }}
        >
          {products.map((item, index) => {
            return <Product product={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Products;
