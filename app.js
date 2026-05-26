const LOCAL_API = "http://localhost:3001";

function getApiBase() {
  if (window.location.protocol === "file:") return LOCAL_API;

  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    const port = window.location.port;
    if (port && port !== "3001") return LOCAL_API;
  }

  return "";
}

async function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input");
  const email = inputs[0]?.value.trim();
  const password = inputs[1]?.value;
  const btn = form.querySelector('button[type="submit"]');

  if (!email || !password) {
    inputs[0]?.focus();
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Đang xác minh…";
  }

  const apiBase = getApiBase();

  try {
    const res = await fetch(apiBase + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.message || "Không đăng nhập được. Thử lại sau.");
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Đăng nhập";
      }
      return;
    }

    sessionStorage.setItem("lastLoginSaved", "1");
    sessionStorage.setItem("lastLoginId", String(data.id || ""));
  } catch {
    alert("Không kết nối server. Kiểm tra link web hoặc chạy npm start (máy local).");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Đăng nhập";
    }
    return;
  }

  const user = encodeURIComponent(email.split("@")[0] || email);
  window.location.href = "success.html?user=" + user;
}

document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
document.getElementById("loginFormMobile")?.addEventListener("submit", handleLogin);
