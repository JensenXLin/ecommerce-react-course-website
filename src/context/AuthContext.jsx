import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

function AuthProvider({ children }) {
  // 先检查本地是否已经有用户信息 有的话直接使用
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  function signUp(email, password) {
    // 解析本地用户列表
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 用户列表中存在已注册邮件
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);
    // store in the browser
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });
    return { success: true };
  }

  function login(email, password) {
    //
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // 解析本地用户列表
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    // 用户不存在
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }
    // 用户存在
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, logout, login, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext, useAuth };
