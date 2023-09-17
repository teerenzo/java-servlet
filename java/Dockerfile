FROM maven:3.8.4-openjdk-11 AS build
MAINTAINER Emmanuel Renzaho (teerenzo.co@gmail.com)

# Copy the source code to the container
COPY . /usr/src/app/

# Set the working directory
WORKDIR /usr/src/app

# Build the application using Maven
RUN mvn package

FROM tomcat:9.0-jdk11-openjdk-slim
# Remove the existing default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the WAR file to the Tomcat webapps directory for automatic deployment
COPY --from=build /usr/src/app/target/ehospital.war /usr/local/tomcat/webapps/ROOT.war

CMD ["catalina.sh", "run", "--", "-Dcatalina.http.host=0.0.0.0", "-Dcatalina.http.port=8080", "-Dcatalina.http.path=/ehospital/api"]


# FROM openjdk:11-jdk
# MAINTAINER Emmanuel Renzaho (teerenzo.co@gmail.com)
# RUN apt-get update
# RUN apt-get install -y maven

# # Copy the source code to the container
# COPY . /usr/src/app/

# # Set the working directory
# WORKDIR /usr/src/app

# # Build the application using Maven
# RUN mvn clean package

# # Expose port 8080
# EXPOSE 8080

# # Start the application using Maven Tomcat plugin
# CMD ["mvn", "tomcat7:run"]

# FROM openjdk:11-jdk
# MAINTAINER Emmanuel Renzaho (teerenzo.co@gmail.com)
# RUN apt-get update
# RUN apt-get install -y maven
# COPY pom.xml /usr/local/service/pom.xml
# COPY src /usr/local/service/src
# WORKDIR /usr/local/service
# RUN mvn package
# CMD ["mvn", "tomcat7:run"]
# CMD ["java","-jar","target/docker-service-1.0-SNAPSHOT-jar-with-dependencies.jar"]

