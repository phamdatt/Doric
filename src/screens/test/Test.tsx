import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

export default class Test extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date: any, type: string) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate }: any = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED START DATE:{startDate}</Text>
          <Text>SELECTED END DATE:{endDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
