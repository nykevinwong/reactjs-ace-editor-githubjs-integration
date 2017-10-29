import GitHub from 'github-api';
import OauthAppSetting from '../settings/oauthapp.json';
import testUser from '../settings/user.json';
import queryString from 'query-string';

let github = new GitHub({
        username: testUser.USERNAME,
        password: testUser.PASSWORD,
      });

let user = null;
let repoList = null;
let userProfile = null;


class GithubService
{


/*
static getRepoBranches = (callBack) => {

  remoteRepo = github.getRepo('github-tools', 'github');

}
*/


static getUserProfile = async () => {
  console.log("getUserProfile");
  if(userProfile==null)
  {
  userProfile = await  GithubService.getUser().getProfile();
  userProfile = userProfile.data;
  }
  console.log(userProfile);
  
  return userProfile;
}

static getRepoNames = async () => {
  let repoNames = await GithubService.getRepos();
  repoNames = repoNames.map( item => item.name);
  return repoNames;
}

static getRepos = async () => {
  console.log("getRepos");
  const filterOpts = {
         type: 'owner',
         sort: 'updated'
      };

  try
  {
    if(repoList==null)
      {
        repoList = await GithubService.getUser().listRepos(filterOpts);
      repoList = repoList.data;
      }
  }
  catch(e)
  {
    console.log("failed to get repots.");
  }

  console.log(repoList);

  return repoList;
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

static getAccessTokenFromURL= () => {
  const parsed = queryString.parse(window.location.search);
  return parsed.code;  
}

static isLogined = () => window.location.search.indexOf('code') !== -1 && GithubService.getAccessTokenFromURL() != undefined;

}

export default GithubService;