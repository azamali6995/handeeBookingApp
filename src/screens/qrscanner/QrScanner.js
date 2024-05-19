import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Platform } from "react-native";
import {
  requestMultiple,
  openSettings,
  PERMISSIONS,
} from "react-native-permissions";
import jwt_decode from "jwt-decode";
import QRCodeScanner from "react-native-qrcode-scanner";
import Header from "../../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { boxScanning } from "../../redux/slice/boxScanningSlice";
import { CountTotalScanning } from '../../redux/slice/QrCodeSlice'


const QrScanner = ({navigation, route}) => {

  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (Platform.OS === "ios") {
      getPermissions();
    }
  }, []);

  const getPermissions = async () => {
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
      if (result["ios.permission.CAMERA"] === "blocked") {
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
      } else if (
        result["ios.permission.CAMERA"] === "granted" ||
        (result["android.permission.CAMERA"] === "granted" &&
          result["android.permission.READ_EXTERNAL_STORAGE"] === "granted")
      ) {
        setIsCameraReady(true);
      } else if (
        result["android.permission.CAMERA"] === "denied" ||
        result["android.permission.READ_EXTERNAL_STORAGE"] === "denied"
      ) {
        setCameraPermissionDenied(true);
      } else if (
        result["android.permission.CAMERA"] === "blocked" ||
        result["android.permission.READ_EXTERNAL_STORAGE"] === "blocked"
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
  };

  const onSuccess = (e) => {
    try {
      if (e?.data) {
        handleBoxApi(e?.data);
      } 
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleBoxApi = (boxId) => {
    // dispatch(boxScanning(boxId))

    dispatch(CountTotalScanning(boxId))
    navigation.goBack()
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <StatusBar
        translucent={true}
        backgroundColor="black"
        barStyle={"dark-content"}
      />
      <Header Left={true} Text={"Scan Item"} Right={true} Back={false} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {cameraPermissionDenied ? (
          <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>Camera not authorized</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {isCameraReady && (
              <QRCodeScanner
                cameraStyle={{ height: "100%" }}
                onRead={onSuccess}
              />
            )}
          </View>
        )}
      </View>
      <Modal
        visible={showErrorModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.alertContainer, { backgroundColor: "#fff" }]}>
            <View style={[styles.header, { backgroundColor: "#2591CA" }]}>
              <Text style={styles.title}>Error</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.errorText}>Please scan the selected item</Text>
            </View>
            <TouchableOpacity
              style={[styles.okayButton, { backgroundColor: "#2591CA" }]}
              onPress={() => {
                setShowErrorModal(false),
                navigation.goBack()  
                }}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertContainer: {
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },
  header: {
    height: 44,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  body: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  okayButton: {
    borderRadius: 5,
    width: "40%",
    height: 40,
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  okayButtonText: {
    color: "white",
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
});
