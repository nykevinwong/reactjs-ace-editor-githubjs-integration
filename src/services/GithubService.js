import GitHub from 'github-api';
import OauthAppSetting from '../settings/oauthapp.json';
import testUser from '../settings/user.json';

let github = new GitHub({
        username: testUser.USERNAME,
        password: testUser.PASSWORD,
      });

let user = null;
let repoList = null;
let userProfie = null;

class GithubService
{
/*
static getRepoBranches = (callBack) => {

  remoteRepo = github.getRepo('github-tools', 'github');

}

static getUserProfile(cb) => {
  if(userProfie!==null)
    {
      console.log("get cached Repolist");
      console.log(userProfie);
      if(callback!=null)
        callback(userProfie);
      return;
    }

  GithubService.getUser().getProfile(cb);
}*/

static getRepos = (callback) => {
  if(repoList!==null)
    {
      console.log("get cached Repolist");
      console.log(repoList);
      if(callback!=null)
        callback(repoList);
      return;
    }
    
  const filterOpts = {
         type: 'owner',
         sort: 'updated'
      };

      GithubService.getUser().listRepos(filterOpts, 
        (err, result) => {
          console.log("get Repolist");
          console.log(result);
          repoList = result;
          if(callback!=null)
            callback(repoList);
      } );
}

static getUser = () => {
  if(user===null) user = github.getUser();
  return user;
}

static login = () => {
    const clientID = OauthAppSetting.CLIENTID;
    const url =
      'http://github.com/login/oauth/authorize?scope=user:email&client_id=' + clientID;
    window.location = url;
}

static isLogined = () => window.location.search.indexOf('code') !== -1;

}

export default GithubService;