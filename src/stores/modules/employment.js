import axios from "axios";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 1,
    employeeList: [
      {
        id: 1,
        firstName: "dsdsd",
        lastName: "dsdsd",
        maidenName: "",
        age: "22",
        gender: "Female",
        email: "aaa@gmail.com",
        phone: "11111111111111",
        username: "",
        password: "",
        birthDate: "",
        image: "",
        bloodGroup: "",
        height: "1111",
        weight: "11111111",
        eyeColor: "",
        hair: { color: "", type: "" },
        domain: "",
        ip: "",
        address: {
          address: "",
          city: "",
          coordinates: { lat: null, lng: null },
          postalCode: "",
          state: "",
        },
        macAddress: "",
        university: "",
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        company: {
          address: {
            address: "",
            city: "",
            coordinates: { lat: null, lng: null },
            postalCode: "",
            state: "",
          },
          department: "",
          name: "",
          title: "",
        },
        ein: "",
        ssn: "",
        userAgent: "",
      },
    ],
    totalEmployee: 0,
  }),
  actions: {
    async addEmployee(req) {
      try {
        const { data } = await axios.post(
          `https://dummyjson.com/users/add`,
          req
        );
        data.id = Math.round(Math.random() * 1000000);
        this.employeeList.unshift(data);

        return data;
      } catch (error) {
        console.error(error);

        return error;
      }
    },

    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    OldCount: (stats) =>
      stats.count > 0 && (stats.count % 2 === 0 ? stats.count : " "),
    addEmp: (state) => {
      return state.employeeList;
    },
  },
});
