import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: [],
    pending: false
  },
  mutations: {
    setLoadingStatus: (state, payload) => {
      state.pending = payload
    },

    setTasks: (state, payload) => {
      state.tasks = payload
      state.pending = false
    },

    addOneTask: (state, payload) => {
      state.tasks.push(payload)
      state.pending = false
    },

    deleteOneTask: (state, payload) => {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },

    changeOneTask: (state, payload) => {
      const find = state.tasks.find(task => task.id === payload.id);
      find.text = payload.text;
      state.tasks[state.tasks.indexOf(find)] = find;
    }
  },
  actions: {
    //Получение всех задач
    getTasks: async (context) => {
      context.commit("setLoadingStatus", true)
      const data = await fetch("https://638375f91ada9475c8006ade.mockapi.io/todo")

      const json = await data.json()

      context.commit("setLoadingStatus", false)
      context.commit('setTasks', json)
    },
    //Добавление задачи
    addTask: async (context, payload) => {
      context.commit("setLoadingStatus", true)
      console.log(payload)

      await fetch("https://638375f91ada9475c8006ade.mockapi.io/todo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          text: payload,
          checkbox: false
        })
      })

      context.commit("setLoadingStatus", false)
      context.commit("addOneTask", {id: Math.random(), text: payload, checkbox: false})
    },
    //Удаление задачи
    deleteTask: async (context, payload) => {
      context.commit("setLoadingStatus", true)
      await fetch(`https://638375f91ada9475c8006ade.mockapi.io/todo/${payload}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      })

      context.commit("setLoadingStatus", false)
      context.commit("deleteOneTask", payload)
    },
    //Изменение задачи
    changeTask: async (context, payload) => {
      context.commit("setLoadingStatus", true)
      const data = await fetch(`https://638375f91ada9475c8006ade.mockapi.io/todo/${payload.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          text: payload.text,
          checkbox: false,
        })
      })

      context.commit("setLoadingStatus", false)
      context.commit("changeOneTask", payload)
    }
  }
})
