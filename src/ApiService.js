import axios from "axios";

class ApiService {
  // fetchUsers() {
  //   return axios.get(USER_API_BASE_URL);
  // }

  // fetchUserByID(userID) {
  //   return axios.get(USER_API_BASE_URL + "/" + userID);
  // }

  // deleteUser(userID) {
  //   return axios.post(USER_API_BASE_URL + "/delete/" + userID);
  // }

  // addUser(user) {
  //   return axios.post(USER_API_BASE_URL, user);
  // }

  // editUser(user) {
  //   return axios.post(USER_API_BASE_URL + "/" + user.id, user);
  // }
  addMember(member) {
    return axios.post("/join", member);
  }

  saveArrScheduleInfo(saveArrScheduleInfo) {
    // var arrData = { saveArrScheduleInfo: saveArrScheduleInfo };
    return axios.post("/saveArrScheduleInfo", saveArrScheduleInfo);
  }
}
export default new ApiService();
