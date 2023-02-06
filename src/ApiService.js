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
    return axios.post("/member/join", member);
  }
  saveArrScheduleInfo = async (e) => {
    try {
      return await await axios.post("/saveArrScheduleInfo", e);
    } catch (err) {
      console.log(err);
    }
  };

  getSchedule = async (e) => {
    try {
      return await await axios.get("/getSchedule/" + e);
    } catch (err) {
      console.log(err);
    }
  };

  deleteSchedul = async (e) => {
    try {
      const res = await await axios.post("/deleteSchedul" + e);
    } catch (err) {
      console.log(err);
    }
  };
  updateSchedul = async (updateInfo) => {
    try {
      return await await axios.post("/updateSchedul", updateInfo);
    } catch (err) {
      console.log(err);
    }
  };

  getModification = async (e) => {
    try {
      return await await axios.get("/getModification/" + e);
    } catch (err) {
      console.log(err);
    }
  };
  confirmModification = async (e) => {
    try {
      return await await axios.post("/confirmModification", e);
    } catch (err) {
      console.log(err);
    }
  };
  rejectModification = async (e) => {
    try {
      return await await axios.post("/rejectModification", e);
    } catch (err) {
      console.log(err);
    }
  };
  getWorkerList = async (e) => {
    try {
      return await await axios.get("/getWorkerList/" + e);
    } catch (err) {
      console.log(err);
    }
  };
  getTodoInfo = async () => {
    try {
      return await await axios.get("/getTodoInfo");
    } catch (err) {
      console.log(err);
    }
  };
  getComplete = async () => {
    try {
      return await await axios.get("/getComplete");
    } catch (err) {
      console.log(err);
    }
  };
}
export default new ApiService();
