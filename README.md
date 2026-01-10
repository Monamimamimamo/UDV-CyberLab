# 🚀 Быстрое развёртывание UDV-CyberLab

## 📋 Шаги развёртывания

### 1. Установка Jenkins
```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Java и Jenkins
sudo apt install -y openjdk-11-jdk
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install -y jenkins
echo "jenkins ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/jenkins

# Запускаем Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 2. Клонирование проекта
```bash
git clone https://github.com/Monamimamimamo/UDV-CyberLab.git
cd UDV-CyberLab
```

### 3. Настройка Jenkins
```bash
# Получаем пароль администратора
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Открываем http://YOUR_SERVER_IP:8080
# Устанавливаем рекомендуемые плагины
# Создаём администратора
```

### 4. Создание Pipeline Job
1. Создаём новый Pipeline job
2. В "Pipeline" выбираем "Pipeline script from SCM"
3. Выбираем Git и указываем URL репозитория
4. В "Script Path" указываем `Jenkinsfile`

### 5. Добавление Credentials
В Jenkins → Manage Jenkins → Credentials → System → Global credentials → Secret text:

**Добавляем:**
- `YANDEX_ACCESS_KEY` (Secret text) - ключ доступа к Yandex Cloud
- `YANDEX_SECRET_KEY` (Secret text) - секретный ключ Yandex Cloud
- `DOMAIN` (Secret text) - ваш домен (например: backend.your-domain.com)
- `SSL_EMAIL` (Secret text) - email для SSL сертификата

### 6. Запуск Pipeline
Нажимаем "Build Now" в Jenkins!

## 🌐 Развёртывание Frontend

Frontend развёртывается отдельно через Docker без использования Jenkins.

### 1. Подготовка сервера
```bash
# Устанавливаем Docker (если ещё не установлен)
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
```

### 2. Клонирование проекта
```bash
git clone https://github.com/aydlioh/UDV-CyberLab.git
cd UDV-CyberLab/Frontend
```

### 3. Сборка Docker образа
```bash
# Собираем образ локально
docker build -t frontend .

# Или используем готовый образ из Docker Hub
docker pull monamimamimamo/udv_frontend:latest
```

### 4. Запуск контейнера
```bash
# Запускаем контейнер в фоновом режиме на порту 4173
docker run -d -p 4173:4173 --name neolab-frontend --restart unless-stopped monamimamimamo/udv_frontend:latest
```

### 5. Настройка Nginx
```bash
# Устанавливаем Nginx (если ещё не установлен)
sudo apt install -y nginx

# Создаём конфигурацию для вашего домена
sudo nano /etc/nginx/sites-available/your-domain.com
```

**Конфигурация Nginx:**
```nginx
server {
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4173;  # Проксируем на ваш сервис
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = your-domain.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name your-domain.com;
    return 404; # managed by Certbot


}
```

```bash
# Активируем конфигурацию
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/

# Проверяем конфигурацию
sudo nginx -t

# Перезапускаем Nginx
sudo systemctl restart nginx
```

### 6. Настройка SSL сертификата
```bash
# Устанавливаем Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получаем SSL сертификат
sudo certbot --nginx -d your-domain.com

# Certbot автоматически обновит конфигурацию Nginx и настроит автоматическое обновление сертификата
```
* Техническое задание [тут](https://docs.google.com/document/d/1msiwzmNE4nWXhuL47TzWZ8p1dBNNvBnC/edit?usp=sharing&ouid=109486232149773167278&rtpof=true&sd=true)

* Прототип в [Figma](https://www.figma.com/file/K7xsEAO4at35LtiuS9M4g9/Untitled?type=design&node-id=0-1&mode=design&t=tjH81ceAnPX03sMa-0)