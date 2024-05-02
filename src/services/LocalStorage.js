import AsyncStorage from '@react-native-async-storage/async-storage';
const SESSION_INFO_KEY = '@Session:Info';
const SESSION_TOKEN_KEY = '@Session:Token';

export default class LocalStorage {
  async createSession(sData, onCompleted) {
    console.log("ssdfasdfasdf", sData)
    try {
      AsyncStorage.setItem(SESSION_INFO_KEY, JSON.stringify(sData))
        .then(() => {
          onCompleted(true);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
      onCompleted(false);
    }
  }
  
  async getSession(onResult) {
    var result = {userInfo: null};
    try {
      const info = await AsyncStorage.getItem(SESSION_INFO_KEY);
      if (info) {
        result.userInfo = JSON.parse(info);
      }
      onResult(result);
    } catch (error) {
      console.log(error.message);
      onResult(result);
    }
  }

  async deleteSession(onResult) {
    await AsyncStorage.multiRemove([SESSION_INFO_KEY, SESSION_TOKEN_KEY,'@OTP'])
      .then(() => {
        onResult(true);
      })
      .catch(err => {
        onResult(false);
      });
  }
}
