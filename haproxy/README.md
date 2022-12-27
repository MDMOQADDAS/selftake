# ssl/tls

**openssl genrsa -out server.key 2048**  <br/>
openssl req -new -key server.key -out server.csr <br/>
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
