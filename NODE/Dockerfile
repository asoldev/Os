# Sử dụng Node.js 22 dựa trên Ubuntu
FROM ubuntu:22.04

# Thiết lập biến môi trường để tránh tương tác trong quá trình cài đặt
ENV NVM_DIR="/root/.nvm"

# Cài đặt Node.js 22
RUN apt-get update -y && \
    apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list > /dev/null

# Cập nhật và cài đặt các dependencies cần thiết
RUN apt-get update -y && \
    apt-get install -y \
    nodejs \
    curl \
    vim \
    git \
    libpq-dev \
    libxml2-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    nginx \
    supervisor \
    fish \
    tree \
    gettext \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

# Tối ưu hóa Redis
RUN mkdir -p /var/log/redis /var/lib/redis /var/run/redis && \
    chown -R redis:redis /var/log/redis /var/lib/redis /var/run/redis && \
    chmod 755 /var/log/redis /var/lib/redis /var/run/redis 

# Cài đặt NVM và tải các phiên bản Node.js từ 18 đến bản 22
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install 18 && \
    nvm install 20 && \
    nvm install 22 && \
    nvm alias default 22

# Cấu hình shell để sử dụng NVM
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /root/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> /root/.bashrc && \
    echo '[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"' >> /root/.bashrc

# Copy cấu hình Supervisor
COPY supervisord/supervisord.conf /etc/supervisor/supervisord.conf
COPY supervisord/supervisor.d/ /etc/supervisor/conf.d/
COPY application_conf/redis.conf /etc/redis/redis.conf
COPY application_conf/node-version.sh /usr/local/bin/node-version.sh 
RUN chmod +x /usr/local/bin/node-version.sh
# Mở port 80 nginx và port 6379 Redis
EXPOSE 80 6379
