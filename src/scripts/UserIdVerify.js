

const UserIdVerify = (userId) => {
    
    const validExpression = /^[0-9]+$/;

    return validExpression.test(userId);
}

export default UserIdVerify;

