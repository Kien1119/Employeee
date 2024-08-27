import axios from "axios";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 1,
    employeeList: [],
    totalEmployee: 0,
  }),
  actions: {
    async addEmployee(req) {
      try {
        const { data } = await axios.post(
          `https://dummyjson.com/users/add`,
          req
        );
        this.employeeList.unshift(data);
        console.log("done");
        return data;
      } catch (error) {
        console.log(error);

        return error;
      }
    },
    increment() {
      this.count += 1;
      console.log(this.OldCount);
    },
    decrement() {
      this.count -= 1;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    OldCount: (stats) =>
      stats.count > 0 && (stats.count % 2 === 0 ? stats.count : " "),
    addEmp: (add) => add.employeeList,
  },
});
