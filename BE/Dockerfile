FROM openjdk:11-jre-slim
ARG JAR_FILE="build/libs/choom-0.0.1-SNAPSHOT.jar"
COPY ${JAR_FILE} build.jar
ENTRYPOINT ["java","-jar","build.jar"]