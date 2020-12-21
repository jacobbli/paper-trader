export default {
    state: {
        isLoggedIn: String,
        username: String,
        firstName: String,
        lastName: String,
        funds: Number,
        access_token: String
    },

    getters: {
        accessToken: state => {
            return state.access_token
        }
    },

    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.access_token = token;
        }
    },

    actions: {
        setAccessToken(context, token) {
            console.log(token)
            context.commit('SET_ACCESS_TOKEN', token)
        }
    }
};