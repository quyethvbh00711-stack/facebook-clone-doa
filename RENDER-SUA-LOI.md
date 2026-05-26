# Sửa lỗi Deploy failed trên Render

## Nguyên nhân
`better-sqlite3` cần compile native → build fail trên Render free.

Đã đổi sang lưu file `data/logins.json` (chạy ổn trên Render).

---

## Bạn làm ngay

### 1. Push code mới lên GitHub

```powershell
cd D:\new
git add .
git commit -m "fix: bo sqlite, deploy render"
git push
```

### 2. Kiểm tra Render Settings

Vào service **facebook-clone-doa** → **Settings**:

| Mục | Giá trị |
|-----|---------|
| **Root Directory** | Để trống NẾU `package.json` ở gốc repo. Nếu repo là `fl-stack` và code nằm trong folder con → gõ đúng folder (vd `facebook-clone-doa`) |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Node version** | 20 (hoặc để auto) |

### 3. Deploy lại

**Manual Deploy** → **Deploy latest commit**

Đợi trạng thái **Live** (xanh), không còn Failed.

### 4. Thử

- https://facebook-clone-doa.onrender.com
- Đăng nhập thử
- https://facebook-clone-doa.onrender.com/admin.html

### 5. Domain xacminh.online

DNS ALIAS `@` + CNAME `www` → `facebook-clone-doa.onrender.com` là **đúng**.

Chỉ hoạt động sau khi deploy **Live**.
