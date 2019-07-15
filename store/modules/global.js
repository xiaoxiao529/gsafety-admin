/* 
 * @Author: TanZer.hanyu  
 * @Date: 2019-05-09 17:10:46
 */

const state = {
    value: "",

};

const mutations = {
    updateValue(state, payload) {
        state.value = payload;
    }
};

const actions = {
    setValue({ commit }, data) {
        commit('updateValue', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
