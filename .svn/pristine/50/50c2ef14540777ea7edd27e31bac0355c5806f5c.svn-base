/* 
* @Author: TanZer.hanyu  
* @Date: 2019-05-09 17:10:46
*/

const state = {
    user:{}
};

const mutations = {
    updateUser(state, payload) {
        state.user = _.cloneDeep(payload);
    }
};

const actions = {
    setUser({ commit },data){
        commit('updateUser', data);
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions
}