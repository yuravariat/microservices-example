
version="1.0.1"
declare -a array=("auth")
removeAll=0

if [ "$1" = "true" ]; then
  removeAll=1
fi

if ((!removeAll)); then
    #for nimikube
    echo "setting env for minikube"
    #eval $(minikube docker-env)
fi

for i in "${array[@]}"
do
    echo "#######################################[ ${i} ]#############################################"
    if ((removeAll)); then
        echo "docker rmi blog/${i}:${version}"
        docker rmi blog/"${i}":"${version}"
    else
        cd "${i}"
        echo "docker build . -t blog/${i}:${version}"
        docker build . -t blog/"${i}":"${version}"
        cd ..
    fi
done