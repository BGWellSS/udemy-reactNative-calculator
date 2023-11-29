import React from "react";
import { StyleSheet, Text, Dimensions, TouchableHighlight } from "react-native";

export default Button = ({ label, double, triple, onClick, operation }) => {
  return (
    <TouchableHighlight onPress={() => onClick(label)}>
      <Text
        style={[
          styles.button,
          operation ? styles.operationButton : null,
          double ? styles.buttonDouble : null,
          triple ? styles.buttonTriple : null,
        ]}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#888",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});
