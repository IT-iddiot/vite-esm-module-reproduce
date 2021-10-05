import Vuex from 'vuex'

export { createStore }

function createStore() {
  const store = Vuex.createStore({
    state() {
      return {
        todoList: [],
        title: 'I am default title',
        description: 'I am default description',
      }
    },

    mutations: {
      setMetaInfo(state, { title, description }) {
        state.title = title;
        state.description = description
      }
    }
  })

  return store
}
