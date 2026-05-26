# Deploy khi tài khoản Render bị khóa

Code đã có trên GitHub → dùng **nền tảng khác** (cùng cách: server Node + domain trỏ DNS).

---

## Cách 1: Railway.app (giống Render, dễ nhất)

1. Vào https://railway.app → đăng nhập **GitHub** (email khác Render cũng được)
2. **New Project** → **Deploy from GitHub repo** → chọn repo đồ án
3. Railway tự nhận Node.js → nếu hỏi:
   - **Start command:** `npm start`
4. Vào **Settings** → **Networking** → **Generate Domain**  
   → có link dạng `https://xxx.up.railway.app`
5. Thử đăng nhập → mở `https://xxx.up.railway.app/admin.html`

### Gắn faceverified.xyz (Railway)

1. Project → **Settings** → **Domains** → **Custom Domain** → `faceverified.xyz`
2. Railway hiện bản ghi DNS (CNAME) → vào nơi mua domain → thêm DNS giống Render
3. Đợi SSL → dùng https://faceverified.xyz

> Railway free: ~5 USD credit/tháng — đủ demo đồ án vài tuần.

---

## Cách 2: Fly.io (không cần Render, deploy từ máy)

1. Cài: https://fly.io/docs/hands-on/install-flyctl/
2. Terminal trong `D:\new`:

```powershell
cd D:\new
fly auth login
fly launch
```

- Chọn tên app (vd: `faceverified`)
- Chọn region gần VN (vd: Singapore)
- Không thêm Postgres khi hỏi
- Deploy: `fly deploy`

3. Link: `https://faceverified.fly.dev`
4. Domain riêng: `fly certs add faceverified.xyz` rồi trỏ DNS theo hướng dẫn Fly

---

## Cách 3: Hostinger Business (trả phí, 1 chỗ có domain + Node)

- Gói **Business** (~75.900đ/th) — có **Node.js Web Apps**
- Upload / Git deploy code trong hPanel
- Domain `faceverified.xyz` mua cùng Hostinger → không cần Render

---

## Cách 4: Tài khoản Render mới (chỉ khi bị khóa nhầm)

- Đăng ký email **khác** → liên kết GitHub
- **Không** dùng lại email/tài khoản bị khóa
- Nếu khóa vì vi phạm điều khoản (clone login) → có thể khóa tiếp → nên dùng Railway/Fly/Hostinger

---

## Domain faceverified.xyz (giống nhau mọi nền tảng)

Ở Namecheap / Porkbun / Hostinger DNS:

| Loại | Host | Trỏ tới |
|------|------|---------|
| CNAME | `www` | link Railway/Fly/Render cho bạn |
| ALIAS hoặc CNAME | `@` | cùng link (theo hướng dẫn từng host) |

---

## Sau khi deploy xong

| Việc | Link |
|------|------|
| Gửi giáo viên | https://faceverified.xyz |
| Bạn xem dữ liệu | https://faceverified.xyz/admin.html |

---

## Khuyến nghị cho bạn

**Đã push Git rồi** → thử **Railway** trước (5 phút, giống Render nhất).

Render bị khóa thì **bỏ Render**, không cần sửa code — repo GitHub dùng lại được.
