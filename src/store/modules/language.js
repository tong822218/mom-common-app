const language = {
    state: {
        language: 'zh-Hans',
    },
    mutations: {
        SET_LANGUAGE: (state, language = 'zh-Hans') => {
            state.language = language;
        },
    },
};

export default language;
