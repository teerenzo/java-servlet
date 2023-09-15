
# Base the image on the official Maven image from DockerHub
FROM maven:3.6.3-jdk-11

# Copy the source code to the container
COPY . /usr/src/app/

# Set the working directory
WORKDIR /usr/src/app

# Build the application using Maven
RUN mvn clean package

# Expose port 8080
EXPOSE 8080

# Start the application using Maven Tomcat plugin
CMD ["mvn", "tomcat7:run"]

