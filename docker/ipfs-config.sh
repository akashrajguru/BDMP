sudo docker exec block-dev_ipfs-node_1 ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'

sudo docker exec block-dev_ipfs-node_1 ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'

sudo docker restart block-dev_ipfs-node_1
# docker exec block-dev_ipfs-node_1 ipfs config — json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'