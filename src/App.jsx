import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import axios from "axios";

function App() {
  //creating a state variable
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [product, setProduct] = useState([]);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchterm] = useState("");

  //fetch categories on component when mount
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        setCategories(response.data);
        //  console.log(response.data)

        // console.log(categories)
        // console.log(response.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch products when category , search term , skip changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, skip, searchTerm]);

  //fetch products
  const fetchProducts = () => {
    const categoryUrl = selectedCategory
      ? `https://dummyjson.com/products/category/${selectedCategory}`
      : "https://dummyjson.com/products";
    // console.log("fetch: " , searchTerm)
    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}`
      : `${categoryUrl}?limit=${limit}&skip=${skip}`;

    axios
      .get(url)
      .then((response) => {
        setTotal(response.data.total);
        // console.log("total: " , total)
        setProduct((prev) => [...prev, ...response.data.products]);
        // console.log(response.data.products)
        // console.log("prod:",product)
      })
      .catch((err) => console.log(err));
  };

  //handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // console.log(categories)
    setProduct([]); //clear all the previous data here
    setSkip(0); // reste skip pagination
  };
  //handle search bar if any input happend
  const handleSearch = (term) => {
    console.log(term)
    setSearchterm(term); // term value pass while assign the action for event in search bar
    setProduct([]); //clear all the previous data here
    setSkip(0); //reste skip pagination
  };

  //handle pagination
  const loadMoreProducts = () => {
    if (product.length < total) {
      setSkip((prev) => prev + limit);
    }
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <h1>Product List</h1>
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        ></SearchBar>

        <CategoryFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        ></CategoryFilter>
      </div>

      <div className="body">
        <ProductList product={product}></ProductList>

        {/* more option for loading extra items */}
        {product.length < total && (
          <button onClick={loadMoreProducts} className="load-more-btn">Load More</button>
        )}
      </div>
    </div>
  );
}

export default App;
