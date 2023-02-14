// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          success: true,
          data: {
            username: "admin",
            // 一个用户可能有多个角色
            roles: ["admin"],
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsInVzZXJJZCI6Ijk3ZWM1NTVlLWE4NTYtNGM5MC04MWY3LTAyYTg1ODY5OGUwOSIsImlhdCI6MTY3NjIwMzczNiwiZXhwIjoxNjc2MjA3MzM2fQ.AxwbC4_Og0VZqi8Ckcn--FzMFme6FDaQe7Q5pAzkE-8",
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsInVzZXJJZCI6Ijk3ZWM1NTVlLWE4NTYtNGM5MC04MWY3LTAyYTg1ODY5OGUwOSIsImlhdCI6MTY3NjIwMzczNiwiZXhwIjoxNjc2MjA3MzM2fQ.AxwbC4_Og0VZqi8Ckcn--FzMFme6FDaQe7Q5pAzkE-8",
            expires: "2023/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: true,
          data: {
            username: "common",
            // 一个用户可能有多个角色
            roles: ["common"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: "2023/10/30 00:00:00"
          }
        };
      }
    }
  }
] as MockMethod[];
