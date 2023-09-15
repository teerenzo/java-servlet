package com.javaChallenge.ehospital;

import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

public class Main {
    public static void main(String[] args) {
        
        String webappDir = "src/main/webapp/";
        String contextPath = "/";
        int port = 8080;

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(port);

        tomcat.addWebapp(contextPath, new File(webappDir).getAbsolutePath());

        try {
            tomcat.start();
            tomcat.getServer().await();
        } catch (LifecycleException e) {
            e.printStackTrace();
        }
    }
}
