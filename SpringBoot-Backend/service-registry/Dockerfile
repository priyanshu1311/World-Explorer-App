FROM java:11
COPY ./target/service-registry.jar service-registry
EXPOSE 8761
ENTRYPOINT ["java","-jar","/service-registry"]