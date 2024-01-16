import React, { useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import jwt_decode from "jwt-decode";
import { Platform, View, Text, StatusBar, Alert, Image, StyleSheet , TouchableOpacity, Modal} from "react-native";
import Header from "../../component/Header";
import {
  requestMultiple,
  RESULTS,
  openSettings,
  PERMISSIONS,
  checkMultiple
} from "react-native-permissions";

class QrScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermissionDenied: false,
      isCameraReady: false,
      hasError: false,
      showErrorModal: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.getPermissions();
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in QrScanner:", error);
    this.setState({ hasError: true });
  }

  onSuccess = (e) => {
    try {
      // Your existing code for handling QR code data
      var decodedToken = jwt_decode(e.data);
      console.log("DecodedData", decodedToken);

      // ... (rest of your code)
    }
    catch (error) {
      this.setState({ showErrorModal: true });
    }
  };

  async  getPermissions(onDone) {
    await requestMultiple(

      Platform.select({
        android: [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ],
        ios: [PERMISSIONS.IOS.CAMERA],
      }),
      
      {
        title: "360 Alert",
        message: "360 Alert would like access to your Storage ",
      }
    ).then((result) => {
    console.log("azamali", result)

      if (result["ios.permission.CAMERA"] == "blocked") {
       
        Alert.alert(
          "Grant camera Permission",
          "Allow Camera access from settings",
          [
            {
              text: "Settings",
              style: "default",
              onPress: () => openSettings(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      } else if (result["ios.permission.CAMERA"] == "granted") {
        onDone(true);
      } else if (
        result["android.permission.CAMERA"] == "granted" &&
        result["android.permission.READ_EXTERNAL_STORAGE"] == "granted"
      ) {
        onDone(true);
      } else if (
        result["android.permission.CAMERA"] == "denied" ||
        result["android.permission.READ_EXTERNAL_STORAGE"] == "denied"
      ) {
        onDone(false);
      } else if (
        result["android.permission.CAMERA"] == "blocked" ||
        result["android.permission.READ_EXTERNAL_STORAGE"] == "blocked"
      ) {
        Alert.alert(
          "Grant camera Permission",
          "Allow Camera access from settings",
          [
            {
              text: "Settings",
              style: "default",
              onPress: () => openSettings(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>Something went wrong.</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <StatusBar translucent={true} backgroundColor="black" barStyle={'dark-content'} />
        <Header Left={true} Text={'Scan Item'} Right={true} Back={false} />

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {this.state.cameraPermissionDenied ? (
            <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 18 }}>Camera not authorized</Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              { (
                <QRCodeScanner
                  cameraStyle={{ height: "100%" }}
                  onRead={this.onSuccess}
                />
              )}
            </View>
          )}
          </View>
                <Modal
                  visible={this.state.showErrorModal}
                  transparent={true}
                  animationType="slide"
                > 
                  <View style={{flex:1, alignItems:"center", justifyContent:"center", paddingHorizontal:20}}>  
                  <View style={styles.alertContainer}>
                    <View style={[styles.header, { backgroundColor: "#2591CA" }]}>
                      <Text style={styles.title}>Error</Text>
                    </View>
                    <View style={styles.body}>
                      <Text style={{
                        fontWeight: '500',
                        fontFamily:"Inter-Medium",
                        fontSize: 16,
                        }}>
                        Please scan the selected item</Text>
                    </View>
                    <TouchableOpacity style={[styles.okayButton,
                         { backgroundColor: "#2591CA" }]} 
                       onPress={()=>this.props.navigation.goBack()}>
                      <Text style={styles.okayButtonText}>Okay</Text>
                    </TouchableOpacity>
                  </View>

                  </View>
                  
                </Modal>



      </View>
    );
  }
}

export default QrScanner;

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    justifyContent:'center',
  },
  header: {
    height:44,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontFamily:"Inter-Medium",
    fontSize: 16,
  },
  body: {
    paddingVertical: 20,
    alignItems:"center",
    justifyContent:"center"
  },
  okayButton: {
    borderRadius: 5,
    width:'40%',
    height:40,
    marginBottom:5,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  okayButtonText: {
    color: 'white',
    fontWeight: '500',
    fontFamily:"Inter-Medium",
    fontSize: 16,
  },
});

