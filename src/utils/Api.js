class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getAppInfo() {
    // Call getUserInfo it in this array
  return Promise.all([this.getInitialCards(), this.updateUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if(res.ok){
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  //create another method, getUserInfo (different base Url)

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json(); // The response contains the updated user data
    });
  }

}

export default Api;
