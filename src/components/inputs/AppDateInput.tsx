import React, { useState } from "react";
import { View, TextInput, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const AppDateInput = ({ style, value, onChangeText }: any) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    // Hide picker on Android after selection
    if (Platform.OS === "android") setShowPicker(false);

    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formattedDate = dueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <View style={styles.container}>
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
});
