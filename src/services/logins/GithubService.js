
import OauthAppSetting from '../../settings/oauthapp.json';

class GithubService
{

static login = () => {
    const clientID = OauthAppSetting.CLIENTID;
    const url =
      'http://github.com/login/oauth/authorize?client_id=' + clientID;
    window.location = url;
}

static isLogined = () => window.location.search.indexOf('code') !== -1;

}

export default GithubService;