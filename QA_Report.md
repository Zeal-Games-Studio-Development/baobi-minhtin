# Báo cáo QA: Hệ thống Chấm công & Tính lương (MVP)

> [!NOTE]
> Báo cáo này được tạo tự động dựa trên quá trình kiểm thử (QA Tester) của hệ thống áp theo tài liệu `MVP_ HỆ THỐNG CHẤM CÔNG + TÍNH LƯƠNG.txt`.

## 1. Kết quả Tổng quan
*   **Trạng thái:** Hệ thống đã hoàn thiện các Flow cốt lõi từ thiết lập cơ bản đến tính ra kết quả lương.
*   **Tính năng đạt yêu cầu (Pass):** Quản lý nhân viên (Thêm/Sửa), Quản lý Ca làm việc, Chấm công thủ công, Chỉnh sửa Bảng công mở/gọn, Báo cáo Chi tiết phiếu lương.
*   **Điểm cần khắc phục (Bugs):** Gặp lỗi đồng bộ liên quan đến luồng tính lương đối với nhân viên mới thêm và thiếu chặn giới hạn nhập liệu.

## 2. Kết quả Kiểm thử Chi tiết theo Module

### ✅ 1. Quản lý nhân viên & Ca làm việc
*   Các chức năng tạo mới nhân viên hoạt động ổn định, các trường thông tin (Mã nhân viên, Họ tên, Bộ phận) và form validation hiển thị cảnh báo đầy đủ nếu thiếu dữ liệu.
*   Có thể thực hiện việc khai báo ca làm việc dễ dàng qua giao diện trực quan.

### ✅ 2. Chấm công & Bảng công (Timesheet)
*   Thực hiện chấm công thủ công hoạt động tốt.
*   **Flow quan trọng MVP:** Tính năng "Xử lý công ngày" hoạt động chính xác. Bảng công phản ánh được đầy đủ thời gian check-in/check-out.
*   Hệ thống cho phép chức năng Edit chỉnh sửa tay các bản ghi vào/ra (đáp ứng đúng yêu cầu "Bảng công quan trọng: HR có thể sửa giờ vào/ra" trong file MVP).

### ⚠️ 3. Tính Lương & Bảng Lương (Payroll)
Màn hình Bảng lương hiển thị rất chuyên nghiệp, chi tiết ra được Phiếu lương bao gồm tổng kết: Lương công, OT, Phụ cấp, Khấu trừ. Tuy nhiên, đã phát hiện một số bug quan trọng:

1.  **Bug 1 (Critical) - Mất đồng bộ nhân viên khi Tính Lương:** 
    Khi thêm một nhân viên mới (`NV999`), mặc dù nhân viên đã hiển thị bên module Nhân sự. Nhưng khi chuyển sang Bảng Lương và nhấn **"Tính lương"**, nhân viên này không xuất hiện trong danh sách tính. Hệ thống báo tính cho 10 người trong khi toàn bộ danh sách là 13 người.
    > [!TIP]
    > **Gợi ý Kỹ thuật:** Có vẻ ở màn hình tạo mới nhân viên, object `EmployeeSalaryInfo` chưa được khởi tạo đúng và gắn vào `salaryInfos` store cho những nhân sự mới. Do đó điều kiện `salaryInfos.has(id)` bị failed tại [payrollEngine.ts](file:///c:/UnityProject/app_cham_cong/src/lib/engines/payrollEngine.ts) ở quá trình tính toán hàng loạt.
2.  **Bug 2 - Tràn/Thiếu Validation trường tiền tệ:**
    Có một dữ liệu nhân viên (Mã `NV012`) đang lưu trữ mức Lương cơ bản lên đến **800.000.000.000 đ**. Điều này gây lỗi logic hiển thị tổng (Aggregate sum) trên Top Header của màn Bảng lương làm con số đội lên rất lớn.
    => Cần bổ sung thêm `MaxValue` Validation ở Form Nhập liệu (Màn thông tin Lương & Phụ cấp).
3.  **Bug 3 - Chức năng Search trên Bảng lương:**
    Do lỗi (1), search tìm các bản ghi nhân viên chưa được xử lý vào List bảng lương dẫn đến báo không tìm thấy kết quả. Gây hiểu nhầm cho User.

## 3. Khuyến nghị Next Steps
Tài liệu MVP đã được chuyển thành code rất bám sát. Cần thực hiện các cập nhật nhỏ sau để đóng gói ổn định:

1.  Cập nhật logic `useEmployeeStore`: Đảm bảo khi tạo một Employee mới, một object default chứa thông tin lương (`baseSalary`, `allowances`...) phải được inject đồng bộ vào mảng `salaryInfos`.
2.  Bổ sung giới hạn độ lớn/giới hạn ký tự trong Input tiền tệ ở quá trình Thêm mới nhân viên.
3.  Xóa bản ghi test `NV012` bị nhập sai số tiền lớn để kiểm tra lại hệ thống tổng và OT.
