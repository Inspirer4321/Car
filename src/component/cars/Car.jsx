import React, { useReducer } from "react";
import styles from "./car.module.css";
import nexiaImage from "./Nexia 3.jpg";

const avtoInfo = {
  basic: {
    name: "Nexia",
    image: nexiaImage,
    basicAmount: 26395,
    features: [],
  },
  additionalFeatures: [
    {
      id: 1,
      title: "Premium sound system",
      price: 500,
    },
    {
      id: 2,
      title: "V-6 engine",
      price: 1500,
    },
    {
      id: 3,
      title: "Rear spoiler",
      price: 250,
    },
    {
      id: 4,
      title: "Racing detail package",
      price: 1500,
    },
  ],
};

function reducer(state, action) {
  const { id, type } = action;
  switch (type) {
    
    case "delete":
      const deletedFeature = state.basic.features.find((item) => item.id === id);
      return {
        basic: {
          ...state.basic,
          features: state.basic.features.filter((item) => item.id !== id),
        },
        additionalFeatures: [...state.additionalFeatures, deletedFeature],
      };
    case "add":
      const addedFeature = state.additionalFeatures.find((item) => item.id === id);
      return {
        basic: {
          ...state.basic,
          features: [...state.basic.features, addedFeature],
        },
        additionalFeatures: state.additionalFeatures.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
}

export default function Avto() {
  const [avto, dispatch] = useReducer(reducer, avtoInfo);

  function add(id) {
    dispatch({ type: "add", id });
  }

  function del(id) {
    dispatch({ type: "delete", id });
  }

  return (
    <div className={styles.avto}>
      <div className={styles.left}>
        <img src={avto.basic.image} alt="Car" />
        <h2>Added features:</h2>
        <ul className={styles.featuresList}>
          {avto.basic.features.length === 0 ? (
            <li className={styles.placeholder}>You can purchase items from the store</li>
          ) : (
            avto.basic.features.map((item) => (
              <li key={item.id} className={styles.feature}>
                <button className={styles.button} onClick={() => del(item.id)}>
                  X
                </button>
                <span className={styles.featureText}>{item.title}</span>
              </li>
            ))
          )}
        </ul>
        <p className={styles.amount}>Amount: ${avto.basic.basicAmount}</p>
      </div>
      <div className={styles.middle}></div>
      <div className={styles.right}>
        <h2>Additional Features</h2>
        <ul className={styles.featuresList}>
          {avto.additionalFeatures.length === 0 ? (
            <li className={styles.placeholder}>Nice looking car</li>
          ) : (
            avto.additionalFeatures.map((item) => (
              <li key={item.id} className={styles.feature}>
                <button className={styles.button} onClick={() => add(item.id)}>
                  Add
                </button>
                <span className={styles.featureText}>
                  {item.title} (+{item.price})
                </span>
              </li>
            ))
          )}
        </ul>
        <h2 className={styles.totalAmount}>
          Total amount: ${avto.basic.basicAmount +
            avto.basic.features.reduce((sum, item) => sum + item.price, 0)}
        </h2>
      </div>
    </div>
  );
}
