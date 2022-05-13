export default class SessionData {
  static setUser(userData) {
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  static getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  static setToken(token) {
    sessionStorage.setItem('token', token);
  }

  static getToken() {
    return sessionStorage.getItem('token');
  }

  static setCondo(condo) {
    sessionStorage.setItem('scope', JSON.stringify(condo));
  }

  static getCondo() {
    return JSON.parse(sessionStorage.getItem('scope'));
  }

  static logout() {
    sessionStorage.clear();
    window.location.reload(); // TODO: remove this when stop using redux on login page
  }

  static hasFullData() {
    return this.getToken() && this.getUser() && this.getCondo();
  }
}
