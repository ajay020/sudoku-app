import { Text, View, Button } from "react-native";
import useTimer from "../hooks/useTimer";

export default () => {
  const { value, isActive, start, pause, reset } = useTimer({
    interval: 1000,
    startValue: 0,
  });

  return (
    <View style={{ padding: 20 }}>
      <Text>{value}</Text>
      <Button title="start" onPress={start} />
      <Button title="pause" onPress={pause} />
      <Button title="reset" onPress={reset} />
    </View>
  );
};
