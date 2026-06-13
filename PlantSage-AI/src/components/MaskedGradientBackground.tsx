import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../theme";



type Props = {
  maskElement: ReactElement;
  children?: ReactElement;
};

const MaskedGradientBackground: React.FC<Props> = ({ maskElement, children }) => {


  return (
    <MaskedView style={styles.container} maskElement={maskElement}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.herbDark, colors.primary, colors.saffron]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MaskedGradientBackground;

