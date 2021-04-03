const github = {
  namespaced: true,
  state: {
    repoStatus: false,
    repo: "",
    projectName: "", //fetch from db
    cloneUrl: "" //fetch from db
  },
  mutations: {
    updateRepo: function(state, updateVal) {
      state.repoStatus = true;
      state.repo = updateVal.full_name;
      state.projectName = updateVal.name;
      state.cloneUrl = updateVal.clone_url;
    }
  },
  actions: {
    updateRepoAction: function({ commit }, val) {
      commit("updateRepo", val);
    }
  },
  getters: {
    repo: state => state.repo,
    projectName: state => state.projectName,
    cloneUrl: state => state.cloneUrl,
    repoStatus: state => state.repoStatus
  }
};
export { github };
