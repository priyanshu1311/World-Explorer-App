FROM java:8-jre
COPY ./target/gateway-service.jar gateway-service
EXPOSE 8080
ENTRYPOINT ["java","-jar","/gateway-service"]