import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ResultPage = ({ route }) => {
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);

  const { answer, result, remarks } = route.params;

  const loadfonts = async () => {
    await Font.loadAsync({
      "CircularStd-Bold": require("../assets/CircularStd-Bold.otf"),
      CircularStd: require("../assets/CircularStd.ttf"),
    });
    setloaded(true);
  };
  useEffect(() => {
    loadfonts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",

          flexDirection: "row",

          marginTop: 40,
        }}
      >
        <View>
          <Ionicons
            name="arrow-back"
            size={30}
            color="white"
            style={{ position: "absolute", right: 50 }}
            onPress={() => navigation.navigate("MainPage")}
          />
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          {loaded ? <Text style={styles.text1}>BMI Calculator</Text> : ""}
        </View>
      </View>
      {loaded ? <Text style={styles.text2}>Your Result</Text> : ""}
      <View style={styles.resultbox}>
        {loaded ? <Text style={styles.remarkstext}>{remarks}</Text> : ""}
        {loaded ? <Text style={styles.resulttext}>{result}</Text> : ""}
        {loaded ? <Text style={styles.answertext}>{answer}</Text> : ""}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainPage")}
      >
        {loaded ? <Text style={styles.calculate}>Re-Calculate</Text> : ""}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  text1: {
    color: "white",
    fontSize: 25,
    fontFamily: "CircularStd-Bold",
  },
  text2: {
    color: "white",
    fontSize: 40,
    fontFamily: "CircularStd-Bold",
    marginTop: 30,
  },
  resultbox: {
    width: "85%",
    height: 400,
    backgroundColor: "#152238",

    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  button: {
    display: "flex",
    width: "100%",
    height: 50,
    backgroundColor: "#FF5C5C",
    alignSelf: "flex-end",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  calculate: {
    fontFamily: "CircularStd",
    fontSize: 20,
    color: "white",
  },
  remarkstext: {
    color: "green",
    fontSize: 30,
    fontFamily: "CircularStd-Bold",
    marginTop: 30,
  },
  answertext: {
    color: "white",
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    marginTop: 60,
  },
  resulttext: {
    color: "white",
    fontSize: 50,
    fontFamily: "CircularStd-Bold",
    marginTop: 60,
  },
});
