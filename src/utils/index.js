// 生成随机唯一Id
const generateRandomId = () => {
    const randomId = Date.now().toString(36) +'_'+ Math.random().toString(36).substring(2);
    return randomId;
}

export {
    generateRandomId
}