const local = {
    sysName: 'Smart Manufacturing Management Platform',
    common: {
        input: 'Please input',
        select: 'Place select',
        loading: 'Loading',
    },
    login: {
        userLogin: 'User Login',
        account: 'Job number',
        login: 'Login',
        logging: 'Logging',
        password: 'Password',
        accountRule: '@:common.input @:login.account',
        passwordRule: '@:common.input @:login.password',
        setting: 'Setting',
        remember: 'Remember account password',
    },

    // 请求错误
    ajaxErr: {
        400: 'Request error',
        401: 'Authentication failed, unable to access system resources',
        403: 'Current operation does not have permission',
        404: 'Access resource does not exist',
        408: 'Request timeout',
        413: 'Parsing failed',
        500: 'Server internal error',
        501: 'Service not implemented',
        502: 'Bad Gateway',
        503: 'Service unavailable',
        504: 'Gateway timeout',
        505: 'HTTP version is not supported',
        default: 'Unknown system error, please feed back to the administrator',
        noPerm: 'You do not have permission to access, please contact the administrator',
        reLogin: 'Sign in again',
    },
};
export default { ...local };
