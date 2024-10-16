// ScreenBottomSheet.js
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const ScreenBottomSheet = forwardRef((props, ref) => {
  // ref to the BottomSheet component
  const bottomSheetRef = ref || useRef(null);

  // Define the snap points for the BottomSheet (height options)
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Function to handle when the sheet changes
  const handleSheetChanges = useCallback((index) => {
    console.log('BottomSheet index:', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Start closed
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {/* Bottom sheet content */}
      <View style={styles.contentContainer}>
        <Text style={styles.sheetText}>This is a Gorhom Bottom Sheet!</Text>
        {props.children}
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ScreenBottomSheet;
