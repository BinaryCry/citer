var globalValue;

exports.setGlobal = (val) => {
    globalValue = val;
};

exports.getGlobal = () => {
    console.log(global);
    return globalValue;
};