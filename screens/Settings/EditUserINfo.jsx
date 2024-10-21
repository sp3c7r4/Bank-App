import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const {width, height} = Dimensions.get("window")
export default function EditUserINfo() {
  return (
    <View>
      <View style={{backgroundColor: "#f0f2f5", 
      marginTop: 10,
        width: "95%",
        marginHorizontal: 12,
        borderRadius: 10,
        }}>
          <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{marginTop: 10, marginBottom: 10}}>
                  <Text style={{fontFamily: "outfit-bold", marginLeft: 10, marginBottom: 5}}>Edit your Information</Text>
                  <View style={{flexDirection: "row", justifyContent:"space-around"}}>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Firstname</Text>
                      <View style={styles.editFields}>
                      <TextInput placeholder='Firstname' style={{paddingLeft: 10}} />
                      </View>
                    </View>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Lastname</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: "row", justifyContent:"space-around"}}>
                    <View style={styles.editContainer}>
                    <Text style={{fontFamily: "outfit-medium"}}>Username</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Email</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: "row", justifyContent:"space-around"}}>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Address</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>SSN</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: "row", justifyContent:"space-around"}}>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Phone</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}} />
                      </View>
                    </View>
                    <View style={styles.editContainer}>
                      <Text style={{fontFamily: "outfit-medium"}}>Country</Text>
                      <View style={styles.editFields}>
                      <TextInput style={{paddingLeft: 10}}/>
                      </View>
                    </View>
                  </View>
                </View>
          </ScrollView>
              </KeyboardAvoidingView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    marginVertical: 3
  },
  editFields: {
    paddingLeft: 3,
    backgroundColor: "#fff",
    padding: 5,
    height: 30, 
    width: width*0.42, 
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BOXOUTLINE
  }
})