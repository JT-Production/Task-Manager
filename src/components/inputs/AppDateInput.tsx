import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { s } from "react-native-size-matters";

export const AppDateInput = ({
  style,
  value,
  onChangeText,
  showPicker,
  setShowPicker,
  formattedDate,
  onChange,
  dueDate,
}: any) => {
  // const [dueDate, setDueDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);

  // const onChange = (event: any, selectedDate: any) => {
  //   // Hide picker on Android after selection
  //   if (Platform.OS === "android") setShowPicker(false);

  //   if (selectedDate) {
  //     setDueDate(selectedDate);
  //   }
  // };

  // const formattedDate = dueDate.toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });

  useEffect(() => {
    console.log(dueDate);
  });
  return (
    <View style={style}>
      <Pressable onPress={() => setShowPicker(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            value={formattedDate}
            placeholder="MM/DD/YYYY"
            editable={false}
          />
        </View>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
    width: s(250),
  },
});
