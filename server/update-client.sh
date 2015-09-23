echo "[Updating client...]"
git clone https://github.com/oskarth/netpowder.git
git -C /root/netpowder/ pull
cp /root/netpowder/server/handler.rkt /root/
cp -r /root/netpowder/client/* /usr/local/www/nginx-dist/
echo "[Done.]"
