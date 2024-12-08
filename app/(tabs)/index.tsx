import { Image, StyleSheet, Platform, View, Text, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PaperProvider } from "react-native-paper";
import { TextInput, Button, HelperText } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import schedule from "../json/schedule.json";

import Styles from "../css/form";
export default function Form() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [hostStatus, sethostStatus] = useState("");
  const [visitPurpose, setvisitPurpose] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // Function to handle the date change
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios"); // Hide the picker after selecting on iOS
    setDate(currentDate); // Update the date state
  };

  // Function to show the date picker
  const showDatepicker = () => {
    setShowDate(true);
  };

  // TIme

  // const [show, setShow] = useState(false);
  const onChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === "ios"); // Hide the picker after selection on iOS
    setTime(currentTime); // Update the time state
  };

  // Show the time picker
  const showTimepicker = () => {
    setShowTime(true);
  };
  const [data, setData] = useState<Data[]>([]);

  // Alert
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Failed to Submit",
      "Please fill in the necessary fields before submitting.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );

  // Submit
  function submit() {
    var id = date.toDateString() + time.toDateString();
    if (
      fname.trim() === "" ||
      lname.trim() === "" ||
      email.trim() === "" ||
      hostStatus.trim() === "" ||
      visitPurpose.trim() === ""
    ) {
      createTwoButtonAlert();
    }
    setData([
      {
        id: id,
        fname: fname,
        lname: lname,
        email: email,
        hostStatus: hostStatus,
        visitPurpose: visitPurpose,
        date: date,
        time: time,
      },
    ]);

    console.log(data);
  }
  const hasErrors = () => {
    return fname.trim().length === 0;
  };

  function addData() {}
  return (
    <PaperProvider>
      <View style={Styles.mainContainer}>
        <View style={Styles.formContainer}>
          <Text style={Styles.headers}>Visitor's Info</Text>
          <TextInput
            label="First Name"
            value={fname}
            mode="outlined"
            outlineColor="#d1d1d1"
            onChangeText={(fname) => setFname(fname)}
          />

          <TextInput
            label="Last Name"
            value={lname}
            mode="outlined"
            outlineColor="#d1d1d1"
          />

          <Text style={Styles.headers2}>Host Info</Text>

          {/* Email */}
          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="#d1d1d1"
            value={email}
          />

          <TextInput
            label="Host status"
            mode="outlined"
            outlineColor="#d1d1d1"
            value={hostStatus}
          />

          <TextInput
            label="Purpose of Visit"
            mode="outlined"
            outlineColor="#d1d1d1"
            value={visitPurpose}
          />

          <Text style={Styles.headers2}>Schedule</Text>

          <TextInput
            label="Date"
            onPress={showDatepicker}
            value={date.toLocaleDateString()}
            mode="outlined"
            outlineColor="#d1d1d1"
          />

          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date" // Can be 'date', 'time', or 'datetime'
              is24Hour={true} // Use 24-hour format
              display="default" // 'default' | 'spinner' | 'calendar' | 'clock'
              onChange={onChangeDate}
            />
          )}

          {/* Time */}

          <TextInput
            label="Date"
            onPress={showTimepicker}
            value={time.toLocaleTimeString()}
            mode="outlined"
            outlineColor="#d1d1d1"
          />
          {/* Conditionally render the DateTimePicker */}
          {showTime && (
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time" // Set mode to 'time' for time picker
              is24Hour={false} // Use 24-hour format (true for 24-hour, false for 12-hour)
              display="default" // Can be 'default', 'spinner', 'clock'
              onChange={onChange}
            />
          )}

          <Button
            style={Styles.submit_button}
            mode="contained"
            onPress={submit}
          >
            Submit
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}
