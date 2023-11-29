import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

export default function App() {
  const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  };

  const [displayValue, setDisplayValue] = useState(initialState.displayValue);
  const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay);
  const [operation, setOperation] = useState(initialState.operation);
  const [values, setValues] = useState(initialState.values);
  const [current, setCurrent] = useState(initialState.current);

  const addDigit = (n) => {
    //console.debug(typeof n, typeof displayValue);

    const cleaningDisplay = displayValue === "0" || clearDisplay;

    if (n === "." && !cleaningDisplay && displayValue.includes(".")) {
      return;
    }

    const currentValue =
      cleaningDisplay && n === "." ? "0" : cleaningDisplay ? "" : displayValue;
    const newDisplayValue = currentValue + n;

    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (n !== ".") {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue(initialState.displayValue);
    setClearDisplay(initialState.clearDisplay);
    setOperation(initialState.operation);
    setValues(initialState.values);
    setCurrent(initialState.current);
  };

  const handleSetOperation = (innerOperation) => {
    if (current === 0) {
      setOperation(innerOperation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = innerOperation === "=";
      const newValues = [...values];

      try {
        newValues[0] = eval(`${newValues[0]} ${operation} ${newValues[1]}`);
      } catch (e) {
        newValues[0] = values[0];
      }

      newValues[1] = 0;
      setDisplayValue(`${newValues[0]}`);
      setOperation(equals ? null : innerOperation);
      setCurrent(equals ? 0 : 1);
      //setClearDisplay(!equals);
      setClearDisplay(true);
      setValues(newValues);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={handleSetOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={handleSetOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={handleSetOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={handleSetOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={handleSetOperation} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

