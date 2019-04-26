import {observable,action,computed} from 'mobx';
import _ from 'lodash'

class AuthStore
{
    constructor()
    {
        this._isAuth = false;
    }
    @observable _isAuth;
    @observable _authorizationInfo;

    @computed
    get isAuth()
    {
        return this._isAuth
    }
    @action setAuth(status)
    {
        if(this._isAuth !== status)
        {
            this._isAuth = status;
        }
    }
    @action loginSuccessInfo(authoinfo)
    {
        if(JSON.stringify(authoinfo) === this._authorizationInfo)
        {
            return;
        }
        else
        {
            this._authorizationInfo = authoinfo;
            this._isAuth = true;
        }
    }
    @computed
    get getAuthInfo()
    {
        return this._authorizationInfo;
    }
    @computed
    get getUserID()
    {
        if(this._authorizationInfo)
        {
            return this._authorizationInfo.user.id;
        }
        else
        {
            return "";
        }
    }

}
const AuthStoreInstance = new AuthStore();

export  default  AuthStoreInstance;