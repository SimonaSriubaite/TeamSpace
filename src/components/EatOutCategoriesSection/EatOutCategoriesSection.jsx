import React, { useEffect, useState } from "react";

import Ramen from "../../assets/ramen.svg";
import Pizza from "../../assets/pizza.svg";
import Pancakes from "../../assets/pancakes.svg";
import Salads from "../../assets/salads.svg";
import Sandwich from "../../assets/sandwitch.svg";
import Burger from "../../assets/burger.svg";
import Sushi from "../../assets/sushi.svg";
import Soups from "../../assets/soup.svg";
import Kebab from "../../assets/kebab.svg";
import Brunch from "../../assets/brunch.svg";
import Sweets from "../../assets/sweets.svg";
import Grill from "../../assets/grill.svg";

import Categories from "../Categories/Categories";

const EatOutCategoriesSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const restaurantsData = {
      Ramen: {
        image: Ramen,
        title: "Ramen",
        url: "/eat-out/category",
      },
      Pizza: { image: Pizza, title: "Pizza", url: "/eat-out/category" },
      Pancakes: {
        image: Pancakes,
        title: "Pancakes",
        url: "/eat-out/category",
      },
      Salads: {
        image: Salads,
        title: "Salads",
        url: "/eat-out/category",
      },
      Sandwich: {
        image: Sandwich,
        title: "Sandwich",
        url: "/eat-out/category",
      },
      Burger: {
        image: Burger,
        title: "Burger",
        url: "/eat-out/category",
      },
      Sushi: {
        image: Sushi,
        title: "Sushi",
        url: "/eat-out/category",
      },
      Soups: {
        image: Soups,
        title: "Soups",
        url: "/eat-out/category",
      },
      Kebab: {
        image: Kebab,
        title: "Kebab",
        url: "/eat-out/category",
      },
      Brunch: {
        image: Brunch,
        title: "Brunch",
        url: "/eat-out/category",
      },
      Sweets: {
        image: Sweets,
        title: "Sweets",
        url: "/eat-out/category",
      },
      Grill: {
        image: Grill,
        title: "Grill",
        url: "/eat-out/category",
      },
    };

    fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantList/`)
      .then((res) => res.json())
      .then((res) => {
        const newData = [];

        let allRestaurants = res.reduce(function (accumulator, currentValue) {
          return [...accumulator, ...currentValue.categories];
        }, []);

        let countedRestaurants = allRestaurants.reduce(function (
          allNames,
          name
        ) {
          if (name in allNames) {
            allNames[name]++;
          } else {
            allNames[name] = 1;
          }
          return allNames;
        },
        {});

        Object.keys(countedRestaurants).map((key) => {
          return newData.push({
            icon: restaurantsData[key]?.image || <div></div>,
            title: restaurantsData[key]?.title || "",
            quantity: countedRestaurants[key],
            url: restaurantsData[key]?.url || "",
          });
        });

        setData(newData);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return null;
  }

  return <Categories title="Categories" quantityLabel="PLACES" data={data} />;
};

export default EatOutCategoriesSection;
