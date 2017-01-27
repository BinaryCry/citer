let globalValue; // будет доступна методам этого модуля, но из вне доступной не будет
exports.setGlobal = (val) => {
    globalValue = val;
};
exports.getGlobal = () => {
    console.log(global); // будет выдан объект global приложения, который вызвал модуль, а не global данного модуля. К последнему доступа не будет, если его не предоставили
    return globalValue;
};