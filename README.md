# ProyectoAlta

```
minikube start

minikube tunnel

kubectl get all -o wide

kubectl apply -f postgres.yaml

kubectl apply -f cronjob.yaml

kubectl apply -f manifiesto.yaml

kubectl expose deployment proyectoalta --type=LoadBalancer --port=3000

kubectl expose deployment elasticsearch --type=LoadBalancer --port=9200

kubectl expose deployment kibana --type=LoadBalancer --port=5601
```