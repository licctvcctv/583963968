# student-1-system Dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制后端
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production
COPY backend/ ./backend/
RUN cd backend && npm run build

# 复制前端
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# 复制数据
COPY data/ ./data/

EXPOSE 8001 3001

CMD ["sh", "-c", "cd backend && node dist/index.js & cd frontend/dist && .."]
