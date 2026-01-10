# Используем Node.js 22 LTS (актуальная версия)
FROM node:22-alpine AS builder

# Принимаем build argument для VITE_BACKEND_URL
ARG VITE_BACKEND_URL=https://neolab-backend.aydlioh.ru/

# Устанавливаем переменную окружения для использования во время сборки
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы конфигурации монорепозитория для установки зависимостей
COPY package.json package-lock.json* ./
COPY turbo.json ./

# Копируем package.json всех workspace пакетов для правильной установки зависимостей
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY apps/neolab-web/package.json ./apps/neolab-web/

# Устанавливаем зависимости (npm ci для production, с fallback на npm install)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Копируем исходный код пакетов (зависимости уже установлены, кэш будет работать)
COPY packages/ ./packages/
COPY apps/ ./apps/

# Копируем дополнительные конфигурационные файлы если они есть
COPY .npmrc* ./
COPY vercel.json* ./

# Собираем проект через turbo
RUN npm run build

# Production stage - минимальный образ только с необходимыми файлами
FROM node:22-alpine

WORKDIR /app

# Устанавливаем wget для healthcheck и vite для preview режима
RUN apk add --no-cache wget && \
    npm install -g vite@^7.1.7

# Копируем собранное приложение из builder stage
COPY --from=builder /app/apps/neolab-web/dist ./dist

# Копируем конфигурационный файл для preview режима
COPY vite.preview.config.js ./vite.preview.config.js

# Expose порт для vite preview (по умолчанию 4173)
EXPOSE 4173

# Запускаем vite preview в режиме предпросмотра
# --host 0.0.0.0 позволяет принимать подключения извне контейнера
# --config указывает путь к конфигурационному файлу
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "4173", "--config", "./vite.preview.config.js"]
