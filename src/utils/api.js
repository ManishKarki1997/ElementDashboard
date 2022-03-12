import axios from "axios";

const api = {
  setHeaders() {
    const instance = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/admin`,
      headers: {
        Accept: "application/json",
        Authorization:
          localStorage.getItem("user") != null
            ? `${JSON.parse(localStorage.getItem("user")).token}`
            : null,
      },
    });
    return instance;
  },
  async get(target) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.get(target);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async getWithPayload(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.get(target, { params: payload });
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async post(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.post(target, payload);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async patch(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.patch(target, payload);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async delete(target) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.delete(target);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async deleteWithPayload(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.delete(target, { params: payload });
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async handlerError(statusCode) {
    if (statusCode == 401) {
      let user = localStorage.getItem("user");
      if (user) {
        localStorage.removeItem("user");
        location.reload();
      }
    }
    return;
  },
};

export default api;
