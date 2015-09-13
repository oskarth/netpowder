#!/bin/sh

echo "[Starting satellite...]"
/root/websocketd -port 8080 /root/handler.rkt & 
echo "[Running.]"
