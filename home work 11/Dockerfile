# Gunakan image Node.js LTS sebagai base image
FROM node:18.17.1

# Buat direktori aplikasi di dalam kontainer
WORKDIR /hw11/src/app

# Salin package.json dan package-lock.json (jika ada) ke direktori kontainer
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam direktori kontainer
COPY . .

# Expose port 3000 untuk akses dari luar
EXPOSE 3000

# Perintah untuk menjalankan aplikasi Node.js
CMD [ "node", "app.js" ]