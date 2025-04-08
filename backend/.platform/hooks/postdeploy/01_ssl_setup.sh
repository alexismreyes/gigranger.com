#!/bin/bash

DOMAIN="api.gigranger.com"
EMAIL="malexismreyes@gmail.com"  # Replace with your email

yum install -y nginx certbot python3-certbot-nginx

certbot certonly --non-interactive --agree-tos --standalone -d $DOMAIN --email $EMAIL || true

cat > /etc/nginx/conf.d/ssl-api.conf <<EOF
server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}

server {
    listen 80;
    server_name $DOMAIN;

    return 301 https://\$host\$request_uri;
}
EOF

systemctl restart nginx
