#!/bin/sh

echo "[Starting satellite...]"
cd /root/
./websocketd -port 8080 ./handler.rkt & 
echo "[Running.]"
