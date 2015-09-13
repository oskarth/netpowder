#!/bin/sh

echo "[Starting satellite...]"
cd /root/
/root/websocketd -port 8080 /root/handler.rkt & 
echo "[Running.]"
