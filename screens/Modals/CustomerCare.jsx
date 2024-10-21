import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'
import React from 'react'

export default function CustomerCare({visible, onRequestClose}) {
  return (
    <View>
      {/*Overlay Modal*/}
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}  // Transparent to achieve overlay effect
        onRequestClose={onRequestClose}
        statusBarTranslucent={true}  // This property allows the modal to go under the status bar
      >
        {/* Ensure the modal takes full screen */}
        <View style={StyleSheet.absoluteFillObject}>

          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <View style={{paddingVertical: 10,position: "absolute", right: 10}}>
                <TouchableOpacity onPress={onRequestClose}>
                  <Image style={{width: 25, height: 25}} source ={require('./../../assets/images/close_button.png')}/>
                </TouchableOpacity>
              </View>
            <View style={{marginHorizontal: "5%", marginTop: 20}}>
            <Text style={{textAlign: "center", fontFamily: "outfit-bold", fontSize: 10}}>
            Customer Care Contact Information
            <Text>{"Contact custtomer care support. Please choose one of the following options to get in touch: \n"}</Text>
<Text style={{color: Colors.APPCOLOR}}> Email Support:</Text>{" support@yourbank.com \nWe strive to respond within 24 hours."}

<Text>{`Zangi Cha Support:
Prefer instant assistance? Chat with us on Zangi!
Simply open the Zangi app and search for our customer care contact:
YourBank Support
We’re available from 8 AM to 8 PM (local time) for real-time assistance.

Thank you for choosing us, and we look forward to helping you!`}</Text>
</Text>
            
          </View>
            </View>
          </View>
        </View>
      </Modal>
       {/*End of Overlay Modal*/}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
})