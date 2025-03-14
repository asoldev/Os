#!/bin/bash
set -e

# Đọc file .env và nạp vào biến môi trường
if [[ -f .env ]]; then
    export $(grep -v '^#' .env | xargs)
    echo "Đã nạp cấu hình từ file .env"
fi

# Kiểm tra xem NODE_VERSION đã được định nghĩa chưa
if [[ -n "$NODE_VERSION" ]]; then
    echo "Thiết lập Node.js version: $NODE_VERSION"

    # Đảm bảo nvm đã được nạp
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

    # Kiểm tra xem version có tồn tại không
    if ! nvm ls $NODE_VERSION > /dev/null 2>&1; then
        echo "Đang cài đặt Node.js version $NODE_VERSION..."
    fi

    # Thiết lập mặc định và sử dụng version được chỉ định
    nvm alias default $NODE_VERSION
    nvm use $NODE_VERSION

    echo "Đã thiết lập thành công Node.js $(node -v)"
else
    echo "NODE_VERSION không được định nghĩa trong file .env"
fi

# Chạy lệnh được cung cấp hoặc supervisord theo mặc định
exec "$@"