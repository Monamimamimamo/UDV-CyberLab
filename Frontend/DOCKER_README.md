# Docker Setup для Neolab Frontend

Этот проект настроен для деплоя через Docker с использованием Docker Compose.

## Требования

- Docker Engine 20.10+
- Docker Compose 2.0+

## Быстрый старт

### 1. Сборка и запуск контейнера

```bash
docker-compose up --build
```

Команда автоматически:
- Соберет Docker образ с приложением
- Запустит контейнер с preview режимом
- Откроет доступ на порту 4173

### 2. Запуск в фоновом режиме

```bash
docker-compose up -d --build
```

### 3. Остановка контейнера

```bash
docker-compose down
```

### 4. Просмотр логов

```bash
docker-compose logs -f app
```

## Переменные окружения

Для настройки переменных окружения вы можете:

1. **Создать `.env` файл** в корне проекта:
```env
VITE_BACKEND_URL=http://your-backend-url:5000
```

2. **Или изменить в `docker-compose.yml`**:
```yaml
environment:
  VITE_BACKEND_URL: ${VITE_BACKEND_URL:-http://localhost:5000}
```

