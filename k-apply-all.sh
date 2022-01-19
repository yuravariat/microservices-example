
removeAll=0

if [ "$1" = "true" ]; then
  removeAll=1
fi

for entry in infra/k8s/*yaml
do
    echo "###############################[ ${entry} ]###############################"
    if ((removeAll)); then
        echo "kubectl delete -f ${entry}"
        kubectl delete -f "${entry}"
    else
        echo "kubectl apply -f ${entry}"
        kubectl apply -f "${entry}"
    fi
done