import Vuex from 'vuex'

export { createStore }

function createStore() {
  const store = Vuex.createStore({
    state() {
      return {
        todoList: []
      }
    },

    actions: {
      fetchTodoList({ commit }) {
        const todoList = [
          {
            id: 0,
            text: 'Uncomment 18 - 21 for global property editing'
          },
          {
            id: 1,
            text: 'Uncomment 24 - 26 for injected variable editing'
          }
        ]
        return commit('setTodoList', todoList)
      }
    },

    mutations: {
      setTodoList(state, todoList) {
        state.todoList = todoList
      }
    }
  })

  return store
}
