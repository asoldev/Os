# ==========================
# Base image: Ubuntu 24.04
# ==========================
FROM ubuntu:24.04
USER root

# Cập nhật và cài đặt các dependencies cần thiết
RUN apt-get update -y && \
    apt-get install -y \
    software-properties-common \
    curl \
    vim \
    gnupg2 \
    lsb-release \
    ca-certificates \
    apt-transport-https \
    unzip \
    zip \
    git \
    libpq-dev \
    libxml2-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    nginx \
    supervisor \
    fish \
    tree \
    && rm -rf /var/lib/apt/lists/*

# Thêm PPA PHP 8.2
RUN add-apt-repository ppa:ondrej/php -y && \
    apt-get update -y

# Cài đặt PHP 8.2 và các extension cần thiết
RUN apt-get install -y \
    php8.2-cli \
    php8.2-fpm \
    php8.2-pgsql \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-swoole

# Cài đặt Composer
RUN curl -sS https://getcomposer.org/installer | php -- --version=2.8.5 --install-dir=/usr/local/bin --filename=composer

# Cấu hình Supervisor
COPY supervisord/supervisord.conf /etc/supervisor/supervisord.conf
COPY supervisord/supervisor.d/ /etc/supervisor/conf.d/

# Thiết lập thư mục log cho Supervisor
RUN mkdir -p /var/log/supervisor && \
    chmod -R 777 /var/log/supervisor

# Expose các cổng cần thiết
EXPOSE 80

# Lệnh mặc định khi container được khởi động
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
