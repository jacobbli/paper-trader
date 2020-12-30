export default {
    state: {
        username: null,
        firstName: null,
        lastName: null,
        funds: null,
        accessToken: sessionStorage.getItem('access-token')
    },

    getters: {
        getFunds: state => state.funds,
        getFirstName: state => state.firstName,
        getLastName: state => state.lastName,
        getAccessToken: state => { return (state.accessToken == 'null'? null : state.accessToken) },
        isLoggedIn : state => !!state.accessToken
    },

    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token;
        },
        SET_USERNAME(state, username) {
            state.username = username;
        },
        SET_FIRSTNAME(state, firstName) {
            state.firstName = firstName;
        },
        SET_LASTNAME(state, lastName) {
            state.lastName = lastName;
        },
        SET_FUNDS(state, funds) {
            state.funds = funds;
        }
    },

    actions: {
        setAccessToken(context, token) {
            sessionStorage.setItem('access-token', token)
            context.commit('SET_ACCESS_TOKEN', token)
        },
        setUsername(context, username) {
            context.commit('SET_USERNAME', username)
        },
        setFirstName(context, firstName) {
            context.commit('SET_FIRSTNAME', firstName)
        },
        setLastName(context, lastName) {
            context.commit('SET_LASTNAME', lastName)
        },
        setFunds(context, funds) {
            context.commit('SET_FUNDS', funds)
        },
        updateFunds(context, difference) {
            const newFunds = context.state.funds - difference
            context.commit('SET_FUNDS', newFunds)
        },
        setCurrentUser(context, payload) {
            context.dispatch('setAccessToken', payload['access_token']);
            context.dispatch('setUsername', payload['username']);
            context.dispatch('setFirstName', payload['first_name']);
            context.dispatch('setLastName', payload['last_name']);
            context.dispatch('setFunds', payload['funds']);
        },
        logout(context) {
            sessionStorage.removeItem('access-token')
            context.dispatch('setAccessToken', null);
            context.dispatch('setUsername', null);
            context.dispatch('setFirstName', null);
            context.dispatch('setLastName', null);
            context.dispatch('setFunds', null);
        }
    }
};