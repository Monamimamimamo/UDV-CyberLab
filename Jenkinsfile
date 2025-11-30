pipeline {
    agent any

    environment {
        YANDEX_BUCKET_NAME = 'udv-bucket'
        YANDEX_SERVICE_URL = 'https://storage.yandexcloud.net'
        YANDEX_ACCESS_KEY = credentials('YANDEX_ACCESS_KEY')
        YANDEX_SECRET_KEY = credentials('YANDEX_SECRET_KEY')
        DOMAIN = credentials('DOMAIN')
        SSL_EMAIL = credentials('SSL_EMAIL')
        SMTP_SERVER = credentials('SMTP_SERVER')
        SMTP_PORT = credentials('SMTP_PORT')
        SMTP_SENDER_NAME = credentials('SMTP_SENDER_NAME')
        SMTP_SENDER_EMAIL = credentials('SMTP_SENDER_EMAIL')
        SMTP_USERNAME = credentials('SMTP_USERNAME')
        SMTP_PASSWORD = credentials('SMTP_PASSWORD')
        CLIENT_EMAIL_CONFIRMATION_URL = credentials('CLIENT_EMAIL_CONFIRMATION_URL')
        CLIENT_PASSWORD_RESET_URL = credentials('CLIENT_PASSWORD_RESET_URL')
    }

    stages {
        stage('System Setup') {
            steps {
                sh '''
                    sudo apt update
                    sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
                    sudo apt update
                    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
                    
                    sudo apt install -y nginx
                    
                    sudo apt install -y certbot python3-certbot-nginx
                    sudo fuser -k 80/tcp || echo "Порт 80 свободен"
                    sudo certbot certonly --standalone -d ${DOMAIN} --email ${SSL_EMAIL} --agree-tos --non-interactive
        
                    
                    sudo systemctl start nginx
                    sudo systemctl enable nginx
                    
                    sudo usermod -aG docker jenkins
                '''
            }
        }

        stage('Clean Docker') {
            steps {
                sh '''
                    sudo chmod 666 /var/run/docker.sock
                    docker rm -f udv-cyberlab-tests-1 udv-cyberlab-identity-1 udv-cyberlab-projects-1 udv-cyberlab-news-1 udv-cyberlab-learnmaterials-1
                    docker system prune -af --volumes
                '''
            }
        }

        stage('Checkout') {
            steps {
                sh '''
                    cd ${WORKSPACE}
                    cat docker-compose.yml 
                '''
            }
        }

        stage('Build and Deploy') {
            environment {
                ASPNETCORE_ENVIRONMENT = "Development"
                YC_BUCKET = "${YANDEX_BUCKET_NAME}"
                YC_SERVICE_URL = "${YANDEX_SERVICE_URL}"
                YC_ACCESS_KEY = "${YANDEX_ACCESS_KEY}"
                YC_SECRET_KEY = "${YANDEX_SECRET_KEY}"
                SMTP_SERVER_VAR = "${SMTP_SERVER}"
                SMTP_PORT_VAR = "${SMTP_PORT}"
                SMTP_SENDER_NAME_VAR = "${SMTP_SENDER_NAME}"
                SMTP_SENDER_EMAIL_VAR = "${SMTP_SENDER_EMAIL}"
                SMTP_USERNAME_VAR = "${SMTP_USERNAME}"
                SMTP_PASSWORD_VAR = "${SMTP_PASSWORD}"
                CLIENT_EMAIL_CONFIRMATION_URL_VAR = "${CLIENT_EMAIL_CONFIRMATION_URL}"
                CLIENT_PASSWORD_RESET_URL_VAR = "${CLIENT_PASSWORD_RESET_URL}"
            }
            steps {
                sh '''
                    cd ${WORKSPACE}
                    echo "ASPNETCORE_ENVIRONMENT = $ASPNETCORE_ENVIRONMENT"
                    docker compose up -d --build
                '''
            }
        }

        stage('Deploy Nginx Configuration') {
            steps {
                sh '''
                    cd ${WORKSPACE}
                    sed 's/\${DOMAIN}/'${DOMAIN}'/g' nginx/nginx.conf > /tmp/nginx.conf
                    sudo cp /tmp/nginx.conf /etc/nginx/sites-available/${DOMAIN}
                    sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/
                    sudo rm -f /etc/nginx/sites-enabled/default
                    sudo nginx -t
                    sudo systemctl reload nginx
                '''
            }
        }
    }
}
