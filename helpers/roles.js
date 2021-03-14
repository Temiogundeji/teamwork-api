// const AccessControl =  require('accesscontrol');
// import * as AccessController from 'accesscontrol';
import { AccessControl } from 'accesscontrol';
const ac = new AccessControl();

export const getRoleTitle = (role_id) => {
    let userType = "";

    switch (role_id) {
        case 1:
            userType = "employee"
            break;
        case 2: 
            userType= "admin"
            break;
        default:
            break;
    }
    return userType;
}

export const roles = (() => {
    ac.grant("employee")
        .createOwn("gif")
        .readOwn("gif")
        .readAny("gif")
        .updateOwn("gif")
        .deleteOwn("gif")
        .createOwn("article")
        .readOwn("article")
        .readAny("article")
        .updateOwn("article")
        .deleteOwn("article")

    ac.grant("admin")
        .extend("employee")
        .updateAny("gif")
        .deleteAny("gif")
        .readAny("gif")

    return ac;
})();