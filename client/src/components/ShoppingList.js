import React, { useState, useEffect } from "react";
import EmptyShoppingList from "./RenderShoppingList/EmptyShoppingList";
import { ShowShoppingList } from "./RenderShoppingList/ShowShoppingList";
import LoadingSpinner from "./LoadingSpinner";


const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateShoppingList = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    // get the data from the api
    const data = await fetch(
      "http://localhost:8080/api/shoppingLists",
      requestOptions
    );
    // convert the data to json
    const json = await data.json();

    // set state with the result
    setIsLoading(false);
    setShoppingList(json);
  };

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      // get the data from the api
      const data = await fetch(
        "http://localhost:8080/api/shoppingLists",
        requestOptions
      );
      // convert the data to json
      const json = await data.json();

      console.log(json);

      // set state with the result
      setIsLoading(false);
      setShoppingList(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {shoppingList.length ? (
            <ShowShoppingList shoppingList={shoppingList} updateShoppingList={updateShoppingList} />
          ) : (
            <EmptyShoppingList shoppingList={shoppingList} updateShoppingList={updateShoppingList}/>
          )}
        </>
      )}
    </>
  );
};

export default ShoppingList;
