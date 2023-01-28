import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

const MainPage = () => {
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [height, setHeight] = useState(10);
  const [weight, setWeight] = useState(0);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState("");
  const [age, setAge] = useState(0);

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

  const calculateBMI = () => {
    var result = weight / ((height / 100) * (height / 100));
    result = result.toFixed(1);
    let answer;
    let remarks;
    if (result < 18.5) {
      answer = "Under Weight, Gain some more!";
      remarks = "Below Normal";
    } else if (result > 18.5 && result <= 24.9) {
      answer = "Good Job! You have a normal body Weight";
      remarks = "Normal";
    } else if (result > 24.9 && result <= 29.9) {
      answer = "Over wight, You have to loose Weight";
      remarks = "Unhealthy";
    } else if (result >= 30) {
      answer = "Obesity Range, You have to loose Weight";
      remarks = "Extremely Bad";
    }
    navigation.navigate("ResultPage", {
      answer,
      result,
      remarks,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {loaded ? <Text style={styles.text1}>BMI Calculator</Text> : ""}
      </View>
      <View style={styles.gender}>
        <TouchableOpacity
          style={{
            ...styles.male,
            backgroundColor: male ? "#035096" : "#152238",
          }}
          onPress={() => {
            setMale(!male), setFemale(false);
          }}
        >
          <Foundation name="male-symbol" size={60} color="white" />
          {loaded ? <Text style={styles.maletext}>Male</Text> : ""}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.male,
            backgroundColor: female ? "#035096" : "#152238",
          }}
          onPress={() => {
            setFemale(!female), setMale(false);
          }}
        >
          <Foundation name="female-symbol" size={60} color="white" />
          {loaded ? <Text style={styles.maletext}>Female</Text> : ""}
        </TouchableOpacity>
      </View>
      <View style={styles.heightbox}>
        {loaded ? <Text style={styles.maletext}>Height</Text> : ""}
        {loaded ? (
          <Text style={styles.heighttext}>{Math.floor(height)}cm</Text>
        ) : (
          ""
        )}
        <Slider
          style={{ width: 300, height: 50 }}
          minimumValue={10}
          maximumValue={500}
          onValueChange={(value) => setHeight(value)}
          thumbTintColor="#FF5C5C"
          minimumTrackTintColor="#FF5C5C"
        />
      </View>
      <View style={styles.hwbox}>
        <View style={styles.wbox}>
          {loaded ? <Text style={styles.maletext}>Weight</Text> : ""}
          {loaded ? <Text style={styles.heighttext}>{weight}</Text> : ""}
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "70%",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "grey",
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setWeight((e) => (e === 200 ? e : e + 1))}
            >
              <Entypo name="plus" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "grey",
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setWeight((e) => (e === 0 ? e : e - 1))}
            >
              <Entypo name="minus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hbox}>
          {loaded ? <Text style={styles.maletext}>Age</Text> : ""}
          {loaded ? <Text style={styles.heighttext}>{age}</Text> : ""}
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "70%",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "grey",
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setAge((e) => (e === 200 ? e : e + 1))}
            >
              <Entypo name="plus" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "grey",
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setAge((e) => (e === 0 ? e : e - 1))}
            >
              <Entypo name="minus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        {loaded ? <Text style={styles.calculate}>Calculate</Text> : ""}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainPage;
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
    marginTop: 50,
  },
  gender: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
  male: {
    width: 150,
    height: 150,
    backgroundColor: "#152238",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  maletext: {
    color: "grey",
    fontSize: 14,
    fontFamily: "CircularStd",
    marginTop: 10,
  },
  heightbox: {
    width: "82%",
    height: 150,
    backgroundColor: "#152238",

    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  heighttext: {
    color: "white",
    fontSize: 30,
    fontFamily: "CircularStd-Bold",
    marginTop: 5,
  },
  hwbox: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  hbox: {
    width: 150,
    height: 150,
    backgroundColor: "#152238",

    alignItems: "center",
    borderRadius: 12,
  },
  wbox: {
    width: 150,
    height: 150,
    backgroundColor: "#152238",

    alignItems: "center",
    borderRadius: 12,
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
});
