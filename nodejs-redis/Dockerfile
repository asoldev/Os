# Chọn image Node.js chính thức làm base image
FROM thinhlevan/ubuntu:node
COPY supervisord/supervisor.d/ /etc/supervisor/conf.d/

WORKDIR /app
COPY package*.json ./
COPY . .
COPY node_modules ./node_modules
EXPOSE 3000

RUN mkdir -p /var/log/node_app && \
    chmod -R 755 /var/log/node_app

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]