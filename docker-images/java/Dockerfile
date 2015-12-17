FROM 1science/java:oracle-jdk-8

ENV SIGNUM_CLASSNAME=HelloWorld
ENV SIGNUM_CODE="class HelloWorld{public static void main(String[] args){System.out.println(\"Hello, world!\");}}"
CMD ["/app/run.sh"]

COPY run.sh /app/run.sh
