import React from 'react';
import './about.scss'; // Giả sử bạn có file SCSS riêng để style

const About = () => {
  return (
    <div className="about-container">
      <section>
        <h1>Chính Sách</h1>

        <h2>CHÍNH SÁCH BẢO MẬT</h2>
        <h3>1. Thông tin chúng tôi thu thập</h3>
        <ul>
          <li>Đăng ký tài khoản.</li>
          <li>Mua sản phẩm trên trang web.</li>
          <li>Liên hệ qua biểu mẫu hỗ trợ hoặc email.</li>
        </ul>
        <p>
          Thông tin cá nhân chúng tôi có thể thu thập bao gồm:
          <ul>
            <li>Họ tên.</li>
            <li>Địa chỉ email.</li>
            <li>Số điện thoại.</li>
            <li>Địa chỉ giao hàng.</li>
            <li>Thông tin thanh toán.</li>
          </ul>
        </p>

        <h3>2. Cách chúng tôi sử dụng thông tin</h3>
        <ul>
          <li>Xử lý đơn hàng và cung cấp sản phẩm.</li>
          <li>Liên hệ với bạn về trạng thái đơn hàng.</li>
          <li>Cải thiện trải nghiệm người dùng.</li>
          <li>Gửi thông tin khuyến mãi, nếu bạn đồng ý nhận.</li>
        </ul>

        <h3>3. Chia sẻ thông tin</h3>
        <ul>
          <li>Thực hiện việc giao hàng.</li>
          <li>Xử lý thanh toán.</li>
          <li>Tuân thủ yêu cầu pháp lý.</li>
        </ul>

        <h3>4. Bảo mật thông tin</h3>
        <ul>
          <li>Áp dụng các biện pháp bảo mật công nghệ cao.</li>
          <li>Giới hạn quyền truy cập thông tin cho nhân viên liên quan.</li>
        </ul>

        <h3>5. Quyền của bạn</h3>
        <ul>
          <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
          <li>Rút lại sự đồng ý nhận thông tin tiếp thị bất kỳ lúc nào.</li>
        </ul>

        <h3>6. Thay đổi chính sách</h3>
        <p>Chúng tôi có quyền thay đổi chính sách bảo mật này bất kỳ lúc nào. Thay đổi sẽ được thông báo trên trang web của chúng tôi.</p>

        <h3>Liên hệ chúng tôi</h3>
        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ qua email: email@example.com hoặc số điện thoại: 0289744422.</p>
      </section>

      <section>
        <h2>QUY CHẾ HOẠT ĐỘNG</h2>
        <h3>1. Giới thiệu chung</h3>
        <p>Quy chế này áp dụng cho tất cả người dùng khi truy cập và mua sắm trên trang web.</p>

        <h3>2. Đối tượng áp dụng</h3>
        <ul>
          <li>Tất cả người tiêu dùng cá nhân hoặc tổ chức khi truy cập và mua sắm.</li>
          <li>Các bên có liên quan đến hoạt động của trang web.</li>
        </ul>

        <h3>3. Quy định chung</h3>
        <ul>
          <li>Người dùng phải cung cấp thông tin chính xác.</li>
          <li>Mỗi người dùng chỉ được phép tạo một tài khoản.</li>
          <li>Người dùng phải tuân thủ các quy định về bảo mật và không chia sẻ thông tin cá nhân.</li>
        </ul>

        <h3>4. Nghĩa vụ và trách nhiệm của người dùng</h3>
        <ul>
          <li>Người dùng phải đảm bảo các thông tin cung cấp là chính xác và đầy đủ.</li>
          <li>Người dùng chịu trách nhiệm đối với các giao dịch thực hiện qua tài khoản cá nhân.</li>
        </ul>

        <h3>5. Quyền của người sử dụng</h3>
        <ul>
          <li>Người dùng có quyền yêu cầu sửa đổi hoặc xóa thông tin cá nhân.</li>
          <li>Người dùng có quyền khiếu nại nếu phát hiện vi phạm về quyền lợi.</li>
        </ul>
      </section>

      <section>
        <h2>CHÍNH SÁCH VẬN CHUYỂN</h2>
        <h3>1. Phạm vi giao hàng</h3>
        <p>Chúng tôi giao hàng trên toàn quốc, bao gồm tất cả các tỉnh thành tại Việt Nam.</p>

        <h3>2. Thời gian giao hàng</h3>
        <p>
          Thời gian giao hàng phụ thuộc vào khu vực của bạn. Thông thường, chúng tôi mất từ 2-5 ngày làm việc để giao hàng trong nội thành và 5-7 ngày làm việc cho các khu vực ngoại thành hoặc tỉnh thành khác.
        </p>

        <h3>3. Chi phí giao hàng</h3>
        <p>
          Chi phí giao hàng được tính dựa trên trọng lượng và địa điểm giao hàng. Chi phí cụ thể sẽ được hiển thị trong quá trình thanh toán.
        </p>

        <h3>4. Quy trình xử lý giao hàng</h3>
        <ul>
          <li>Đơn hàng sẽ được xử lý và giao hàng trong vòng 24 giờ sau khi xác nhận.</li>
          <li>Chúng tôi sẽ gửi email hoặc tin nhắn để thông báo cho bạn về trạng thái đơn hàng.</li>
        </ul>
      </section>

      <section>
        <h2>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</h2>
        <h3>1. Điều kiện trả hàng</h3>
        <ul>
          <li>Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ bao bì.</li>
          <li>Thời hạn trả hàng là 7 ngày kể từ khi nhận sản phẩm.</li>
        </ul>

        <h3>2. Quy trình trả hàng</h3>
        <ul>
          <li>Liên hệ với bộ phận chăm sóc khách hàng để được hướng dẫn quy trình trả hàng.</li>
          <li>Gửi sản phẩm về địa chỉ công ty sau khi đã được xác nhận trả hàng.</li>
        </ul>

        <h3>3. Hoàn tiền</h3>
        <ul>
          <li>Chúng tôi sẽ hoàn tiền qua phương thức thanh toán ban đầu của bạn trong vòng 5-7 ngày làm việc sau khi nhận được hàng trả lại.</li>
          <li>Chi phí vận chuyển không được hoàn lại trừ khi sản phẩm có lỗi từ nhà sản xuất.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
