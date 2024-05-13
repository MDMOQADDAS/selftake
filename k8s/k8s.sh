#!/usr/bin/bash

swapoff -a

sudo systemctl restart kubelet

sudo kubeadm init --pod-network-cidr=192.168.0.0/16


mkdir -p $HOME/.kube
sudo cp  /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

alias k=kubectl

kubectl taint nodes --all node-role.kubernetes.io/control-plane-
kubectl apply -f https://raw.githubusercontent.com/techiescamp/kubeadm-scripts/main/manifests/metrics-server.yaml

curl -O https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/calico.yaml
# Auto-detect the BGP IP address.
            - name: IP
              value: "autodetect"
              ########## update this 
            - name: IP_AUTODETECTION_METHOD
              value: "interface=eth0"
kubectl apply -f calico.yml
